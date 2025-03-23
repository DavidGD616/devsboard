import { promises as fs } from 'fs';

export async function GET() {
    const file = await fs.readFile(process.cwd() + '/src/data/jobs.json', 'utf8');
    const data = JSON.parse(file);
    console.log("data returned" + data);

    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      });
}

