import supabase from "@/utils/supabase/client";

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('jobs')
            .select('*')
            .limit(1);

        if (error) {
            throw error;
        }

        return new Response(
            JSON.stringify({ message: 'Connection succesful', data }),
            { status: 200 }
        )

    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500 }
        )
    }
}