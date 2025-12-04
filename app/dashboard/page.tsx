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
import { AdminNavbar } from "@/components/admin-navbar"
import { ChartUsersMaturities } from "@/components/chart-users-maturities"
import { ChartAdminMetrics } from "@/components/chart-admin-metrics"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar currentPage="Dashboard" />

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

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ChartUsersMaturities />
          <ChartAdminMetrics />
        </div>
      </div>
    </div>
  );
}
