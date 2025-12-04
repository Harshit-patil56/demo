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
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

type MaturityInvestment = {
  id: string
  userId: string
  userName: string
  planName: string
  principalAmount: number
  interestRate: number
  currentValue: number
  profit: number
  startDate: string
  maturityDate: string
  daysUntilMaturity: number
  status: "maturing-soon" | "matured" | "overdue"
}

export default function MaturitiesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  
  const [investments] = useState<MaturityInvestment[]>([
    {
      id: "1",
      userId: "1",
      userName: "Rajesh Kumar",
      planName: "Standard Plan",
      principalAmount: 50000,
      interestRate: 8.5,
      currentValue: 54250,
      profit: 4250,
      startDate: "2024-06-15",
      maturityDate: "2025-01-15",
      daysUntilMaturity: 42,
      status: "maturing-soon"
    },
    {
      id: "2",
      userId: "2",
      userName: "Priya Singh",
      planName: "Premium Plan",
      principalAmount: 200000,
      interestRate: 12,
      currentValue: 224000,
      profit: 24000,
      startDate: "2024-01-10",
      maturityDate: "2025-01-10",
      daysUntilMaturity: 37,
      status: "maturing-soon"
    },
    {
      id: "3",
      userId: "3",
      userName: "Amit Patel",
      planName: "Growth Plan",
      principalAmount: 150000,
      interestRate: 10,
      currentValue: 165000,
      profit: 15000,
      startDate: "2024-02-01",
      maturityDate: "2024-12-15",
      daysUntilMaturity: 11,
      status: "maturing-soon"
    },
    {
      id: "4",
      userId: "4",
      userName: "Sunita Verma",
      planName: "Premium Plan",
      principalAmount: 300000,
      interestRate: 12,
      currentValue: 336000,
      profit: 36000,
      startDate: "2024-03-01",
      maturityDate: "2024-12-05",
      daysUntilMaturity: 1,
      status: "maturing-soon"
    },
    {
      id: "5",
      userId: "5",
      userName: "Vikram Reddy",
      planName: "Standard Plan",
      principalAmount: 75000,
      interestRate: 8.5,
      currentValue: 81375,
      profit: 6375,
      startDate: "2023-12-01",
      maturityDate: "2024-12-01",
      daysUntilMaturity: 0,
      status: "matured"
    },
    {
      id: "6",
      userId: "6",
      userName: "Meera Gupta",
      planName: "Growth Plan",
      principalAmount: 100000,
      interestRate: 10,
      currentValue: 110000,
      profit: 10000,
      startDate: "2023-11-20",
      maturityDate: "2024-11-20",
      daysUntilMaturity: -14,
      status: "overdue"
    },
    {
      id: "7",
      userId: "7",
      userName: "Karan Mehta",
      planName: "Premium Plan",
      principalAmount: 250000,
      interestRate: 12,
      currentValue: 280000,
      profit: 30000,
      startDate: "2024-04-15",
      maturityDate: "2024-11-25",
      daysUntilMaturity: -9,
      status: "overdue"
    },
    {
      id: "8",
      userId: "8",
      userName: "Anjali Sharma",
      planName: "Standard Plan",
      principalAmount: 125000,
      interestRate: 8.5,
      currentValue: 135625,
      profit: 10625,
      startDate: "2024-05-01",
      maturityDate: "2025-01-20",
      daysUntilMaturity: 47,
      status: "maturing-soon"
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "maturing-soon":
        return "text-blue-600"
      case "matured":
        return "text-[rgb(4,180,136)]"
      case "overdue":
        return "text-[rgb(237,85,51)]"
      default:
        return "text-gray-600"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "maturing-soon":
        return "Maturing Soon"
      case "matured":
        return "Matured"
      case "overdue":
        return "Overdue"
      default:
        return status
    }
  }

  const getDaysText = (days: number) => {
    if (days === 0) return "Today"
    if (days < 0) return `${Math.abs(days)} days ago`
    return `${days} days`
  }

  // Sort by days until maturity (overdue first, then closest to maturity)
  const filteredInvestments = investments.filter(inv => {
    const matchesSearch = inv.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         inv.planName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         inv.id.includes(searchQuery)
    const matchesStatus = statusFilter === "all" || inv.status === statusFilter
    return matchesSearch && matchesStatus
  })
  
  const sortedInvestments = [...filteredInvestments].sort((a, b) => {
    if (a.status === "overdue" && b.status !== "overdue") return -1
    if (b.status === "overdue" && a.status !== "overdue") return 1
    return a.daysUntilMaturity - b.daysUntilMaturity
  })

  const maturingSoonCount = investments.filter(i => i.status === "maturing-soon").length
  const maturedCount = investments.filter(i => i.status === "matured").length
  const overdueCount = investments.filter(i => i.status === "overdue").length
  const upcomingCount = maturingSoonCount

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar currentPage="Maturities" />

      <div className="p-2 md:p-4" style={{maxWidth: '1400px', margin: '0 auto'}}>
        <div className="mb-6" style={{height: '40px'}}></div>

        <div className="flex items-center gap-4 mb-6">
          <Input
            placeholder="Search by user, plan, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[350px]"
          />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px] ml-auto cursor-pointer transition-colors duration-200">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="cursor-pointer">All Status</SelectItem>
              <SelectItem value="maturing-soon" className="cursor-pointer">Maturing Soon</SelectItem>
              <SelectItem value="matured" className="cursor-pointer">Matured</SelectItem>
              <SelectItem value="overdue" className="cursor-pointer">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-4 flex gap-4 text-base">
          <div>
            <span className="font-medium text-gray-600">Upcoming: </span>
            <span className="font-semibold text-blue-600">{upcomingCount}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Matured: </span>
            <span className="font-semibold text-green-600">{maturedCount}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Overdue: </span>
            <span className="font-semibold text-red-600">{overdueCount}</span>
          </div>
        </div>

        <div className="[&>div]:rounded-sm [&>div]:border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>User</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Principal</TableHead>
                <TableHead>Maturity Amount</TableHead>
                <TableHead>Maturity Date</TableHead>
                <TableHead>Days Left</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedInvestments.map((inv) => {
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
                    <TableCell>₹{inv.principalAmount.toLocaleString('en-IN')}</TableCell>
                    <TableCell className="font-semibold">₹{inv.currentValue.toLocaleString('en-IN')}</TableCell>
                    <TableCell>{inv.maturityDate}</TableCell>
                    <TableCell>
                      <span className={getStatusColor(inv.status)}>
                        {getDaysText(inv.daysUntilMaturity)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-md text-sm font-medium ${
                        inv.status === "maturing-soon" ? "text-blue-700" :
                        inv.status === "matured" ? "text-green-700" :
                        "text-red-700"
                      }`}>
                        {getStatusText(inv.status)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-sm text-gray-600">View</span>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
