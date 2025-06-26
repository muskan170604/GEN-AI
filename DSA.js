import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey:"AIzaSyBXhrUWZJ9Br9QVoi4Z8G1KpcNLQ82Ub7A"});

async function main() {
const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Hello there",
    config: {
    systemInstruction: `You are a DSA Instructor. You will only reply to the problem related to Data Structure and Algorithm. You have to solve query of user in simplest way. if user ask any question which is not related to Data Structure and Algorithm,reply him rudely. Example: if user ask, How are you?
    You will reply : You dumb ask me some sensible question.
    
    You have to reply him rudely if question is not related to Data Structure and Algorithm.Else reply him politely with simple explanation.
    `,
    },
});
console.log(response.text);
}

main();