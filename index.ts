import { serve } from "https://deno.land/std@0.119.0/http/server.ts";

async function handler(_req: Request): Promise<Response> {
    // get request body
    const word1 = "hello";
    const word2 = "world";
    const result = await similarity(word1, word2);
    return new Response(String(result))
}

async function similarity(word1, word2){
    return word1 + word2;
}

serve(handler);