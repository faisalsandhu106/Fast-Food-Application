
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

import ProductCard from "../components/ProductCard.jsx";
import { menuItems } from "../data/menu.js";

export default function Menu() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const categories = [
    "All",
    ...new Set(menuItems.map((item) => item.category)),
  ];

  const filteredItems = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return menuItems.filter((item) => {
      const matchesCategory =
        category === "All" || item.category === category;

      const matchesSearch =
        `${item.name} ${item.description}`
          .toLowerCase()
          .includes(searchTerm);

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  return (
    <section className="min-h-screen bg-orange-50/50 px-6 py-16 md:px-12 lg:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
        <div className="mb-12 text-center">
          <span className="text-xs font-bold tracking-[0.25em] text-orange-600">
            THE GOOD STUFF
          </span>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl">
            Our{" "}
            <span className="text-orange-600">menu.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-gray-600 md:text-lg">
            Made fresh, packed with flavour, and ready to
            hit the spot.
          </p>
        </div>

        {/* Menu Toolbar */}
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map((name) => {
              const isSelected = category === name;

              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => setCategory(name)}
                  aria-pressed={isSelected}
                  className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition duration-200 ${
                    isSelected
                      ? "border-orange-600 bg-orange-600 text-white shadow-md shadow-orange-200"
                      : "border-gray-200 bg-white text-gray-700 hover:border-orange-400 hover:text-orange-600"
                  }`}
                >
                  {name}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="flex w-full items-center gap-3 rounded-full border border-gray-200 bg-white px-5 py-3 transition focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100 lg:max-w-sm">
            <Search
              size={20}
              className="shrink-0 text-gray-400"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Find your favourite..."
              aria-label="Search menu"
              className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="shrink-0 rounded-full p-1 text-gray-400 transition hover:bg-orange-50 hover:text-orange-600"
              >
                <X size={17} />
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-bold text-gray-900">
              {filteredItems.length}
            </span>{" "}
            {filteredItems.length === 1 ? "item" : "items"}
          </p>
        </div>

        {/* Product Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-orange-200 bg-white px-6 py-12 text-center">
            <span className="text-6xl" role="img" aria-label="Takeaway box">
              🥡
            </span>

            <h2 className="mt-5 text-2xl font-bold text-gray-900">
              No bites found
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
              We couldn't find anything matching your
              search. Try another search or category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-6 rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-700"
            >
              Show all menu items
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
