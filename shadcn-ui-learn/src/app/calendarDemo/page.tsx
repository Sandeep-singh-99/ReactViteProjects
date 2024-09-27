'use client'
import React from 'react'
import { Calendar } from "@/components/ui/calendar"
function CalendarDemo() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <div className='flex justify-center items-center h-screen bg-red-500'>
        <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
    </div>
  )
}

export default CalendarDemo