// src/app/page.js
import Hero from "@/components/Hero";
import Search from "@/components/Search";
import CategoryJobSection from "@/components/CategoryJobSection";

const CATEGORIES = [
  { key: "frontend", title: "Latest Frontend Developer Jobs" },
  { key: "backend", title: "Latest Backend Developer Jobs" },
  { key: "fullstack", title: "Latest Fullstack Developer Jobs" },
];

export default function Home() {
  return (
    <>
      <Hero />
      <Search />

      {CATEGORIES.map(({ key, title }) => (
        <CategoryJobSection
          key={key}
          categoryKey={key}
          title={title}
          limit={5}
        />
      ))}
    </>
  );
}