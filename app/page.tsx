"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { SpinnerCustom } from "@/components/ui/spinner"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (username === "admin" && password === "admin123") {
      setLoading(true)
      setTimeout(() => {
        router.push("/dashboard")
      }, 1000)
    } else {
      setError("Invalid username or password")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <SpinnerCustom />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg border border-[rgb(233,233,235)] w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Login</h1>
        
        <form onSubmit={handleSubmit}>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input 
                  id="username" 
                  type="text" 
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>
            </FieldGroup>
          </FieldSet>

          {error && (
            <p className="text-[rgb(237,85,51)] text-sm mt-4">{error}</p>
          )}

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors mt-6"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}


