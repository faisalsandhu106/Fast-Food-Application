import React from 'react'
import { Link } from 'react-router-dom';
import {
    ArrowUpRight,
    MapPin,
    Phone,
    Clock,
    Heart,
    Utensils,
    MessageCircle,
} from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {

    const exploreLinks = [
        { name: 'Home', path: '/' },
        { name: 'Our Menu', path: '/menu' },
        { name: 'Our Story', path: '/about' },
        { name: 'Contact Us', path: '/contact' },
    ];


    const contactDetails = [
        {
            icon: MapPin,
            label: 'Visit Us',
            value: 'Faisalabad, Pakistan',
        },
        {
            icon: Phone,
            label: 'Call Us',
            value: '+92335 8377373',
            href: 'tel:+923358377373',
        },
        {
            icon: Clock,
            label: 'Opening Hours',
            value: "Contact us for today's timings",
        },
    ];

    return (
        <footer className="overflow-hidden bg-slate-950 text-[#f5f2eb]">
            <div className="mx-auto w-full max-w-7xl px-5 pt-14 sm:px-8 sm:pt-16 lg:px-10 lg:pt-20">
                {/* Footer Header */}
                <div className="grid grid-cols-1 gap-10 pb-12 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4 lg:gap-10 lg:pb-16">
                    {/* Brand Section */}
                    <div>
                        <Link
                            to="/"
                            className="group inline-flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
                        >
                            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-500 text-lg font-black text-[#171714]">
                                <Utensils size={21} strokeWidth={2.3} />
                            </span>

                            <span className="flex flex-col text-2xl font-semibold tracking-tight">
                                <h1>Tahas <span className="text-brand-400">Bite</span></h1>
                                <span className="mt-1 text-[9px] leading-5 font-bold tracking-[2px] text-stone-400">
                                    GOOD FOOD. GOOD MOOD.
                                </span>
                            </span>
                        </Link>

                        <p className="mt-6 max-w-sm text-sm leading-6 text-stone-300">
                            Big flavour, fresh ingredients, and feel-good
                            bites made fresh for your kind of day.
                        </p>

                        <a
                            href="https://wa.me/923358377373"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Chat with us on WhatsApp"
                            className="inline-flex items-center mt-5 gap-2 rounded-full bg-brand-500 px-5 py-3 font-semibold text-sm text-white transition hover:bg-brand-600"
                        >
                            <FaWhatsapp className="h-6 w-6" />
                            Chat on WhatsApp
                        </a>
                    </div>

                    {/* Navigation Section */}
                    <div>
                        <h3 className="mb-6 text-base font-bold tracking-wide">
                            Explore
                        </h3>

                        <ul className="space-y-4">
                            {exploreLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="group inline-flex items-center gap-2 text-sm text-stone-300 transition-colors duration-300 hover:text-brand-400 focus-visible:outline-2 focus-visible:outline-amber-400"
                                    >
                                        {link.name}
                                        <ArrowUpRight
                                            size={14}
                                            className="opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 className="mb-6 text-base font-bold tracking-wide">
                            Get in Touch
                        </h3>

                        <ul className="space-y-5">
                            {contactDetails.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <li key={item.label} className="flex items-start gap-3">
                                        <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-brand-500">
                                            <Icon size={18} />
                                        </span>

                                        <div className="min-w-0 pt-0.5">
                                            <span className="mb-1 block text-xs text-stone-500">
                                                {item.label}
                                            </span>

                                            {item.href ? (
                                                <a
                                                    href={item.href}
                                                    className="break-words text-sm text-stone-300 transition-colors hover:text-brand-500"
                                                >
                                                    {item.value}
                                                </a>
                                            ) : (
                                                <p className="break-words text-sm leading-6 text-stone-300">
                                                    {item.value}
                                                </p>
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Call to Action Section */}
                    <div className="flex min-h-56 flex-col items-start justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.01] p-6 sm:p-7">
                        <span className="text-[10px] font-extrabold leading-5 tracking-[1.5px] text-brand-500">
                            MADE FRESH. SERVED HAPPY.
                        </span>

                        <h3 className="mt-4 text-3xl font-bold leading-tight tracking-tight">
                            Good food.
                            <br />
                            Better moments.
                        </h3>

                        <Link
                            to="/menu"
                            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-stone-300 transition-all duration-300 hover:gap-3 hover:text-brand-500 focus-visible:outline-2 focus-visible:outline-brand-500"
                        >
                            Explore Our Menu
                            <ArrowUpRight size={18} />
                        </Link>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="flex flex-col gap-3 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className='flex items-center '>
                        <p className="text-xs leading-6 text-stone-300">
                            © {new Date().getFullYear()} Tahas Bite. All rights reserved || Developed By{" "}
                            <a
                                href="https://faisal-nazir-portfolio.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-colors duration-200 text-stone-100 hover:text-brand-400"
                            >
                                Faisal Nazir
                            </a>
                        </p>
                    </div>

                    <p className="inline-flex items-center gap-1.5 text-xs leading-6 text-stone-300">
                        Made with
                        <Heart size={13} className="text-brand-500" fill="currentColor" />
                        for food lovers.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer