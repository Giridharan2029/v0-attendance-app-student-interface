"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Download, ArrowLeft } from "lucide-react"
import { useAttendance } from "@/contexts/attendance-context"
import { ProtectedRoute } from "@/components/protected-route"

interface AttendanceRecord {
  date: string
  day: string
  course: string
  status: "present" | "absent" | "late"
  percentage: number
}

export default function HistoryPage() {
  const router = useRouter()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedCourse, setSelectedCourse] = useState("all")

  const { attendanceRecords } = useAttendance()

  const courses = ["all", "Data Structures", "Web Development", "Database Systems", "Calculus I"]

  const filteredRecords =
    selectedCourse === "all" ? attendanceRecords : attendanceRecords.filter((r) => r.course === selectedCourse)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800"
      case "absent":
        return "bg-red-100 text-red-800"
      case "late":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const monthName = currentMonth.toLocaleString("default", { month: "long", year: "numeric" })
  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDay = getFirstDayOfMonth(currentMonth)

  const calendarDays = []
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i)
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-8">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
            <button onClick={() => router.push("/dashboard")} className="p-2 hover:bg-gray-100 rounded-lg transition">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Attendance History</h1>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-6">
          {/* Calendar */}
          <Card className="mb-6 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">{monthName}</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                  {day}
                </div>
              ))}
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium ${
                    day ? "bg-blue-50 text-gray-900 hover:bg-blue-100 cursor-pointer transition" : "text-gray-300"
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </Card>

          {/* Filters */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Filter by Course</h3>
            <div className="flex flex-wrap gap-2">
              {courses.map((course) => (
                <button
                  key={course}
                  onClick={() => setSelectedCourse(course)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    selectedCourse === course
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {course === "all" ? "All Courses" : course}
                </button>
              ))}
            </div>
          </div>

          {/* Attendance Records */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Recent Sessions</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition text-sm font-medium text-gray-700">
                <Download className="w-4 h-4" />
                Export PDF
              </button>
            </div>

            {filteredRecords.map((record, index) => (
              <Card key={index} className="p-4 hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">{record.course}</p>
                        <p className="text-sm text-gray-600">
                          {record.date} • {record.day}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={`${getStatusColor(record.status)} mb-2`}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </Badge>
                    <p className="text-sm font-semibold text-gray-900">{record.percentage}%</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
