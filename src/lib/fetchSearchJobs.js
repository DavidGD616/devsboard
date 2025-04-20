// src/lib/fetchSearchJobs.js
import supabase from '@/utils/supabase/client';

export async function fetchSearchJobs({
  search = '',
  lng,
  lat,
  radiusKm = 50,
  page = 1,
  pageSize = 20,
}) {
  const radius_m = Math.round(radiusKm * 1000);
  const offset   = (page - 1) * pageSize;

  const { data, error } = await supabase.rpc('search_jobs', {
    _search:   search,
    _lng:      lng,
    _lat:      lat,
    _radius_m: radius_m,
    _limit:    pageSize,
    _offset:   offset,
  });
  if (error) throw error;

  const count      = data.length ? Number(data[0].total_count) : 0;
  const jobs       = data.map((r) => r.job);
  const totalPages = count ? Math.ceil(count / pageSize) : 0;

  return { data: jobs, count, totalPages };
}