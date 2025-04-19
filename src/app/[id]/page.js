// src/app/[id]/page.js
import Search from "@/components/Search";
import JobList from "@/components/JobList";
import { fetchCategoryJobs } from "@/lib/fetchCategoryJobs";

export default async function CategoryPage({ params }) {
  // await params so params.id is available
  const { id } = await params;
  const title = `${id.charAt(0).toUpperCase() + id.slice(1)} Developer Jobs`;

  // fetch with pagination info
  const { data: jobs, count, totalPages } = await fetchCategoryJobs(id, {
    page: 1,
    pageSize: 20,
  });

  // log the fetched array and pagination metadata
  console.log({ category: id, jobs, count, totalPages });

  return (
    <>
      <div className="mt-8">
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>

      <Search />

      <section className="pb-8">
        <JobList jobs={jobs} />
      </section>
    </>
  );
}