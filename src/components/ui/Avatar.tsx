import type React from "react"

interface AvatarProps {
  className?: string
  children: React.ReactNode
}

interface AvatarImageProps {
  src: string
  alt?: string
}

interface AvatarFallbackProps {
  children: React.ReactNode
  className?: string
}

export const Avatar: React.FC<AvatarProps> = ({ className = "", children }) => {
  return (
    <div className={`relative inline-flex items-center justify-center overflow-hidden rounded-full ${className}`}>
      {children}
    </div>
  )
}

export const AvatarImage: React.FC<AvatarImageProps> = ({ src, alt = "" }) => {
  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      className="w-full h-full object-cover"
      onError={(e) => {
        e.currentTarget.style.display = "none"
      }}
    />
  )
}

export const AvatarFallback: React.FC<AvatarFallbackProps> = ({ children, className = "" }) => {
  return (
    <div className={`flex items-center justify-center w-full h-full text-sm font-medium ${className}`}>{children}</div>
  )
}
