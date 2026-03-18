import { Link } from "react-router-dom";

import {
  MessageSquare,
  Zap,
  Shield,
  Bot,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardBody } from "../components/ui/Card";
import { Avatar } from "../components/ui/Avatar";

const features = [
  {
    icon: <Bot size={22} className="text-indigo-500" />,
    title: "IA Simulada",
    description:
      "Converse com uma inteligência artificial treinada para responder suas dúvidas de forma natural e fluida.",
  },
  {
    icon: <MessageSquare size={22} className="text-indigo-500" />,
    title: "Histórico de conversas",
    description:
      "Todas as suas conversas ficam salvas e organizadas na sidebar para você acessar quando quiser.",
  },
  {
    icon: <Zap size={22} className="text-indigo-500" />,
    title: "Respostas instantâneas",
    description:
      "Sem espera. As respostas chegam em tempo real, garantindo uma experiência fluida e sem interrupções.",
  },
  {
    icon: <Shield size={22} className="text-indigo-500" />,
    title: "Seguro e privado",
    description:
      "Sua sessão é protegida por autenticação JWT. Nenhuma conversa é compartilhada com terceiros.",
  },
];

const testemonials = [
  {
    name: "Ana Lima",
    role: "Designer UX",
    message:
      "Uso todo dia para tirar dúvidas rápidas. Interface limpa e respostas precisas!",
  },
  {
    name: "Carlos Souza",
    role: "Desenvolvedor",
    message:
      "A melhor ferramenta de chat com IA que já experimentei. Simples e eficiente.",
  },
  {
    name: "Mariana Costa",
    role: "Product Manager",
    message: "Facilitou demais o meu dia a dia. Recomendo para toda a equipe.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 dark:border-gray-800 dark:bg-gray-900">
        <span className="text-lg font-bold text-indigo-600">AI Chat</span>
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Entrar
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="primary" size="sm">
              Criar conta
            </Button>
          </Link>
        </div>
      </header>

      <section className="mx-auto flex max-w-4xl flex-col items-center px-6 py-20 text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
          <Bot size={13} /> Powered by Pedro
        </span>
        <h1 className="text-4xl font-bold leading-tight text-gray-900 dark:text-white sm:text-5xl">
          Converse com IA de forma{" "}
          <span className="text-indigo-600">simples e inteligente</span>
        </h1>
        <p className="mt-5 max-w-xl text-base text-gray-500 dark:text-gray-400">
          O AI Chat é uma plataforma de conversação com IA. Crie conversas,
          obtenha respostas e mantenha seu histórico sempre acessível.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/register">
            <Button size="lg" className="gap-2">
              Começar gratuitamente <ArrowRight size={16} />
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary" size="lg">
              Já tenho conta
            </Button>
          </Link>
        </div>
        <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
          {[
            "Sem cartão de crédito",
            "Configuração em segundos",
            "Histórico ilimitado",
          ].map((item) => (
            <li key={item} className="flex items-center gap-1.5">
              <CheckCircle size={13} className="text-indigo-500" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-gray-200 bg-white py-16 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-10 text-center text-2xl font-bold text-gray-900 dark:text-white">
            Tudo que você precisa em um só lugar
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <Card key={f.title}>
                <CardBody className="flex flex-col gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-900/30">
                    {f.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                    {f.description}
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="mb-10 text-center text-2xl font-bold text-gray-900 dark:text-white">
          O que os usuários dizem
        </h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {testemonials.map((t) => (
            <Card key={t.name}>
              <CardBody className="flex flex-col gap-4">
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  "{t.message}"
                </p>
                <div className="flex items-center gap-3">
                  <Avatar name={t.name} size="sm" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {t.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {t.role}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-gray-200 bg-indigo-600 py-16 dark:border-gray-800">
        <div className="mx-auto max-w-xl px-6 text-center">
          <h2 className="text-2xl font-bold text-white">
            Pronto para começar?
          </h2>
          <p className="mt-3 text-indigo-200">
            Crie sua conta gratuita agora e comece a conversar com IA em
            segundos.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/register">
              <Button
                variant="secondary"
                size="lg"
                className="gap-2 bg-white text-indigo-600 hover:bg-indigo-50"
              >
                Criar conta grátis <ArrowRight size={16} />
              </Button>
            </Link>
            <Link to="/login">
              <Button
                size="lg"
                className="bg-indigo-700 text-white hover:bg-indigo-800"
              >
                Fazer login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t flex flex-col border-gray-200 bg-white py-6 dark:border-gray-800 dark:bg-gray-900">
        <p className="text-center text-sm text-gray-400">
          © {new Date().getFullYear()} AI Chat. Todos os direitos reservados.
        </p>
        <span className="text-center text-sm text-gray-400">
          Powered by
          <a href="https://github.com/pedro-h-belchialves">Pedro Alves</a>
        </span>
      </footer>
    </div>
  );
}
