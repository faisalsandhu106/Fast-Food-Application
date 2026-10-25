import { useState } from "react";
import {
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

import { sendContact } from "../api.js";
import { motion } from "framer-motion";
import CustomerReviews from "../components/ReviewCard.jsx";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [busy, setBusy] = useState(false);

  const [notice, setNotice] = useState({
    type: "",
    text: "",
  });

  function change(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function submit(e) {
    e.preventDefault();

    setBusy(true);
    setNotice({
      type: "",
      text: "",
    });

    try {
      const result = await sendContact(form);

      setNotice({
        type: "success",
        text: result.message,
      });

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setNotice({
        type: "error",
        text:
          err.response?.data?.message ||
          "Could not send your message. Please try again.",
      });
    } finally {
      setBusy(false);
    }
  }

  const contactInfo = [
    {
      Icon: Mail,
      title: "Email",
      body: "hello@tahasbite.example",
    },
    {
      Icon: Phone,
      title: "Phone",
      body: "Contact us through your order details",
    },
    {
      Icon: MapPin,
      title: "Delivery",
      body: "Free delivery on every order",
    },
    {
      Icon: MessageCircle,
      title: "Support",
      body: "We love hearing your feedback",
    },
  ];

  const inputClasses =
    "mt-2 w-full rounded-xl border border-slate-300 " +
    "bg-transparent px-3 py-3 font-normal outline-none " +
    "focus:border-orange-500 dark:border-slate-700";

  return (
    <div className="mx-auto max-w-5xl xl:max-w-6xl">
      {/* Hero Section */}
      <section className="mb-8 rounded-[2rem] bg-slate-950 px-5 py-10 text-white sm:px-10">
        <p className="text-sm font-bold uppercase tracking-[.2em] text-orange-300">
          We're here for you
        </p>

        <h1 className="mt-2 text-4xl font-black sm:text-5xl">
          Let's talk bites.
        </h1>

        <p className="mt-3 max-w-xl text-slate-300">
          Questions, feedback or a little love for the menu?
          Send us a message.
        </p>
      </section>

      {/* Contact Information and Form */}
      <div className="grid gap-6 lg:grid-cols-[.75fr_1.25fr]">
        {/* Contact Information */}
        <aside className="space-y-3">
          {contactInfo.map(({ Icon, title, body }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.08 * index }}
              className="flex items-start gap-4 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 p-5 dark:border-slate-800"
            >
              <span className="rounded-xl bg-orange-200 p-3 text-orange-700">
                <Icon />
              </span>

              <div>
                <p className="font-black text-white">{title}</p>

                <p className="mt-1 text-sm text-white">
                  {body}
                </p>
              </div>
            </motion.div>
          ))}
        </aside>

        {/* Contact Form */}
        <form
          onSubmit={submit}
          className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 dark:border-slate-800 dark:bg-slate-950"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Name */}
            <label className="text-sm font-bold">
              Your name

              <input
                required
                maxLength={100}
                name="name"
                value={form.name}
                onChange={change}
                className={inputClasses}
              />
            </label>

            {/* Email */}
            <label className="text-sm font-bold">
              Email address

              <input
                required
                type="email"
                maxLength={150}
                name="email"
                value={form.email}
                onChange={change}
                className={inputClasses}
              />
            </label>
          </div>

          {/* Subject */}
          <label className="block text-sm font-bold">
            Subject (optional)

            <input
              maxLength={150}
              name="subject"
              value={form.subject}
              onChange={change}
              className={inputClasses}
            />
          </label>

          {/* Message */}
          <label className="block text-sm font-bold">
            Message

            <textarea
              required
              minLength={5}
              maxLength={2000}
              rows={5}
              name="message"
              value={form.message}
              onChange={change}
              className={`${inputClasses} resize-y`}
            />
          </label>

          {/* Success or Error Message */}
          {notice.text && (
            <p
              role="status"
              aria-live="polite"
              className={`rounded-xl p-3 text-sm ${notice.type === "success"
                ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200"
                : "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-200"
                }`}
            >
              {notice.text}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={busy}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-5 py-3.5 font-bold text-white hover:bg-brand-600 disabled:opacity-60"
          >
            <Send size={18} />

            {busy ? "Sending..." : "Send message"}
          </button>
        </form>
      </div>

      {/* Loaction Section */}
      <section className="mt-10 lg:mb-5 w-full h-64 sm:h-72 lg:h-96 rounded-2xl overflow-hidden">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2859.384643237726!2d73.10750667472209!3d31.423419551927136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392268153fc0774d%3A0x7af0a06c3ac14097!2sChenab%20College%20of%20Advance%20Studies!5e1!3m2!1sen!2s!4v1792613466077!5m2!1sen!2s" width="100%" height="100%" loading="lazy"></iframe>
      </section>

      <CustomerReviews />
    </div>
  );
}
