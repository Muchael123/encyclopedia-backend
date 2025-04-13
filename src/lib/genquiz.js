import { GoogleGenAI, Type } from "@google/genai";
//likes is an array of strings
function createPrompt(topic, likes=["candy", "learning", "playing"], numberOfQuestions=5, noOfOptions=3, objectives) {
    return `Generate a quiz with ${numberOfQuestions} questions about ${topic} for someone who likes: \n ${likes.join(", ")}.The objectives of the topic are: ${objectives} \n Each question should have ${noOfOptions} options. The output should be a JSON array of objects in the following format: \n
    ["question": "question_text", "options": ["option1", "option2", "option3", "option4"], "answer": "option2"], "level": "easy, hard, intermediate" ] \n
    The quiz should be in a form from easy to intermediate to hard in that order. Each item should be unique and not repeated. \n
    `;
  }

  export async function generateQuestion(topic, likes, numberOfQuestions, noOfOptions, objectives) {
   
    const apiKey = process.env.GEMINI_API_KEY;
    const ai = new GoogleGenAI({ apiKey: apiKey });
    console.log("Consulting with Gemini")
    const contents = createPrompt(topic, likes, numberOfQuestions, noOfOptions, objectives);
    try{
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: contents,
            config: {
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    question: {
                      type: Type.STRING,
                      description: "The question text",
                      nullable: false,
                    },
                    options: {
                      type: Type.ARRAY,
                      minItems: 2,
                      maxItems: 4,
                      description: "Array of answer options",
                      items: {
                        type: Type.STRING,
                        description: "Answer option",
                        nullable: false,
                      }
                    },
                    answer: {
                      type: Type.STRING,
                      description: "Correct answer option",
                      nullable: false,
                    },
                    level: {
                      type: Type.STRING,
                      description: "Difficulty level of the question",
                      nullable: false,
                    },
                  },
                  required: ["question", "options", "answer", "level"],
                },
              },
            },
          });
            console.log(response)
            if (!response || !response.text) {
              console.log("AI model returned an empty or invalid response.", response.text);
                return;
              }
          
              return JSON.parse(response.text);
    } catch(error){
        console.log("An error occured",error)
        if (error.message && error.message.includes("JSON")) {
            console.error("Error parsing JSON response from AI.");
          }
          if (error.message && error.message.includes("model")) {
            console.error("Error with the AI model itself.");
          }
          if (error.message && error.message.includes("network")) {
            console.error("Network error while accessing the AI model.");
          }
      
          return ;
    }
  }