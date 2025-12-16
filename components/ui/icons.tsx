
import {
    Facebook,
    Instagram,
    Linkedin,
    Twitter,
    Video,
    Heart,
    LucideProps,
    MapPin,
    Phone,
    Mail,
    Gamepad2,
    Coffee,
    Calendar,
    Image as ImageIcon
} from "lucide-react";

export const Icons = {
    logo: (props: LucideProps) => (
        <img
            src="/logo.webp"
            alt="Pixel & Play Logo"
            {...props as any}
            style={{
                objectFit: "contain",
                ...props.style
            }}
        />
    ),
    facebook: Facebook,
    instagram: Instagram,
    linkedin: Linkedin,
    twitter: Twitter,
    tiktok: Video,
    heart: Heart,
    mapPin: MapPin,
    phone: Phone,
    mail: Mail,
    gamepad: Gamepad2,
    coffee: Coffee,
    calendar: Calendar,
    gallery: ImageIcon,
};
