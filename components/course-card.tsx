import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { Badge } from "@/components/ui/badge"

interface CourseCardProps {
  courseCode: string
  courseName: string
  attendance: number
  faculty: string
  time: string
  isActive?: boolean
}

export function CourseCard({ courseCode, courseName, attendance, faculty, time, isActive = false }: CourseCardProps) {
  const getStatusColor = (percentage: number) => {
    if (percentage >= 75) return "#10b981" // green
    if (percentage >= 65) return "#f59e0b" // yellow
    return "#ef4444" // red
  }

  const getStatusLabel = (percentage: number) => {
    if (percentage >= 75) return "Good"
    if (percentage >= 65) return "At Risk"
    return "Critical"
  }

  return (
    <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-gray-900">{courseName}</h3>
          <p className="text-sm text-gray-600">{courseCode}</p>
        </div>
        {isActive && <Badge className="bg-green-500 text-white text-xs">Active</Badge>}
      </div>

      <div className="flex items-center gap-4">
        <div className="w-16 h-16">
          <CircularProgressbar
            value={attendance}
            text={`${attendance}%`}
            styles={buildStyles({
              rotation: 0.25,
              strokeLinecap: "round",
              textSize: "24px",
              pathTransitionDuration: 0.5,
              pathColor: getStatusColor(attendance),
              textColor: getStatusColor(attendance),
              trailColor: "#e5e7eb",
              backgroundColor: "#f3f4f6",
            })}
          />
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-600">Status</p>
          <p className="font-semibold text-gray-900">{getStatusLabel(attendance)}</p>
          <p className="text-xs text-gray-500 mt-2">{faculty}</p>
          <p className="text-xs text-gray-500">{time}</p>
        </div>
      </div>
    </div>
  )
}
