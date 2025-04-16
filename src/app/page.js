import Hero from "@/components/Hero";
import JobList from "@/components/JobList";
import JobListSkeleton from "@/components/JobListSkeleton";
import Pagination from "@/components/Pagination";
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
      <Pagination />
    </div>
  );
}
