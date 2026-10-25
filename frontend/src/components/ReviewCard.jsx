
import { useEffect, useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Quote,
    Star,
} from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
    {
        name: "Ahmed Khan",
        initials: "AK",
        location: "Faisalabad",
        rating: 5,
        review:
            "The smash burger was juicy, fresh, and full of flavor. The portion size was great, and the free delivery made the experience even better.",
    },
    {
        name: "Fatima Ali",
        initials: "FA",
        location: "Faisalabad",
        rating: 5,
        review:
            "I loved the crispy chicken burger. The coating was crunchy, the sauce was delicious, and everything arrived nicely packed.",
    },
    {
        name: "Usman Tariq",
        initials: "UT",
        location: "Faisalabad",
        rating: 5,
        review:
            "The loaded fries are a must-try. The cheese sauce and seasoning make them a perfect snack for a movie night.",
    },
    {
        name: "Ayesha Malik",
        initials: "AM",
        location: "Faisalabad",
        rating: 4,
        review:
            "The food was tasty, and the menu had some great options. I especially enjoyed the zinger wrap and its signature dressing.",
    },
    {
        name: "Bilal Ahmed",
        initials: "BA",
        location: "Faisalabad",
        rating: 5,
        review:
            "The BBQ wings had a wonderful smoky flavor. Ordering was simple, and paying cash on delivery was convenient.",
    },
    {
        name: "Hira Shah",
        initials: "HS",
        location: "Faisalabad",
        rating: 5,
        review:
            "The chocolate shake was creamy and refreshing. It paired perfectly with my burger. I would love to order again.",
    },
    {
        name: "Hamza Raza",
        initials: "HR",
        location: "Faisalabad",
        rating: 4,
        review:
            "Great variety, reasonable prices, and a clean presentation. The ordering experience was straightforward on my phone.",
    },
    {
        name: "Sana Iqbal",
        initials: "SI",
        location: "Faisalabad",
        rating: 5,
        review:
            "I tried the chicken sandwich and really enjoyed the balance of fresh vegetables, crispy chicken, and creamy sauce.",
    },
    {
        name: "Danish Akram",
        initials: "DA",
        location: "Faisalabad",
        rating: 5,
        review:
            "A great option when craving fast food. The menu is easy to browse, and the free delivery is a nice bonus.",
    },
    {
        name: "Maryam Noor",
        initials: "MN",
        location: "Faisalabad",
        rating: 5,
        review:
            "The food options are tempting, and I appreciate the simple checkout process. The website experience feels modern and convenient.",
    },
];

const reviewsPerSlide = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
};

function getVisibleCount() {
    if (typeof window === "undefined") return 3;

    if (window.innerWidth < 640) {
        return reviewsPerSlide.mobile;
    }

    if (window.innerWidth < 1024) {
        return reviewsPerSlide.tablet;
    }

    return reviewsPerSlide.desktop;
};

export default function CustomerReviews() {
    const [visibleCount, setVisibleCount] = useState(getVisibleCount);
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    const maxIndex = Math.max(0, reviews.length - visibleCount);

    useEffect(() => {
        const handleResize = () => {
            setVisibleCount(getVisibleCount());
            setIndex(0);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (paused) return undefined;

        const timer = window.setInterval(() => {
            setIndex((current) =>
                current >= maxIndex ? 0 : current + 1,
            );
        }, 5000);

        return () => window.clearInterval(timer);
    }, [paused, maxIndex]);

    const previous = () => {
        setIndex((current) =>
            current <= 0 ? maxIndex : current - 1,
        );
    };

    const next = () => {
        setIndex((current) =>
            current >= maxIndex ? 0 : current + 1,
        );
    };

    return (
        <section
            aria-labelledby="customer-reviews-title"
            className="overflow-hidden pt-16 sm:pt-20 lg:pt-24 2xl:px-16"
        >
            <div className="mx-auto max-w-7xl">
                {/* Section heading */}
                <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
                    <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-600 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-400">
                        Customer Love
                    </span>

                    <h2
                        id="customer-reviews-title"
                        className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl"
                    >
                        Good Food.{" "}
                        <span className="text-orange-500">
                            Good Reviews.
                        </span>
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                        Every bite tells a story. Discover what makes
                        the Tahas Bite experience special.
                    </p>
                </div>

                {/* Slider controls */}
                <div className="mb-5 flex items-center justify-between gap-4">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Customer stories
                    </p>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={previous}
                            aria-label="Previous reviews"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-orange-500 hover:bg-orange-500 hover:text-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>

                        <button
                            type="button"
                            onClick={next}
                            aria-label="Next reviews"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-orange-500 hover:bg-orange-500 hover:text-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Carousel */}
                <div
                    className="overflow-hidden"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    onFocusCapture={() => setPaused(true)}
                    onBlurCapture={(event) => {
                        if (!event.currentTarget.contains(event.relatedTarget)) {
                            setPaused(false);
                        }
                    }}
                >
                    <motion.div
                        className="flex items-stretch"
                        animate={{
                            x: `-${index * (100 / visibleCount)}%`,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 22,
                        }}
                    >
                        {reviews.map((review) => (
                            <div
                                key={review.initials}
                                style={{
                                    flex: `0 0 ${100 / visibleCount}%`,
                                }}
                                className="box-border px-2 py-3 sm:px-3"
                            >
                                <article className="flex h-full min-h-[300px] sm:min-h-[300px] flex-col rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm transition-all duration-150 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950 dark:hover:border-orange-500/40">
                                    <div className="mb-5 flex items-center justify-between">
                                        <div className="flex gap-1">
                                            {Array.from(
                                                { length: 5 },
                                                (_, starIndex) => (
                                                    <Star
                                                        key={starIndex}
                                                        className={`h-4 w-4 ${
                                                            starIndex < review.rating
                                                                ? "fill-amber-400 text-amber-400"
                                                                : "text-slate-300 dark:text-slate-700"
                                                        }`}
                                                    />
                                                ),
                                            )}
                                        </div>

                                        <Quote className="h-7 w-7 text-orange-400/70" />
                                    </div>

                                    <p className="flex-1 text-sm leading-7 text-slate-600 dark:text-slate-300">
                                        “{review.review}”
                                    </p>

                                    <div className="my-5 h-px bg-slate-100 dark:bg-slate-800" />

                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-700 dark:bg-orange-500/15 dark:text-orange-400">
                                            {review.initials}
                                        </div>

                                        <div className="min-w-0">
                                            <h3 className="truncate font-bold text-slate-900 dark:text-white">
                                                {review.name}
                                            </h3>

                                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                {review.location}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Pagination dots */}
                <div className="mt-8 flex items-center justify-center gap-2">
                    {Array.from(
                        { length: maxIndex + 1 },
                        (_, dotIndex) => (
                            <button
                                key={dotIndex}
                                type="button"
                                onClick={() => setIndex(dotIndex)}
                                aria-label={`Go to review slide ${dotIndex + 1}`}
                                aria-current={index === dotIndex ? "true" : undefined}
                                className={`h-2.5 rounded-full transition-all duration-300 ${
                                    index === dotIndex
                                        ? "w-8 bg-orange-500"
                                        : "w-2.5 bg-slate-300 hover:bg-orange-300 dark:bg-slate-700"
                                }`}
                            />
                        ),
                    )}
                </div>

                <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
                    {index + 1}–{Math.min(index + visibleCount, reviews.length)} of{" "}
                    {reviews.length} reviews
                </p>
            </div>
        </section>
    );
}
