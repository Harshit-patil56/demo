import React from "react"
import { cn } from "@/lib/utils"

export function Input({ 
  id, 
  type = "text", 
  placeholder = "",
  value,
  onChange,
  disabled,
  readOnly,
  step,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      readOnly={readOnly}
      step={step}
      className={cn(
        "h-9 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
}
