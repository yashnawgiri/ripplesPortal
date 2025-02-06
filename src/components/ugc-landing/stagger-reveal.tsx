import { useEffect, useRef } from "react"
import { cn } from "@/utils/utils"

interface StaggerRevealProps {
  children: React.ReactNode
  className?: string
  baseDelay?: number
  stagger?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right"
}

export function StaggerReveal({
  children,
  className,
  baseDelay = 0,
  stagger = 100,
  duration = 500,
  direction = "up",
}: StaggerRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const childElements = container?.children ? Array.from(container.children) : []

    // Set initial styles
    childElements.forEach((child, i) => {
      const element = child as HTMLElement
      element.style.opacity = "0"
      element.style.transform = {
        up: "translateY(20px)",
        down: "translateY(-20px)",
        left: "translateX(20px)",
        right: "translateX(-20px)",
      }[direction] || "translateY(0)"
      element.style.transition = `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${baseDelay + i * stagger}ms`
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            childElements.forEach((child) => {
              const element = child as HTMLElement
              element.style.opacity = "1"
              element.style.transform = "translate(0, 0)"
            })
            observer.unobserve(container)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    )

    observer.observe(container)

    return () => observer.disconnect()
  }, [baseDelay, stagger, duration, direction])

  return (
    <div ref={containerRef} className={cn("will-change-transform", className)}>
      {children}
    </div>
  )
}

