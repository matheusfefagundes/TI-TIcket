"use server";

import { prisma } from "@/lib/prisma";
import { TicketStatus } from "@/generated/prisma/enums";
import { revalidatePath } from "next/cache";

export interface UpdateStatusTicket {
  ticketId: number;
  ticketStatus: TicketStatus;
}

export const UpdateStatusTicket = async ({
  ticketId,
  ticketStatus,
}: UpdateStatusTicket) => {
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
    select: {
      status: true,
    },
  });

  if (!ticket) throw new Error("Chamado não encontrado");

  await prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: ticketStatus,
      updatedAt: new Date(),
    },
  });

  revalidatePath(`/technician/tickets/${ticketId}`);
};
