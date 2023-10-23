import { useState } from "react";
import { Link } from "react-router-dom";

function NavDropdown() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="inline-flex justify-center w-full px-4 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        <div
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
        >
          <img
            src="https://mkly.github.io/helm/assets/helm-logo-193a9baf.png"
            alt="Image 1"
            className="w-full h-24 object-cover"
          />
        </div>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              <img
                src="https://mkly.github.io/helm/assets/helm-logo-193a9baf.png"
                alt="Image 1"
                className="w-full h-24 object-cover"
              />
            </div>
            <div
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              <Link to="https://crfm.stanford.edu/heim/latest/?">
                <img
                  src="https://crfm.stanford.edu/heim/latest/images/heim-logo.png"
                  alt="Image 2"
                  className="w-full h-24 object-cover"
                />
              </Link>
            </div>
            {/* ... More images */}
          </div>
        </div>
      )}
    </div>
  );
}

export default NavDropdown;
