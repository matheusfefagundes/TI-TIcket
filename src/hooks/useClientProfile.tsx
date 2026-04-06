import { UpdateClient } from "@/actions/UpdateClient";
import {
  UpdateClientFormData,
  updateClientSchema,
} from "@/schemas/update-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function useClientProfile(initialEmail: string) {
  const methods = useForm<UpdateClientFormData>({
    resolver: zodResolver(updateClientSchema),
    defaultValues: {
      email: initialEmail,
    },
  });

  const { setValue, watch } = methods;

  const onSubmit = useCallback(
    async (userId: string, data: UpdateClientFormData) => {
      if (!userId) return;

      try {
        await UpdateClient({ userId, data });

        toast.success("Cliente atualizado com sucesso!");

        setValue("email", data.email);
      } catch (error) {
        console.log(error);
        toast.error(
          "Não foi possível atualizar o cliente. Tente novamente mais tarde.",
        );
      }
    },
    [setValue],
  );

  return {
    methods,
    onSubmit,
    email: watch("email"),
  };
}
