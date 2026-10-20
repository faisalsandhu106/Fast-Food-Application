import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Utensils,
  LogOut,
  Menu,
  X,
  UserRound,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

const navLinks = [
  { name: 'Home', path: '/', end: true },
  { name: 'Menu', path: '/menu' },
  { name: 'Our Story', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const { user, cartCount, dispatch } = useApp();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'bg-amber-50 text-amber-700'
        : 'text-stone-600 hover:bg-stone-100 hover:text-stone-950'
    }`;

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function logout() {
    dispatch({ type: 'LOGOUT' });
    closeMenu();
    navigate('/');
  }

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-white/95 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex min-h-[76px] w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          to="/"
          onClick={closeMenu}
          className="group flex shrink-0 items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-500"
          aria-label="Tahas Bite home"
        >
          <span className="grid size-11 place-items-center rounded-xl bg-amber-500 text-stone-950 shadow-sm">
            <Utensils size={21} strokeWidth={2.3} />
          </span>

          <span className="flex flex-col text-xl font-extrabold leading-tight tracking-tight text-stone-900 sm:text-2xl">
            <h1>Tahas <span className="text-amber-600">Bite</span></h1>
            <span className="mt-1 text-[8px] font-bold tracking-[1.8px] text-stone-500 sm:text-[9px]">
              GOOD FOOD. GOOD MOOD.
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              className={linkClass}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <Link
            to="/cart"
            aria-label={`Cart with ${cartCount} items`}
            className="group relative inline-flex items-center gap-2 rounded-xl border border-stone-200 px-3 py-2.5 text-sm font-semibold text-stone-700 transition-all hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700"
          >
            <ShoppingBag size={19} />
            <span>Cart</span>
            <span className="grid min-w-5 place-items-center rounded-full bg-amber-500 px-1.5 py-0.5 text-xs font-bold text-stone-950">
              {cartCount}
            </span>
          </Link>

          {user ? (
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-stone-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
            >
              <LogOut size={16} />
              Sign out
            </button>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-bold text-stone-950 shadow-sm transition-all hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
            >
              <UserRound size={17} />
              Sign in
              <ArrowRight size={15} />
            </Link>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex shrink-0 items-center gap-2 md:hidden">
          <Link
            to="/cart"
            aria-label={`Cart with ${cartCount} items`}
            className="relative grid size-10 place-items-center rounded-xl border border-stone-200 text-stone-800 transition-colors hover:bg-amber-50"
          >
            <ShoppingBag size={19} />
            <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-stone-950">
              {cartCount}
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen((previous) => !previous)}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            className="grid size-10 place-items-center rounded-xl border border-stone-200 text-stone-800 transition-colors hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-amber-500"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-stone-200 bg-white px-4 pb-5 pt-3 shadow-lg md:hidden sm:px-6"
        >
          <nav aria-label="Mobile navigation" className="space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.end}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-amber-50 text-amber-700'
                      : 'text-stone-600 hover:bg-stone-100 hover:text-stone-950'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="mt-4 border-t border-stone-200 pt-4">
            {user ? (
              <button
                type="button"
                onClick={logout}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-700"
              >
                <LogOut size={17} />
                Sign out
              </button>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-amber-400"
              >
                <UserRound size={17} />
                Sign in
                <ArrowRight size={16} />
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}