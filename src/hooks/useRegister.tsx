"use client";

import { RegisterFormData } from "@/schemas/register";
import { api } from "@/services/api";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function useRegister() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  async function registerUser(data: RegisterFormData) {
    setIsLoading(true);
    setApiError("");

    try {
      await api.post("/api/auth/register", data);

      toast.success("Conta criada com sucesso!");

      router.replace("/");
    } catch (error: unknown) {
      let errorMessage = "Erro inesperado. Tente novamente mais tarde!";

      if (error instanceof AxiosError && error.response?.data) {
        errorMessage =
          typeof error.response.data === "string"
            ? error.response.data
            : error.response.data.message || errorMessage;

        setApiError(errorMessage);
      } else {
        toast.error("Erro inesperado. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    registerUser,
    apiError,
  };
}
