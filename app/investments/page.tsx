"use client"

import { useState } from "react"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
import { Badge } from "@/components/ui/badge"

type Investment = {
  id: string
  userId: string
  userName: string
  planId: string
  planName: string
  principalAmount: number
  interestRate: number
  interestType: "simple" | "compound"
  currentValue: number
  profit: number
  startDate: string
  maturityDate: string
  status: "active" | "matured" | "closed"
}

export default function InvestmentsPage() {
  const [investments, setInvestments] = useState<Investment[]>([
    {
      id: "1",
      userId: "1",
      userName: "Rajesh Kumar",
      planId: "1",
      planName: "Standard Plan",
      principalAmount: 50000,
      interestRate: 8.5,
      interestType: "simple",
      currentValue: 54250,
      profit: 4250,
      startDate: "2024-06-15",
      maturityDate: "2025-06-15",
      status: "active"
    },
    {
      id: "2",
      userId: "2",
      userName: "Priya Singh",
      planId: "2",
      planName: "Premium Plan",
      principalAmount: 200000,
      interestRate: 12,
      interestType: "compound",
      currentValue: 224000,
      profit: 24000,
      startDate: "2024-01-10",
      maturityDate: "2026-01-10",
      status: "active"
    }
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  
  const filteredInvestments = investments.filter(inv => {
    const matchesSearch = inv.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         inv.planName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         inv.id.includes(searchQuery)
    const matchesStatus = statusFilter === "all" || inv.status === statusFilter
    return matchesSearch && matchesStatus
  })
  
  const mockUsers = [
    { id: "1", name: "Rajesh Kumar" },
    { id: "2", name: "Priya Singh" },
    { id: "3", name: "Amit Patel" }
  ]

  const mockPlans = [
    { id: "1", name: "Standard Plan", rate: 8.5, type: "simple", duration: 12 },
    { id: "2", name: "Premium Plan", rate: 12, type: "compound", duration: 24 }
  ]

  const [formData, setFormData] = useState({
    userId: "",
    planId: "",
    principalAmount: "",
    startDate: ""
  })

  const handleAddInvestment = () => {
    const user = mockUsers.find(u => u.id === formData.userId)
    const plan = mockPlans.find(p => p.id === formData.planId)
    
    if (!user || !plan) return

    const startDate = new Date(formData.startDate)
    const maturityDate = new Date(startDate)
    maturityDate.setMonth(maturityDate.getMonth() + plan.duration)

    const newInvestment: Investment = {
      id: String(investments.length + 1),
      userId: formData.userId,
      userName: user.name,
      planId: formData.planId,
      planName: plan.name,
      principalAmount: Number(formData.principalAmount),
      interestRate: plan.rate,
      interestType: plan.type as "simple" | "compound",
      currentValue: Number(formData.principalAmount),
      profit: 0,
      startDate: formData.startDate,
      maturityDate: maturityDate.toISOString().split('T')[0],
      status: "active"
    }
    
    setInvestments([...investments, newInvestment])
    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleEditInvestment = () => {
    if (selectedInvestment) {
      const plan = mockPlans.find(p => p.id === formData.planId)
      if (!plan) return

      const startDate = new Date(formData.startDate)
      const maturityDate = new Date(startDate)
      maturityDate.setMonth(maturityDate.getMonth() + plan.duration)

      setInvestments(investments.map(inv => inv.id === selectedInvestment.id ? {
        ...inv,
        principalAmount: Number(formData.principalAmount),
        startDate: formData.startDate,
        maturityDate: maturityDate.toISOString().split('T')[0]
      } : inv))
      
      setIsEditDialogOpen(false)
      setSelectedInvestment(null)
      resetForm()
    }
  }

  const openEditDialog = (investment: Investment) => {
    setSelectedInvestment(investment)
    setFormData({
      userId: investment.userId,
      planId: investment.planId,
      principalAmount: String(investment.principalAmount),
      startDate: investment.startDate
    })
    setIsEditDialogOpen(true)
  }

  const closeInvestment = (investmentId: string) => {
    setInvestments(investments.map(inv => 
      inv.id === investmentId ? { ...inv, status: "closed" as const } : inv
    ))
  }

  const handleDeleteInvestment = (investmentId: string) => {
    setInvestments(investments.filter(inv => inv.id !== investmentId))
  }

  const resetForm = () => {
    setFormData({
      userId: "",
      planId: "",
      principalAmount: "",
      startDate: ""
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 z-50 w-full p-4 bg-white border-b border-[rgb(233,233,235)]">
        <div style={{maxWidth: '1400px', margin: '0 auto'}}>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-gray-900">Investments</h1>
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
                    <NavigationMenuLink href="/plans" className="px-4 py-2 relative text-[rgb(124,126,140)] hover:text-gray-900 transition-colors duration-200 text-lg">
                      Plans
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/investments" className="px-4 py-2 relative text-lg">
                      <span className="font-medium text-gray-900">Investments</span>
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

        <div className="flex items-center gap-4 mb-6">
          <Input
            placeholder="Search by user, plan, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[350px]"
          />
          <div className="flex gap-4 ml-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] cursor-pointer transition-colors duration-200">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="cursor-pointer">All Status</SelectItem>
              <SelectItem value="active" className="cursor-pointer">Active</SelectItem>
              <SelectItem value="matured" className="cursor-pointer">Matured</SelectItem>
              <SelectItem value="closed" className="cursor-pointer">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-black hover:bg-gray-800 text-white transition-colors duration-200 cursor-pointer">Add Investment</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Investment</DialogTitle>
                <DialogDescription>
                  Create a new investment record
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="userId">User</Label>
                  <Select
                    value={formData.userId}
                    onValueChange={(value) => setFormData({...formData, userId: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select user" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Rajesh Kumar</SelectItem>
                      <SelectItem value="2">Priya Singh</SelectItem>
                      <SelectItem value="3">Amit Patel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="planId">Plan</Label>
                  <Select
                    value={formData.planId}
                    onValueChange={(value) => setFormData({...formData, planId: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Standard Plan (8.5%)</SelectItem>
                      <SelectItem value="2">Premium Plan (12%)</SelectItem>
                      <SelectItem value="3">Gold Plan (15%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="principal">Principal Amount</Label>
                  <Input
                    id="principal"
                    type="number"
                    value={formData.principalAmount}
                    onChange={(e) => setFormData({...formData, principalAmount: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddInvestment}>Add Investment</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          </div>
        </div>

        <div className="border border-[rgb(233,233,235)] bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Principal</TableHead>
                <TableHead>Interest Rate</TableHead>
                <TableHead>Current Value</TableHead>
                <TableHead>Profit</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Maturity Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvestments.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell>{inv.id}</TableCell>
                  <TableCell>{inv.userName}</TableCell>
                  <TableCell>{inv.planName}</TableCell>
                  <TableCell>₹{inv.principalAmount.toLocaleString()}</TableCell>
                  <TableCell>{inv.interestRate}% ({inv.interestType})</TableCell>
                  <TableCell>₹{inv.currentValue.toLocaleString()}</TableCell>
                  <TableCell className="text-green-600">₹{inv.profit.toLocaleString()}</TableCell>
                  <TableCell>{inv.startDate}</TableCell>
                  <TableCell>{inv.maturityDate}</TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-md text-sm font-medium ${
                      inv.status === "active" ? "text-green-700" :
                      inv.status === "matured" ? "text-blue-700" :
                      "text-gray-600"
                    }`}>
                      {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedInvestment(inv)
                          setFormData({
                            userId: inv.userId,
                            planId: inv.planId,
                            principalAmount: inv.principalAmount.toString(),
                            startDate: inv.startDate
                          })
                          setIsEditDialogOpen(true)
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteInvestment(inv.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Investment</DialogTitle>
            <DialogDescription>
              Update investment details
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-userId">User</Label>
              <Select
                value={formData.userId}
                onValueChange={(value) => setFormData({...formData, userId: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Rajesh Kumar</SelectItem>
                  <SelectItem value="2">Priya Singh</SelectItem>
                  <SelectItem value="3">Amit Patel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-planId">Plan</Label>
              <Select
                value={formData.planId}
                onValueChange={(value) => setFormData({...formData, planId: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Standard Plan (8.5%)</SelectItem>
                  <SelectItem value="2">Premium Plan (12%)</SelectItem>
                  <SelectItem value="3">Gold Plan (15%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-principal">Principal Amount</Label>
              <Input
                id="edit-principal"
                type="number"
                value={formData.principalAmount}
                onChange={(e) => setFormData({...formData, principalAmount: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-startDate">Start Date</Label>
              <Input
                id="edit-startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleEditInvestment}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
