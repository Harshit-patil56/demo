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
import { AdminNavbar } from "@/components/admin-navbar"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type User = {
  id: string
  name: string
  email: string
  phone: string
  status: "active" | "inactive"
  totalInvested: number
  createdAt: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "Rajesh Kumar", email: "rajesh@example.com", phone: "+91 9876543210", status: "active", totalInvested: 250000, createdAt: "2024-11-15" },
    { id: "2", name: "Priya Singh", email: "priya@example.com", phone: "+91 9876543211", status: "active", totalInvested: 180000, createdAt: "2024-11-20" },
    { id: "3", name: "Amit Patel", email: "amit@example.com", phone: "+91 9876543212", status: "inactive", totalInvested: 0, createdAt: "2024-12-01" },
    { id: "4", name: "Sneha Sharma", email: "sneha@example.com", phone: "+91 9876543213", status: "active", totalInvested: 320000, createdAt: "2024-10-10" },
    { id: "5", name: "Vikram Reddy", email: "vikram@example.com", phone: "+91 9876543214", status: "active", totalInvested: 195000, createdAt: "2024-10-22" },
    { id: "6", name: "Anita Desai", email: "anita@example.com", phone: "+91 9876543215", status: "active", totalInvested: 425000, createdAt: "2024-09-15" },
    { id: "7", name: "Rahul Verma", email: "rahul@example.com", phone: "+91 9876543216", status: "inactive", totalInvested: 0, createdAt: "2024-11-28" },
    { id: "8", name: "Kavita Nair", email: "kavita@example.com", phone: "+91 9876543217", status: "active", totalInvested: 275000, createdAt: "2024-09-08" },
    { id: "9", name: "Suresh Iyer", email: "suresh@example.com", phone: "+91 9876543218", status: "active", totalInvested: 350000, createdAt: "2024-08-25" },
    { id: "10", name: "Deepa Menon", email: "deepa@example.com", phone: "+91 9876543219", status: "active", totalInvested: 480000, createdAt: "2024-08-10" },
    { id: "11", name: "Arjun Pillai", email: "arjun@example.com", phone: "+91 9876543220", status: "inactive", totalInvested: 0, createdAt: "2024-11-30" },
    { id: "12", name: "Meera Gupta", email: "meera@example.com", phone: "+91 9876543221", status: "active", totalInvested: 215000, createdAt: "2024-07-18" },
    { id: "13", name: "Karthik Rao", email: "karthik@example.com", phone: "+91 9876543222", status: "active", totalInvested: 390000, createdAt: "2024-07-05" },
    { id: "14", name: "Lakshmi Bhat", email: "lakshmi@example.com", phone: "+91 9876543223", status: "active", totalInvested: 560000, createdAt: "2024-06-22" },
    { id: "15", name: "Ravi Krishnan", email: "ravi@example.com", phone: "+91 9876543224", status: "active", totalInvested: 145000, createdAt: "2024-11-12" },
    { id: "16", name: "Sita Ramesh", email: "sita@example.com", phone: "+91 9876543225", status: "inactive", totalInvested: 0, createdAt: "2024-12-02" },
    { id: "17", name: "Mohan Das", email: "mohan@example.com", phone: "+91 9876543226", status: "active", totalInvested: 285000, createdAt: "2024-06-10" },
    { id: "18", name: "Radha Krishnan", email: "radha@example.com", phone: "+91 9876543227", status: "active", totalInvested: 410000, createdAt: "2024-05-28" },
    { id: "19", name: "Ganesh Murthy", email: "ganesh@example.com", phone: "+91 9876543228", status: "active", totalInvested: 330000, createdAt: "2024-05-15" },
    { id: "20", name: "Saraswati Iyer", email: "saraswati@example.com", phone: "+91 9876543229", status: "active", totalInvested: 505000, createdAt: "2024-05-02" },
    { id: "21", name: "Manoj Nambiar", email: "manoj@example.com", phone: "+91 9876543230", status: "inactive", totalInvested: 0, createdAt: "2024-11-25" },
    { id: "22", name: "Divya Shetty", email: "divya@example.com", phone: "+91 9876543231", status: "active", totalInvested: 240000, createdAt: "2024-04-20" }
  ])

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "active" as "active" | "inactive"
  })

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.phone.includes(searchQuery)
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(u => u.id !== userId))
  }

  const handleToggleStatus = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u
    ))
  }

  const handleAddUser = () => {
    const newUser: User = {
      id: String(users.length + 1),
      ...formData,
      totalInvested: 0,
      createdAt: new Date().toISOString().split('T')[0]
    }
    setUsers([...users, newUser])
    setIsAddDialogOpen(false)
    setFormData({ name: "", email: "", phone: "", status: "active" })
  }

  const handleEditUser = () => {
    if (selectedUser) {
      setUsers(users.map(u => u.id === selectedUser.id ? { ...selectedUser, ...formData } : u))
      setIsEditDialogOpen(false)
      setSelectedUser(null)
      setFormData({ name: "", email: "", phone: "", status: "active" })
    }
  }

  const openEditDialog = (user: User) => {
    setSelectedUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      status: user.status
    })
    setIsEditDialogOpen(true)
  }

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar currentPage="Users" />

      <div className="p-2 md:p-4" style={{maxWidth: '1400px', margin: '0 auto'}}>
        <div className="mb-6" style={{height: '40px'}}></div>

        <div className="flex items-center gap-4 mb-6">
          <Input
            placeholder="Search by name, email, or phone..."
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
              <SelectItem value="inactive" className="cursor-pointer">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-black hover:bg-gray-800 text-white transition-colors duration-200 cursor-pointer">Add User</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Enter the details of the new user
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: "active" | "inactive") => 
                      setFormData({...formData, status: value})
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddUser}>Add User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          </div>
        </div>

        <div className="[&>div]:rounded-sm [&>div]:border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total Invested</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.map((user) => {
                const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase()
                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="text-xs bg-gray-700 text-white">{initials}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{user.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-md text-sm font-medium ${
                        user.status === "active" 
                          ? "text-green-700" 
                          : "text-gray-600"
                      }`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>₹{user.totalInvested.toLocaleString()}</TableCell>
                    <TableCell>{user.createdAt}</TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          className="cursor-pointer transition-colors duration-200"
                          onClick={() => {
                            setSelectedUser(user)
                            setFormData({
                              name: user.name,
                              email: user.email,
                              phone: user.phone,
                              status: user.status
                            })
                            setIsEditDialogOpen(true)
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="cursor-pointer transition-colors duration-200"
                          onClick={() => handleToggleStatus(user.id)}
                        >
                          {user.status === "active" ? "Deactivate" : "Activate"}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="cursor-pointer transition-colors duration-200"
                          onClick={() => handleDeleteUser(user.id)}
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

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user details
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-phone">Phone</Label>
              <Input
                id="edit-phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "active" | "inactive") => 
                  setFormData({...formData, status: value})
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleEditUser}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
