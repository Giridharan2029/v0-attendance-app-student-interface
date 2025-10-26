"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Wifi, CheckCircle, ArrowLeft } from "lucide-react"
import { useAttendance } from "@/contexts/attendance-context"
import { ProtectedRoute } from "@/components/protected-route"

export default function MarkAttendancePage() {
  const router = useRouter()
  const { markAttendance } = useAttendance()
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [isMarked, setIsMarked] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleMarkAttendance = () => {
    setIsAnimating(true)
    markAttendance("CS101") // Pass actual course code
    setTimeout(() => {
      setIsMarked(true)
    }, 600)
  }

  if (isMarked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
              <div className="relative w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Attendance Marked!</h1>
          <p className="text-gray-600 mb-8">Your attendance has been successfully recorded.</p>
          <Button onClick={() => router.push("/dashboard")} className="bg-green-600 hover:bg-green-700">
            Back to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-8">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
          {/* WiFi Icon Animation */}
          <div className={`mb-8 transition-all duration-500 ${isAnimating ? "scale-110" : "scale-100"}`}>
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-pulse"></div>
              <Wifi className="w-12 h-12 text-blue-600" />
            </div>
          </div>

          {/* Classroom Name */}
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-2">CS_LAB_1_5G</h1>
          <p className="text-gray-600 text-center mb-8">Detected Classroom</p>

          {/* Connection Status */}
          <Card className="w-full max-w-sm mb-8 p-6 bg-white border-green-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-semibold text-gray-900">Connected to: CS_LAB_1_5G</span>
            </div>
            <p className="text-sm text-gray-600">IP Address: 192.168.1.105</p>
          </Card>

          {/* Course Details */}
          <Card className="w-full max-w-sm mb-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-3">Course Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Course:</span>
                <span className="font-medium text-gray-900">Data Structures (CS101)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Faculty:</span>
                <span className="font-medium text-gray-900">Dr. Smith</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium text-gray-900">10:00 AM - 11:30 AM</span>
              </div>
            </div>
          </Card>

          {/* Mark Attendance Button */}
          <Button
            onClick={handleMarkAttendance}
            disabled={isAnimating}
            className="w-full max-w-sm h-16 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg rounded-2xl mb-8 transition-all duration-300 transform hover:scale-105 disabled:scale-100"
          >
            {isAnimating ? "Marking..." : "Mark Attendance"}
          </Button>

          {/* Timer */}
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">Time Remaining</p>
            <div className="text-5xl font-bold text-blue-600 font-mono">{formatTime(timeLeft)}</div>
            <p className="text-gray-500 text-xs mt-2">Session expires in {formatTime(timeLeft)}</p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
