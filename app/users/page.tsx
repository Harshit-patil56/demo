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
    {
      id: "1",
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      phone: "+91 9876543210",
      status: "active",
      totalInvested: 250000,
      createdAt: "2024-11-15"
    },
    {
      id: "2",
      name: "Priya Singh",
      email: "priya@example.com",
      phone: "+91 9876543211",
      status: "active",
      totalInvested: 180000,
      createdAt: "2024-11-20"
    },
    {
      id: "3",
      name: "Amit Patel",
      email: "amit@example.com",
      phone: "+91 9876543212",
      status: "inactive",
      totalInvested: 0,
      createdAt: "2024-12-01"
    }
  ])

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
      <nav className="sticky top-0 z-50 w-full p-4 bg-white border-b border-[rgb(233,233,235)]">
        <div style={{maxWidth: '1600px', margin: '0 auto'}}>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-gray-900">Users</h1>
            <div className="flex-1 flex justify-center">
              <NavigationMenu className="max-w-full">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/dashboard" className="px-4 py-2 relative text-[rgb(124,126,140)] hover:text-gray-900 transition-colors text-lg">
                      Dashboard
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/users" className="px-4 py-2 relative text-lg">
                      <span className="font-medium text-gray-900">Users</span>
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

      <div className="p-2 md:p-4" style={{maxWidth: '1600px', margin: '0 auto'}}>
        <div className="mb-6" style={{height: '40px'}}></div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add User</Button>
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

        <div className="border border-[rgb(233,233,235)] bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total Invested</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-md text-sm font-medium ${
                      user.status === "active" 
                        ? "bg-green-50 text-green-700" 
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>₹{user.totalInvested.toLocaleString()}</TableCell>
                  <TableCell>{user.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
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
                        onClick={() => handleToggleStatus(user.id)}
                      >
                        {user.status === "active" ? "Deactivate" : "Activate"}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
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
