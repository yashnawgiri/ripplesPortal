import {
  useEffect,
  useState,
  useCallback,
  useRef,
  lazy,
  Suspense,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PhoneContent } from "./types";
import { PHONE_CONTENT } from "./data";

// Lazy load FloatingPhone component
const FloatingPhone = lazy(
  () => import("@/components/influencerMarketplace/ui/FloatingPhone")
);

// Loading component for Suspense
const PhoneLoading = () => (
  <div className="w-32 h-64 bg-gray-800 rounded-[1.75rem] animate-pulse" />
);

interface PhoneInstance {
  id: string;
  content: PhoneContent;
  size: "small" | "medium" | "large";
  position: {
    x: number;
    y: number;
  };
  animationDuration: number;
  delay: number;
  createdAt: number;
}

interface ContinuousPhoneStreamProps {
  isActive: boolean;
  maxPhones?: number;
  positionRanges?: {
    x: { min: number; max: number };
    y: { min: number; max: number };
  };
  animationDurations?: number[];
  spawnInterval?: { min: number; max: number };
}

const SIZES: ("small" | "medium" | "large")[] = ["small", "medium", "large"];

export default function ContinuousPhoneStream({
  isActive,
  maxPhones = 8,
  positionRanges = {
    x: { min: 10, max: 90 },
    y: { min: 20, max: 80 },
  },
  animationDurations = [8, 10, 12, 14],
  spawnInterval = { min: 1000, max: 3000 },
}: ContinuousPhoneStreamProps) {
  const [phones, setPhones] = useState<PhoneInstance[]>([]);
  const spawnTimer = useRef<number | null>(null);

  // Generate random phone instance
  const generateRandomPhone = useCallback((): PhoneInstance => {
    const randomContent =
      PHONE_CONTENT[Math.floor(Math.random() * PHONE_CONTENT.length)];
    const randomSize = SIZES[Math.floor(Math.random() * SIZES.length)];
    const randomDuration =
      animationDurations[Math.floor(Math.random() * animationDurations.length)];

    return {
      id: `phone-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      content: randomContent,
      size: randomSize,
      position: {
        x:
          Math.random() * (positionRanges.x.max - positionRanges.x.min) +
          positionRanges.x.min,
        y:
          Math.random() * (positionRanges.y.max - positionRanges.y.min) +
          positionRanges.y.min,
      },
      animationDuration: randomDuration,
      delay: Math.random() * 1.5,
      createdAt: Date.now(),
    };
  }, [animationDurations, positionRanges]);

  const addPhone = useCallback(() => {
    if (!isActive) return;

    setPhones((prevPhones) => {
      const now = Date.now();
      const filtered = prevPhones.filter(
        (phone) => now - phone.createdAt < phone.animationDuration * 1000 + 3000
      );

      if (filtered.length < maxPhones) {
        return [...filtered, generateRandomPhone()];
      }

      return filtered;
    });
  }, [isActive, maxPhones, generateRandomPhone]);

  const removePhone = useCallback((id: string) => {
    setPhones((prev) => prev.filter((phone) => phone.id !== id));
  }, []);

  const scheduleNextSpawn = useCallback(() => {
    if (!isActive) return;

    const interval =
      Math.random() * (spawnInterval.max - spawnInterval.min) +
      spawnInterval.min;

    spawnTimer.current = window.setTimeout(() => {
      addPhone();
      scheduleNextSpawn();
    }, interval);
  }, [isActive, addPhone, spawnInterval]);

  // Start continuous phone generation
  useEffect(() => {
    if (!isActive) return;

    const initial = Array.from({ length: Math.min(3, maxPhones) }, () =>
      generateRandomPhone()
    );
    setPhones(initial);
    scheduleNextSpawn();

    return () => {
      if (spawnTimer.current) clearTimeout(spawnTimer.current);
    };
  }, [isActive, generateRandomPhone, maxPhones, scheduleNextSpawn]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (spawnTimer.current) clearTimeout(spawnTimer.current);
    };
  }, []);

  // Periodically remove stale phones
  useEffect(() => {
    if (!isActive) return;

    const cleanup = setInterval(() => {
      const now = Date.now();
      setPhones((prev) =>
        prev.filter(
          (phone) =>
            now - phone.createdAt < phone.animationDuration * 1000 + 3000
        )
      );
    }, 3000);

    return () => clearInterval(cleanup);
  }, [isActive]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Removed grey/dark background */}
      {/* Optional: subtle background effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(80,0,120,0.15) 0%, transparent 70%)",
        }}
      />
      <AnimatePresence>
        {phones.map((phone) => (
          <motion.div
            key={phone.id}
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            transition={{
              duration: 0.8,
              delay: phone.delay,
              ease: "easeOut",
            }}
            onAnimationComplete={() => {
              setTimeout(() => {
                removePhone(phone.id);
              }, phone.animationDuration * 1000);
            }}
            className="absolute"
            style={{
              left: `${phone.position.x}%`,
              top: `${phone.position.y}%`,
              transform: "translate(-50%, -50%)",
              zIndex: Math.floor(phone.position.y),
            }}
          >
            <motion.div
              animate={{ y: [0, -2000] }}
              transition={{
                duration: phone.animationDuration,
                repeat: 0,
                ease: "linear",
                delay: phone.delay + 0.8,
              }}
            >
              <Suspense fallback={<PhoneLoading />}>
                <FloatingPhone
                  delay={0}
                  content={phone.content}
                  size={phone.size}
                  animationDuration={phone.animationDuration}
                  useCSSAnimation={false}
                  disableEntranceAnimation={true}
                />
              </Suspense>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
