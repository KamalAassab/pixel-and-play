import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100; // requests per window

function getRateLimitKey(request: NextRequest): string {
    // Use IP address from x-forwarded-for header
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
    return ip;
}

function checkRateLimit(key: string): boolean {
    const now = Date.now();
    const record = rateLimit.get(key);

    if (!record || now > record.resetTime) {
        // Reset or create new record
        rateLimit.set(key, {
            count: 1,
            resetTime: now + RATE_LIMIT_WINDOW,
        });
        return true;
    }

    if (record.count >= MAX_REQUESTS) {
        return false;
    }

    record.count++;
    return true;
}

// Clean up old entries periodically
setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimit.entries()) {
        if (now > record.resetTime) {
            rateLimit.delete(key);
        }
    }
}, RATE_LIMIT_WINDOW);

export function middleware(request: NextRequest) {
    // Skip rate limiting for static assets
    if (
        request.nextUrl.pathname.startsWith('/_next') ||
        request.nextUrl.pathname.startsWith('/static') ||
        request.nextUrl.pathname.match(/\.(jpg|jpeg|png|gif|svg|ico|webp|avif|woff|woff2|ttf|otf|mp4|webm)$/i)
    ) {
        return NextResponse.next();
    }

    // Check rate limit
    const rateLimitKey = getRateLimitKey(request);
    if (!checkRateLimit(rateLimitKey)) {
        return new NextResponse('Too Many Requests', {
            status: 429,
            headers: {
                'Retry-After': '60',
                'Content-Type': 'text/plain',
            },
        });
    }

    // Validate request headers
    const userAgent = request.headers.get('user-agent');
    const referer = request.headers.get('referer');

    // Block requests with suspicious or missing user agents (optional - be careful)
    // Uncomment if you want stricter validation
    // if (!userAgent || userAgent.length < 10) {
    //   return new NextResponse('Forbidden', { status: 403 });
    // }

    // Add security headers to response
    const response = NextResponse.next();

    // Additional runtime security headers
    response.headers.set('X-Request-ID', crypto.randomUUID());

    return response;
}

// Configure which routes to run middleware on
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder files
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|woff|woff2|ttf|otf|mp4|webm)).*)',
    ],
};
