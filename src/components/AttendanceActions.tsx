"use client";

import { cn } from "@/lib/classMerge";
import { Button } from "./ui/button";
import Image from "next/image";
import { statusMap } from "@/utils/status-ticket";
import { useSession } from "next-auth/react";
import { TicketStatus } from "@/generated/prisma/enums";
import { Prisma } from "@/generated/prisma/client";
import { useStatus } from "@/hooks/useStatus";

interface AttendanceActionsProps {
  ticket: Prisma.TicketGetPayload<{
    select: {
      status: true;
      ticketServices: {
        select: {
          service: true;
        };
      };
      client: true;
      technician: true;
    };
  }>;
  ticketId: number;
}

export function AttendanceActions({
  ticket,
  ticketId,
}: AttendanceActionsProps) {
  const { data: session } = useSession();

  const { onSubmit } = useStatus();

  if (!session) return null;

  const isTechnician = session.user.role === "technical";

  const currentStatusKey = ticket.status as TicketStatus;

  const availableStatuses = (Object.keys(statusMap) as TicketStatus[]).filter(
    (status) => status !== currentStatusKey,
  );

  return (
    <div className="flex gap-2">
      {availableStatuses.map((statusKey, index) => {
        const config = statusMap[statusKey];

        return (
          <Button
            key={index}
            variant="ghost"
            onClick={() => onSubmit({ ticketId, ticketStatus: statusKey })}
            className={cn([
              "bg-app-gray-500 flex w-max items-center justify-center gap-2 rounded-lg px-5 py-2.5",
              isTechnician && config === statusMap[TicketStatus.inAttendance]
                ? "bg-app-gray-200 text-app-gray-600"
                : "",
            ])}
          >
            <Image
              src={
                isTechnician
                  ? config === statusMap[TicketStatus.inAttendance]
                    ? config.iconWhite
                    : config.iconTicket
                  : config.iconTicket
              }
              alt={config.title}
              width={18}
              height={18}
            />
            <p className="text-sm font-bold">
              {isTechnician ? config.label : config.title}
            </p>
          </Button>
        );
      })}
    </div>
  );
}
