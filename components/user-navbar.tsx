"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

interface UserNavbarProps {
  currentPage?: string
}

export function UserNavbar({ currentPage = "" }: UserNavbarProps) {
  const menuItems = [
    { title: "Dashboard", url: "/user-dashboard" },
    { title: "My Investments", url: "/my-investments" },
    { title: "Transactions", url: "/transactions" },
    { title: "Profile", url: "/profile" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full p-4 bg-white border-b border-[rgb(233,233,235)]">
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-gray-900">{currentPage}</h1>
          <div className="flex-1 flex justify-center">
            <NavigationMenu className="max-w-full">
              <NavigationMenuList>
                {menuItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink
                      href={item.url}
                      className={`px-4 py-2 relative text-lg transition-colors duration-200 ${
                        currentPage === item.title
                          ? "font-medium text-gray-900"
                          : "text-[rgb(124,126,140)] hover:text-gray-900"
                      }`}
                    >
                      {currentPage === item.title ? (
                        <span className="font-medium text-gray-900">{item.title}</span>
                      ) : (
                        item.title
                      )}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <Badge className="px-4 py-2 text-base bg-gray-900 text-white hover:bg-gray-800 font-medium">
            User
          </Badge>
        </div>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">{currentPage}</h1>
            <div className="flex items-center gap-2">
              <Badge className="px-3 py-1 text-sm bg-gray-900 text-white hover:bg-gray-800 font-medium">
                User
              </Badge>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Navigation</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-4 mt-6">
                    {menuItems.map((item) => (
                      <a
                        key={item.title}
                        href={item.url}
                        className={`text-lg font-semibold px-2 py-2 rounded-md transition-colors duration-200 ${
                          currentPage === item.title
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        {item.title}
                      </a>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
