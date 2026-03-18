import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";

import { Card, CardBody } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { useAuth } from "../hooks/use-auth";
import { Button } from "../components/ui/Button";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { handleLogin, loading, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-950">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-indigo-600">AI Chat</h1>
          <p className="mt-1 text-sm text-gray-500">
            Entre na sua conta para continuar
          </p>
        </div>

        <Card>
          <CardBody>
            <form
              onSubmit={handleSubmit(handleLogin)}
              className="flex flex-col gap-4"
            >
              <Input
                id="email"
                label="E-mail"
                type="email"
                placeholder="seu@email.com"
                error={errors.email?.message}
                {...register("email")}
              />
              <Input
                id="password"
                label="Senha"
                type="password"
                placeholder="••••••"
                error={errors.password?.message}
                {...register("password")}
              />

              {error && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                  {error}
                </p>
              )}

              <Button type="submit" loading={loading} className="mt-2 w-full">
                Entrar
              </Button>

              <p className="text-center text-sm text-gray-500">
                Não tem conta?{" "}
                <Link
                  to="/register"
                  className="font-medium text-indigo-600 hover:underline"
                >
                  Criar conta
                </Link>
              </p>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
