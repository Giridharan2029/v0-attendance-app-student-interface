"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit2, Moon, Sun, LogOut } from "lucide-react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { useAuth } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/protected-route"

interface User {
  email: string
  name: string
  avatar: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { user: authUser, logout } = useAuth()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/")
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const overallAttendance = 82
  const courseStats = [
    { name: "Data Structures", attendance: 85, code: "CS101" },
    { name: "Web Development", attendance: 72, code: "CS201" },
    { name: "Database Systems", attendance: 68, code: "CS301" },
    { name: "Calculus I", attendance: 92, code: "MATH101" },
  ]

  if (!user) return null

  return (
    <ProtectedRoute>
      <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gradient-to-br from-slate-50 to-slate-100"}`}>
        {/* Header */}
        <div
          className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border-b sticky top-0 z-40`}
        >
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
            <button
              onClick={() => router.push("/dashboard")}
              className={`p-2 rounded-lg transition ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
            >
              <ArrowLeft className={`w-5 h-5 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`} />
            </button>
            <h1 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Profile</h1>
            <div className="w-10"></div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
          {/* Profile Header */}
          <Card className={`mb-6 p-6 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-16 h-16 rounded-full" />
                <div>
                  <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{user.name}</h2>
                  <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>{user.email}</p>
                </div>
              </div>
              <button className={`p-2 rounded-lg transition ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
                <Edit2 className={`w-5 h-5 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`} />
              </button>
            </div>
          </Card>

          {/* Overall Attendance */}
          <Card className={`mb-6 p-6 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
            <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Overall Attendance
            </h3>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24">
                <CircularProgressbar
                  value={overallAttendance}
                  text={`${overallAttendance}%`}
                  styles={buildStyles({
                    rotation: 0.25,
                    strokeLinecap: "round",
                    textSize: "20px",
                    pathTransitionDuration: 0.5,
                    pathColor: "#3b82f6",
                    textColor: isDarkMode ? "#fff" : "#000",
                    trailColor: isDarkMode ? "#374151" : "#e5e7eb",
                    backgroundColor: isDarkMode ? "#1f2937" : "#f3f4f6",
                  })}
                />
              </div>
              <div>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Status</p>
                <Badge className="bg-green-500 text-white mb-2">Good Standing</Badge>
                <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Keep up the great attendance!
                </p>
              </div>
            </div>
          </Card>

          {/* Course-wise Breakdown */}
          <Card className={`mb-6 p-6 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
            <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Course-wise Breakdown
            </h3>
            <div className="space-y-3">
              {courseStats.map((course) => (
                <div key={course.code} className="flex items-center justify-between">
                  <div>
                    <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>{course.name}</p>
                    <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{course.code}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12">
                      <CircularProgressbar
                        value={course.attendance}
                        text={`${course.attendance}%`}
                        styles={buildStyles({
                          rotation: 0.25,
                          strokeLinecap: "round",
                          textSize: "12px",
                          pathTransitionDuration: 0.5,
                          pathColor:
                            course.attendance >= 75 ? "#10b981" : course.attendance >= 65 ? "#f59e0b" : "#ef4444",
                          textColor: isDarkMode ? "#fff" : "#000",
                          trailColor: isDarkMode ? "#374151" : "#e5e7eb",
                          backgroundColor: isDarkMode ? "#1f2937" : "#f3f4f6",
                        })}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Settings */}
          <Card className={`mb-6 p-6 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
            <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isDarkMode ? (
                    <Moon className="w-5 h-5 text-blue-500" />
                  ) : (
                    <Sun className="w-5 h-5 text-yellow-500" />
                  )}
                  <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Dark Mode</span>
                </div>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                    isDarkMode ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      isDarkMode ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </Card>

          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold h-12 rounded-xl flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </div>
    </ProtectedRoute>
  )
}
