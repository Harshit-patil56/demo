"use client"

import { useState } from "react"
import { UserNavbar } from "@/components/user-navbar"
import {
  Card,
  CardContent,
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
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type Transaction = {
  id: string
  type: "deposit" | "withdrawal"
  amount: number
  requestDate: string
  processedDate: string | null
  status: "pending" | "approved" | "rejected"
  notes?: string
  description: string
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "0440", type: "withdrawal", amount: 50000, requestDate: "2024-12-01", processedDate: "2024-12-01", status: "approved", description: "Withdrawal" },
    { id: "2290", type: "withdrawal", amount: 25000, requestDate: "2024-11-28", processedDate: "2024-11-29", status: "approved", description: "Withdrawal" },
    { id: "3311", type: "withdrawal", amount: 75000, requestDate: "2024-11-25", processedDate: "2024-11-26", status: "approved", description: "Withdrawal" },
    { id: "4422", type: "deposit", amount: 150000, requestDate: "2024-11-20", processedDate: "2024-11-20", status: "approved", description: "Deposit" },
    { id: "5522", type: "withdrawal", amount: 35000, requestDate: "2024-11-15", processedDate: "2024-11-16", status: "approved", description: "Withdrawal" },
    { id: "1133", type: "withdrawal", amount: 120000, requestDate: "2024-11-10", processedDate: "2024-11-11", status: "approved", description: "Withdrawal" },
    { id: "7788", type: "deposit", amount: 200000, requestDate: "2024-11-05", processedDate: "2024-11-05", status: "approved", description: "Deposit" },
    { id: "9900", type: "deposit", amount: 100000, requestDate: "2024-12-03", processedDate: null, status: "pending", description: "Deposit" },
    { id: "8811", type: "deposit", amount: 85000, requestDate: "2024-10-28", processedDate: "2024-10-28", status: "approved", description: "Deposit" },
    { id: "7722", type: "withdrawal", amount: 45000, requestDate: "2024-10-20", processedDate: "2024-10-21", status: "approved", description: "Withdrawal" },
    { id: "6633", type: "deposit", amount: 175000, requestDate: "2024-10-15", processedDate: "2024-10-15", status: "approved", description: "Deposit" },
    { id: "5544", type: "withdrawal", amount: 62000, requestDate: "2024-10-10", processedDate: "2024-10-11", status: "approved", description: "Withdrawal" },
    { id: "4455", type: "deposit", amount: 95000, requestDate: "2024-10-05", processedDate: "2024-10-05", status: "approved", description: "Deposit" },
    { id: "3366", type: "withdrawal", amount: 55000, requestDate: "2024-09-28", processedDate: "2024-09-29", status: "approved", description: "Withdrawal" },
    { id: "2277", type: "deposit", amount: 125000, requestDate: "2024-09-20", processedDate: "2024-09-20", status: "approved", description: "Deposit" },
    { id: "1188", type: "withdrawal", amount: 38000, requestDate: "2024-09-15", processedDate: "2024-09-16", status: "rejected", description: "Withdrawal" },
    { id: "0099", type: "deposit", amount: 160000, requestDate: "2024-09-10", processedDate: "2024-09-10", status: "approved", description: "Deposit" },
    { id: "9988", type: "withdrawal", amount: 72000, requestDate: "2024-09-05", processedDate: "2024-09-06", status: "approved", description: "Withdrawal" },
    { id: "8877", type: "deposit", amount: 110000, requestDate: "2024-08-28", processedDate: "2024-08-28", status: "approved", description: "Deposit" },
    { id: "7766", type: "withdrawal", amount: 48000, requestDate: "2024-08-20", processedDate: "2024-08-21", status: "approved", description: "Withdrawal" },
    { id: "6655", type: "deposit", amount: 135000, requestDate: "2024-08-15", processedDate: "2024-08-15", status: "approved", description: "Deposit" },
    { id: "5566", type: "withdrawal", amount: 58000, requestDate: "2024-08-10", processedDate: "2024-08-11", status: "approved", description: "Withdrawal" },
    { id: "4477", type: "deposit", amount: 92000, requestDate: "2024-08-05", processedDate: "2024-08-05", status: "approved", description: "Deposit" },
    { id: "3388", type: "withdrawal", amount: 41000, requestDate: "2024-07-28", processedDate: "2024-07-29", status: "approved", description: "Withdrawal" },
    { id: "2299", type: "deposit", amount: 155000, requestDate: "2024-07-20", processedDate: "2024-07-20", status: "approved", description: "Deposit" }
  ])

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false)
  const [filterType, setFilterType] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const [formData, setFormData] = useState({
    type: "deposit" as "deposit" | "withdrawal",
    amount: "",
    notes: ""
  })

  const handleSubmitRequest = () => {
    const newTransaction: Transaction = {
      id: String(Math.floor(Math.random() * 10000)),
      type: formData.type,
      amount: Number(formData.amount),
      requestDate: new Date().toISOString().split('T')[0],
      processedDate: null,
      status: "pending",
      notes: formData.notes,
      description: formData.type === "deposit" ? "Deposit" : "Withdrawal"
    }
    setTransactions([newTransaction, ...transactions])
    setIsRequestDialogOpen(false)
    setFormData({ type: "deposit", amount: "", notes: "" })
  }

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.amount.toString().includes(searchQuery)
    if (!matchesSearch) return false
    if (filterType !== "all" && transaction.type !== filterType) return false
    if (filterStatus !== "all" && transaction.status !== filterStatus) return false
    return true
  })

  const pendingCount = transactions.filter(t => t.status === "pending").length

  // Pagination logic
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar currentPage="Transactions" />

      <div className="p-2 md:p-4" style={{maxWidth: '1400px', margin: '0 auto'}}>
        <div className="mb-6" style={{height: '40px'}}></div>

        <div className="flex items-center gap-4 mb-6">
          <Input
            placeholder="Search by ID or amount..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[350px]"
          />
          <div className="flex items-center gap-4 ml-auto">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px] cursor-pointer transition-colors duration-200">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="cursor-pointer">All Types</SelectItem>
                <SelectItem value="deposit" className="cursor-pointer">Deposit</SelectItem>
                <SelectItem value="withdrawal" className="cursor-pointer">Withdrawal</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px] cursor-pointer transition-colors duration-200">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="cursor-pointer">All Status</SelectItem>
                <SelectItem value="pending" className="cursor-pointer">Pending</SelectItem>
                <SelectItem value="approved" className="cursor-pointer">Approved</SelectItem>
                <SelectItem value="rejected" className="cursor-pointer">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-black hover:bg-gray-800 text-white transition-colors duration-200 cursor-pointer">New Request</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New Transaction Request</DialogTitle>
                  <DialogDescription>
                    Submit a new deposit or withdrawal request
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="type">Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value: "deposit" | "withdrawal") => 
                        setFormData({...formData, type: value})
                      }
                    >
                      <SelectTrigger className="cursor-pointer transition-colors duration-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="deposit" className="cursor-pointer">Deposit</SelectItem>
                        <SelectItem value="withdrawal" className="cursor-pointer">Withdrawal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    onClick={handleSubmitRequest}
                    className="bg-black hover:bg-gray-800 text-white transition-colors duration-200 cursor-pointer"
                  >
                    Submit Request
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {pendingCount > 0 && (
          <div className="mb-4">
            <div className="text-base">
              <span className="font-medium text-gray-600">Pending Requests: </span>
              <span className="font-semibold text-yellow-700">{pendingCount}</span>
            </div>
          </div>
        )}

        <Card className="border-[rgb(233,233,235)]">
          <CardContent className="p-0">
            <div className="divide-y divide-[rgb(233,233,235)]">
              {paginatedTransactions.map((txn) => (
                <div
                  key={txn.id}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-8 flex-1">
                    <p className="text-sm text-gray-500 w-24 flex-shrink-0">
                      {new Date(txn.requestDate).toLocaleDateString('en-US', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </p>
                    <div className="flex-1">
                      <h3 className="font-semibold text-base text-gray-900">
                        {txn.description}
                      </h3>
                      <p className="text-sm text-gray-500 mt-0.5 capitalize">
                        {txn.status}
                      </p>
                    </div>
                  </div>
                  <p className={`font-semibold text-base ${
                    txn.type === "deposit" ? "text-green-600" : "text-red-600"
                  }`}>
                    {txn.type === "deposit" ? "+" : "-"}₹{txn.amount.toLocaleString('en-IN')}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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

