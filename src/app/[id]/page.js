import Search from "@/components/Search";
import JobList from "@/components/JobList";
import { fetchCategoryJobs } from "@/lib/fetchCategoryJobs";

export default async function CategoryPage({ params }) {
  const { id } = await params;
  const title = `${id.charAt(0).toUpperCase() + id.slice(1)} Developer Jobs`;
  const { data: jobs } = await fetchCategoryJobs(id);
  console.log(jobs)

  return (
    <>
      <div className="mt-8">
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>

      <Search />

      <section className="pb-8">
        <div className="mb-8">
          <JobList jobs={jobs} />
        </div>
      </section>
    </>
  );
}
