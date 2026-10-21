import React from 'react'
import { Link } from 'react-router-dom';
import {
    ArrowUpRight,
    Instagram,
    MapPin,
    Phone,
    Clock,
    Heart,
    Utensils,
} from 'lucide-react';


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
            value: '+92 300 0000000',
            href: 'tel:+923000000000',
        },
        {
            icon: Clock,
            label: 'Opening Hours',
            value: "Contact us for today's timings",
        },
    ];


    return (
        <footer className="overflow-hidden bg-[#171714] text-[#f5f2eb]">
            <div className="mx-auto w-full max-w-7xl px-5 pt-14 sm:px-8 sm:pt-16 lg:px-10 lg:pt-20">
                {/* Footer Header */}
                <div className="grid grid-cols-1 gap-10 pb-12 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4 lg:gap-10 lg:pb-16">
                    {/* Brand Section */}
                    <div>
                        <Link
                            to="/"
                            className="group inline-flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
                        >
                            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-amber-500 text-lg font-black text-[#171714]">
                                <Utensils size={21} strokeWidth={2.3} />
                            </span>

                            <span className="flex flex-col text-2xl font-semibold tracking-tight">
                                <h1>Tahas <span className="text-amber-400">Bite</span></h1>
                                <span className="mt-1 text-[9px] font-bold tracking-[2px] text-stone-400">
                                    GOOD FOOD. GOOD MOOD.
                                </span>
                            </span>
                        </Link>

                        <p className="mt-6 max-w-sm text-sm leading-7 text-stone-400">
                            Big flavour, fresh ingredients, and feel-good
                            bites made fresh for your kind of day.
                        </p>

                        <a
                            href="https://www.instagram.com/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Visit Instagram"
                            className="mt-5 inline-flex items-center gap-2 text-sm text-stone-300 transition-colors duration-300 hover:text-amber-400 focus-visible:outline-2 focus-visible:outline-amber-400"
                        >
                            <Instagram size={18} />
                            Follow us on Instagram
                            <ArrowUpRight size={15} />
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
                                        className="group inline-flex items-center gap-2 text-sm text-stone-400 transition-colors duration-300 hover:text-amber-400 focus-visible:outline-2 focus-visible:outline-amber-400"
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
                                        <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-amber-400">
                                            <Icon size={18} />
                                        </span>

                                        <div className="min-w-0 pt-0.5">
                                            <span className="mb-1 block text-xs text-stone-500">
                                                {item.label}
                                            </span>

                                            {item.href ? (
                                                <a
                                                    href={item.href}
                                                    className="break-words text-sm text-stone-200 transition-colors hover:text-amber-400"
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
                        <span className="text-[10px] font-extrabold leading-5 tracking-[1.5px] text-amber-400">
                            MADE FRESH. SERVED HAPPY.
                        </span>

                        <h3 className="mt-4 text-3xl font-bold leading-tight tracking-tight">
                            Good food.
                            <br />
                            Better moments.
                        </h3>

                        <Link
                            to="/menu"
                            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-stone-200 transition-all duration-300 hover:gap-3 hover:text-amber-400 focus-visible:outline-2 focus-visible:outline-amber-400"
                        >
                            Explore Our Menu
                            <ArrowUpRight size={18} />
                        </Link>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="flex flex-col gap-3 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className='flex items-center '>
                        <p className="text-xs leading-6 text-stone-500">
                            © {new Date().getFullYear()} Tahas Bite. All rights reserved || Developed By{" "}
                            <a
                                href="https://faisal-nazir-portfolio.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-colors duration-200 text-stone-200 hover:text-amber-400"
                            >
                                Faisal Nazir
                            </a>
                        </p>
                    </div>

                    <p className="inline-flex items-center gap-1.5 text-xs leading-6 text-stone-500">
                        Made with
                        <Heart size={13} className="text-amber-400" fill="currentColor" />
                        for food lovers.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer