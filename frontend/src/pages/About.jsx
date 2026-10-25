import { Heart, Leaf, Sparkles } from "lucide-react";
import CustomerReviews from "../components/ReviewCard";
import { delay, motion } from "framer-motion";

const values = [
  {
    icon: Heart,
    title: "Made to make you smile",
    description:
      "Food should be fun, satisfying, and something you look forward to.",
  },
  {
    icon: Leaf,
    title: "Fresh is the flavour",
    description:
      "We focus on freshly prepared favourites and flavour in every bite.",
  },
  {
    icon: Sparkles,
    title: "Big taste, no fuss",
    description:
      "Comfort-food classics with a Tahas Bite twist and welcoming service.",
  },
];

export default function About() {
  return (
    <section className="mx-auto max-w-7xl pb-12 pt-4 sm:px-6 lg:px-8">
      {/* Page heading */}
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
          A Little About Us
        </span>

        <h1 className="mt-4 text-4xl font-extrabold leading-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
          Not just fast food.
          <br />
          <span className="text-orange-500">Feel-good food.</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-400 sm:text-lg">
          We believe a great meal can turn an ordinary moment into a good one.
        </p>
      </div>

      {/* About hero artwork */}
      <div className="relative mt-12 flex min-h-[280px] flex-col items-center justify-center overflow-hidden rounded-3xl bg-orange-500 px-6 py-12 text-center sm:min-h-[360px]">
        {/* Decorative elements */}
        <span
          aria-hidden="true"
          className="absolute left-8 top-8 text-5xl text-orange-200/80 sm:left-16 sm:top-12 sm:text-7xl"
        >
          ✳
        </span>

        <span
          aria-hidden="true"
          className="absolute bottom-8 right-8 text-5xl text-orange-200/80 sm:bottom-12 sm:right-16 sm:text-7xl"
        >
          ✳
        </span>

        <span className="mb-5 text-7xl drop-shadow-lg transition-transform duration-300 hover:scale-110 sm:text-8xl">
          🍔
        </span>

        <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-100">
          Tahas Bite
        </p>

        <h2 className="mt-3 text-3xl font-extrabold uppercase leading-tight text-white sm:text-4xl">
          Made with
          <br />
          a little extra love
        </h2>
      </div>

      {/* Our values */}
      <div className="mt-16">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            What makes us special?
          </h2>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Good food, good vibes, and a little extra love in every bite.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
                key={value.title}
                className="group rounded-2xl border border-gray-200 bg-white p-7 hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-950 dark:hover:border-orange-500 transition-all duration-150"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-500 transition duration-300 group-hover:bg-orange-500 group-hover:text-white dark:bg-orange-950 dark:text-orange-400 dark:group-hover:bg-orange-500 dark:group-hover:text-white">
                  <Icon size={28} strokeWidth={1.8} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {value.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Closing message */}
      <div className="mt-16 rounded-2xl bg-gray-100 px-6 py-10 text-center dark:bg-gray-950 sm:px-10">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">
          Good food. Great moments.
          <span className="text-orange-500"> Every time.</span>
        </h2>

        <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600 dark:text-gray-400">
          Whether you&apos;re sharing a meal with friends or treating yourself,
          Tahas Bite is here to make your day a little more delicious.
        </p>
      </div>

      <CustomerReviews />
    </section>
  );
}
