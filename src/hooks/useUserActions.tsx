import { DeleteClient } from "@/actions/DeleteClient";
import { DisableTechnician } from "@/actions/DisableTechnician";

export function useUserActions(userId: string) {
  const disableTechnician = async () => {
    await DisableTechnician({ userId });
  };

  const deleteClient = async () => {
    await DeleteClient({ userId });
  };

  return {
    disableTechnician,
    deleteClient,
  };
}
