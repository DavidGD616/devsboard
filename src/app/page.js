// src/app/page.js
import { Suspense } from "react";
import Hero from "@/components/Hero";
import Search from "@/components/Search";
import JobList from "@/components/JobList";
import JobListSkeleton from "@/components/JobListSkeleton";

const CATEGORIES = [
  { key: "frontend", title: "Latest Frontend Developer Jobs" },
  { key: "backend", title: "Backend Developer" },
  { key: "fullstack", title: "Fullstack Developer" },
];

export default function Home() {
  return (
    <>
      <Hero />
      <Search />

      {CATEGORIES.map(({ key, title }) => (
        <section key={key} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{title}</h2>
          <Suspense fallback={<JobListSkeleton />}>
            {/* JobList will suspend until its fetch+filter finishes */}
            <JobList categoryKey={key} />
          </Suspense>
        </section>
      ))}
    </>
  );
}