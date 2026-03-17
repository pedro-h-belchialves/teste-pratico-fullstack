import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { Card, CardBody } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

const registerSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { handleRegister, loading, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-950">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-indigo-600">AI Chat</h1>
          <p className="mt-1 text-sm text-gray-500">
            Crie sua conta gratuitamente
          </p>
        </div>

        <Card>
          <CardBody>
            <form
              onSubmit={handleSubmit(handleRegister)}
              className="flex flex-col gap-4"
            >
              <Input
                id="name"
                label="Nome"
                type="text"
                placeholder="Seu nome"
                error={errors.name?.message}
                {...register("name")}
              />
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
                Criar conta
              </Button>

              <p className="text-center text-sm text-gray-500">
                Já tem conta?{" "}
                <Link
                  to="/login"
                  className="font-medium text-indigo-600 hover:underline"
                >
                  Entrar
                </Link>
              </p>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
