"use server";

import { prisma } from "@/lib/prisma";
import { UserRole } from "@/generated/prisma/enums";
import { revalidatePath } from "next/cache";

interface DisableTechnicianProps {
  userId: string;
}

export const DisableTechnician = async ({ userId }: DisableTechnicianProps) => {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user || user.role !== UserRole.technical) {
    throw new Error(
      "Usuário não encontrado ou não possui cargo para ser desativado.",
    );
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      isActive: false,
    },
  });

  revalidatePath("/admin/users/technicians");
};
