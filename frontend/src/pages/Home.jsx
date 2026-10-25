import React from 'react'
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowRight, Flame, Leaf, Plus, ShoppingCart, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { menuItems } from "../data/menuItems.js";
import { useApp } from "../context/AppContext.jsx";
import CustomerReviews from '../components/ReviewCard.jsx';

const money = (value) => `Rs. ${Number(value).toLocaleString("en-PK")}`;


const Home = () => {
  const { dispatch, cartCount } = useApp();
  return (
    <main>
      {/* Hero Section */}
      <section className="rounded-2xl overflow-hidden bg-orange-50 dark:bg-slate-950 transition-all duration-150">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-14 lg:py-16 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-xs font-bold tracking-widest text-orange-700">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              FRESH OFF THE GRILL
            </span>

            <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white md:text-6xl lg:text-7xl transition-all duration-150">
              Your cravings.
              <br />
              Our{" "}
              <span className="text-orange-600">
                kind of magic.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 dark:text-gray-300 md:text-lg transition-all duration-150">
              Big, bold flavour made fresh. From crave-worthy
              burgers to golden, crispy sides — your next
              favourite bite is right here.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link
                to="/menu"
                className="inline-flex items-center gap-3 rounded-full bg-orange-600 px-7 py-4 font-semibold text-white shadow-lg dark:shadow-md transition-all duration-300 hover:bg-orange-700 hover:gap-5"
              >
                Explore the menu
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 font-semibold text-gray-800 hover:text-orange-600 dark:text-gray-300 transition-all duration-150"
              >
                Meet Tahas Bite
                <ArrowDownRight size={17} />
              </Link>
            </div>

            {/* Customer Proof */}
            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-orange-50 bg-orange-200 text-xl">
                  🍔
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-orange-50 bg-yellow-200 text-xl">
                  🍟
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-orange-50 bg-red-200 text-xl">
                  🥤
                </span>
              </div>

              <div className="flex flex-col">
                <strong className="text-sm text-gray-900 dark:text-gray-400 transition-all duration-150">
                  Made for real cravings
                </strong>
                <small className="mt-1 text-xs text-gray-500">
                  Freshly prepared. Always satisfying.
                </small>
              </div>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto flex aspect-square w-full max-w-lg items-center justify-center"
          >
            <div className="p-7 sm:p-9 md:p-8 w-72 sm:w-96 md:w-80 lg:w-96 h-72 sm:h-96 md:h-80 lg:h-96 rounded-full bg-orange-300">
              <div className="flex items-center justify-center w-full h-full rounded-full border-2 border-dashed border-orange-600/60">
                <span className="select-none mb-10 sm:mb-14 text-[170px] sm:text-[200px] drop-shadow-xl">
                  🍔
                </span>
              </div>
            </div>

            {/* Top Floating Card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-0 top-12 z-20 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl sm:left-2">
              <span className="text-3xl">🔥</span>

              <div>
                <b className="block text-sm text-gray-900">
                  Full-on flavour
                </b>
                <small className="text-xs text-gray-500">
                  Zero boring bites
                </small>
              </div>
            </motion.div>

            {/* Bottom Floating Card */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-12 right-0 z-20 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl sm:right-2">
              <span className="text-3xl text-yellow-500">
                ★
              </span>

              <div>
                <b className="block text-sm text-gray-900">
                  Your new favourite
                </b>
                <small className="text-xs text-gray-500">
                  One bite says it all
                </small>
              </div>
            </motion.div>

            {/* Fresh Stamp */}
            <div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-3 left-0 z-20 flex h-24 w-24 rotate-12 flex-col items-center justify-center rounded-full border-4 border-white bg-orange-600 text-center text-xs font-bold tracking-wider text-white shadow-lg">
              FRESH
              <b className="text-sm">& TASTY</b>
              <span className="text-lg">✳</span>
            </div>
          </motion.div>
        </div>

        {/* Feature Strip */}
        <div className="bg-orange-600 text-white">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 py-5 md:justify-between md:px-12">
            <span className="flex items-center gap-2 text-xs font-bold tracking-wider">
              <Flame size={17} />
              BOLD FLAVOURS
            </span>

            <span className="flex items-center gap-2 text-xs font-bold tracking-wider">
              <Leaf size={17} />
              FRESH INGREDIENTS
            </span>

            <span className="flex items-center gap-2 text-xs font-bold tracking-wider">
              <Truck size={17} />
              MADE WHEN YOU ORDER
            </span>

            <span className="text-xs font-bold tracking-wider">
              GOOD FOOD. GOOD MOOD. ✳
            </span>
          </div>
        </div>
      </section>

      {/* Feadured Menu */}
      <section id="menu" className="pt-12">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div><p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">Made fresh</p><h2 className="mt-1 text-3xl font-black">Our menu</h2></div>
          <Link to="/cart" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 font-semibold dark:border-slate-700"><ShoppingCart size={18} /> Cart ({cartCount})</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item, index) => (
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              key={item.id}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-950">
              <figure className="flex h-56 items-center justify-center rounded-2xl bg-orange-50 text-7xl dark:bg-slate-800 bg-cover object-cover overflow-hidden"><img src={item.image} alt={item.category} /></figure>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div><span className="text-xs font-bold uppercase tracking-wide text-brand-600">{item.category}</span><h3 className="mt-1 text-lg font-extrabold">{item.name}</h3></div>
                {item.tag && <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-bold text-orange-800 dark:bg-orange-950 dark:text-orange-200">{item.tag}</span>}
              </div>
              <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500 dark:text-slate-400">{item.description}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-lg font-black">{money(item.price)}</span>
                <button onClick={() => dispatch({ type: "ADD_TO_CART", payload: item })} className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 font-bold text-white hover:bg-brand-600"><Plus size={18} /> Add</button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Final Call To Action */}
      <section className="mt-10 rounded-2xl overflow-hidden bg-orange-100 dark:bg-slate-950 transition-all duration-150">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 md:px-10 py-10 sm:py-12 lg:py-20 md:grid-cols-2">
          <div>
            <span className="text-xs font-bold tracking-widest text-orange-700">
              YOUR TABLE IS WAITING
            </span>

            <h2 className="mt-4 text-4xl font-extrabold leading-tight text-gray-900 md:text-6xl dark:text-white transition-all duration-150">
              Come hungry.
              <br />
              <span className="text-orange-600">
                Leave happy.
              </span>
            </h2>

            <p className="mt-5 max-w-lg leading-7 text-gray-600 dark:text-gray-300 transition-all duration-150">
              Find your go-to comfort food and make every
              bite count.
            </p>

            <Link
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-gray-900 px-7 py-4 font-semibold text-white transition hover:-translate-y-1 hover:bg-gray-800"
              to="/menu"
            >
              Find your flavour
              <ArrowRight size={18} />
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
            whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative flex min-h-64 items-center justify-center"
          >
            <div className="absolute h-80 w-80 rounded-full bg-orange-400 md:h-96 md:w-96" />

            <span className="relative w-full h-72 sm:h-64 lg:h-72 xl:h-80 2xl:h-96 drop-shadow-lg rounded-2xl overflow-hidden">
              <img
                src="./image/fast-food-img.jpeg"
                alt="Loaded Fire"
                className='w-full h-full bg-cover object-cover hover:scale-105 transition-all duration-500'
              />
            </span>

            <span className="absolute right-8 top-5 text-5xl text-orange-500">
              ✳
            </span>
          </motion.div>
        </div>
      </section>

      <CustomerReviews />
    </main>
  );
}
export default Home
