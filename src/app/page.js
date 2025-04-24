// src/app/page.js
export const dynamic = "force-dynamic";

import Hero from "@/components/Hero";
import Search from "@/components/Search";
import CategoryJobSection from "@/components/CategoryJobSection";

const CATEGORIES = [
  { key: "frontend",  title: "Latest Frontend Developer Jobs",  limit: 5 },
  { key: "backend",   title: "Latest Backend Developer Jobs",   limit: 5 },
  { key: "fullstack", title: "Latest Fullstack Developer Jobs", limit: 5 },
];

export default function Home() {
  return (
    <>
      <Hero />
      <Search />
      <section className="py-12">
          {CATEGORIES.map(({ key, title, limit }) => (
            <CategoryJobSection
              key={key}
              categoryKey={key}
              title={title}
              limit={limit}
            />
          ))}
      </section>
    </>
  );
}