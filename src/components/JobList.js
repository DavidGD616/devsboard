// src/components/JobList.js
import JobCard from "./JobCard";

export default function JobList({ jobs = [] }) {
  return (
    <ul className="space-y-4">
      {jobs.map((job) => (
        <li key={job.id}>
          <JobCard job={job} />
        </li>
      ))}
    </ul>
  );
}