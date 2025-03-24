export async function fetchJobs() {
    const res = await fetch('http://localhost:3000/api/jobs');
    if (!res.ok) {
        throw new Error('Failed to fetch jobs')
    }
    return res.json()
}