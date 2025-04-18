// src/components/JobList.js
import JobCard from "./JobCard";
import { fetchCategoryJobs } from "@/lib/fetchCategoryJobs";

export default async function JobList({ categoryKey }) {
  const { data: jobs } = await fetchCategoryJobs(categoryKey, { limit: 5 });
  console.log("Jorbs for category:", categoryKey, jobs);

  return (
    <ul className="space-y-4">
      {jobs.map(job => (
        <li key={job.id}>
          <JobCard job={job} />
        </li>
      ))}
    </ul>
  );
}