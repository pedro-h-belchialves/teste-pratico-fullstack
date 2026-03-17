import { LogOut, User } from "lucide-react";
import { Avatar } from "../ui/Avatar";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

export function Header() {
  const { user, handleLogout } = useAuth();

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center gap-2">
        <span className="text-base font-bold text-indigo-600">AI Chat</span>
      </div>
      <div className="flex items-center gap-2">
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
