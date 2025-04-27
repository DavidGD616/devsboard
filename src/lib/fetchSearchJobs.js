// src/lib/fetchSearchJobs.js
import supabase from '@/utils/supabase/client';

export async function fetchSearchJobs({
  search   = '',
  lng,
  lat,
  radiusKm = 50,
  page     = 1,
  pageSize = 20,
}) {
  const offset = (page - 1) * pageSize;
  const radius_m = Math.round(radiusKm * 1000);

  // Case A: text + geo
  if (search && typeof lat === 'number' && typeof lng === 'number') {
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
    const jobs       = data.map(r => r.job);
    const totalPages = count ? Math.ceil(count / pageSize) : 0;
    return { data: jobs, count, totalPages };
  }

  // Case B: text only
  if (search) {
    const { data, count, error } = await supabase
      .from('jobs')
      .select('*', { count: 'exact' })
      .ilike('title', `%${search}%`)
      .order('posted_date', { ascending: false })
      .range(offset, offset + pageSize - 1);

    if (error) throw error;
    const totalPages = count ? Math.ceil(count / pageSize) : 0;
    return { data, count, totalPages };
  }

  // Case C: geo only
  if (typeof lat === 'number' && typeof lng === 'number') {
    const { data, error } = await supabase.rpc('search_jobs', {
      _search:   '',       // empty text
      _lng:      lng,
      _lat:      lat,
      _radius_m: radius_m,
      _limit:    pageSize,
      _offset:   offset,
    });
    if (error) throw error;

    const count      = data.length ? Number(data[0].total_count) : 0;
    const jobs       = data.map(r => r.job);
    const totalPages = count ? Math.ceil(count / pageSize) : 0;
    return { data: jobs, count, totalPages };
  }

  // Case D: no filters → return all, paginated
  const { data, count, error } = await supabase
    .from('jobs')
    .select('*', { count: 'exact' })
    .order('posted_date', { ascending: false })
    .range(offset, offset + pageSize - 1);

  if (error) throw error;
  return {
    data,
    count,
    totalPages: count ? Math.ceil(count / pageSize) : 0,
  };
}