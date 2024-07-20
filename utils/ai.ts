import { PromptTemplate } from "@langchain/core/prompts";
import { ChatVertexAI } from "@langchain/google-vertexai";
import { StructuredOutputParser } from "langchain/output_parsers";
import * as z from "zod";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe("The mood of the person who wrote the journal entry."),
    summary: z.string().describe("Quick summary of the entire entry."),
    subject: z.string().describe("The subject of the journal entry."),
    negative: z
      .boolean()
      .describe(
        "Is the journal entry negative? (i.e. does it contain negative emotions?)"
      ),
    color: z
      .string()
      .describe(
        "A hexidecimal color code that represents the mood of the entry. Example #22c55e for blue representing happiness."
      ),
  })
);

const getPrompt = async (content) => {
  const format_instructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      "Analyze the following journal entry. Follow the intructions and format your response to match the format instructions, no matter what! \n {format_instructions}\n{entry}",
    inputVariables: ["entry"],
    partialVariables: { format_instructions },
  });

  const input = await prompt.format({
    entry: content,
  });

  console.log(input);

  return input;
};

export const analyze = async (content: string) => {
  const input = await getPrompt(content);

  const model = new ChatVertexAI({
    model: "gemini-1.0-pro",
    maxOutputTokens: 2048,
    apiKey: process.env.GOOGLE_VERTEX_AI_WEB_CREDENTIALS,
    temperature: 0,
  });

  const res = await model.invoke([["human", input]]);

  try {
    return parser.parse(res.content.toString());
  } catch (error) {
    console.error(error);
  }
};
