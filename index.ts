import { serve } from "https://deno.land/std@0.119.0/http/server.ts";

async function handler(_req: Request): Promise<Response> {
    // get request body
    try{
        const guess = await extractGuess(_req);
        return new Response("Guess received: "+ guess);}
    catch(error){
        const word1 = "hello ";
        const word2 = "world";
        const result = await similarity(word1, word2);
        // return new Response(String(result));
        return new Response(String(error));
    }

}

async function similarity(word1, word2){
    return word1 + word2;
}


const extractGuess = async (_req: Request) => {
    const slackPayload = await _req.formData();
    const guess = await slackPayload.get("text")?.toString();
    if (!guess) {
      throw Error("Guess is empty or null");
    }
    return guess;
  };

serve(handler);