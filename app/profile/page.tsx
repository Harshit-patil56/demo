"use client"

import { useState } from "react"
import { UserNavbar } from "@/components/user-navbar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Phone, MapPin, Calendar, Edit } from "lucide-react"

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

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar currentPage="Profile" />

      <div className="p-2 md:p-4" style={{maxWidth: '1400px', margin: '0 auto'}}>
        <div className="mb-6" style={{height: '40px'}}></div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Header Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="text-2xl bg-gray-900 text-white">
                    {getInitials(profile.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                      <p className="text-base text-gray-500 mt-1 flex items-center justify-center sm:justify-start gap-2">
                        <Calendar className="h-4 w-4" />
                        Member since {new Date(profile.memberSince).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-md text-sm font-medium ${
                      profile.accountStatus === "active" ? "text-green-700" : "text-gray-600"
                    }`}>
                      {profile.accountStatus.charAt(0).toUpperCase() + profile.accountStatus.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-base">
                <Mail className="h-5 w-5 text-gray-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-gray-900">{profile.email}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3 text-base">
                <Phone className="h-5 w-5 text-gray-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="text-gray-900">{profile.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Address
              </CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
