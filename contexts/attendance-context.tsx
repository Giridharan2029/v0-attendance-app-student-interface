"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

export interface Course {
  courseCode: string
  courseName: string
  attendance: number
  faculty: string
  time: string
  isActive?: boolean
}

export interface AttendanceRecord {
  date: string
  day: string
  course: string
  status: "present" | "absent" | "late"
  percentage: number
}

interface AttendanceContextType {
  courses: Course[]
  attendanceRecords: AttendanceRecord[]
  markAttendance: (courseCode: string) => void
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined)

export function AttendanceProvider({ children }: { children: React.ReactNode }) {
  const [courses] = useState<Course[]>([
    {
      courseCode: "CS101",
      courseName: "Data Structures",
      attendance: 85,
      faculty: "Dr. Smith",
      time: "10:00 AM - 11:30 AM",
      isActive: true,
    },
    {
      courseCode: "CS201",
      courseName: "Web Development",
      attendance: 72,
      faculty: "Prof. Johnson",
      time: "2:00 PM - 3:30 PM",
      isActive: false,
    },
    {
      courseCode: "CS301",
      courseName: "Database Systems",
      attendance: 68,
      faculty: "Dr. Williams",
      time: "4:00 PM - 5:30 PM",
      isActive: false,
    },
    {
      courseCode: "MATH101",
      courseName: "Calculus I",
      attendance: 92,
      faculty: "Prof. Brown",
      time: "9:00 AM - 10:00 AM",
      isActive: false,
    },
  ])

  const [attendanceRecords] = useState<AttendanceRecord[]>([
    { date: "2024-01-15", day: "Monday", course: "Data Structures", status: "present", percentage: 85 },
    { date: "2024-01-16", day: "Tuesday", course: "Web Development", status: "present", percentage: 72 },
    { date: "2024-01-17", day: "Wednesday", course: "Database Systems", status: "late", percentage: 68 },
    { date: "2024-01-18", day: "Thursday", course: "Calculus I", status: "present", percentage: 92 },
    { date: "2024-01-19", day: "Friday", course: "Data Structures", status: "absent", percentage: 80 },
    { date: "2024-01-22", day: "Monday", course: "Web Development", status: "present", percentage: 75 },
    { date: "2024-01-23", day: "Tuesday", course: "Database Systems", status: "present", percentage: 70 },
    { date: "2024-01-24", day: "Wednesday", course: "Calculus I", status: "present", percentage: 95 },
  ])

  const markAttendance = (courseCode: string) => {
    // This would typically make an API call to mark attendance
    console.log(`Attendance marked for course: ${courseCode}`)
  }

  return (
    <AttendanceContext.Provider
      value={{
        courses,
        attendanceRecords,
        markAttendance,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  )
}

export function useAttendance() {
  const context = useContext(AttendanceContext)
  if (context === undefined) {
    throw new Error("useAttendance must be used within an AttendanceProvider")
  }
  return context
}
