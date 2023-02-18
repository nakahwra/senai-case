import { FaChartBar, FaCity, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

interface NavItemProps {
  icon: React.ReactNode;
  title: string;
  path: string;
}

const NavItem = ({ icon, title, path }: NavItemProps) => {
  return (
    <Link
      to={path}
      className="flex items-center transition-colors duration-150 hover:text-indigo-600"
    >
      <div className="px-6 py-6 space-x-4">{icon}</div>
      <span>{title}</span>
    </Link>
  );
};

function Navbar() {
  return (
    <nav className="z-10 left-0 transition-all duration-300 fixed flex flex-col h-screen w-[64px] overflow-hidden bg-slate-800 hover:w-[200px] pt-3.5">
      <NavItem icon={<FaUser />} title="Usuários" path="/users" />

      <NavItem icon={<FaCity />} title="Ambientes" path="/environments" />

      <NavItem icon={<FaChartBar />} title="Dashboard" path="/dashboard" />
    </nav>
  );
}

export default Navbar;
