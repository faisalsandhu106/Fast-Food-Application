import React from 'react'
import { useState } from "react";
import {
    Menu as MenuIcon,
    Moon,
    ShoppingBag,
    Sun,
    Utensils,
    X,
} from "lucide-react";
import { useApp } from '../context/AppContext';
import { Link, NavLink, useLocation } from 'react-router-dom';


const Header = () => {
    const { cartCount, theme, setTheme } = useApp();

    const [mobileOpen, setMobileOpen] = useState(false);

    const location = useLocation();
    const isAdmin = location.pathname.startsWith("/admin");

    function toggleTheme() {
        setTheme(theme === "dark" ? "light" : "dark");
    }

    function closeMobileMenu() {
        setMobileOpen(false);
    }

    return (
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90 transition-all duration-150">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
                {/* Brand */}
                <Link
                    to="/"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-2 font-black tracking-tight"
                >
                    <span className="rounded-xl bg-brand-500 p-2 text-white">
                        <Utensils size={20} />
                    </span>

                    <div className="flex flex-col">
                        <span className="text-lg">
                            Tahas <span className="text-brand-500">Bite</span>
                        </span>
                        <span className="hidden lg:flex text-[9px] font-bold tracking-[2px] text-stone-400">
                            GOOD FOOD. GOOD MOOD.
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-2 md:flex">
                    {!isAdmin && (
                        <>
                            <NavLink end to="/" className={navClass}>
                                Home
                            </NavLink>

                            <NavLink to="/about" className={navClass}>
                                About
                            </NavLink>

                            <NavLink to="/menu" className={navClass}>
                                Menu
                            </NavLink>

                            <NavLink to="/contact" className={navClass}>
                                Contact
                            </NavLink>

                            <NavLink to="/admin" className={navClass}>
                                Admin
                            </NavLink>

                            <Link
                                to="/cart"
                                aria-label={`Shopping cart, ${cartCount} items`}
                                className="relative ml-1 rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                <ShoppingBag size={20} />

                                {cartCount > 0 && (
                                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-500 px-1 text-xs font-bold text-white">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </>
                    )}

                    {/* Desktop Theme Toggle */}
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="rounded-xl border border-slate-200 p-2 dark:border-slate-700"
                        aria-label="Toggle color theme"
                    >
                        {theme === "dark" ? (
                            <Sun size={18} className="text-yellow-400" />
                        ) : (
                            <Moon size={18} />
                        )}
                    </button>
                </nav>

                {/* Mobile Actions */}
                <div className="flex items-center gap-2 md:hidden">
                    {!isAdmin && (
                        <Link
                            to="/cart"
                            aria-label={`Shopping cart, ${cartCount} items`}
                            className="relative rounded-xl p-2"
                        >
                            <ShoppingBag size={20} />

                            {cartCount > 0 && (
                                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-500 px-1 text-xs font-bold text-white">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    )}

                    {/* Mobile Theme Toggle */}
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="rounded-xl border border-slate-200 p-2 dark:border-slate-700"
                        aria-label="Toggle color theme"
                    >
                        {theme === "dark" ? (
                            <Sun size={18} className="text-yellow-400" />
                        ) : (
                            <Moon size={18} />
                        )}
                    </button>

                    {/* Mobile Menu Button */}
                    {!isAdmin && (
                        <button
                            type="button"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="rounded-xl border border-slate-200 p-2 dark:border-slate-700"
                            aria-label="Toggle navigation"
                            aria-expanded={mobileOpen}
                        >
                            {mobileOpen ? (
                                <X size={20} />
                            ) : (
                                <MenuIcon size={20} />
                            )}
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile Navigation */}
            {mobileOpen && !isAdmin && (
                <nav className="grid gap-1 border-t border-slate-200 px-4 py-3 dark:border-slate-800 md:hidden">
                    <NavLink
                        end
                        to="/"
                        onClick={closeMobileMenu}
                        className={navClass}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/about"
                        onClick={closeMobileMenu}
                        className={navClass}
                    >
                        About
                    </NavLink>

                    <NavLink
                        to="/menu"
                        onClick={closeMobileMenu}
                        className={navClass}
                    >
                        Menu
                    </NavLink>

                    <NavLink
                        to="/contact"
                        onClick={closeMobileMenu}
                        className={navClass}
                    >
                        Contact
                    </NavLink>

                    <NavLink
                        to="/admin"
                        onClick={closeMobileMenu}
                        className={navClass}>
                        Admin
                    </NavLink>
                </nav>
            )}
        </header>
    );
}

export default Header


// Shared navigation link styles
function navClass({ isActive }) {
    return `rounded-lg px-2 py-2 text-sm font-semibold transition ${isActive
        ? "text-brand-600"
        : "text-slate-700 hover:text-brand-600 dark:text-slate-200"
        }`;
}