import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";

export default function CursorSpotlight() {
  const [variant, setVariant] = useState<"default" | "heading" | "interactive" | "image" | "text" | "large" | "medium">("default");
  const [isVisible, setIsVisible] = useState(false);
  

  // Motion values track the system mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Apply spring physics for elegant fluid motion (premium Apple-like lag)
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable custom cursor on touch devices for accessibility/UX
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    // Set initially visible after mount on desktop
    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      let target = e.target as HTMLElement | null;
      let newVariant: typeof variant = "default";
      let interactiveTarget: HTMLElement | null = null;

      // DOM Traversal to determine interaction state
      while (target && target !== document.body && target !== document.documentElement) {
        // 1. Explicit data-cursor overrides
        const customCursor = target.getAttribute('data-cursor');
        if (customCursor === 'large' || customCursor === 'medium') {
          newVariant = customCursor as any;
          break;
        }

        const tag = target.tagName?.toLowerCase();
        
        if (tag === 'button' || tag === 'a' || target.getAttribute('role') === 'button') {
          newVariant = "interactive";
          interactiveTarget = target;
          
          // Check if magnetic pull should be disabled for this element
          if (target.getAttribute('data-no-magnetic') === 'true') {
            interactiveTarget = null; // Still show interactive variant, but don't pull
          }
          break;
        }
        
        if (/^h[1-6]$/.test(tag)) {
          newVariant = "heading";
          break;
        }

        if (tag === 'img' || target.classList.contains('card')) {
          newVariant = "image";
          break;
        }

        if (tag === 'p' || tag === 'span' || tag === 'li') {
          newVariant = "text";
        }
        
        target = target.parentElement;
      }
      
      setVariant(newVariant);

      // Update cursor coordinates
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  const variants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      mixBlendMode: "difference" as const,
      filter: "blur(1px)",
    },
    heading: {
      width: 80,
      height: 80,
      backgroundColor: "rgba(255, 255, 255, 1)",
      mixBlendMode: "difference" as const,
      filter: "blur(4px)",
    },
    interactive: {
      width: 60,
      height: 60,
      backgroundColor: "rgba(255, 255, 255, 1)", // Solid inversion ring
      mixBlendMode: "difference" as const,
      filter: "blur(2px)",
    },
    image: {
      width: 120,
      height: 120,
      backgroundColor: "rgba(255, 255, 255, 0.15)", // Soft non-difference mode
      mixBlendMode: "normal" as const,
      filter: "blur(14px)",
    },
    text: {
      width: 50,
      height: 50,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      mixBlendMode: "difference" as const,
      filter: "blur(2px)",
    },
    large: {
      width: 380,
      height: 380,
      backgroundColor: "rgba(255, 255, 255, 1)",
      mixBlendMode: "difference" as const,
      filter: "blur(8px)",
    },
    medium: {
      width: 100,
      height: 100,
      backgroundColor: "rgba(255, 255, 255, 1)",
      mixBlendMode: "difference" as const,
      filter: "blur(4px)",
    }
  };

  return (
    <>
      <svg className="hidden">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch"/>
          <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.15 0" />
        </filter>
      </svg>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 rounded-full z-[9999] overflow-hidden"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={variants}
        animate={variant}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div 
           className="w-full h-full rounded-full absolute inset-0 bg-white"
           style={{ 
              opacity: variant === "image" ? 0.15 : 1,
              background: `radial-gradient(circle at 50% 50%, ${variant === 'large' || variant === 'medium' ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,1)'} 0%, rgba(255,255,255,0) 80%)`,
           }} 
        />
        <div 
           className="w-full h-full rounded-full absolute inset-0 opacity-[0.03] mix-blend-overlay"
           style={{ 
              filter: "url(#noiseFilter)"
           }} 
        />
      </motion.div>
    </>
  );
}
