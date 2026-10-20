import { Link, useNavigate } from 'react-router-dom';
import { Plus, ArrowUpRight, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

export default function ProductCard({ item }) {
  const { user, dispatch } = useApp();
  const navigate = useNavigate();

  function addToCart() {
    if (!user) {
      navigate('/login');
      return;
    }

    dispatch({
      type: 'ADD_TO_CART',
      payload: item,
    });
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl hover:shadow-stone-200/60">
      {/* Product Image */}
      <Link
        to={`/menu/${item.id}`}
        aria-label={`View ${item.name}`}
        className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-stone-100"
      >
        {item.tag && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-amber-500 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-stone-950 shadow-sm">
            {item.tag}
          </span>
        )}

        <span className="select-none text-7xl drop-shadow-md transition-transform duration-500 group-hover:scale-110 sm:text-8xl">
          {item.emoji || '🍽️'}
        </span>

        <span className="absolute bottom-4 right-4 grid size-10 translate-y-2 place-items-center rounded-full bg-white text-stone-900 opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={19} />
        </span>
      </Link>

      {/* Product Information */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <span className="mb-2 text-[10px] font-extrabold uppercase tracking-[1.5px] text-amber-600">
          {item.category}
        </span>

        <h3 className="text-lg font-bold leading-snug text-stone-900 transition-colors group-hover:text-amber-700 sm:text-xl">
          <Link to={`/menu/${item.id}`} className="focus-visible:outline-2 focus-visible:outline-amber-500">
            {item.name}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-stone-500">
          {item.description}
        </p>

        {/* Price and Add to Cart */}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-stone-100 pt-4">
          <div className="min-w-0">
            <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-stone-400">
              Price
            </span>

            <strong className="text-lg font-extrabold text-stone-900 sm:text-xl">
              Rs. {Number(item.price || 0).toLocaleString('en-PK')}
            </strong>
          </div>

          <button
            type="button"
            onClick={addToCart}
            aria-label={`Add ${item.name} to cart`}
            title="Add to cart"
            className="grid size-11 shrink-0 place-items-center rounded-xl bg-stone-900 text-white shadow-sm transition-all duration-300 hover:bg-amber-500 hover:text-stone-950 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
          >
            <Plus size={21} />
          </button>
        </div>
      </div>
    </article>
  );
}