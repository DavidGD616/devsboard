import { Suspense } from 'react'
import JobList from './JobList'
import JobListSkeleton from './JobListSkeleton'
import { fetchCategoryJobs } from '@/lib/fetchCategoryJobs'
import Link from 'next/link'

export default function CategoryJobSection({ categoryKey, title, limit }) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <Link 
          href={`/categories/${categoryKey}`}
          className="text-black hover:font-bold hover:text-blue-700 hover:underline transition-colors"
        >
          See all
        </Link>
      </div>

      <Suspense fallback={<JobListSkeleton />}>
        <AsyncCategoryJobs categoryKey={categoryKey} limit={limit} />
      </Suspense>

      <div className="mt-4">
        <Link 
          href={`/categories/${categoryKey}`}
          className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          See all {title}
        </Link>
      </div>
    </div>
  )
}

async function AsyncCategoryJobs({ categoryKey, limit }) {
  const { data: jobs } = await fetchCategoryJobs(categoryKey, { limit })
  return <JobList jobs={jobs} />
}