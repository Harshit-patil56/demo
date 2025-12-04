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
      <nav className="sticky top-0 z-50 w-full p-4 bg-white border-b border-[rgb(233,233,235)]">
        <div style={{maxWidth: '1600px', margin: '0 auto'}}>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-gray-900">Maturities</h1>
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
                    <NavigationMenuLink href="/plans" className="px-4 py-2 relative text-[rgb(124,126,140)] hover:text-gray-900 transition-colors text-lg">
                      Plans
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
                    <NavigationMenuLink href="/maturities" className="px-4 py-2 relative text-lg">
                      <span className="font-medium text-gray-900">Maturities</span>
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

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search by user or plan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="matured">Matured</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-4 flex gap-4 text-base">
          <div className="px-4 py-2 bg-blue-50 border border-blue-200 rounded">
            <span className="font-medium">Upcoming: </span>
            <span className="font-semibold">{upcomingCount}</span>
          </div>
          <div className="px-4 py-2 bg-green-50 border border-green-200 rounded">
            <span className="font-medium">Matured: </span>
            <span className="font-semibold">{maturedCount}</span>
          </div>
          <div className="px-4 py-2 bg-red-50 border border-red-200 rounded">
            <span className="font-medium">Overdue: </span>
            <span className="font-semibold">{overdueCount}</span>
          </div>
        </div>

        <div className="border border-[rgb(233,233,235)] bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Principal</TableHead>
                <TableHead>Maturity Amount</TableHead>
                <TableHead>Maturity Date</TableHead>
                <TableHead>Days Left</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedInvestments.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell>{inv.userName}</TableCell>
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
                      inv.status === "maturing-soon" ? "bg-blue-50 text-blue-700" :
                      inv.status === "matured" ? "bg-green-50 text-green-700" :
                      "bg-red-50 text-red-700"
                    }`}>
                      {getStatusText(inv.status)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">View</span>
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
