"use client";

import { UpdateStatusTicket } from "@/actions/UpdateStatusTicket";
import { toast } from "sonner";

export function useStatus() {
  const onSubmit = async ({ ticketId, ticketStatus }: UpdateStatusTicket) => {
    try {
      await UpdateStatusTicket({ ticketId, ticketStatus });

      toast.success("Chamado atualizado com sucesso!");
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(
          "Não foi possível atualizar o status. Tente novamente mais tarde.",
        );
      }
    }
  };

  return {
    onSubmit,
  };
}
