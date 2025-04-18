// src/lib/fetchCategoryJobs.js
import supabase from '@/utils/supabase/client';

/**
 * Fetches jobs whose title *or* stack_required array contains the categoryKey.
 * Uses ILIKE for title and JSONB contains (cs) for stack_required.
 */
export async function fetchCategoryJobs(categoryKey, { limit = 20, offset = 0 } = {}) {
  const key = categoryKey.toLowerCase();

  // Build a query that:
  //  - ilike(title, '%key%')
  //  - OR stack_required JSONB array contains key
  const { data, error } = await supabase
    .from('jobs')
    .select('*', { count: 'exact' })
    .or(`title.ilike.%${key}%,stack_required.cs.["${key}"]`)
    .range(offset, offset + limit - 1)   // for pagination
    .order('posted_date', { ascending: false });

  if (error) throw error;
  return { data, count: data.length }; // count is exact only if you need it
}