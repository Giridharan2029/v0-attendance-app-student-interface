"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { CourseCard } from "@/components/course-card"
import { Bell, Search, LogOut } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useAttendance } from "@/contexts/attendance-context"
import { ProtectedRoute } from "@/components/protected-route"

interface User {
  email: string
  name: string
  avatar: string
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, logout, setUser } = useAuth()
  const { courses } = useAttendance()

  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("home")

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/")
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  const filteredCourses = courses.filter(
    (course) =>
      course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.courseCode.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!user) return null

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-10 h-10 rounded-full" />
              <div>
                <p className="text-sm text-gray-600">Welcome back</p>
                <p className="font-semibold text-gray-900">{user.name}</p>
              </div>
            </div>
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-gray-200 rounded-xl h-11"
            />
          </div>

          {/* Courses Grid */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Your Courses</h2>
            {filteredCourses.map((course) => (
              <CourseCard key={course.courseCode} {...course} />
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-2xl mx-auto">
          <div className="flex items-center justify-around px-4 py-3">
            <button
              onClick={() => setActiveTab("home")}
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition ${
                activeTab === "home" ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
              <span className="text-xs font-medium">Home</span>
            </button>
            <button
              onClick={() => router.push("/history")}
              className="flex flex-col items-center gap-1 py-2 px-4 rounded-lg text-gray-600 hover:bg-gray-50 transition"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
              </svg>
              <span className="text-xs font-medium">History</span>
            </button>
            <button
              onClick={() => router.push("/profile")}
              className="flex flex-col items-center gap-1 py-2 px-4 rounded-lg text-gray-600 hover:bg-gray-50 transition"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              <span className="text-xs font-medium">Profile</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex flex-col items-center gap-1 py-2 px-4 rounded-lg text-gray-600 hover:bg-gray-50 transition"
            >
              <LogOut className="w-6 h-6" />
              <span className="text-xs font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
