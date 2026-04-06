import { SignInFormData } from "@/schemas/login";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useLogin() {
  const router = useRouter();

  async function loginAction(values: SignInFormData) {
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (response?.error) {
        toast.error("E-mail e/ou senha inválidos.");
        return;
      }

      router.replace("/admin/tickets");
      router.refresh();
    } catch (error) {
      console.log(error);

      toast.error("Erro ao tentar fazer login. Tente novamente mais tarde.");
    }
  }

  return {
    loginAction,
  };
}
