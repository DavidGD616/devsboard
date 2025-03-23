import Hero from "@/components/Hero";
import Search from "@/components/Search";

export default async function Home() { //Remember to delete the async once you export to the component 
  const data = await fetch('http://localhost:3000/api/jobs');
  const jobs = await data.json();
  console.log("Jobs:", jobs);

  const jobList = jobs[0].jobs;
  return (
    <div>
      <Hero />
      <Search />
      <ul>
        {jobList.map((job, index) => (
          <li key={index}>{job.title}</li>
        ))}
      </ul>
    </div>
  );
}
