// src/app/search/page.js
import Search from "@/components/Search";
import JobList from "@/components/JobList";
import Pagination from "@/components/Pagination";
import { Suspense } from "react";
import JobListSkeleton from "@/components/JobListSkeleton";
import { fetchSearchJobs } from "@/lib/fetchSearchJobs";

export default async function SearchPage({ searchParams }) {
  // await searchParams so we can destructure
  const sp = await Promise.resolve(searchParams);

  const searchQuery   = (sp.search || "").toLowerCase();
  const locationParam = sp.location || "";
  const locationText  = sp.locationText || "";
  const [lng, lat]    = locationParam.split(",").map(Number);

  const currentPage = Number(sp.page) || 1;
  const pageSize    = Number(sp.pageSize) || 20;
  const radiusKm    = Number(sp.radiusKm) || 50;

  // your PostGIS search + pagination
  const { data: jobs, count, totalPages } = await fetchSearchJobs({
    search:    searchQuery,
    lng,
    lat,
    radiusKm,
    page:      currentPage,
    pageSize,
  });

  // build a basePath that includes all query params except page
  const basePath = `/search?` +
    `search=${encodeURIComponent(searchQuery)}` +
    `&location=${encodeURIComponent(locationParam)}` +
    `&locationText=${encodeURIComponent(locationText)}` +
    `&radiusKm=${radiusKm}`;

  return (
    <div>
      <Search />

      <Suspense fallback={<JobListSkeleton />}>
        <JobList jobs={jobs} />
      </Suspense>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={basePath}
      />
    </div>
  );
}