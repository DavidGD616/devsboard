import Hero from "@/components/Hero";
import JobList from "@/components/JobList";
import Search from "@/components/Search";

export default async function Home() {
  return (
    <div>
      <Hero />
      <Search />
      <JobList />
    </div>
  );
}
