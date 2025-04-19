import { Suspense } from 'react'
import JobList from './JobList'
import JobListSkeleton from './JobListSkeleton'
import { fetchCategoryJobs } from '@/lib/fetchCategoryJobs'

export default function CategoryJobSection({ categoryKey, title, limit }) {
  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>

      <Suspense fallback={<JobListSkeleton />}>
        <AsyncCategoryJobs categoryKey={categoryKey} limit={limit} />
      </Suspense>
    </section>
  )
}

async function AsyncCategoryJobs({ categoryKey, limit }) {
  const { data: jobs } = await fetchCategoryJobs(categoryKey, { limit })
  return <JobList jobs={jobs} />
}