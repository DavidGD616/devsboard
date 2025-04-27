import supabase from "@/utils/supabase/client";

const hiddenApiHeaders = {
    'accept': '*/*',
    'accept-language': 'en-US,en;q=0.9,gl;q=0.8,la;q=0.7,fr;q=0.6,he;q=0.5,pt;q=0.4,es;q=0.3',
    'origin': 'https://www.devjobsscanner.com',
    'priority': 'u=1, i',
    'referer': 'https://www.devjobsscanner.com/',
    'sec-ch-ua': '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36'
};

// Transform function to convert MongoDB extended JSON to native types
function transformRecord(record) {
    return {
      id: record._id?.$oid, 
      source_id: record.id || null, 
      city: record.city,
      company: record.company,
      date: record.date, // Should be in YYYY-MM-DD format
      geometry: record.geometry, // Storing the entire geometry object as JSONB
      img: record.img,
      location: record.location,
      // Convert postedDate from milliseconds to an ISO string timestamp
      posted_date: record.postedDate?.$date?.$numberLong
        ? new Date(Number(record.postedDate.$date.$numberLong)).toISOString()
        : null,
      remote_ok: record.remoteOk,
      salary_currency: record.salaryCurrency,
      // Parse numeric values from the extended JSON structure
      salary_in_dollars: record.salaryInDollars?.$numberInt
        ? parseInt(record.salaryInDollars.$numberInt, 10)
        : null,
      salary_is_approximated: record.salaryIsApproximated,
      salary_max: record.salaryMax?.$numberInt
        ? parseInt(record.salaryMax.$numberInt, 10)
        : null,
      salary_min: record.salaryMin?.$numberInt
        ? parseInt(record.salaryMin.$numberInt, 10)
        : null,
      source: record.source,
      stack_optional: record.stackOptional,
      stack_required: record.stackRequired,
      title: record.title,
      url: record.url,
      score: record.score?.$numberDouble
        ? parseFloat(record.score.$numberDouble)
        : null
    };
}

export async function POST() {
    try {
      let page = 1;
      const batchSize = 10;
      let batch = [];
      let totalFetched = 0;
  
      while (true) {
        // Construct the hidden API URL with the current page number
        const url = `https://data.mongodb-api.com/app/application-0-raktq/endpoint/searchFull?search=&locationText=United%20States&page=${page}&minPostedDate=2025-04-25&db=prod`;
  
        const response = await fetch(url, { headers: hiddenApiHeaders });
        if (!response.ok) {
          throw new Error(`Error fetching page ${page}: ${response.statusText}`);
        }
  
        const data = await response.json();
        // Exit loop if no data is returned
        if (!data || data.length === 0) break;

        let jobsArray = [];
        data.forEach(item => {
          if (item.jobs && Array.isArray(item.jobs)) {
            jobsArray.push(...item.jobs);
          }
        });
  
        // Transform each record to match the table's data types
        const transformedRecords = jobsArray.map(transformRecord)
  
        batch.push(...transformedRecords);
        totalFetched += jobsArray.length;
  
        // Once the batch is large enough, upsert it into Supabase
        if (batch.length >= batchSize) {
          const { error } = await supabase
            .from('jobs')
            .upsert(batch);
          if (error) {
            throw error;
          }
          // Clear the batch
          batch = [];
        }
  
        console.log(`Fetched page ${page}, total records so far: ${totalFetched}`);
        page++;
  
        // Optional: delay between requests to avoid rate limiting
        // await new Promise(resolve => setTimeout(resolve, 100));
      }
  
      // Upsert any remaining records in the final batch
      if (batch.length > 0) {
        const { error } = await supabase
          .from('jobs')
          .upsert(batch);
        if (error) {
          throw error;
        }
      }
  
      return new Response(
        JSON.stringify({ message: 'Data sync completed', totalFetched }),
        { status: 200 }
      );
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}