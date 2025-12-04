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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Report = {
  id: string
  title: string
  description: string
  type: "financial" | "user" | "investment"
  date: string
  generatedBy: string
}

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  
  const [reports] = useState<Report[]>([
    {
      id: "1",
      title: "Monthly Financial Report - November 2024",
      description: "Complete financial overview including investments, profits, and withdrawals",
      type: "financial",
      date: "2024-12-01",
      generatedBy: "System"
    },
    {
      id: "2",
      title: "User Growth Analysis Q4 2024",
      description: "Detailed analysis of user acquisition and retention metrics",
      type: "user",
      date: "2024-11-28",
      generatedBy: "Admin"
    },
    {
      id: "3",
      title: "Investment Performance Report",
      description: "Analysis of all active investments and their returns",
      type: "investment",
      date: "2024-11-25",
      generatedBy: "System"
    },
    {
      id: "4",
      title: "Weekly Financial Summary",
      description: "Week-by-week breakdown of financial activities",
      type: "financial",
      date: "2024-11-20",
      generatedBy: "System"
    },
    {
      id: "5",
      title: "User Activity Report - October",
      description: "Monthly user engagement and transaction statistics",
      type: "user",
      date: "2024-11-01",
      generatedBy: "Admin"
    }
  ])

  const filteredReports = reports.filter(report => {
    const matchesSearch = searchQuery === "" ||
                         report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || report.type === filterType
    return matchesSearch && matchesType
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 z-50 w-full p-4 bg-white border-b border-[rgb(233,233,235)]">
        <div style={{maxWidth: '1400px', margin: '0 auto'}}>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-gray-900">Reports</h1>
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
                    <NavigationMenuLink href="/maturities" className="px-4 py-2 relative text-[rgb(124,126,140)] hover:text-gray-900 transition-colors text-lg">
                      Maturities
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/reports" className="px-4 py-2 relative text-lg">
                      <span className="font-medium text-gray-900">Reports</span>
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
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[350px]"
          />
          <div className="flex items-center gap-4 ml-auto">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[200px] cursor-pointer transition-colors duration-200">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="cursor-pointer">All Reports</SelectItem>
                <SelectItem value="financial" className="cursor-pointer">Financial</SelectItem>
                <SelectItem value="user" className="cursor-pointer">User</SelectItem>
                <SelectItem value="investment" className="cursor-pointer">Investment</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-black hover:bg-gray-800 text-white transition-colors duration-200 cursor-pointer">
              Generate Report
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          {filteredReports.map((report) => (
            <div key={report.id} className="border border-[rgb(233,233,235)] bg-white p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                  <p className="text-base text-gray-600">{report.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-md text-sm font-medium ${
                  report.type === "financial" ? "text-blue-700" :
                  report.type === "user" ? "text-purple-700" :
                  "text-green-700"
                }`}>
                  {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                </span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-base text-gray-500">{report.date}</span>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 cursor-pointer">Download</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
