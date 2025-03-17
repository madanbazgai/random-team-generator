import { Link, useLocation } from "@tanstack/react-router";

export function Header() {
  const currentPath = useLocation().pathname;

  return (
    <header className="bg-gradient-to-r from-indigo-700 to-indigo-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center space-x-1 sm:space-x-4">
          <NavLink to="/" isActive={currentPath === "/"}>
            Home
          </NavLink>
          <NavLink to="/players" isActive={currentPath.startsWith("/players")}>
            Players
          </NavLink>
          <NavLink to="/teams" isActive={currentPath.startsWith("/teams")}>
            Teams
          </NavLink>
          <NavLink
            to="/generated-team"
            isActive={currentPath.startsWith("/generated-team")}
          >
            Generated Team
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

type NavLinkProps = {
  to: string;
  isActive: boolean;
  children: React.ReactNode;
};

function NavLink({ to, isActive, children }: NavLinkProps) {
  return (
    <Link
      to={to}
      className={`relative px-4 py-2 rounded-md font-medium transition-all duration-300 ease-in-out hover:bg-white/10 ${
        isActive ? "text-white" : "text-indigo-100 hover:text-white"
      }`}
    >
      {children}
      <span 
        className={`absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full transform origin-left transition-all duration-300 ${
          isActive ? "scale-x-100" : "scale-x-0"
        }`} 
      />
    </Link>
  );
}