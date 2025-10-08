
import React, { useState, useRef, useEffect } from 'react';
import { getAITutorResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, User, BrainCircuit, Loader2 } from './icons/Icons';

const AITutorPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'أهلاً بك! أنا معلمك الذكي. اسألني عن أي شيء في منهج البرمجة والذكاء الاصطناعي.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const history = [...messages, userMessage];
    const aiResponseText = await getAITutorResponse(input, history);
    const aiMessage: ChatMessage = { role: 'model', text: aiResponseText };
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col h-[70vh]">
      <div className="p-4 border-b flex items-center">
        <BrainCircuit className="h-8 w-8 text-blue-600" />
        <h1 className="text-xl font-bold ml-3 text-gray-800">المعلم الذكي</h1>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 my-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'model' && <div className="bg-blue-500 text-white rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center"><BrainCircuit className="h-5 w-5"/></div>}
            <div className={`max-w-md p-3 rounded-xl ${msg.role === 'user' ? 'bg-blue-100 text-gray-800' : 'bg-white border text-gray-700'}`}>
              <p style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
            </div>
             {msg.role === 'user' && <div className="bg-gray-200 text-gray-600 rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center"><User className="h-5 w-5"/></div>}
          </div>
        ))}
         {isLoading && (
          <div className="flex items-start gap-3 my-4 justify-start">
             <div className="bg-blue-500 text-white rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin"/>
             </div>
             <div className="max-w-md p-3 rounded-xl bg-white border text-gray-700">
                <p>يفكر...</p>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t bg-white">
        <div className="flex items-center space-x-2 space-x-reverse">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="اكتب سؤالك هنا..."
            className="flex-1 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 disabled:bg-blue-400 transition-all"
          >
            <Send className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AITutorPage;
