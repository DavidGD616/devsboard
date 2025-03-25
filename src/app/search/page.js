// app/search/page.js
import Search from "@/components/Search";
import JobList from "@/components/JobList";
import { fetchJobs } from "@/lib/fetchJobs";

export default async function SearchPage({ searchParams }) {
  // Ensure searchParams is resolved before using its properties
  const sp = await Promise.resolve(searchParams);
  const searchQuery = (sp.search || "").toLowerCase();
  const locationQuery = (sp.location || "").toLowerCase();

  // Fetch all jobs
  const jobsData = await fetchJobs();
  const jobList = jobsData[0].jobs;

  // Filter jobs based on the query parameters
  const filteredJobs = jobList.filter((job) => {
    const title = job.title?.toLowerCase() || "";
    const location = job.location?.toLowerCase() || "";
    return title.includes(searchQuery) && location.includes(locationQuery);
  });

  return (
    <div>
      <Search />
      <JobList jobs={filteredJobs} />
    </div>
  );
}