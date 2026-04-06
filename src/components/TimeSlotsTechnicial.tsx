import { useScheduleLimit } from "@/hooks/useScheduleLimit";
import { Prisma } from "@/generated/prisma/client";

interface TimeSlotsTechnicialProps {
  availabilities: Prisma.TechnicianAvailabilityGetPayload<{
    select: {
      schedules: true;
    };
  }>;
}

export function TimeSlotsTechnicial({
  availabilities,
}: TimeSlotsTechnicialProps) {
  const limit = useScheduleLimit();
  const totalSchedules = availabilities.schedules.length;

  return (
    <div className="flex gap-1">
      {availabilities.schedules.map((hour, index) => {
        if (index >= limit) return null;

        if (index === limit - 1) {
          const rest = totalSchedules - (limit - 1);

          return (
            <div
              className="border-app-gray-500 rounded-2xl border p-1.5"
              key={index}
            >
              <p className="text-app-gray-400 text-xs font-bold">+{rest}</p>
            </div>
          );
        }

        return (
          <div
            className="border-app-gray-500 rounded-2xl border p-1.5"
            key={index}
          >
            <p className="text-app-gray-400 text-xs font-bold">{hour}</p>
          </div>
        );
      })}
    </div>
  );
}

{
}
