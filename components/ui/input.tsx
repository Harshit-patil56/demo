import React from "react"

export function Input({ 
  id, 
  type = "text", 
  placeholder = "",
  value,
  onChange,
  disabled,
  readOnly,
  step,
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
      {...props}
      className="h-9 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
    />
  )
}
