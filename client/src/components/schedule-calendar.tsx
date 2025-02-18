import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export function ScheduleCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Card>
      <CardHeader>
        <CardTitle>Class Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </CardContent>
    </Card>
  );
}
