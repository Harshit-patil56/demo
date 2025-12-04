import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 z-50 w-full p-4 bg-white border-b border-[rgb(233,233,235)]">
        <div style={{maxWidth: '1600px', margin: '0 auto'}}>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
            <div className="flex-1 flex justify-center">
              <NavigationMenu className="max-w-full">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/dashboard" className="px-4 py-2 relative text-lg">
                      <span className="font-medium text-gray-900">Dashboard</span>
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
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="@container/card border-[rgb(233,233,235)]">
            <CardHeader>
              <CardDescription className="text-lg font-semibold text-gray-800">Total Users</CardDescription>
              <CardTitle className="text-4xl font-semibold text-gray-600 tabular-nums @[250px]/card:text-5xl">
                1,234
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  +12.5%
                </Badge>
              </CardAction>
            </CardHeader>
          </Card>

          <Card className="@container/card">
            <CardHeader>
              <CardDescription className="text-lg font-semibold text-gray-800">Total Invested Amount</CardDescription>
              <CardTitle className="text-4xl font-semibold text-gray-600 tabular-nums @[250px]/card:text-5xl">
                ₹2,45,00,000
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  +8.3%
                </Badge>
              </CardAction>
            </CardHeader>
          </Card>

          <Card className="@container/card border-[rgb(233,233,235)]">
            <CardHeader>
              <CardDescription className="text-lg font-semibold text-gray-800">Active Investments</CardDescription>
              <CardTitle className="text-4xl font-semibold text-gray-600 tabular-nums @[250px]/card:text-5xl">
                45,678
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  +15.2%
                </Badge>
              </CardAction>
            </CardHeader>
          </Card>

          <Card className="@container/card border-[rgb(233,233,235)]">
            <CardHeader>
              <CardDescription className="text-lg font-semibold text-gray-800">Total Daily Profit</CardDescription>
              <CardTitle className="text-4xl font-semibold text-gray-600 tabular-nums @[250px]/card:text-5xl">
                ₹12,500
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  +4.5%
                </Badge>
              </CardAction>
            </CardHeader>
          </Card>

          <Card className="@container/card border-[rgb(233,233,235)]">
            <CardHeader>
              <CardDescription className="text-lg font-semibold text-gray-800">Pending Requests</CardDescription>
              <CardTitle className="text-4xl font-semibold text-gray-600 tabular-nums @[250px]/card:text-5xl">
                87
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingDown />
                  -20%
                </Badge>
              </CardAction>
            </CardHeader>
          </Card>

          <Card className="@container/card border-[rgb(233,233,235)]">
            <CardHeader>
              <CardDescription className="text-lg font-semibold text-gray-800">Upcoming Maturities</CardDescription>
              <CardTitle className="text-4xl font-semibold text-gray-600 tabular-nums @[250px]/card:text-5xl">
                23
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  +5.2%
                </Badge>
              </CardAction>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
