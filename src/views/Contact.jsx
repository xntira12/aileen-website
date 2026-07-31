"use client";
import { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import emailjs from "@emailjs/browser";
import { useLocale } from "../i18n/LocaleProvider";

export default function Contact() {
  const { messages } = useLocale();
  const copy = messages.contact ?? {};
  const form = copy.form ?? {};
  const sidebar = copy.sidebar ?? {};

  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (formRef.current?.company?.value) return;

    setLoading(true);
    setStatus({ type: "", msg: "" });

    try {
      const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      });

      formRef.current.reset();
      setStatus({ type: "success", msg: form.success });
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", msg: form.error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060A14] text-white">
      <Navbar />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute -bottom-56 -left-40 h-[560px] w-[560px] rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <main className="relative mx-auto max-w-6xl px-6 pt-28 pb-16">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-widest text-white/80 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-cyan-600" />
            {copy.eyebrow}
          </span>

          <h1 className="mt-6 text-4xl font-semibold leading-tight md:text-5xl">
            {copy.title}
            <span className="text-teal-300">{copy.titleHighlight}</span>
            <br className="hidden md:block" />
            {copy.titleLine2}
          </h1>

          <p className="mt-4 text-sm text-white/70 md:text-base">{copy.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <form
              ref={formRef}
              onSubmit={onSubmit}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur md:p-8"
            >
              <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

              <div className="grid gap-5 md:grid-cols-2">
                <Field label={form.nameLabel} name="from_name" placeholder={form.namePlaceholder} />
                <Field label={form.emailLabel} name="reply_to" type="email" placeholder={form.emailPlaceholder} />
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm text-white/80">{form.subjectLabel}</label>
                <input
                  name="subject"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/25"
                  placeholder={form.subjectPlaceholder}
                />
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm text-white/80">{form.messageLabel}</label>
                <textarea
                  name="message"
                  rows={6}
                  required
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/25"
                  placeholder={form.messagePlaceholder}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{ background: "linear-gradient(270deg, #4db6ac 0%, #00838f 100%)" }}
                className="btn-fancy mt-6 w-full rounded-xl px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95 disabled:opacity-60"
              >
                {loading ? form.sending : form.submit}
              </button>

              {status.msg && (
                <p
                  className={`mt-4 text-center text-sm ${
                    status.type === "success" ? "text-emerald-300" : "text-rose-300"
                  }`}
                >
                  {status.msg}
                </p>
              )}
            </form>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-sm font-semibold text-white/90">{sidebar.connectTitle}</h3>
              <div className="mt-4 space-y-3 text-sm text-white/75">
                <InfoRow label={sidebar.emailLabel} value={sidebar.email} />
                <InfoRow label={sidebar.phoneLabel} value={sidebar.phone} />
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur pb-8">
              <h3 className="text-sm font-semibold text-white/90">{sidebar.addressTitle}</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/75">
                {(sidebar.addressLines ?? []).map((line, i) => (
                  <span key={line}>
                    {line}
                    {i < sidebar.addressLines.length - 1 ? <br /> : null}
                  </span>
                ))}
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70 backdrop-blur">
              {sidebar.tip}
              <br />
              {sidebar.tipDetail}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function Field({ label, name, type = "text", placeholder }) {
  return (
    <div>
      <label className="mb-2 block text-sm text-white/80">{label}</label>
      <input
        name={name}
        type={type}
        required
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/25"
        placeholder={placeholder}
      />
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-white/55">{label}</span>
      <span className="text-white/85">{value}</span>
    </div>
  );
}
