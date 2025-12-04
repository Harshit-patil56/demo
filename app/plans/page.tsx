"use client"

import { useState } from "react"
import { Check, Trash2 } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Plan = {
  id: string
  name: string
  interestRate: number
  interestType: "simple" | "compound"
  duration: number
  minAmount: number
  maxAmount: number
  features: string[]
  status: "active" | "inactive"
}

export default function PlansPage() {
  const [isAnnually, setIsAnnually] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [plans, setPlans] = useState<Plan[]>([
    {
      id: "1",
      name: "Standard Plan",
      interestRate: 8.5,
      interestType: "simple",
      duration: 12,
      minAmount: 10000,
      maxAmount: 100000,
      features: [
        "Simple interest calculation",
        "12 months duration",
        "₹10,000 - ₹1,00,000 range",
        "Regular monthly payouts"
      ],
      status: "active"
    },
    {
      id: "2",
      name: "Premium Plan",
      interestRate: 12,
      interestType: "compound",
      duration: 24,
      minAmount: 100000,
      maxAmount: 1000000,
      features: [
        "Compound interest calculation",
        "24 months duration",
        "₹1,00,000 - ₹10,00,000 range",
        "Higher returns on maturity"
      ],
      status: "active"
    },
    {
      id: "3",
      name: "Elite Plan",
      interestRate: 15,
      interestType: "compound",
      duration: 36,
      minAmount: 500000,
      maxAmount: 5000000,
      features: [
        "Compound interest calculation",
        "36 months duration",
        "₹5,00,000 - ₹50,00,000 range",
        "Premium support & benefits"
      ],
      status: "active"
    }
  ])

  const [formData, setFormData] = useState({
    name: "",
    interestRate: "",
    interestType: "simple" as "simple" | "compound",
    duration: "",
    minAmount: "",
    maxAmount: "",
    features: "",
    status: "active" as "active" | "inactive"
  })

  const handleAddPlan = () => {
    const newPlan: Plan = {
      id: (plans.length + 1).toString(),
      name: formData.name,
      interestRate: parseFloat(formData.interestRate),
      interestType: formData.interestType,
      duration: parseInt(formData.duration),
      minAmount: parseInt(formData.minAmount),
      maxAmount: parseInt(formData.maxAmount),
      features: formData.features.split('\n').filter(f => f.trim()),
      status: formData.status
    }
    setPlans([...plans, newPlan])
    setIsAddDialogOpen(false)
    setFormData({
      name: "",
      interestRate: "",
      interestType: "simple",
      duration: "",
      minAmount: "",
      maxAmount: "",
      features: "",
      status: "active"
    })
  }

  const handleEditPlan = (plan: Plan) => {
    setSelectedPlan(plan)
    setFormData({
      name: plan.name,
      interestRate: plan.interestRate.toString(),
      interestType: plan.interestType,
      duration: plan.duration.toString(),
      minAmount: plan.minAmount.toString(),
      maxAmount: plan.maxAmount.toString(),
      features: plan.features.join('\n'),
      status: plan.status
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdatePlan = () => {
    if (!selectedPlan) return
    const updatedPlans = plans.map(p => 
      p.id === selectedPlan.id 
        ? {
            ...p,
            name: formData.name,
            interestRate: parseFloat(formData.interestRate),
            interestType: formData.interestType,
            duration: parseInt(formData.duration),
            minAmount: parseInt(formData.minAmount),
            maxAmount: parseInt(formData.maxAmount),
            features: formData.features.split('\n').filter(f => f.trim()),
            status: formData.status
          }
        : p
    )
    setPlans(updatedPlans)
    setIsEditDialogOpen(false)
    setSelectedPlan(null)
    setFormData({
      name: "",
      interestRate: "",
      interestType: "simple",
      duration: "",
      minAmount: "",
      maxAmount: "",
      features: "",
      status: "active"
    })
  }

  const handleDeletePlan = (plan: Plan) => {
    setSelectedPlan(plan)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (!selectedPlan) return
    setPlans(plans.filter(p => p.id !== selectedPlan.id))
    setIsDeleteDialogOpen(false)
    setSelectedPlan(null)
  }

  const calculateReturns = (plan: Plan) => {
    const amount = plan.minAmount
    if (plan.interestType === "simple") {
      const monthlyReturn = (amount * plan.interestRate * (isAnnually ? plan.duration : 1)) / (100 * 12)
      return Math.round(monthlyReturn)
    } else {
      const months = isAnnually ? plan.duration : 1
      const compoundReturn = amount * Math.pow(1 + plan.interestRate / 1200, months) - amount
      return Math.round(compoundReturn)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 z-50 w-full p-4 bg-white border-b border-[rgb(233,233,235)]">
        <div style={{maxWidth: '1400px', margin: '0 auto'}}>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-gray-900">Plans</h1>
            <div className="flex-1 flex justify-center">
              <NavigationMenu className="max-w-full">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/dashboard" className="px-4 py-2 relative text-[rgb(124,126,140)] hover:text-gray-900 transition-colors duration-200 text-lg">
                      Dashboard
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/users" className="px-4 py-2 relative text-[rgb(124,126,140)] hover:text-gray-900 transition-colors duration-200 text-lg">
                      Users
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/plans" className="px-4 py-2 relative text-lg">
                      <span className="font-medium text-gray-900">Plans</span>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/investments" className="px-4 py-2 relative text-[rgb(124,126,140)] hover:text-gray-900 transition-colors duration-200 text-lg">
                      Investments
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/requests" className="px-4 py-2 relative text-[rgb(124,126,140)] hover:text-gray-900 transition-colors duration-200 text-lg">
                      Requests
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/maturities" className="px-4 py-2 relative text-[rgb(124,126,140)] hover:text-gray-900 transition-colors duration-200 text-lg">
                      Maturities
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/reports" className="px-4 py-2 relative text-[rgb(124,126,140)] hover:text-gray-900 transition-colors duration-200 text-lg">
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

      <div className="p-2 md:p-4" style={{maxWidth: '1400px', margin: '0 auto'}}>
        <div className="mb-6" style={{height: '40px'}}></div>

        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          <div className="flex flex-col justify-between gap-10 md:flex-row">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Investment Plans</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 flex h-11 w-fit shrink-0 items-center rounded-md p-1 text-lg">
                <RadioGroup
                  defaultValue="monthly"
                  className="h-full grid-cols-2"
                  onValueChange={(value) => {
                    setIsAnnually(value === "annually")
                  }}
                >
                  <div className='has-[button[data-state="checked"]]:bg-white h-full rounded-md transition-all'>
                    <RadioGroupItem
                      value="monthly"
                      id="monthly"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="monthly"
                      className="text-gray-600 peer-data-[state=checked]:text-gray-900 flex h-full cursor-pointer items-center justify-center px-7 font-semibold transition-colors duration-200"
                    >
                      Monthly
                    </Label>
                  </div>
                  <div className='has-[button[data-state="checked"]]:bg-white h-full rounded-md transition-all'>
                    <RadioGroupItem
                      value="annually"
                      id="annually"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="annually"
                      className="text-gray-600 peer-data-[state=checked]:text-gray-900 flex h-full cursor-pointer items-center justify-center gap-1 px-7 font-semibold transition-colors duration-200"
                    >
                      Yearly
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-black hover:bg-gray-800 text-white transition-colors duration-200 cursor-pointer">
                    Add New Plan
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Plan</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Plan Name</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="transition-colors duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Interest Rate (%)</label>
                      <Input
                        type="number"
                        value={formData.interestRate}
                        onChange={(e) => setFormData({...formData, interestRate: e.target.value})}
                        className="transition-colors duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Interest Type</label>
                      <Select
                        value={formData.interestType}
                        onValueChange={(value: "simple" | "compound") => setFormData({...formData, interestType: value})}
                      >
                        <SelectTrigger className="cursor-pointer transition-colors duration-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="simple" className="cursor-pointer">Simple</SelectItem>
                          <SelectItem value="compound" className="cursor-pointer">Compound</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Duration (months)</label>
                      <Input
                        type="number"
                        value={formData.duration}
                        onChange={(e) => setFormData({...formData, duration: e.target.value})}
                        className="transition-colors duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Min Amount</label>
                      <Input
                        type="number"
                        value={formData.minAmount}
                        onChange={(e) => setFormData({...formData, minAmount: e.target.value})}
                        className="transition-colors duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Max Amount</label>
                      <Input
                        type="number"
                        value={formData.maxAmount}
                        onChange={(e) => setFormData({...formData, maxAmount: e.target.value})}
                        className="transition-colors duration-200"
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <label className="text-sm font-medium">Features (one per line)</label>
                      <textarea
                        value={formData.features}
                        onChange={(e) => setFormData({...formData, features: e.target.value})}
                        className="w-full min-h-[100px] px-3 py-2 border border-gray-200 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Status</label>
                      <Select
                        value={formData.status}
                        onValueChange={(value: "active" | "inactive") => setFormData({...formData, status: value})}
                      >
                        <SelectTrigger className="cursor-pointer transition-colors duration-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active" className="cursor-pointer">Active</SelectItem>
                          <SelectItem value="inactive" className="cursor-pointer">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={handleAddPlan}
                      className="bg-black hover:bg-gray-800 text-white transition-colors duration-200 cursor-pointer"
                    >
                      Add Plan
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          {/* Edit Plan Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Edit Plan</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Plan Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="transition-colors duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Interest Rate (%)</label>
                  <Input
                    type="number"
                    value={formData.interestRate}
                    onChange={(e) => setFormData({...formData, interestRate: e.target.value})}
                    className="transition-colors duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Interest Type</label>
                  <Select
                    value={formData.interestType}
                    onValueChange={(value: "simple" | "compound") => setFormData({...formData, interestType: value})}
                  >
                    <SelectTrigger className="cursor-pointer transition-colors duration-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="simple" className="cursor-pointer">Simple</SelectItem>
                      <SelectItem value="compound" className="cursor-pointer">Compound</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration (months)</label>
                  <Input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    className="transition-colors duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Min Amount</label>
                  <Input
                    type="number"
                    value={formData.minAmount}
                    onChange={(e) => setFormData({...formData, minAmount: e.target.value})}
                    className="transition-colors duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Amount</label>
                  <Input
                    type="number"
                    value={formData.maxAmount}
                    onChange={(e) => setFormData({...formData, maxAmount: e.target.value})}
                    className="transition-colors duration-200"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-medium">Features (one per line)</label>
                  <textarea
                    value={formData.features}
                    onChange={(e) => setFormData({...formData, features: e.target.value})}
                    className="w-full min-h-[100px] px-3 py-2 border border-gray-200 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: "active" | "inactive") => setFormData({...formData, status: value})}
                  >
                    <SelectTrigger className="cursor-pointer transition-colors duration-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active" className="cursor-pointer">Active</SelectItem>
                      <SelectItem value="inactive" className="cursor-pointer">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleUpdatePlan}
                  className="bg-black hover:bg-gray-800 text-white transition-colors duration-200 cursor-pointer"
                >
                  Update Plan
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Delete Plan</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete {selectedPlan?.name}? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteDialogOpen(false)}
                  className="transition-colors duration-200 cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmDelete}
                  className="bg-red-600 hover:bg-red-700 text-white transition-colors duration-200 cursor-pointer"
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <div className="flex w-full flex-col items-stretch gap-6 md:flex-row">
            {plans.filter(p => p.status === "active").map((plan, index) => (
              <div
                key={plan.id}
                className={`flex w-full flex-col rounded-lg border border-gray-200 bg-white p-6 text-left ${
                  index === 1 ? "shadow-lg" : ""
                }`}
              >
                <div className="mb-8 flex items-center justify-between">
                  <Badge className="block w-fit uppercase bg-gray-900 text-white hover:bg-gray-800">
                    {plan.name}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                    onClick={() => handleDeletePlan(plan)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.interestRate}%
                  </span>
                  <span className="text-gray-600 ml-2">interest</span>
                </div>
                <p className="text-gray-600 mb-1">
                  {plan.duration} months duration
                </p>
                <p className="text-gray-600 mb-1">
                  ₹{calculateReturns(plan).toLocaleString('en-IN')} estimated returns
                </p>
                <p className="text-sm text-gray-500">
                  {isAnnually ? "Per full term" : "Per month"}
                </p>
                <Separator className="my-6" />
                <div className="flex h-full flex-col justify-between gap-20">
                  <ul className="text-gray-600 space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-2"
                      >
                        <Check className="size-4 text-green-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    onClick={() => handleEditPlan(plan)}
                    className="w-full bg-black hover:bg-gray-800 text-white transition-colors duration-200 cursor-pointer"
                  >
                    Edit Plan
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
