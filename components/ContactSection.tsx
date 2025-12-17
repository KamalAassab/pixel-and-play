
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import * as Icons from "lucide-react";




export default function ContactSection() {


  return (
    <section id="location" className="relative min-h-screen flex items-center justify-center py-12 px-6 bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-center">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 md:mb-8"
        >
          <h2 className="w-fit block mx-auto text-4xl md:text-5xl font-display font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-red-600">
            Contact Us!
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-x-20 lg:gap-y-8">

          {/* Cards Block */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:row-start-1 lg:col-start-1 h-full"
          >
            <div className="grid grid-cols-1 gap-2 sm:gap-3 md:gap-4 h-full">

              {/* Address Card */}
              <div className="group relative overflow-hidden rounded-xl bg-brand-blue/10 border border-brand-blue/20 p-6 shadow-lg flex items-center gap-5">
                <div className="inline-flex items-center justify-center w-12 h-12 shrink-0 rounded-full bg-brand-blue/20 border border-brand-blue/30">
                  <MapPin size={22} className="text-brand-blue" />
                </div>
                <div className="relative z-10">
                  <h4 className="font-display font-bold text-base text-white mb-1">Visit Us</h4>
                  <p className="text-zinc-200 font-display text-sm leading-relaxed">
                    159 Rue Ibnou Faris, Casablanca 20330
                  </p>
                </div>
              </div>

              {/* Opening Hours Card */}
              <div className="group relative overflow-hidden rounded-xl bg-brand-red/10 border border-brand-red/20 p-6 shadow-lg flex items-center gap-5">
                <div className="inline-flex items-center justify-center w-12 h-12 shrink-0 rounded-full bg-brand-red/20 border border-brand-red/30">
                  <Icons.Clock size={22} className="text-brand-red" />
                </div>
                <div className="relative z-10">
                  <h4 className="font-display font-bold text-base text-white mb-1">Opening Hours</h4>
                  <p className="text-zinc-200 font-display text-sm leading-relaxed">
                    Daily from <span className="text-white font-medium">2:00 PM</span> to <span className="text-white font-medium">12:00 AM</span>
                  </p>
                </div>
              </div>

              {/* Phone Card */}
              <a
                href="tel:+212612919613"
                className="group relative overflow-hidden rounded-xl bg-brand-blue/10 border border-brand-blue/20 p-6 shadow-lg flex items-center gap-5 transition-transform active:scale-95"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 shrink-0 rounded-full bg-brand-blue/20 border border-brand-blue/30">
                  <Icons.Phone size={22} className="text-brand-blue" />
                </div>
                <div className="relative z-10 flex-1">
                  <h4 className="font-display font-bold text-base text-white mb-1">Call Us</h4>
                  <p className="text-zinc-200 font-display text-sm tracking-wide">
                    +212 612-919613
                  </p>
                </div>
                <ArrowRight size={18} className="text-brand-blue" />
              </a>

              {/* Email Card */}
              <a
                href="mailto:contact@pixelandplay.com"
                className="group relative overflow-hidden rounded-xl bg-brand-red/10 border border-brand-red/20 p-6 shadow-lg flex items-center gap-5 transition-transform active:scale-95"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 shrink-0 rounded-full bg-brand-red/20 border border-brand-red/30">
                  <Icons.Mail size={22} className="text-brand-red" />
                </div>
                <div className="relative z-10 flex-1">
                  <h4 className="font-display font-bold text-base text-white mb-1">Email Us</h4>
                  <p className="text-zinc-200 font-display text-sm">
                    contact@pixelandplay.com
                  </p>
                </div>
                <ArrowRight size={18} className="text-brand-red" />
              </a>

            </div>
          </motion.div>

          {/* Map Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full h-[400px] lg:h-full min-h-[400px] lg:min-h-0 rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#242424] lg:col-start-2 lg:row-start-1"
          >
            {/* Map Facade / Embed */}
            <iframe
              src="https://www.google.com/maps?q=159+Rue+Ibnou+Faris,+Casablanca&z=16&output=embed"
              className="absolute inset-0 w-full h-full border-0 map-filter grayscale invert opacity-80 pointer-events-none scale-[1.2] md:scale-[1.5] translate-y-[-10%]"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="PIXEL & PLAY Location"
            />

            {/* Red Realistic Pin Overlay */}
            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-full z-10 pointer-events-none filter drop-shadow-2xl">
              <div className="relative group">
                {/* Pin Shape */}
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="animate-bounce-slow"
                >
                  <g filter="url(#filter0_d_pin)">
                    <path
                      d="M32 4C18.7452 4 8 14.7452 8 28C8 42.1627 28.5262 58.7468 30.6631 60.407C31.42 60.995 32.58 60.995 33.3369 60.407C35.4738 58.7468 56 42.1627 56 28C56 14.7452 45.2548 4 32 4Z"
                      fill="url(#paint0_radial_pin)"
                    />
                    <path
                      d="M32 4C18.7452 4 8 14.7452 8 28C8 42.1627 28.5262 58.7468 30.6631 60.407C31.42 60.995 32.58 60.995 33.3369 60.407C35.4738 58.7468 56 42.1627 56 28C56 14.7452 45.2548 4 32 4Z"
                      stroke="white"
                      strokeWidth="3"
                    />
                  </g>
                  {/* Inner Circle / Glare for realism */}
                  <circle cx="32" cy="24" r="10" fill="url(#paint1_linear_pin)" fillOpacity="0.4" />

                  <defs>
                    <radialGradient
                      id="paint0_radial_pin"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(24 20) rotate(54.4623) scale(46.6905)"
                    >
                      <stop stopColor="#FF5555" />
                      <stop offset="1" stopColor="#CC0000" />
                    </radialGradient>
                    <linearGradient
                      id="paint1_linear_pin"
                      x1="32"
                      y1="14"
                      x2="32"
                      y2="34"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="white" />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                    <filter
                      id="filter0_d_pin"
                      x="0"
                      y="0"
                      width="64"
                      height="68"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="2" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_pin"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_pin"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                {/* Ground Shadow */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-black/40 blur-[4px] rounded-[100%]" />
              </div>
            </div>

            {/* Overlay Button */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-center">
              <a
                href="https://maps.app.goo.gl/CAm6a62EtkrnpdpF8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-blue text-white text-xs font-bold rounded-xl shadow-lg hover:shadow-brand-blue/25 hover:bg-brand-blue/90 transition-all duration-300 w-auto"
              >
                <MapPin size={16} />
                GET DIRECTIONS
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

