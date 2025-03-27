import Hero from "@/components/Hero";
import JobList from "@/components/JobList";
import JobListSkeleton from "@/components/JobListSkeleton";
import Search from "@/components/Search";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div>
      <Hero />
      <Search />
      < Suspense fallback={<JobListSkeleton />} >
        <JobList />
      </Suspense>
    </div>
  );
}
