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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type Request = {
  id: string
  userId: string
  userName: string
  type: "deposit" | "withdrawal"
  amount: number
  status: "pending" | "approved" | "rejected"
  requestDate: string
  processedDate?: string
  notes?: string
}

export default function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>([
    { id: "1", userId: "1", userName: "Rajesh Kumar", type: "deposit", amount: 50000, status: "pending", requestDate: "2024-12-01" },
    { id: "2", userId: "2", userName: "Priya Singh", type: "withdrawal", amount: 25000, status: "pending", requestDate: "2024-12-02" },
    { id: "3", userId: "3", userName: "Amit Patel", type: "deposit", amount: 100000, status: "approved", requestDate: "2024-11-28", processedDate: "2024-11-28" },
    { id: "4", userId: "4", userName: "Sneha Sharma", type: "withdrawal", amount: 75000, status: "approved", requestDate: "2024-11-25", processedDate: "2024-11-26" },
    { id: "5", userId: "5", userName: "Vikram Reddy", type: "deposit", amount: 120000, status: "pending", requestDate: "2024-11-30" },
    { id: "6", userId: "6", userName: "Anita Desai", type: "withdrawal", amount: 45000, status: "rejected", requestDate: "2024-11-22", processedDate: "2024-11-23" },
    { id: "7", userId: "7", userName: "Rahul Verma", type: "deposit", amount: 85000, status: "approved", requestDate: "2024-11-20", processedDate: "2024-11-20" },
    { id: "8", userId: "8", userName: "Kavita Nair", type: "withdrawal", amount: 32000, status: "approved", requestDate: "2024-11-18", processedDate: "2024-11-19" },
    { id: "9", userId: "9", userName: "Suresh Iyer", type: "deposit", amount: 95000, status: "pending", requestDate: "2024-12-03" },
    { id: "10", userId: "10", userName: "Deepa Menon", type: "withdrawal", amount: 58000, status: "approved", requestDate: "2024-11-15", processedDate: "2024-11-16" },
    { id: "11", userId: "11", userName: "Arjun Pillai", type: "deposit", amount: 110000, status: "approved", requestDate: "2024-11-12", processedDate: "2024-11-12" },
    { id: "12", userId: "12", userName: "Meera Gupta", type: "withdrawal", amount: 42000, status: "rejected", requestDate: "2024-11-10", processedDate: "2024-11-11" },
    { id: "13", userId: "13", userName: "Karthik Rao", type: "deposit", amount: 135000, status: "approved", requestDate: "2024-11-08", processedDate: "2024-11-08" },
    { id: "14", userId: "14", userName: "Lakshmi Bhat", type: "withdrawal", amount: 68000, status: "approved", requestDate: "2024-11-05", processedDate: "2024-11-06" },
    { id: "15", userId: "15", userName: "Ravi Krishnan", type: "deposit", amount: 78000, status: "pending", requestDate: "2024-12-04" },
    { id: "16", userId: "16", userName: "Sita Ramesh", type: "withdrawal", amount: 52000, status: "approved", requestDate: "2024-11-02", processedDate: "2024-11-03" },
    { id: "17", userId: "17", userName: "Mohan Das", type: "deposit", amount: 125000, status: "approved", requestDate: "2024-10-28", processedDate: "2024-10-28" },
    { id: "18", userId: "18", userName: "Radha Krishnan", type: "withdrawal", amount: 38000, status: "rejected", requestDate: "2024-10-25", processedDate: "2024-10-26" },
    { id: "19", userId: "19", userName: "Ganesh Murthy", type: "deposit", amount: 92000, status: "approved", requestDate: "2024-10-20", processedDate: "2024-10-20" },
    { id: "20", userId: "20", userName: "Saraswati Iyer", type: "withdrawal", amount: 48000, status: "approved", requestDate: "2024-10-15", processedDate: "2024-10-16" },
    { id: "21", userId: "21", userName: "Manoj Nambiar", type: "deposit", amount: 105000, status: "pending", requestDate: "2024-12-05" },
    { id: "22", userId: "22", userName: "Divya Shetty", type: "withdrawal", amount: 62000, status: "approved", requestDate: "2024-10-10", processedDate: "2024-10-11" }
  ])

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterType, setFilterType] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const approveRequest = (requestId: string) => {
    setRequests(requests.map(req => 
      req.id === requestId ? {
        ...req,
        status: "approved" as const,
        processedDate: new Date().toISOString().split('T')[0]
      } : req
    ))
  }

  const rejectRequest = (requestId: string) => {
    setRequests(requests.map(req => 
      req.id === requestId ? {
        ...req,
        status: "rejected" as const,
        processedDate: new Date().toISOString().split('T')[0]
      } : req
    ))
  }

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         req.id.includes(searchQuery)
    if (!matchesSearch) return false
    if (filterStatus !== "all" && req.status !== filterStatus) return false
    if (filterType !== "all" && req.type !== filterType) return false
    return true
  })

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedRequests = filteredRequests.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleApprove = (requestId: string) => {
    approveRequest(requestId)
  }

  const handleReject = (requestId: string) => {
    rejectRequest(requestId)
  }

  const pendingCount = requests.filter(r => r.status === "pending").length

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar currentPage="Requests" />

      <div className="p-2 md:p-4" style={{maxWidth: '1400px', margin: '0 auto'}}>
        <div className="mb-6" style={{height: '40px'}}></div>

        <div className="flex items-center gap-4 mb-6">
          <Input
            placeholder="Search by user, plan, or request ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[350px]"
          />
          <div className="flex items-center gap-4 ml-auto">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px] cursor-pointer transition-colors duration-200">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="cursor-pointer">All Types</SelectItem>
                <SelectItem value="withdrawal" className="cursor-pointer">Withdrawal</SelectItem>
                <SelectItem value="investment" className="cursor-pointer">Investment</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px] cursor-pointer transition-colors duration-200">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="cursor-pointer">All Status</SelectItem>
                <SelectItem value="pending" className="cursor-pointer">Pending</SelectItem>
                <SelectItem value="approved" className="cursor-pointer">Approved</SelectItem>
                <SelectItem value="rejected" className="cursor-pointer">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-black hover:bg-gray-800 text-white transition-colors duration-200 cursor-pointer">
              New Request
            </Button>
          </div>
        </div>

        <div className="mb-4 flex gap-4 text-base">
          <div>
            <span className="font-medium text-gray-600">Pending: </span>
            <span className="font-semibold text-yellow-700">{pendingCount}</span>
          </div>
        </div>

        <div className="[&>div]:rounded-sm [&>div]:border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRequests.map((req) => {
                const initials = req.userName.split(' ').map(n => n[0]).join('').toUpperCase()
                return (
                  <TableRow key={req.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="text-xs bg-gray-700 text-white">{initials}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{req.userName}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="px-3 py-1 rounded-md text-sm font-medium text-purple-700">
                        {req.type.charAt(0).toUpperCase() + req.type.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>₹{req.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-md text-sm font-medium ${
                        req.status === "pending" ? "text-yellow-700" :
                        req.status === "approved" ? "text-green-700" :
                        "text-red-700"
                      }`}>
                        {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{req.requestDate}</TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-end">
                        {req.status === "pending" && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="cursor-pointer transition-colors duration-200"
                              onClick={() => handleApprove(req.id)}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="cursor-pointer transition-colors duration-200"
                              onClick={() => handleReject(req.id)}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
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
