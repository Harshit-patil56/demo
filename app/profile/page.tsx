"use client"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type UserProfile = {
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
  accountStatus: "active" | "inactive"
  memberSince: string
}

export default function ProfilePage() {
  const profile: UserProfile = {
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    phone: "+91 9876543210",
    address: "123 MG Road",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    accountStatus: "active",
    memberSince: "2024-06-15"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 z-50 w-full p-4 bg-white border-b border-[rgb(233,233,235)]">
        <div style={{maxWidth: '1600px', margin: '0 auto'}}>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-gray-900">Profile</h1>
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
                    <NavigationMenuLink href="/transactions" className="px-4 py-2 relative text-[rgb(124,126,140)] hover:text-gray-900 transition-colors text-lg">
                      Transactions
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/profile" className="px-4 py-2 relative text-lg">
                      <span className="font-medium text-gray-900">Profile</span>
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

        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{profile.name}</CardTitle>
                  <CardDescription className="text-base mt-1">
                    Member since {new Date(profile.memberSince).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </CardDescription>
                </div>
                <Badge variant={profile.accountStatus === "active" ? "default" : "secondary"} className="text-base px-4 py-1.5">
                  {profile.accountStatus.charAt(0).toUpperCase() + profile.accountStatus.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-base text-gray-900">{profile.email}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-base text-gray-900">{profile.phone}</p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">Street Address</p>
                      <p className="text-base text-gray-900">{profile.address}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">City</p>
                      <p className="text-base text-gray-900">{profile.city}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">State</p>
                      <p className="text-base text-gray-900">{profile.state}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">PIN Code</p>
                      <p className="text-base text-gray-900">{profile.pincode}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
