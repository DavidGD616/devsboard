// src/app/[id]/page.js
import Search from "@/components/Search";
import JobList from "@/components/JobList";
import Pagination from "@/components/Pagination";
import { fetchCategoryJobs } from "@/lib/fetchCategoryJobs";

export default async function CategoryPage({ params, searchParams }) {
  const { id } = await params;
  const { page } = await searchParams;
  
  const currentPage = Number(page) || 1;
  const title = `${id.charAt(0).toUpperCase() + id.slice(1)} Developer Jobs`;

  // fetch that page of jobs
  const { data: jobs, count, totalPages } = await fetchCategoryJobs(id, {
    page: currentPage,
    pageSize: 20,
  });

  return (
    <>
      <div className="mt-8">
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>

      <Search />

      <section className="pb-8">
        <JobList jobs={jobs} />
      </section>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={`/${id}`}
      />
    </>
  );
}