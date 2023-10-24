import { serve } from "https://deno.land/std@0.119.0/http/server.ts";

async function handler(_req: Request): Promise<Response> {
    // get request body
    try{
        const word1 = "chien";
        const guess = await extractGuess(_req);
        const score = await similarity(word1, guess);
        const response = responseBuilder(score, guess);

        return new Response(response);
    }
    catch(error){
        return new Response(String(error));
    }

}

async function similarity(word1, word2){
    const body = {
        sim1: word1,
        sim2: word2,
        lang: "fr",
        type: "General Word2Vec",
      };
    const similarityResponse = await fetch(
        "http://nlp.polytechnique.fr/similarityscore",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
    const similarityResponseJson = await similarityResponse.json();
    return Number(similarityResponseJson.simscore);
}

const extractGuess = async (_req: Request) => {
    const slackPayload = await _req.formData();
    const guess = await slackPayload.get("text")?.toString();
    if (!guess) {
      throw Error("Guess is empty or null");
    }
    return guess;
  };

function responseBuilder(similarityResult, guess){
    if (similarityResult==1){
        return "Congratulations, you guessed correctly!";
    } else {
        return `Sorry, ${guess} is incorrect. Similarity:${similarityResult}`;
    }
}



serve(handler);