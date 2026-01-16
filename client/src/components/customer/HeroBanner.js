import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const banners = [
  {
    id: 1,
    title: "Big Electronics Sale",
    subtitle: "Up to 40% off",
    bg: "bg-yellow-200",
  },
  {
    id: 2,
    title: "Fashion Week Deals",
    subtitle: "Trending styles under ₹999",
    bg: "bg-pink-200",
  },
  {
    id: 3,
    title: "Home Essentials",
    subtitle: "Smart living starts here",
    bg: "bg-blue-200",
  },
];

export default function HeroBanner() {
  const [index, setIndex] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative mx-6 h-56 md:h-72 overflow-hidden rounded-xl">
      <AnimatePresence>
        <motion.div
          key={banners[index].id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6 }}
          className={`absolute inset-0 flex flex-col items-center justify-center ${banners[index].bg}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            {banners[index].title}
          </h2>
          <p className="mt-2 text-lg text-gray-700">
            {banners[index].subtitle}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full ${
              index === i ? "bg-black" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
