// import { ChatCompletionMessageParam } from "openai/resources";
import OpenAI from "openai";
import dotenv from 'dotenv'
dotenv.config()


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function generatePromt(message:string): Promise<Object> {
  try {

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: 'user', content: message },
        ],
        max_tokens: 150  
    //     temperature: 1,
    // max_tokens: 800,
    // top_p: 1,
    // frequency_penalty: 0,
    // presence_penalty: 0,
    });

    console.log(completion.choices[0].message);

    const reponseApi = completion.choices[0].message
    return reponseApi

  } catch (error) {
    console.error('Error al llamar a la API de OpenAI:', error.response ? error.response.data : error.message);
    throw error;
  }
}


