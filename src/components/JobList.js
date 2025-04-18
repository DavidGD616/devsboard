// src/components/JobList.js
import JobCard from "./JobCard";
import supabase from "@/utils/supabase/client";

export default async function JobList({ categoryKey } = {}) {
  // 1️⃣ Fetch *all* jobs from Supabase
  const { data: allJobs, error } = await supabase
    .from("jobs")
    .select("*");
  if (error) throw error;

  // 2️⃣ Filter by title or stack_required
  const lower = categoryKey.toLowerCase();
  const jobs = allJobs.filter((job) => {
    const title = job.title?.toLowerCase() || "";
    const stacks = Array.isArray(job.stack_required)
      ? job.stack_required.map((s) => s.toLowerCase())
      : [];
    return title.includes(lower) || stacks.includes(lower);
  });

  // 3️⃣ Render the filtered list
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