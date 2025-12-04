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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

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
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  
  const [investments] = useState<MaturityInvestment[]>([
    { id: "1", userId: "1", userName: "Rajesh Kumar", planName: "Standard Plan", principalAmount: 50000, interestRate: 8.5, currentValue: 54250, profit: 4250, startDate: "2024-06-15", maturityDate: "2025-01-15", daysUntilMaturity: 42, status: "maturing-soon" },
    { id: "2", userId: "2", userName: "Priya Singh", planName: "Premium Plan", principalAmount: 200000, interestRate: 12, currentValue: 224000, profit: 24000, startDate: "2024-01-10", maturityDate: "2025-01-10", daysUntilMaturity: 37, status: "maturing-soon" },
    { id: "3", userId: "3", userName: "Amit Patel", planName: "Growth Plan", principalAmount: 150000, interestRate: 10, currentValue: 165000, profit: 15000, startDate: "2024-02-01", maturityDate: "2024-12-15", daysUntilMaturity: 11, status: "maturing-soon" },
    { id: "4", userId: "4", userName: "Sunita Verma", planName: "Premium Plan", principalAmount: 300000, interestRate: 12, currentValue: 336000, profit: 36000, startDate: "2024-03-01", maturityDate: "2024-12-05", daysUntilMaturity: 1, status: "maturing-soon" },
    { id: "5", userId: "5", userName: "Vikram Reddy", planName: "Standard Plan", principalAmount: 75000, interestRate: 8.5, currentValue: 81375, profit: 6375, startDate: "2023-12-01", maturityDate: "2024-12-01", daysUntilMaturity: 0, status: "matured" },
    { id: "6", userId: "6", userName: "Meera Gupta", planName: "Growth Plan", principalAmount: 100000, interestRate: 10, currentValue: 110000, profit: 10000, startDate: "2023-11-20", maturityDate: "2024-11-20", daysUntilMaturity: -14, status: "overdue" },
    { id: "7", userId: "7", userName: "Karan Mehta", planName: "Premium Plan", principalAmount: 250000, interestRate: 12, currentValue: 280000, profit: 30000, startDate: "2024-04-15", maturityDate: "2024-11-25", daysUntilMaturity: -9, status: "overdue" },
    { id: "8", userId: "8", userName: "Anjali Sharma", planName: "Standard Plan", principalAmount: 125000, interestRate: 8.5, currentValue: 135625, profit: 10625, startDate: "2024-05-01", maturityDate: "2025-01-20", daysUntilMaturity: 47, status: "maturing-soon" },
    { id: "9", userId: "9", userName: "Suresh Iyer", planName: "Premium Plan", principalAmount: 175000, interestRate: 12, currentValue: 196000, profit: 21000, startDate: "2024-03-20", maturityDate: "2025-01-05", daysUntilMaturity: 32, status: "maturing-soon" },
    { id: "10", userId: "10", userName: "Deepa Menon", planName: "Growth Plan", principalAmount: 80000, interestRate: 10, currentValue: 88000, profit: 8000, startDate: "2024-06-10", maturityDate: "2024-12-10", daysUntilMaturity: 6, status: "maturing-soon" },
    { id: "11", userId: "11", userName: "Arjun Pillai", planName: "Standard Plan", principalAmount: 95000, interestRate: 8.5, currentValue: 103075, profit: 8075, startDate: "2023-11-10", maturityDate: "2024-11-10", daysUntilMaturity: -24, status: "overdue" },
    { id: "12", userId: "12", userName: "Kavita Nair", planName: "Premium Plan", principalAmount: 210000, interestRate: 12, currentValue: 235200, profit: 25200, startDate: "2024-02-15", maturityDate: "2025-01-25", daysUntilMaturity: 52, status: "maturing-soon" },
    { id: "13", userId: "13", userName: "Karthik Rao", planName: "Growth Plan", principalAmount: 140000, interestRate: 10, currentValue: 154000, profit: 14000, startDate: "2023-12-05", maturityDate: "2024-12-05", daysUntilMaturity: 1, status: "maturing-soon" },
    { id: "14", userId: "14", userName: "Lakshmi Bhat", planName: "Standard Plan", principalAmount: 60000, interestRate: 8.5, currentValue: 65100, profit: 5100, startDate: "2024-07-01", maturityDate: "2025-01-30", daysUntilMaturity: 57, status: "maturing-soon" },
    { id: "15", userId: "15", userName: "Ravi Krishnan", planName: "Premium Plan", principalAmount: 270000, interestRate: 12, currentValue: 302400, profit: 32400, startDate: "2024-01-25", maturityDate: "2024-12-08", daysUntilMaturity: 4, status: "maturing-soon" },
    { id: "16", userId: "16", userName: "Sita Ramesh", planName: "Growth Plan", principalAmount: 110000, interestRate: 10, currentValue: 121000, profit: 11000, startDate: "2023-10-15", maturityDate: "2024-10-15", daysUntilMaturity: -50, status: "overdue" },
    { id: "17", userId: "17", userName: "Mohan Das", planName: "Standard Plan", principalAmount: 85000, interestRate: 8.5, currentValue: 92225, profit: 7225, startDate: "2024-04-10", maturityDate: "2024-12-12", daysUntilMaturity: 8, status: "maturing-soon" },
    { id: "18", userId: "18", userName: "Radha Krishnan", planName: "Premium Plan", principalAmount: 230000, interestRate: 12, currentValue: 257600, profit: 27600, startDate: "2024-02-28", maturityDate: "2024-12-20", daysUntilMaturity: 16, status: "maturing-soon" },
    { id: "19", userId: "19", userName: "Ganesh Murthy", planName: "Growth Plan", principalAmount: 165000, interestRate: 10, currentValue: 181500, profit: 16500, startDate: "2024-05-15", maturityDate: "2024-12-25", daysUntilMaturity: 21, status: "maturing-soon" },
    { id: "20", userId: "20", userName: "Saraswati Iyer", planName: "Standard Plan", principalAmount: 70000, interestRate: 8.5, currentValue: 75950, profit: 5950, startDate: "2023-11-01", maturityDate: "2024-11-01", daysUntilMaturity: -33, status: "overdue" },
    { id: "21", userId: "21", userName: "Manoj Nambiar", planName: "Premium Plan", principalAmount: 190000, interestRate: 12, currentValue: 212800, profit: 22800, startDate: "2024-03-05", maturityDate: "2024-12-28", daysUntilMaturity: 24, status: "maturing-soon" },
    { id: "22", userId: "22", userName: "Divya Shetty", planName: "Growth Plan", principalAmount: 120000, interestRate: 10, currentValue: 132000, profit: 12000, startDate: "2024-06-20", maturityDate: "2025-01-18", daysUntilMaturity: 45, status: "maturing-soon" }
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

  const totalPages = Math.ceil(sortedInvestments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedInvestments = sortedInvestments.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

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
    </div>
  )
}
