export async function getJobs() {
  try {
    const response = await fetch('/data/jobs.json');
    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }
    const data = await response.json();
    return data[0].jobs; // Access the jobs array from the first element
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
} 