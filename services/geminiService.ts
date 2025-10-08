
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const CODE_REVIEW_PROMPT = `
أنت خبير في مراجعة أكواد بايثون للطلاب المبتدئين في الصف الأول الثانوي بمصر.
مهمتك هي مراجعة الكود التالي.
أولاً، قم بمحاكاة ناتج تنفيذ الكود بدقة.
ثانياً، قدم ملاحظات بناءة ومشجعة حول الكود، مع التركيز على الأسلوب، الوضوح، وأي تحسينات ممكنة.
يجب أن تكون ملاحظاتك بسيطة وسهلة الفهم.
قم بتنسيق ردك ككائن JSON صالح يحتوي على مفتاحين: "output" و "feedback".
`;

export const getAIReviewForCode = async (code: string): Promise<{ output: string; feedback: string; }> => {
  try {
    const fullPrompt = `${CODE_REVIEW_PROMPT}\n\nالكود:\n\`\`\`python\n${code}\n\`\`\``;
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
    });
    
    const text = response.text.trim();
    // Clean the response to ensure it's valid JSON
    const jsonString = text.replace(/^```json\s*|```\s*$/g, '');
    const result = JSON.parse(jsonString);
    return {
      output: result.output || "لم يتمكن الذكاء الاصطناعي من تحديد ناتج.",
      feedback: result.feedback || "لم يتمكن الذكاء الاصطناعي من تقديم ملاحظات.",
    };
  } catch (error) {
    console.error("Error getting AI review:", error);
    return {
      output: "حدث خطأ أثناء محاكاة الكود.",
      feedback: "عفواً، حدث خطأ أثناء مراجعة الكود. يرجى المحاولة مرة أخرى.",
    };
  }
};


const AI_TUTOR_SYSTEM_INSTRUCTION = `أنت معلم افتراضي ذكي متخصص في تدريس منهج البرمجة والذكاء الاصطناعي لطلاب الصف الأول الثانوي في مصر. استخدم اللغة العربية البسيطة، الأمثلة العملية، والتشجيع المستمر. كن ودوداً ومساعداً.`;

export const getAITutorResponse = async (userMessage: string, history: ChatMessage[]): Promise<string> => {
    try {
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: AI_TUTOR_SYSTEM_INSTRUCTION
            },
            history: history.map(msg => ({
                role: msg.role,
                parts: [{ text: msg.text }]
            }))
        });

        const response: GenerateContentResponse = await chat.sendMessage({ message: userMessage });
        return response.text;

    } catch (error) {
        console.error("Error getting AI tutor response:", error);
        return "عفواً، حدث خطأ ما. هل يمكنك إعادة صياغة سؤالك؟";
    }
};
