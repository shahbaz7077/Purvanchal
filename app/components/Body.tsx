import Image from "next/image";
import Link from "next/link";

import { company, heroTags, whyChooseUs } from "../../data/company";
import { getProducts } from "../../lib/products";
import type { Product } from "../../types/product";

/* ---------- Reusable ---------- */
function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold tracking-tight text-blue-950 md:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-2 max-w-md text-sm font-medium text-slate-600">
          {subtitle}
        </p>
      )}
      <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800" />
    </div>
  );
}

/* ---------- Product card ---------- */
function ProductCard({ product }: { product: Product }) {
  const cover = product.images[0];

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block overflow-hidden rounded-2xl border-2 border-blue-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-blue-50 via-blue-100 to-white">
        {cover && (
          <Image
            src={cover}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-blue-900/0 via-blue-900/0 to-blue-900/0 transition-all duration-300 group-hover:from-blue-900/20" />
      </div>

      <div className="p-3">
        <h3 className="text-[13px] font-bold text-blue-950 transition-colors duration-200 group-hover:text-blue-700">
          {product.name}
        </h3>
        <p className="mt-0.5 text-[11px] font-medium text-slate-600">
          {product.subtitle}
        </p>
      </div>
    </Link>
  );
}

/* ---------- 1. Hero ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white">
      {/* decorative glow blobs */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-400/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-sky-400/30 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-300/20 blur-3xl" />

      {/* grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto grid max-w-[1100px] items-center gap-10 px-6 py-16 md:grid-cols-[1.2fr_1fr] md:py-20">
        <div>
          <ul className="mb-5 flex flex-wrap gap-x-2.5 gap-y-1 text-xs font-semibold uppercase tracking-wider text-sky-200">
            {heroTags.map((tag, i) => (
              <li key={tag} className="flex items-center gap-2.5">
                <span className="transition-colors hover:text-white">{tag}</span>
                {i < heroTags.length - 1 && (
                  <span aria-hidden className="text-sky-400">
                    •
                  </span>
                )}
              </li>
            ))}
          </ul>

          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
            Manufacturer of High Quality
            <br />
            <span className="bg-gradient-to-r from-sky-300 via-cyan-200 to-blue-300 bg-clip-text text-transparent drop-shadow-sm">
              Industrial Components
            </span>
            <br />
            for Every Application
          </h1>

          <p className="my-6 max-w-md text-sm font-medium leading-relaxed text-sky-100">
            {company.name} — your trusted partner for rolling mill works, oil
            mill works, and precision-manufactured industrial components.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="#products"
              className="rounded-[10px] bg-white px-6 py-2.5 text-sm font-bold text-blue-900 shadow-lg shadow-blue-950/50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-950/60"
            >
              View products
            </Link>

            <Link
              href="#contact"
              className="rounded-[10px] border-2 border-sky-300/60 bg-sky-400/10 px-6 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-sky-400/25"
            >
              Contact us
            </Link>
          </div>
        </div>

        <div className="group relative flex aspect-[4/3] items-center justify-center rounded-2xl bg-white p-4 shadow-2xl shadow-blue-950/50 ring-4 ring-sky-400/40 transition-transform duration-500 hover:scale-[1.02] hover:ring-sky-300/70 sm:p-6">
          <Image
            src="/comp.jpeg"
            alt="Industrial Components"
            width={1366}
            height={894}
            priority
            sizes="(min-width: 768px) 40vw, 90vw"
            className="h-full w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-blue-950/40" />
    </section>
  );
}

/* ---------- 2. Product range ---------- */
async function ProductRange() {
  const products = await getProducts();

  return (
    // scroll-mt-32 = offset so the sticky navbar doesn't cover the section title
    <section
      id="products"
      className="scroll-mt-32 bg-gradient-to-b from-blue-50/60 via-white to-blue-50/40 py-16"
    >
      <div className="mx-auto max-w-[1100px] px-6">
        <SectionTitle
          title="Our Product Range"
          subtitle="Precision-engineered components built to last."
        />

        {products.length === 0 ? (
          <p className="pt-7 text-center text-sm font-medium text-slate-600">
            Products coming soon.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 pt-8 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- 3. Why choose us ---------- */
function WhyChooseUs() {
  return (
    <section id="why-us" className="scroll-mt-32 bg-white py-16">
      <div className="mx-auto max-w-[1100px] px-6">
        <SectionTitle
          title="Why Choose Us"
          subtitle="The numbers and values that set us apart."
        />

        <ul className="grid grid-cols-2 gap-3 pt-8 md:grid-cols-5 md:gap-3">
          {whyChooseUs.map((item) => (
            <li
              key={item.title + item.sub}
              className="group rounded-xl border-2 border-blue-100 bg-gradient-to-br from-white to-blue-50 px-3 py-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/20 last:col-span-2 md:last:col-span-1"
            >
              <div className="text-lg font-extrabold text-blue-800 md:text-xl">
                {item.title}
              </div>
              <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                {item.sub}
              </div>
              <div className="mx-auto mt-3 h-1 w-6 rounded-full bg-blue-300 transition-all duration-300 group-hover:w-12 group-hover:bg-blue-600" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- 4. Contact CTA ---------- */
function ContactCTA() {
  const mailHref = `mailto:${company.email}?subject=${encodeURIComponent(
    "Product inquiry"
  )}`;

  const rawPhone = company.phones[0].replace(/\D/g, "");
  const callHref = `tel:+91${rawPhone}`;
  const whatsappHref = `https://wa.me/${company.whatsapp}`;

  return (
    <section
      id="contact"
      className="scroll-mt-32 bg-gradient-to-br from-blue-50 via-white to-blue-100 py-16"
    >
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="relative overflow-hidden rounded-2xl border-2 border-blue-200 bg-white p-8 text-center shadow-xl shadow-blue-500/10 md:p-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-300/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-sky-300/40 blur-3xl" />

          <div className="relative">
            <h2 className="text-2xl font-extrabold text-blue-950 md:text-3xl">
              Need a custom part?
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm font-medium leading-relaxed text-slate-700">
              Send us your drawing or specification. We will reply with lead
              time and pricing.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href={mailHref}
                className="rounded-[10px] bg-blue-700 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-800"
              >
                Send inquiry
              </a>

              <a
                href={callHref}
                className="rounded-[10px] border-2 border-blue-300 bg-white px-6 py-2.5 text-sm font-bold text-blue-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500 hover:bg-blue-50"
              >
                Call us
              </a>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[10px] border-2 border-green-300 bg-white px-6 py-2.5 text-sm font-bold text-green-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-green-500 hover:bg-green-50"
              >
                WhatsApp
              </a>
            </div>

            <p className="mt-6 text-xs font-semibold text-blue-800">
              {company.email} · {company.phones.join(" · ")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Main ---------- */
export default function Body() {
  return (
    <main className="w-full overflow-x-hidden bg-white">
      <Hero />
      <ProductRange />
      <WhyChooseUs />
      <ContactCTA />
    </main>
  );
}