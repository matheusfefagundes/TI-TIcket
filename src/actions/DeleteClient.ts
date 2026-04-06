"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface DeleteClient {
  userId: string;
}

export const DeleteClient = async ({ userId }: DeleteClient) => {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  await prisma.user.delete({
    where: {
      id: user.id,
    },
  });

  revalidatePath("/admin/users/clients");
};
