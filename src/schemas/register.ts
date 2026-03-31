import z from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(3, { message: "Mínimo de 3 dígitos." }),
    password: z.string().min(6, { message: "Mínimo de 6 dígitos." }),
    confirmPassword: z.string().min(6, { message: "Mínimo de 6 dígitos." }),
    email: z.string().email({ message: "E-mail inválido." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
