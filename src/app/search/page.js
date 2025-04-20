// src/app/search/page.js
import Search from "@/components/Search";
import JobList from "@/components/JobList";
import { Suspense } from "react";
import JobListSkeleton from "@/components/JobListSkeleton";
import { fetchSearchJobs } from "@/lib/fetchSearchJobs";

export default async function SearchPage({ searchParams }) {
  // ensure searchParams is awaited
  const sp = await Promise.resolve(searchParams);
  console.log("SearchPage params:", sp);

  const searchQuery    = (sp.search || "").toLowerCase();
  const locationParam  = sp.location || "";
  const [lng, lat]     = locationParam.split(",").map(Number);
  const radiusKm       = Number(sp.radiusKm) || 50;
  const page           = Number(sp.page) || 1;
  const pageSize       = Number(sp.pageSize) || 20;

  console.log("Fetching jobs with:", { searchQuery, lng, lat, radiusKm, page, pageSize });

  const { data: jobs, count, totalPages } = await fetchSearchJobs({
    search:    searchQuery,
    lng,
    lat,
    radiusKm,
    page,
    pageSize,
  });

  console.log("Fetched jobs:", jobs.length, "count:", count, "totalPages:", totalPages);

  return (
    <div>
      <Search />

      <Suspense fallback={<JobListSkeleton />}>
        <JobList
          jobs={jobs}
          totalCount={count}
          page={page}
          totalPages={totalPages}
        />
      </Suspense>
    </div>
  );
}