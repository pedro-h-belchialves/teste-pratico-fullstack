import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";

import { ArrowLeft, CheckCircle } from "lucide-react";
import { useAuthContext } from "../contexts/auth-context";
import { updateUser } from "../services/user.service";
import { Card, CardBody, CardHeader } from "../components/ui/Card";
import { Avatar } from "../components/ui/Avatar";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

const profileSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { user, setSession } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (user) {
      reset({ name: user.name, email: user.email });
    }
  }, [user, reset]);

  async function onSubmit(data: ProfileFormData) {
    if (!user) return;
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const updatedUser = await updateUser(user.id, data);
      import("../utils/storage").then(({ getToken }) => {
        const token = getToken()!;
        setSession(token, updatedUser);
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: unknown) {
      const e = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      setError(
        e.response?.data?.message || e.message || "Erro ao salvar perfil",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-950">
      <div className="mx-auto max-w-lg">
        <Link
          to="/chat"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ArrowLeft size={16} />
          Voltar ao chat
        </Link>

        <Card>
          <CardHeader>
            <div className="flex flex-col items-center gap-3 pb-4">
              <Avatar name={user?.name} size="lg" />
              <div className="text-center">
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {user?.name}
                </h1>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
          </CardHeader>
          <CardBody className="pt-0">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <Input
                id="name"
                label="Nome"
                type="text"
                error={errors.name?.message}
                {...register("name")}
              />
              <Input
                id="email"
                label="E-mail"
                type="email"
                error={errors.email?.message}
                {...register("email")}
              />

              {error && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                  {error}
                </p>
              )}
              {success && (
                <p className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-600 dark:bg-green-900/20 dark:text-green-400">
                  <CheckCircle size={15} />
                  Perfil atualizado com sucesso!
                </p>
              )}

              <Button type="submit" loading={loading} className="w-full">
                Salvar alterações
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
