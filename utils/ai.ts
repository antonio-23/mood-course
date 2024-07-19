import { ChatVertexAI } from "@langchain/google-vertexai";
import { StructuredOutputParser } from "langchain/output_parsers";

import * as z from "zod";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe("The mood of the person who wrote the journal entry."),
    summary: z.string().describe("Quick summary of the entire entry."),
    negative: z
      .boolean()
      .describe(
        "Is the journal entry negative? (i.e. does it contain negative emotions?)"
      ),
    colos: z
      .string()
      .describe(
        "A hexidecimal color code represents the mood of the entry. Example #0101fe for blue representing happiness."
      ),
  })
);

export const analyze = async (prompt: string) => {
  const model = new ChatVertexAI({
    model: "gemini-1.0-pro",
    maxOutputTokens: 2048,
    apiKey: process.env.GOOGLE_VERTEX_AI_WEB_CREDENTIALS,
    temperature: 0,
  });

  const res = await model.invoke([["human", prompt]]);
  console.log(res.content);
};
