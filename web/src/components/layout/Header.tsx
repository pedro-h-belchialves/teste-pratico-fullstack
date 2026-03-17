import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { LogOut, User, Sun, Moon } from "lucide-react";
import { useAuth } from "../../hooks/use-auth";
import { Button } from "../ui/Button";
import { Avatar } from "../ui/Avatar";

function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return { isDark, toggle: () => setIsDark((v) => !v) };
}

export function Header() {
  const { user, handleLogout } = useAuth();
  const { isDark, toggle } = useDarkMode();

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center gap-2">
        <span className="text-base font-bold text-indigo-600">AI Chat</span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggle}
          title={isDark ? "Modo claro" : "Modo escuro"}
        >
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </Button>
        <Link
          to="/profile"
          className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Avatar name={user?.name} size="sm" />
          <span className="hidden text-sm font-medium text-gray-700 dark:text-gray-300 sm:block">
            {user?.name}
          </span>
        </Link>
        <Link to="/profile">
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <User size={15} />
          </Button>
        </Link>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut size={15} />
        </Button>
      </div>
    </header>
  );
}
