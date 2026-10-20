import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  LockKeyhole,
  Mail,
  Eye,
  EyeOff,
  Utensils,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { dispatch } = useApp();
  const navigate = useNavigate();

  function submit(event) {
    event.preventDefault();
    setError('');

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password.trim()) {
      setError('Please enter your email address and password.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const user = {
        name: normalizedEmail.split('@')[0],
        email: normalizedEmail,
      };

      dispatch({
        type: 'LOGIN',
        payload: user,
      });

      navigate('/menu');
    } catch {
      setError('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  }

  return (
    <section className="relative flex min-h-[calc(100vh-76px)] items-center justify-center overflow-hidden bg-[#faf8f4] px-4 py-12 sm:px-6 lg:py-16">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-amber-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 size-80 rounded-full bg-orange-200/30 blur-3xl" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-2xl shadow-stone-900/5 lg:grid-cols-2">
        {/* Welcome Panel */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-stone-900 p-10 text-white lg:flex xl:p-12">
          <div className="absolute -right-20 -top-20 size-72 rounded-full border-[40px] border-amber-500/10" />
          <div className="absolute -bottom-24 -left-20 size-80 rounded-full bg-amber-500/10 blur-3xl" />

          <Link to="/" className="relative z-10 inline-flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-xl bg-amber-500 text-stone-950">
              <Utensils size={23} />
            </span>

            <span className="text-xl font-extrabold tracking-tight">
              Tahas <span className="text-amber-400">Bite</span>
              <span className="mt-1 block text-[9px] font-bold tracking-[2px] text-stone-400">
                GOOD FOOD. GOOD MOOD.
              </span>
            </span>
          </Link>

          <div className="relative z-10 py-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-xs font-bold tracking-wider text-amber-400">
              <span className="size-2 rounded-full bg-amber-400" />
              FRESH FLAVOURS, EVERY DAY
            </span>

            <h2 className="mt-7 text-4xl font-extrabold leading-tight xl:text-5xl">
              Your next
              <br />
              favourite bite
              <br />
              <span className="text-amber-400">starts here.</span>
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-7 text-stone-400">
              Discover delicious flavours, explore our menu,
              and make every meal a little more special.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-3 border-t border-white/10 pt-6">
            <span className="grid size-10 place-items-center rounded-xl bg-white/5 text-amber-400">
              <ShieldCheck size={21} />
            </span>

            <div>
              <p className="text-sm font-semibold">Welcome to Tahas Bite</p>
              <p className="mt-1 text-xs text-stone-400">
                Great food. Memorable moments.
              </p>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-md">
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-stone-500 transition-colors hover:text-amber-600 lg:hidden"
            >
              <Utensils size={18} />
              Tahas <span className="text-amber-600">Bite</span>
            </Link>

            <div className="mb-7 grid size-14 place-items-center rounded-2xl bg-amber-100 text-amber-700">
              <LockKeyhole size={26} />
            </div>

            <span className="text-xs font-extrabold tracking-[2px] text-amber-600">
              WELCOME BACK
            </span>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">
              Good to see <span className="text-amber-600">you.</span>
            </h1>

            <p className="mt-3 text-sm leading-6 text-stone-500">
              Sign in to explore the menu and enjoy your favourite bites.
            </p>

            <form onSubmit={submit} className="mt-8 space-y-5">
              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
                >
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-stone-700"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setError('');
                    }}
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 py-3.5 pl-11 pr-4 text-sm text-stone-900 outline-none transition-all placeholder:text-stone-400 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-stone-700"
                  >
                    Password
                  </label>
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setError('');
                    }}
                    placeholder="Enter your password"
                    required
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 py-3.5 pl-11 pr-12 text-sm text-stone-900 outline-none transition-all placeholder:text-stone-400 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-stone-400 transition-colors hover:bg-stone-200 hover:text-stone-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3.5 text-sm font-bold text-stone-950 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:bg-amber-400 hover:shadow-amber-500/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="mt-6 flex items-start gap-2 rounded-xl bg-stone-50 p-3.5 text-xs leading-5 text-stone-500">
              <ShieldCheck size={17} className="mt-0.5 shrink-0 text-amber-600" />
              <p>
                Demo authentication only. Connect a secure backend to
                verify credentials before using this form in production.
              </p>
            </div>

            <p className="mt-7 text-center text-sm text-stone-500">
              New to Tahas Bite?{' '}
              <Link
                to="/signup"
                className="font-bold text-amber-700 transition-colors hover:text-amber-800"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}