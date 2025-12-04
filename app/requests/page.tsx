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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
    {
      id: "1",
      userId: "1",
      userName: "Rajesh Kumar",
      type: "deposit",
      amount: 50000,
      status: "pending",
      requestDate: "2024-12-01"
    },
    {
      id: "2",
      userId: "2",
      userName: "Priya Singh",
      type: "withdrawal",
      amount: 25000,
      status: "pending",
      requestDate: "2024-12-02"
    },
    {
      id: "3",
      userId: "3",
      userName: "Amit Patel",
      type: "deposit",
      amount: 100000,
      status: "approved",
      requestDate: "2024-11-28",
      processedDate: "2024-11-28"
    }
  ])

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

  const pendingCount = requests.filter(r => r.status === "pending").length

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 z-50 w-full p-4 bg-white border-b border-[rgb(233,233,235)]">
        <div style={{maxWidth: '1400px', margin: '0 auto'}}>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-gray-900">Requests</h1>
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
                    <NavigationMenuLink href="/requests" className="px-4 py-2 relative text-lg">
                      <span className="font-medium text-gray-900">Requests</span>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/maturities" className="px-4 py-2 relative text-[rgb(124,126,140)] hover:text-gray-900 transition-colors text-lg">
                      Maturities
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
              {filteredRequests.map((req) => {
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
      </div>
    </div>
  )
}
