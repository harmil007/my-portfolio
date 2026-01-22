import { motion } from "framer-motion";

export function InteractiveCube() {
  return (
    <div className="relative size-[162px] m-auto [perspective:900px]">
      <motion.div
        className="absolute inset-0 [transform-style:preserve-3d]"
        animate={{ rotateX: 360, rotateY: 360 }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "linear",
        }}
      >
        {/* React */}
        <Face className="translate-z-[81px] bg-cyan-400/80 shadow-cyan-400/40">
          React
        </Face>

        {/* Next.js */}
        <Face className="-translate-z-[81px] rotate-y-180 bg-neutral-900 text-white shadow-neutral-900/40">
          Next.js
        </Face>

        {/* JavaScript */}
        <Face className="translate-x-[81px] rotate-y-90 bg-yellow-400/90 text-black shadow-yellow-400/40">
          JS
        </Face>

        {/* TypeScript */}
        <Face className="-translate-x-[81px] -rotate-y-90 bg-blue-500/80 shadow-blue-500/40">
          TS
        </Face>

        {/* UI / CSS */}
        <Face className="-translate-y-[81px] rotate-x-90 bg-gradient-to-r from-purple-500 to-indigo-500 shadow-purple-500/40">
          UI
        </Face>

        {/* Redux */}
        <Face className="translate-y-[81px] -rotate-x-90 bg-purple-600/80 shadow-purple-600/40">
          Redux
        </Face>
      </motion.div>
    </div>
  );
}

/* Reusable Face Component */
function Face({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <div
      className={`
        absolute inset-0 flex items-center justify-center
        text-xl font-semibold text-shadow-sm
        ${className}
      `}
    >
      {children}
    </div>
  );
}
