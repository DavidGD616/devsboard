// src/components/JobList.js
import JobCard from "./JobCard";
import { fetchJobs } from "@/lib/fetchJobs";

// Accept an optional "jobs" prop. If not provided, fetch the jobs.
export default async function JobList({ jobs: initialJobs } = {}) {
  let jobList = [];

  if (initialJobs) {
    // Use jobs provided via props (e.g., filtered jobs on the search page)
    jobList = initialJobs;
  } else {
    // Otherwise, fetch all jobs
    const jobsData = await fetchJobs();
    jobList = jobsData[0].jobs;
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