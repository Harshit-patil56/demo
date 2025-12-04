"use client"

import { useState, useEffect } from "react"
import React from "react"
import { UserNavbar } from "@/components/user-navbar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Table2, PieChart } from "lucide-react"
import { ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Legend, Tooltip } from 'recharts'
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
  planName: string
  principalAmount: number
  interestRate: number
  interestType: "simple" | "compound"
  currentValue: number
  profit: number
  startDate: string
  maturityDate: string
  status: "active" | "closed"
}

type Transaction = {
  id: string
  investmentId: string
  type: "deposit" | "withdrawal"
  amount: number
  date: string
  status: "approved" | "pending" | "rejected"
}

export default function MyInvestmentsPage() {
  const [investments] = useState<Investment[]>([
    { id: "1", planName: "Premium Growth", principalAmount: 250000, interestRate: 12, interestType: "compound", currentValue: 280000, profit: 30000, startDate: "2024-06-01", maturityDate: "2025-06-01", status: "active" },
    { id: "2", planName: "Standard Plan", principalAmount: 150000, interestRate: 8.5, interestType: "simple", currentValue: 162750, profit: 12750, startDate: "2024-08-15", maturityDate: "2025-08-15", status: "active" },
    { id: "3", planName: "Premium Growth", principalAmount: 90000, interestRate: 12, interestType: "compound", currentValue: 100800, profit: 10800, startDate: "2024-09-01", maturityDate: "2025-09-01", status: "active" },
    { id: "4", planName: "Standard Plan", principalAmount: 100000, interestRate: 8.5, interestType: "simple", currentValue: 108500, profit: 8500, startDate: "2024-01-01", maturityDate: "2025-01-01", status: "closed" },
    { id: "5", planName: "Premium Growth", principalAmount: 180000, interestRate: 12, interestType: "compound", currentValue: 201600, profit: 21600, startDate: "2024-07-10", maturityDate: "2025-07-10", status: "active" },
    { id: "6", planName: "Standard Plan", principalAmount: 75000, interestRate: 8.5, interestType: "simple", currentValue: 81375, profit: 6375, startDate: "2024-05-20", maturityDate: "2025-05-20", status: "active" },
    { id: "7", planName: "Premium Growth", principalAmount: 120000, interestRate: 12, interestType: "compound", currentValue: 134400, profit: 14400, startDate: "2024-04-15", maturityDate: "2025-04-15", status: "active" },
    { id: "8", planName: "Standard Plan", principalAmount: 60000, interestRate: 8.5, interestType: "simple", currentValue: 65100, profit: 5100, startDate: "2024-09-05", maturityDate: "2025-09-05", status: "active" },
    { id: "9", planName: "Premium Growth", principalAmount: 200000, interestRate: 12, interestType: "compound", currentValue: 224000, profit: 24000, startDate: "2024-03-20", maturityDate: "2025-03-20", status: "active" },
    { id: "10", planName: "Standard Plan", principalAmount: 85000, interestRate: 8.5, interestType: "simple", currentValue: 92225, profit: 7225, startDate: "2024-06-12", maturityDate: "2025-06-12", status: "active" },
    { id: "11", planName: "Premium Growth", principalAmount: 110000, interestRate: 12, interestType: "compound", currentValue: 123200, profit: 13200, startDate: "2024-02-10", maturityDate: "2025-02-10", status: "closed" },
    { id: "12", planName: "Standard Plan", principalAmount: 95000, interestRate: 8.5, interestType: "simple", currentValue: 103075, profit: 8075, startDate: "2024-08-01", maturityDate: "2025-08-01", status: "active" }
  ])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [expandedRow, setExpandedRow] = useState<string | null>(null)
  const [expandedTransactions, setExpandedTransactions] = useState<string | null>(null)
  const [hoveredInvestment, setHoveredInvestment] = useState<string | null>(null)
  const [depositAmount, setDepositAmount] = useState("")
  const [withdrawalAmount, setWithdrawalAmount] = useState("")
  const [viewMode, setViewMode] = useState<"table" | "pie">("table")
  const [showTransactions, setShowTransactions] = useState(true)

  // Mock transactions data
  const [transactions] = useState<Transaction[]>([
    { id: "t1", investmentId: "1", type: "deposit", amount: 250000, date: "2024-06-01", status: "approved" },
    { id: "t2", investmentId: "1", type: "deposit", amount: 50000, date: "2024-08-15", status: "approved" },
    { id: "t3", investmentId: "2", type: "deposit", amount: 150000, date: "2024-08-15", status: "approved" },
    { id: "t4", investmentId: "2", type: "withdrawal", amount: 20000, date: "2024-10-20", status: "approved" },
    { id: "t5", investmentId: "3", type: "deposit", amount: 90000, date: "2024-09-01", status: "approved" },
    { id: "t6", investmentId: "1", type: "withdrawal", amount: 30000, date: "2024-11-10", status: "pending" },
  ])

  const calculateCurrentValue = (investment: Investment) => {
    if (investment.status === "closed") {
      return investment.principalAmount
    }

    const start = new Date(investment.startDate)
    const now = new Date()
    const daysElapsed = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    const yearsElapsed = daysElapsed / 365

    if (investment.interestType === "simple") {
      const interest = investment.principalAmount * (investment.interestRate / 100) * yearsElapsed
      return investment.principalAmount + interest
    } else {
      return investment.principalAmount * Math.pow(1 + investment.interestRate / 100, yearsElapsed)
    }
  }

  const calculateProfit = (investment: Investment) => {
    return calculateCurrentValue(investment) - investment.principalAmount
  }

  const getDaysRemaining = (maturityDate: string) => {
    const maturity = new Date(maturityDate)
    const now = new Date()
    const diffTime = maturity.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const activeInvestments = investments.filter(inv => inv.status === "active")
  const closedInvestments = investments.filter(inv => inv.status === "closed")

  const totalPages = Math.ceil(investments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedInvestments = investments.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Close expanded row when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (expandedRow && !target.closest('tr')) {
        setExpandedRow(null)
        setExpandedTransactions(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [expandedRow])

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar currentPage="My Investments" />

      <div className="p-2 md:p-4" style={{maxWidth: '1400px', margin: '0 auto'}}>
        <div className="mb-6" style={{height: '40px'}}></div>

        <div className="[&>div]:rounded-sm [&>div]:border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Plan</TableHead>
                <TableHead>Principal</TableHead>
                <TableHead>Interest Rate</TableHead>
                <TableHead>Current Value</TableHead>
                <TableHead>Profit</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Maturity Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedInvestments.map((inv) => {
                const isExpanded = expandedRow === inv.id
                const invTransactions = transactions.filter(t => t.investmentId === inv.id)
                
                return (
                  <React.Fragment key={inv.id}>
                    <TableRow 
                      className={`cursor-pointer hover:bg-gray-50 transition-all duration-200 ${
                        expandedRow && expandedRow !== inv.id ? 'opacity-30 blur-sm' : ''
                      }`}
                      onClick={() => setExpandedRow(isExpanded ? null : inv.id)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          {inv.planName}
                        </div>
                      </TableCell>
                      <TableCell>₹{inv.principalAmount.toLocaleString('en-IN')}</TableCell>
                      <TableCell>{inv.interestRate}%</TableCell>
                      <TableCell>₹{inv.currentValue.toLocaleString('en-IN')}</TableCell>
                      <TableCell className="text-green-600">₹{inv.profit.toLocaleString('en-IN')}</TableCell>
                      <TableCell>{inv.startDate}</TableCell>
                      <TableCell>{inv.maturityDate}</TableCell>
                      <TableCell>
                        <span className={`px-3 py-1 rounded-md text-sm font-medium ${
                          inv.status === "active" ? "text-green-700" : "text-gray-600"
                        }`}>
                          {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                        </span>
                      </TableCell>
                    </TableRow>
                    {isExpanded && (
                      <TableRow>
                        <TableCell colSpan={8} className="bg-gray-50 p-6">
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              <div className="space-y-2">
                                <h3 className="text-sm font-semibold text-gray-600">Investment Details</h3>
                                <div className="space-y-1 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Investment ID:</span>
                                    <span className="font-medium">{inv.id}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Interest Type:</span>
                                    <span className="font-medium capitalize">{inv.interestType}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Days Remaining:</span>
                                    <span className="font-medium">
                                      {inv.status === "active" ? `${getDaysRemaining(inv.maturityDate)} days` : "N/A"}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <h3 className="text-sm font-semibold text-gray-600">Financial Summary</h3>
                                <div className="space-y-1 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Principal Amount:</span>
                                    <span className="font-medium">₹{inv.principalAmount.toLocaleString('en-IN')}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Current Value:</span>
                                    <span className="font-medium">₹{inv.currentValue.toLocaleString('en-IN')}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Total Profit:</span>
                                    <span className="font-medium text-green-600">₹{inv.profit.toLocaleString('en-IN')}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">ROI:</span>
                                    <span className="font-medium text-green-600">
                                      {((inv.profit / inv.principalAmount) * 100).toFixed(2)}%
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <h3 className="text-sm font-semibold text-gray-600">Timeline</h3>
                                <div className="space-y-1 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Start Date:</span>
                                    <span className="font-medium">{new Date(inv.startDate).toLocaleDateString('en-IN')}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Maturity Date:</span>
                                    <span className="font-medium">{new Date(inv.maturityDate).toLocaleDateString('en-IN')}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Duration:</span>
                                    <span className="font-medium">
                                      {Math.floor((new Date(inv.maturityDate).getTime() - new Date(inv.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="border-t pt-4">
                              <div 
                                className="flex items-center justify-between cursor-pointer hover:bg-gray-100 -mx-2 px-2 py-2 rounded transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setExpandedTransactions(expandedTransactions === inv.id ? null : inv.id)
                                }}
                              >
                                <h3 className="text-sm font-semibold text-gray-600">Transaction History</h3>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-500">{invTransactions.length} transaction{invTransactions.length !== 1 ? 's' : ''}</span>
                                  {expandedTransactions === inv.id ? 
                                    <ChevronUp className="h-4 w-4 text-gray-600" /> : 
                                    <ChevronDown className="h-4 w-4 text-gray-600" />
                                  }
                                </div>
                              </div>
                              {expandedTransactions === inv.id && invTransactions.length > 0 && (
                                <div className="divide-y divide-gray-200 mt-3">
                                  {invTransactions.map((txn) => (
                                    <div
                                      key={txn.id}
                                      className="flex items-center justify-between py-3 hover:bg-gray-50 transition-colors px-2 rounded"
                                    >
                                      <div className="flex items-center gap-6 flex-1">
                                        <p className="text-sm text-gray-500 w-24 flex-shrink-0">
                                          {new Date(txn.date).toLocaleDateString('en-US', { 
                                            day: 'numeric', 
                                            month: 'short', 
                                            year: 'numeric' 
                                          })}
                                        </p>
                                        <div className="flex-1">
                                          <h4 className="font-semibold text-sm text-gray-900 capitalize">
                                            {txn.type}
                                          </h4>
                                          <p className="text-xs text-gray-500 mt-0.5 capitalize">
                                            {txn.status}
                                          </p>
                                        </div>
                                      </div>
                                      <p className={`font-semibold text-sm ${
                                        txn.type === "deposit" ? "text-green-600" : "text-red-600"
                                      }`}>
                                        {txn.type === "deposit" ? "+" : "-"}₹{txn.amount.toLocaleString('en-IN')}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              )}
                              {expandedTransactions === inv.id && invTransactions.length === 0 && (
                                <p className="text-sm text-gray-500 mt-3">No transactions found for this investment.</p>
                              )}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
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
