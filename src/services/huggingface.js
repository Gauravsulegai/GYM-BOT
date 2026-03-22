import axios from 'axios';

// Groq's OpenAI-compatible endpoint
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

// Llama 3.3 70B Versatile is incredibly smart and lightning fast on Groq
const MODEL = "llama-3.3-70b-versatile";

export const generateGymResponse = async (userMessage) => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    // Sanitized missing key error
    throw new Error("Gym access card missing! Make sure your API key is hooked up correctly.");
  }

  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: MODEL,
        messages: [
          {
            role: "system",
            content: "You are an elite fitness, bodybuilding, and nutrition coach. Answer queries strictly related to the gym, strength training, and diet. Be concise, highly accurate, and structure your advice clearly using bullet points where appropriate."
          },
          {
            role: "user",
            content: userMessage
          }
        ],
        temperature: 0.7,
        max_tokens: 800, 
      },
      {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.choices[0].message.content.trim();
    
  } catch (error) {
    // Keep the technical logs in the console for you to debug
    console.error("Groq API Error Details:", error.response?.data || error.message);
    
    // Clean, gym-themed error handling for the UI
    if (error.response?.status === 401) {
      throw new Error("Hmm, the gym doors seem to be locked right now (Authentication Failed). Let's check that key and try again!");
    } else {
      throw new Error("Looks like I dropped the barbell. Let's take a breather and try that set again!");
    }
  }
};