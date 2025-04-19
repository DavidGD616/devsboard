// src/lib/fetchCategoryJobs.js
import supabase from '@/utils/supabase/client';

/**
 * Fetches jobs whose title or stack_required array contains the categoryKey,
 * and returns paginated results along with total count and total pages.
 *
 * @param {string} categoryKey
 * @param {object} options
 * @param {number} options.page - The page number (1‑based)
 * @param {number} options.pageSize - Number of items per page
 */
export async function fetchCategoryJobs(
  categoryKey,
  { page = 1, pageSize = 20 } = {}
) {
  const key = categoryKey.toLowerCase();
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, count, error } = await supabase
    .from('jobs')
    .select('*', { count: 'exact' })
    .or(`title.ilike.%${key}%,stack_required.cs.["${key}"]`)
    .order('posted_date', { ascending: false })
    .range(from, to);

  if (error) throw error;

  const totalPages = count ? Math.ceil(count / pageSize) : 0;

  return { data, count, totalPages };
}