"use client"

import { useState } from "react"
import React from "react"
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
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Table2, PieChart } from "lucide-react"
import { ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Legend, Tooltip } from 'recharts'

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
    {
      id: "1",
      planName: "Premium Growth",
      principalAmount: 250000,
      interestRate: 12,
      interestType: "compound",
      currentValue: 280000,
      profit: 30000,
      startDate: "2024-06-01",
      maturityDate: "2025-06-01",
      status: "active"
    },
    {
      id: "2",
      planName: "Standard Plan",
      principalAmount: 150000,
      interestRate: 8.5,
      interestType: "simple",
      currentValue: 162750,
      profit: 12750,
      startDate: "2024-08-15",
      maturityDate: "2025-08-15",
      status: "active"
    },
    {
      id: "3",
      planName: "Premium Growth",
      principalAmount: 90000,
      interestRate: 12,
      interestType: "compound",
      currentValue: 100800,
      profit: 10800,
      startDate: "2024-09-01",
      maturityDate: "2025-09-01",
      status: "active"
    },
    {
      id: "4",
      planName: "Standard Plan",
      principalAmount: 100000,
      interestRate: 8.5,
      interestType: "simple",
      currentValue: 108500,
      profit: 8500,
      startDate: "2024-01-01",
      maturityDate: "2025-01-01",
      status: "closed"
    }
  ])
  const [expandedRow, setExpandedRow] = useState<string | null>(null)
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

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 z-50 w-full p-4 bg-white border-b border-[rgb(233,233,235)]">
        <div style={{maxWidth: '1400px', margin: '0 auto'}}>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-gray-900">My Investments</h1>
            <div className="flex-1 flex justify-center">
              <NavigationMenu className="max-w-full">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/user-dashboard" className="px-4 py-2 relative text-[rgb(124,126,140)] hover:text-gray-900 transition-colors text-lg">
                      Dashboard
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/my-investments" className="px-4 py-2 relative text-lg">
                      <span className="font-medium text-gray-900">My Investments</span>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/transactions" className="px-4 py-2 relative text-[rgb(124,126,140)] hover:text-gray-900 transition-colors text-lg">
                      Transactions
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/profile" className="px-4 py-2 relative text-[rgb(124,126,140)] hover:text-gray-900 transition-colors text-lg">
                      Profile
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <Badge className="px-4 py-2 text-base bg-gray-900 text-white hover:bg-gray-800 font-medium">User</Badge>
          </div>
        </div>
      </nav>

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
              {investments.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell>{inv.planName}</TableCell>
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
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
