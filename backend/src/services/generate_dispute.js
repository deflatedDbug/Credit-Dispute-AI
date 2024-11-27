import OpenAI from "openai/index.mjs"

import dotenv from 'dotenv';
dotenv.config();

// Initialize the OpenAI instance
const openaiInstance = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

/**
 * @param {Object} userData - Contains user information for the dispute letter
 * @param {string} userData.name - The user's name
 * @param {string} userData.address - The user's address
 * @param {string} userData.disputeDetails - Details about the credit dispute
 * @returns {string} - The generated dispute letter
 */
async function generate_dispute_letter(userData) {
  const messages = [
    {
      role: "system",
      content:
        "You are a credit repair expert specialized in writing professional credit dispute letters backed with factual and relevant legal codes. Your goal is to create concise and accurate letters based on provided user information. Each letter should be a maximum of 7-8 sentences ",
    },
    {
      role: "user",
      content: `
        Write a professional credit dispute letter based on the following information: 
        - Name: ${userData.name}
        - Address: ${userData.address}
        - Dispute details: ${userData.disputeDetails}

        The letter should be concise and effective, clearly requesting action to resolve the dispute. Double check for any inaccuracies and hallucinated information before generating the dispute letter. Ground the letter with factual and supporting legal codes that could be used to threaten a legal suit if the dispute is not resolved.
      `,
    },
  ];

  try {
    const response = await openaiInstance.chat.completions.create({
      model: "gpt-3.5-turbo", // Use "gpt-3.5-turbo" if you want a cheaper/faster alternative
      messages: messages,
      max_tokens: 400, // Limit the response length
    });

    return response.choices[0].message.content.trim(); // Extract the generated letter
  } catch (error) {
    throw new Error(`OpenAI API Error: ${error.message}`);
  }
}

export default generate_dispute_letter;

