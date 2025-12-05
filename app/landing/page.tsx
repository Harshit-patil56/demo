"use client"

import { Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

const plans = [
  {
    id: "1",
    name: "Standard Plan",
    interestRate: 8.5,
    interestType: "simple",
    duration: 12,
    minAmount: 10000,
    maxAmount: 100000,
    features: [
      "Simple interest calculation",
      "12 months duration",
      "₹10,000 - ₹1,00,000 range",
      "Regular monthly payouts"
    ],
  },
  {
    id: "2",
    name: "Premium Plan",
    interestRate: 12,
    interestType: "compound",
    duration: 24,
    minAmount: 100000,
    maxAmount: 1000000,
    features: [
      "Compound interest calculation",
      "24 months duration",
      "₹1,00,000 - ₹10,00,000 range",
      "Higher returns on maturity"
    ],
  },
  {
    id: "3",
    name: "Elite Plan",
    interestRate: 15,
    interestType: "compound",
    duration: 36,
    minAmount: 500000,
    maxAmount: 5000000,
    features: [
      "Compound interest calculation",
      "36 months duration",
      "₹5,00,000 - ₹50,00,000 range",
      "Premium support & benefits"
    ],
  }
]

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{background: '#F0FFF4'}}>
      <div className="p-8 md:p-16" style={{maxWidth: '1400px', margin: '0 auto'}}>
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4" style={{color: '#2D3748'}}>Investment Plans</h1>
          <p className="text-xl" style={{color: '#2F855A'}}>Choose the plan that fits your goals</p>
        </div>
        
        <div className="flex w-full flex-col items-stretch gap-8 md:flex-row">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className="group relative flex w-full flex-col rounded-2xl p-8 text-left transition-all duration-300 cursor-pointer overflow-hidden"
              style={{
                backgroundColor: '#ffffff',
                border: '2px solid #e5e7eb',
                boxShadow: index === 1 ? '0 8px 24px rgba(47, 133, 90, 0.12)' : '0 4px 12px rgba(0,0,0,0.05)',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(47, 133, 90, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = index === 1 ? '0 8px 24px rgba(47, 133, 90, 0.12)' : '0 4px 12px rgba(0,0,0,0.05)'
              }}
            >
              {/* Animated border highlight */}
              <div 
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, #48BB78 50%, transparent 100%)',
                  backgroundSize: '200% 100%',
                  animation: 'borderMove 7.5s linear infinite',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  padding: '4px'
                }}
              />
              
              {/* Special deal ribbon for Premium plan */}
              {index === 1 && (
                <div className="absolute -right-12 top-8 rotate-45 px-16 py-2 text-white text-xs font-bold shadow-lg"
                     style={{backgroundColor: '#2F855A'}}>
                  POPULAR
                </div>
              )}
              
              <div className="mb-6 flex items-center justify-between">
                <Badge className="text-xs font-semibold px-4 py-1.5 transition-transform duration-200 group-hover:scale-105" 
                       style={{backgroundColor: '#2F855A', color: 'white'}}>
                  {plan.name.toUpperCase()}
                </Badge>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold transition-colors duration-300" 
                        style={{color: '#2F855A'}}>
                    {plan.interestRate}%
                  </span>
                  <span className="text-lg font-medium" style={{color: '#2D3748'}}>returns</span>
                </div>
                <div className="space-y-1" style={{color: '#2D3748'}}>
                  <p className="text-base font-medium">{plan.duration} months</p>
                  <p className="text-sm opacity-75">{plan.interestType === "simple" ? "Simple" : "Compound"} interest</p>
                </div>
              </div>
              
              <div className="h-0.5 w-full mb-6" 
                   style={{backgroundColor: '#48BB78'}} />
              
              <div className="flex-1 mb-8">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start gap-3 opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <div className="mt-0.5 transition-transform duration-200 group-hover:scale-110">
                        <Check className="size-5" 
                               style={{color: '#48BB78', strokeWidth: 2.5}} />
                      </div>
                      <span className="text-sm leading-relaxed" style={{color: '#2D3748'}}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Button 
                className="w-full py-6 text-base font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-lg cursor-pointer"
                style={{
                  backgroundColor: index === 1 ? '#2F855A' : '#2D3748',
                  color: 'white'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#48BB78'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = index === 1 ? '#2F855A' : '#2D3748'
                }}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
        
        <style jsx>{`
          @keyframes borderMove {
            0% {
              background-position: 200% 0;
            }
            100% {
              background-position: -200% 0;
            }
          }
        `}</style>
      </div>
    </div>
  )
}
