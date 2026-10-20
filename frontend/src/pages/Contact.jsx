
import { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle,
} from "lucide-react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <section className="min-h-screen bg-orange-50/50 px-6 py-16 md:px-12 lg:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
        <div className="mb-14 text-center">
          <span className="text-xs font-bold tracking-[0.25em] text-orange-600">
            SAY HELLO
          </span>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl">
            Let’s <span className="text-orange-600">talk.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-gray-600 md:text-lg">
            Questions, feedback, or just want to say hi?
            We’re listening.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Contact Information */}
          <div className="flex flex-col justify-center rounded-3xl bg-orange-600 p-8 text-white shadow-xl shadow-orange-100 md:p-10">
            <span className="text-xs font-bold tracking-[0.2em] text-orange-100">
              GET IN TOUCH
            </span>

            <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">
              We’d love to hear from you.
            </h2>

            <p className="mt-4 max-w-md leading-7 text-orange-50">
              Have a question about our menu or an idea
              to share? Reach out to the Tahas Bite team.
            </p>

            <div className="mt-10 space-y-7">
              {/* Address */}
              <article className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                  <MapPin size={23} />
                </div>

                <div>
                  <h3 className="font-bold">Find us</h3>
                  <p className="mt-1 text-sm text-orange-100">
                    Faisalabad, Pakistan
                  </p>
                </div>
              </article>

              {/* Phone */}
              <article className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                  <Phone size={23} />
                </div>

                <div>
                  <h3 className="font-bold">Give us a call</h3>
                  <p className="mt-1 text-sm text-orange-100">
                    +92 300 0000000
                  </p>
                </div>
              </article>

              {/* Email */}
              <article className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                  <Mail size={23} />
                </div>

                <div>
                  <h3 className="font-bold">Drop us a line</h3>
                  <p className="mt-1 break-all text-sm text-orange-100">
                    hello@tahasbite.example
                  </p>
                </div>
              </article>
            </div>

            <div className="mt-10 rounded-2xl border border-white/20 bg-white/10 p-4">
              <p className="text-sm leading-6 text-orange-50">
                Note: These contact details are placeholders
                for this starter project. Replace them with
                your actual business information.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-10">
            <h2 className="text-2xl font-extrabold text-gray-900 md:text-3xl">
              Send a message
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Fill out the form below and let us know
              what’s on your mind.
            </p>

            {/* Success Message */}
            {sent && (
              <div
                role="status"
                className="mt-6 flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-800"
              >
                <CheckCircle
                  size={21}
                  className="mt-0.5 shrink-0"
                />

                <div>
                  <h3 className="font-bold">
                    Message submitted!
                  </h3>

                  <p className="mt-1 text-sm leading-5">
                    Thanks for reaching out. This demo
                    form was submitted locally.
                  </p>
                </div>
              </div>
            )}

            <form
              className="mt-8 space-y-6"
              onSubmit={handleSubmit}
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Your name
                </label>

                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Email address
                </label>

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  What’s on your mind?
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Write your message..."
                  className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-orange-600 px-7 py-4 font-bold text-white shadow-lg shadow-orange-100 transition hover:-translate-y-0.5 hover:bg-orange-700 active:translate-y-0"
              >
                Send message
                <Send size={17} />
              </button>

              <p className="text-center text-xs leading-5 text-gray-400">
                This starter form does not send messages
                to a server or email address.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
