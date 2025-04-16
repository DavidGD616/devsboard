// src/components/JobList.js
import JobCard from "./JobCard";
import { fetchJobs } from "@/lib/fetchJobs";

// Accept an optional "jobs" prop and an optional "page" prop (default is 1).
export default async function JobList({ jobs: initialJobs, page = 1 } = {}) {
  let jobList = [];

  if (initialJobs) {
    // Use jobs provided via props
    jobList = initialJobs;
  } else {
    // Otherwise, fetch jobs for the current page (20 records per page)
    const result = await fetchJobs(page, 20);
    // result includes { data, count, totalPages } — we'll use only the data for rendering
    jobList = result.data;
    console.log("Fetched jobs:", result);
  }

  return (
    <ul>
      {jobList.map((job, index) => (
        <li key={index}>
          <JobCard job={job} />
        </li>
      ))}
    </ul>
  );
}