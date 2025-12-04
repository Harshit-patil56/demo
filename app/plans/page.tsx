"use client"

import { useState } from "react"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

type Plan = {
  id: string
  name: string
  interestRate: number
  interestType: "simple" | "compound"
  duration: number
  minAmount: number
  maxAmount: number
  description: string
  status: "active" | "inactive"
  createdAt: string
}

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>([
    {
      id: "1",
      name: "Standard Plan",
      interestRate: 8.5,
      interestType: "simple",
      duration: 12,
      minAmount: 10000,
      maxAmount: 100000,
      description: "Basic investment plan with steady returns",
      status: "active",
      createdAt: "2024-11-01"
    },
    {
      id: "2",
      name: "Premium Plan",
      interestRate: 12,
      interestType: "compound",
      duration: 24,
      minAmount: 100000,
      maxAmount: 1000000,
      description: "High return plan for large investments",
      status: "active",
      createdAt: "2024-11-01"
    }
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  
  const [formData, setFormData] = useState({
    name: "",
    interestRate: "",
    interestType: "simple" as "simple" | "compound",
    duration: "",
    minAmount: "",
    maxAmount: "",
    description: "",
    status: "active" as "active" | "inactive"
  })

  const handleAddPlan = () => {
    const newPlan: Plan = {
      id: String(plans.length + 1),
      name: formData.name,
      interestRate: Number(formData.interestRate),
      interestType: formData.interestType,
      duration: Number(formData.duration),
      minAmount: Number(formData.minAmount),
      maxAmount: Number(formData.maxAmount),
      description: formData.description,
      status: formData.status,
      createdAt: new Date().toISOString().split('T')[0]
    }
    setPlans([...plans, newPlan])
    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleEditPlan = () => {
    if (selectedPlan) {
      setPlans(plans.map(p => p.id === selectedPlan.id ? {
        ...selectedPlan,
        name: formData.name,
        interestRate: Number(formData.interestRate),
        interestType: formData.interestType,
        duration: Number(formData.duration),
        minAmount: Number(formData.minAmount),
        maxAmount: Number(formData.maxAmount),
        description: formData.description,
        status: formData.status
      } : p))
      setIsEditDialogOpen(false)
      setSelectedPlan(null)
      resetForm()
    }
  }

  const openEditDialog = (plan: Plan) => {
    setSelectedPlan(plan)
    setFormData({
      name: plan.name,
      interestRate: String(plan.interestRate),
      interestType: plan.interestType,
      duration: String(plan.duration),
      minAmount: String(plan.minAmount),
      maxAmount: String(plan.maxAmount),
      description: plan.description,
      status: plan.status
    })
    setIsEditDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      interestRate: "",
      interestType: "simple",
      duration: "",
      minAmount: "",
      maxAmount: "",
      description: "",
      status: "active"
    })
  }

  const togglePlanStatus = (planId: string) => {
    setPlans(plans.map(p => 
      p.id === planId ? { ...p, status: p.status === "active" ? "inactive" : "active" } : p
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 z-50 w-full p-4 bg-white border-b border-[rgb(233,233,235)]">
        <div style={{maxWidth: '1600px', margin: '0 auto'}}>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-gray-900">Plans</h1>
            <div className="flex-1 flex justify-center">
              <NavigationMenu className="max-w-full">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/dashboard" className="px-4 py-2 relative text-[rgb(124,126,140)] hover:text-gray-900 transition-colors text-lg">
                      Dashboard
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/users" className="px-4 py-2 relative text-[rgb(124,126,140)] hover:text-gray-900 transition-colors text-lg">
                      Users
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/plans" className="px-4 py-2 relative text-lg">
                      <span className="font-medium text-gray-900">Plans</span>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/investments" className="px-4 py-2 relative text-[rgb(124,126,140)] hover:text-gray-900 transition-colors text-lg">
                      Investments
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/requests" className="px-4 py-2 relative text-[rgb(124,126,140)] hover:text-gray-900 transition-colors text-lg">
                      Requests
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/maturities" className="px-4 py-2 relative text-[rgb(124,126,140)] hover:text-gray-900 transition-colors text-lg">
                      Maturities
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/reports" className="px-4 py-2 relative text-[rgb(124,126,140)] hover:text-gray-900 transition-colors text-lg">
                      Reports
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <Badge className="px-4 py-2 text-base bg-gray-900 text-white hover:bg-gray-800 font-medium">Admin</Badge>
          </div>
        </div>
      </nav>

      <div className="p-2 md:p-4" style={{maxWidth: '1600px', margin: '0 auto'}}>
        <div className="mb-6" style={{height: '40px'}}></div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.id} className="border border-[rgb(233,233,235)] bg-white p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-base text-gray-600 mb-4">{plan.description}</p>
              <div className="space-y-2 text-base">
                <div className="flex justify-between">
                  <span className="text-gray-600">Interest Rate:</span>
                  <span className="font-semibold">{plan.interestRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-semibold">{plan.interestType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-semibold">{plan.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Min Amount:</span>
                  <span className="font-semibold">₹{plan.minAmount.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
                <Button variant="destructive" size="sm" className="flex-1">
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
