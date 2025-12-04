"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AdminNavbar } from "@/components/admin-navbar"
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

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
    { id: "1", userId: "1", userName: "Rajesh Kumar", planId: "1", planName: "Standard Plan", principalAmount: 50000, interestRate: 8.5, interestType: "simple", currentValue: 54250, profit: 4250, startDate: "2024-06-15", maturityDate: "2025-06-15", status: "active" },
    { id: "2", userId: "2", userName: "Priya Singh", planId: "2", planName: "Premium Plan", principalAmount: 200000, interestRate: 12, interestType: "compound", currentValue: 224000, profit: 24000, startDate: "2024-01-10", maturityDate: "2026-01-10", status: "active" },
    { id: "3", userId: "3", userName: "Amit Patel", planId: "1", planName: "Standard Plan", principalAmount: 75000, interestRate: 8.5, interestType: "simple", currentValue: 81375, profit: 6375, startDate: "2024-05-20", maturityDate: "2025-05-20", status: "active" },
    { id: "4", userId: "4", userName: "Sneha Sharma", planId: "2", planName: "Premium Plan", principalAmount: 150000, interestRate: 12, interestType: "compound", currentValue: 168000, profit: 18000, startDate: "2024-03-15", maturityDate: "2026-03-15", status: "active" },
    { id: "5", userId: "5", userName: "Vikram Reddy", planId: "1", planName: "Standard Plan", principalAmount: 100000, interestRate: 8.5, interestType: "simple", currentValue: 108500, profit: 8500, startDate: "2024-02-10", maturityDate: "2025-02-10", status: "active" },
    { id: "6", userId: "6", userName: "Anita Desai", planId: "2", planName: "Premium Plan", principalAmount: 250000, interestRate: 12, interestType: "compound", currentValue: 280000, profit: 30000, startDate: "2024-04-05", maturityDate: "2026-04-05", status: "active" },
    { id: "7", userId: "7", userName: "Rahul Verma", planId: "1", planName: "Standard Plan", principalAmount: 60000, interestRate: 8.5, interestType: "simple", currentValue: 65100, profit: 5100, startDate: "2024-07-10", maturityDate: "2025-07-10", status: "active" },
    { id: "8", userId: "8", userName: "Kavita Nair", planId: "2", planName: "Premium Plan", principalAmount: 180000, interestRate: 12, interestType: "compound", currentValue: 201600, profit: 21600, startDate: "2024-02-20", maturityDate: "2026-02-20", status: "active" },
    { id: "9", userId: "9", userName: "Suresh Iyer", planId: "1", planName: "Standard Plan", principalAmount: 85000, interestRate: 8.5, interestType: "simple", currentValue: 92225, profit: 7225, startDate: "2024-06-01", maturityDate: "2025-06-01", status: "active" },
    { id: "10", userId: "10", userName: "Deepa Menon", planId: "2", planName: "Premium Plan", principalAmount: 220000, interestRate: 12, interestType: "compound", currentValue: 246400, profit: 26400, startDate: "2024-03-25", maturityDate: "2026-03-25", status: "active" },
    { id: "11", userId: "11", userName: "Arjun Pillai", planId: "1", planName: "Standard Plan", principalAmount: 95000, interestRate: 8.5, interestType: "simple", currentValue: 103075, profit: 8075, startDate: "2024-05-10", maturityDate: "2025-05-10", status: "matured" },
    { id: "12", userId: "12", userName: "Meera Gupta", planId: "2", planName: "Premium Plan", principalAmount: 160000, interestRate: 12, interestType: "compound", currentValue: 179200, profit: 19200, startDate: "2024-01-20", maturityDate: "2026-01-20", status: "active" },
    { id: "13", userId: "13", userName: "Karthik Rao", planId: "1", planName: "Standard Plan", principalAmount: 70000, interestRate: 8.5, interestType: "simple", currentValue: 75950, profit: 5950, startDate: "2024-04-15", maturityDate: "2025-04-15", status: "active" },
    { id: "14", userId: "14", userName: "Lakshmi Bhat", planId: "2", planName: "Premium Plan", principalAmount: 280000, interestRate: 12, interestType: "compound", currentValue: 313600, profit: 33600, startDate: "2024-02-28", maturityDate: "2026-02-28", status: "active" },
    { id: "15", userId: "15", userName: "Ravi Krishnan", planId: "1", planName: "Standard Plan", principalAmount: 55000, interestRate: 8.5, interestType: "simple", currentValue: 59675, profit: 4675, startDate: "2024-07-20", maturityDate: "2025-07-20", status: "active" },
    { id: "16", userId: "16", userName: "Sita Ramesh", planId: "2", planName: "Premium Plan", principalAmount: 190000, interestRate: 12, interestType: "compound", currentValue: 212800, profit: 22800, startDate: "2024-03-10", maturityDate: "2026-03-10", status: "closed" },
    { id: "17", userId: "17", userName: "Mohan Das", planId: "1", planName: "Standard Plan", principalAmount: 80000, interestRate: 8.5, interestType: "simple", currentValue: 86800, profit: 6800, startDate: "2024-05-25", maturityDate: "2025-05-25", status: "active" },
    { id: "18", userId: "18", userName: "Radha Krishnan", planId: "2", planName: "Premium Plan", principalAmount: 240000, interestRate: 12, interestType: "compound", currentValue: 268800, profit: 28800, startDate: "2024-04-18", maturityDate: "2026-04-18", status: "active" },
    { id: "19", userId: "19", userName: "Ganesh Murthy", planId: "1", planName: "Standard Plan", principalAmount: 65000, interestRate: 8.5, interestType: "simple", currentValue: 70525, profit: 5525, startDate: "2024-06-25", maturityDate: "2025-06-25", status: "active" },
    { id: "20", userId: "20", userName: "Saraswati Iyer", planId: "2", planName: "Premium Plan", principalAmount: 210000, interestRate: 12, interestType: "compound", currentValue: 235200, profit: 25200, startDate: "2024-01-30", maturityDate: "2026-01-30", status: "matured" },
    { id: "21", userId: "21", userName: "Manoj Nambiar", planId: "1", planName: "Standard Plan", principalAmount: 90000, interestRate: 8.5, interestType: "simple", currentValue: 97650, profit: 7650, startDate: "2024-07-05", maturityDate: "2025-07-05", status: "active" },
    { id: "22", userId: "22", userName: "Divya Shetty", planId: "2", planName: "Premium Plan", principalAmount: 170000, interestRate: 12, interestType: "compound", currentValue: 190400, profit: 20400, startDate: "2024-02-15", maturityDate: "2026-02-15", status: "active" }
  ])

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
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

  const totalPages = Math.ceil(filteredInvestments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedInvestments = filteredInvestments.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  
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
      <AdminNavbar currentPage="Investments" />

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

        <div className="[&>div]:rounded-sm [&>div]:border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>User</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Principal</TableHead>
                <TableHead>Interest Rate</TableHead>
                <TableHead>Current Value</TableHead>
                <TableHead>Profit</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Maturity Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedInvestments.map((inv) => {
                const initials = inv.userName.split(' ').map(n => n[0]).join('').toUpperCase()
                return (
                  <TableRow key={inv.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="text-xs bg-gray-700 text-white">{initials}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{inv.userName}</div>
                      </div>
                    </TableCell>
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
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          className="cursor-pointer transition-colors duration-200"
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
                          className="cursor-pointer transition-colors duration-200"
                          onClick={() => handleDeleteInvestment(inv.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
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

      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage > 1) handlePageChange(currentPage - 1)
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === page}
                        onClick={(e) => {
                          e.preventDefault()
                          handlePageChange(page)
                        }}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                } else if (page === currentPage - 2 || page === currentPage + 2) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )
                }
                return null
              })}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage < totalPages) handlePageChange(currentPage + 1)
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}
