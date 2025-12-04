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
import { Textarea } from "@/components/ui/textarea"

type Transaction = {
  id: string
  type: "deposit" | "withdrawal"
  amount: number
  requestDate: string
  processedDate: string | null
  status: "pending" | "approved" | "rejected"
  notes?: string
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "deposit",
      amount: 50000,
      requestDate: "2024-12-01",
      processedDate: "2024-12-01",
      status: "approved"
    },
    {
      id: "2",
      type: "withdrawal",
      amount: 25000,
      requestDate: "2024-11-28",
      processedDate: "2024-11-29",
      status: "approved"
    },
    {
      id: "3",
      type: "deposit",
      amount: 100000,
      requestDate: "2024-12-03",
      processedDate: null,
      status: "pending"
    }
  ])

  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false)
  const [filterType, setFilterType] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const [formData, setFormData] = useState({
    type: "deposit" as "deposit" | "withdrawal",
    amount: "",
    notes: ""
  })

  const handleSubmitRequest = () => {
    const newTransaction: Transaction = {
      id: String(transactions.length + 1),
      type: formData.type,
      amount: Number(formData.amount),
      requestDate: new Date().toISOString().split('T')[0],
      processedDate: null,
      status: "pending",
      notes: formData.notes
    }
    setTransactions([newTransaction, ...transactions])
    setIsRequestDialogOpen(false)
    setFormData({ type: "deposit", amount: "", notes: "" })
  }

  const filteredTransactions = transactions.filter(transaction => {
    if (filterType !== "all" && transaction.type !== filterType) return false
    if (filterStatus !== "all" && transaction.status !== filterStatus) return false
    return true
  })

  const pendingCount = transactions.filter(t => t.status === "pending").length

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 z-50 w-full p-4 bg-white border-b border-[rgb(233,233,235)]">
        <div style={{maxWidth: '1600px', margin: '0 auto'}}>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-gray-900">Transactions</h1>
            <div className="flex-1 flex justify-center">
              <NavigationMenu className="max-w-full">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/user-dashboard" className="px-4 py-2 relative text-[rgb(124,126,140)] hover:text-gray-900 transition-colors text-lg">
                      Dashboard
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/my-investments" className="px-4 py-2 relative text-[rgb(124,126,140)] hover:text-gray-900 transition-colors text-lg">
                      My Investments
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/transactions" className="px-4 py-2 relative text-lg">
                      <span className="font-medium text-gray-900">Transactions</span>
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

      <div className="p-2 md:p-4" style={{maxWidth: '1600px', margin: '0 auto'}}>
        <div className="mb-6" style={{height: '40px'}}></div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="deposit">Deposit</SelectItem>
              <SelectItem value="withdrawal">Withdrawal</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
            <DialogTrigger asChild>
              <Button>New Request</Button>
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
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="deposit">Deposit</SelectItem>
                      <SelectItem value="withdrawal">Withdrawal</SelectItem>
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
                <Button onClick={handleSubmitRequest}>Submit Request</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {pendingCount > 0 && (
          <div className="mb-4">
            <div className="px-4 py-2 bg-yellow-50 border border-yellow-200 rounded text-base">
              <span className="font-medium">Pending Requests: </span>
              <span className="font-semibold">{pendingCount}</span>
            </div>
          </div>
        )}

        <div className="border border-[rgb(233,233,235)] bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Processed Date</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell>{txn.requestDate}</TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-md text-sm font-medium ${
                      txn.type === "deposit" ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-700"
                    }`}>
                      {txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className={txn.type === "deposit" ? "text-green-600" : "text-red-600"}>
                    {txn.type === "deposit" ? "+" : "-"}₹{txn.amount.toLocaleString('en-IN')}
                  </TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-md text-sm font-medium ${
                      txn.status === "approved" ? "bg-green-50 text-green-700" :
                      txn.status === "pending" ? "bg-yellow-50 text-yellow-700" :
                      "bg-red-50 text-red-700"
                    }`}>
                      {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{txn.processedDate || "-"}</TableCell>
                  <TableCell>{txn.notes || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
