import * as React from "react"

export type ToastProps = {
  id: string
  title?: string
  description?: string
  type?: "success" | "error" | "info" | "warning"
  duration?: number
  onClose?: () => void
}

const Toast: React.FC<ToastProps> = ({
  title,
  description,
  type = "info",
  onClose,
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-500 text-green-800"
      case "error":
        return "bg-red-50 border-red-500 text-red-800"
      case "warning":
        return "bg-yellow-50 border-yellow-500 text-yellow-800"
      default:
        return "bg-blue-50 border-blue-500 text-blue-800"
    }
  }

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 min-w-[300px] max-w-md rounded-lg border p-4 shadow-lg ${getTypeStyles()}`}
      role="alert"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {title && (
            <h3 className="mb-1 text-sm font-semibold">{title}</h3>
          )}
          {description && (
            <p className="text-sm opacity-90">{description}</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="ml-4 inline-flex h-5 w-5 items-center justify-center rounded-full hover:bg-black/10"
          aria-label="Close"
        >
          <span className="text-lg">&times;</span>
        </button>
      </div>
    </div>
  )
}

export default Toast
