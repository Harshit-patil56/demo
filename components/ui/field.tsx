import React from "react"

export function FieldSet({ children }: { children: React.ReactNode }) {
  return <fieldset className="space-y-6">{children}</fieldset>
}

export function FieldGroup({ children }: { children: React.ReactNode }) {
  return <div className="space-y-4">{children}</div>
}

export function Field({ children }: { children: React.ReactNode }) {
  return <div className="space-y-2">{children}</div>
}

export function FieldLabel({ 
  htmlFor, 
  children 
}: { 
  htmlFor: string
  children: React.ReactNode 
}) {
  return (
    <label 
      htmlFor={htmlFor} 
      className="block text-sm font-medium text-gray-700"
    >
      {children}
    </label>
  )
}

export function FieldDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-gray-500">{children}</p>
}
