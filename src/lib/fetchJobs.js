import supabase from '@/utils/supabase/client';

export async function fetchJobs(page = 1, pageSize = 20) {
  // Calculate the starting and ending index for records
  const from = (page - 1) * pageSize;
  const to = page * pageSize - 1;
  
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .range(from, to)
    .order('posted_date', { ascending: false });
  
  if (error) {
    throw new Error(`Failed to fetch jobs: ${error.message}`);
  }
  
  return data;
}