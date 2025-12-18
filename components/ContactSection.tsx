
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Gamepad2, Dice5, Gamepad } from "lucide-react";
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
            Find The Energy
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
            <div className="grid grid-cols-1 gap-3 md:gap-4 h-full">

              {/* Address Card */}
              <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-brand-blue/20 via-brand-blue/10 to-zinc-900/50 border border-brand-blue/30 p-5 md:p-6 shadow-[0_0_20px_rgba(27,79,216,0.2)] hover:shadow-[0_0_30px_rgba(27,79,216,0.4)] transition-all duration-300 hover:border-brand-blue/50">
                {/* Floating gaming icons */}
                <motion.div
                  className="absolute top-4 right-6 opacity-25 group-hover:opacity-35 transition-opacity"
                  animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Gamepad2 size={32} className="text-brand-blue" />
                </motion.div>
                <motion.div
                  className="absolute bottom-6 right-12 opacity-25 group-hover:opacity-35 transition-opacity"
                  animate={{ y: [0, 6, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <Dice5 size={24} className="text-brand-blue" />
                </motion.div>
                
                <div className="relative z-10 flex items-start gap-4">
                  <MapPin size={24} className="text-brand-blue mt-0.5 drop-shadow-[0_0_8px_rgba(27,79,216,0.6)] group-hover:scale-110 transition-transform" />
                  <div className="flex-1">
                    <h4 className="font-display font-bold text-lg md:text-xl text-white tracking-tight mb-2">The Arena</h4>
                    <p className="text-zinc-300 font-display text-sm md:text-base leading-relaxed">
                      159 Rue Ibnou Faris, Casablanca 20330
                    </p>
                  </div>
                </div>
                {/* Gaming glow effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/10 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
              </div>

              {/* Opening Hours Card */}
              <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-brand-red/20 via-brand-red/10 to-zinc-900/50 border border-brand-red/30 p-5 md:p-6 shadow-[0_0_20px_rgba(255,87,87,0.2)] hover:shadow-[0_0_30px_rgba(255,87,87,0.4)] transition-all duration-300 hover:border-brand-red/50">
                {/* Floating gaming icons */}
                <motion.div
                  className="absolute top-6 right-8 opacity-25 group-hover:opacity-35 transition-opacity"
                  animate={{ y: [0, -6, 0], rotate: [0, -8, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Dice5 size={28} className="text-brand-red" />
                </motion.div>
                <motion.div
                  className="absolute bottom-4 right-4 opacity-25 group-hover:opacity-35 transition-opacity"
                  animate={{ y: [0, 8, 0], rotate: [0, 8, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                >
                  <Gamepad size={20} className="text-brand-red" />
                </motion.div>
                
                <div className="relative z-10 flex items-start gap-4">
                  <Icons.Clock size={24} className="text-brand-red mt-0.5 drop-shadow-[0_0_8px_rgba(255,87,87,0.6)] group-hover:scale-110 transition-transform" />
                  <div className="flex-1">
                    <h4 className="font-display font-bold text-lg md:text-xl text-white tracking-tight mb-2">Opening Hours</h4>
                    <p className="text-zinc-300 font-display text-sm md:text-base leading-relaxed">
                      Daily from <span className="text-white font-semibold">2:00 PM</span> to <span className="text-white font-semibold">12:00 AM</span>
                    </p>
                  </div>
                </div>
                {/* Gaming glow effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/10 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
              </div>

              {/* Phone Card */}
              <a
                href="tel:+212612919613"
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-brand-blue/20 via-brand-blue/10 to-zinc-900/50 border border-brand-blue/30 p-5 md:p-6 shadow-[0_0_20px_rgba(27,79,216,0.2)] hover:shadow-[0_0_30px_rgba(27,79,216,0.4)] transition-all duration-300 hover:border-brand-blue/50 hover:scale-[1.02] active:scale-[0.98]"
              >
                {/* Floating gaming icons */}
                <motion.div
                  className="absolute top-5 right-10 opacity-25 group-hover:opacity-35 transition-opacity"
                  animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Gamepad2 size={30} className="text-brand-blue" />
                </motion.div>
                <motion.div
                  className="absolute bottom-8 right-6 opacity-25 group-hover:opacity-35 transition-opacity"
                  animate={{ y: [0, 7, 0], rotate: [0, -7, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <Dice5 size={22} className="text-brand-blue" />
                </motion.div>
                
                <div className="relative z-10 flex items-start gap-4">
                  <Icons.Phone size={24} className="text-brand-blue mt-0.5 drop-shadow-[0_0_8px_rgba(27,79,216,0.6)] group-hover:scale-110 transition-transform" />
                  <div className="flex-1 flex items-center justify-between">
                    <div>
                      <h4 className="font-display font-bold text-lg md:text-xl text-white tracking-tight mb-2">Direct Line</h4>
                      <p className="text-zinc-300 font-display text-sm md:text-base tracking-wide">
                        +212 612-919613
                      </p>
                    </div>
                    <ArrowRight size={20} className="text-brand-blue opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
                {/* Gaming glow effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/10 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
              </a>

              {/* Email Card */}
              <a
                href="mailto:contact@pixelandplay.com"
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-brand-red/20 via-brand-red/10 to-zinc-900/50 border border-brand-red/30 p-5 md:p-6 shadow-[0_0_20px_rgba(255,87,87,0.2)] hover:shadow-[0_0_30px_rgba(255,87,87,0.4)] transition-all duration-300 hover:border-brand-red/50 hover:scale-[1.02] active:scale-[0.98]"
              >
                {/* Floating gaming icons */}
                <motion.div
                  className="absolute top-8 right-8 opacity-25 group-hover:opacity-35 transition-opacity"
                  animate={{ y: [0, -7, 0], rotate: [0, -10, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Gamepad size={26} className="text-brand-red" />
                </motion.div>
                <motion.div
                  className="absolute bottom-5 right-10 opacity-25 group-hover:opacity-35 transition-opacity"
                  animate={{ y: [0, 9, 0], rotate: [0, 12, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                >
                  <Dice5 size={24} className="text-brand-red" />
                </motion.div>
                
                <div className="relative z-10 flex items-start gap-4">
                  <Icons.Mail size={24} className="text-brand-red mt-0.5 drop-shadow-[0_0_8px_rgba(255,87,87,0.6)] group-hover:scale-110 transition-transform" />
                  <div className="flex-1 flex items-center justify-between">
                    <div>
                      <h4 className="font-display font-bold text-lg md:text-xl text-white tracking-tight mb-2">Drop A Message</h4>
                      <p className="text-zinc-300 font-display text-sm md:text-base">
                        contact@pixelandplay.com
                      </p>
                    </div>
                    <ArrowRight size={20} className="text-brand-red opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
                {/* Gaming glow effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/10 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
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

