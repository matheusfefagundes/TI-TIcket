import { FetchTechnicianById } from "@/actions/FetchTechnicianById";
import { NewTechnicianFormData } from "@/schemas/new-technician";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

export function useTechnicianDetails() {
  const [availabilities, setAvailabilities] = useState<string[] | null>(null);

  const { setValue, watch } = useFormContext<NewTechnicianFormData>();

  const fetchTechnician = useCallback(
    async (userId: string) => {
      if (!userId) return;

      try {
        const data = await FetchTechnicianById({ userId });

        setValue("name", data.name);
        setValue("email", data.email);
        setAvailabilities(data.availabilities[0].schedules);
      } catch (error) {
        console.log(error);

        toast.error(
          "Não foi possível exibir as informações do técnico. Tente novamente mais tarde.",
        );
      }
    },
    [setValue],
  );

  const params = useParams<{ id: string }>();

  useEffect(() => {
    const loadData = async () => {
      if (params.id) {
        await fetchTechnician(params.id);
      }
    };

    loadData();
  }, [params.id, fetchTechnician]);

  useEffect(() => {
    if (availabilities) setValue("availabilities", availabilities);
  }, [availabilities, setValue]);

  return {
    fetchTechnician,
    availabilities,
    params,
    email: watch("email"),
    name: watch("name"),
  };
}
