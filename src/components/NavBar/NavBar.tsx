import { Link } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/outline";
import crfmLogo from "@/assets/crfm-logo.png";
import helmLogo from "@/assets/helm-logo-simple.png";

export default function NavBar() {
  return (
    <nav className="navbar h-24 px-8 md:px-12 bg-base-100 max-w[1500]px">
      <div>
        <div className="dropdown md:hidden mr-4">
          <label
            tabIndex={0}
            className="btn btn-ghost hover:bg-transparent btn-lg px-0"
          >
            <Bars3Icon className="w-16 h-16" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-lg dropdown-content mt-3 z-[1] p-2 bg-base-100 shadow"
          >
            <li>
              <Link to="models">Models</Link>
            </li>
            <li>
              <Link to="scenarios">Scenarios</Link>
            </li>
            <li>
              <Link to="leaderboard">Leaderboard</Link>
            </li>
            <li>
              <Link to="runs" className="whitespace-nowrap">
                Raw Runs
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-1 items-center">
        <Link to="https://crfm.stanford.edu/" className="w-24">
          <img src={crfmLogo} className="object-contain" />
        </Link>
        <Link to="/" className="ml-4 w-24">
          <img src={helmLogo} className="object-contain" />
        </Link>
      </div>
      <div className="flex-none hidden md:block">
        <ul className="flex flex-row gap-6 px-1">
          <li>
            <Link to="models">Models</Link>
          </li>
          <li>
            <Link to="scenarios">Scenarios</Link>
          </li>
          <li>
            <Link to="leaderboard">Leaderboard</Link>
          </li>
          <li>
            <Link to="runs">Raw Runs</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
