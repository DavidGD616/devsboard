import JobCard from "./JobCard";
import { fetchJobs } from "@/lib/fetchJobs";

export default async function JobList() {
  const jobs = await fetchJobs();
  const jobList = jobs[0].jobs;

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
