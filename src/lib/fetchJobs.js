import supabase from '@/utils/supabase/client';

export async function fetchJobs(page = 1, pageSize = 20) {
  // Calculate the starting and ending index for records
  const from = (page - 1) * pageSize;
  const to = page * pageSize - 1;
  
  // Fetch data and an exact count of rows from the jobs table
  const { data, count, error } = await supabase
    .from('jobs')
    .select('*', { count: 'exact' })
    .range(from, to)
    .order('posted_date', { ascending: false });
  
  if (error) {
    throw new Error(`Failed to fetch jobs: ${error.message}`);
  }
  
  // Calculate total pages based on the count and pageSize
  const totalPages = count ? Math.ceil(count / pageSize) : 0;
  
  // Return an object with the data, count, and totalPages
  return { data, count, totalPages };
}