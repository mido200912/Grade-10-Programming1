
import React, { useState } from 'react';
import { getAIReviewForCode } from '../services/geminiService';
import { Play, BrainCircuit, Loader2, MessageSquare, Terminal } from './icons/Icons';

const CodeLabPage: React.FC = () => {
  const [code, setCode] = useState<string>('# اكتب كود بايثون هنا\nname = "طالب"\nprint("مرحباً يا " + name)');
  const [output, setOutput] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRunCode = async () => {
    setIsLoading(true);
    setOutput('');
    setFeedback('');
    const result = await getAIReviewForCode(code);
    setOutput(result.output);
    setFeedback(result.feedback);
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">مختبر الكود التفاعلي</h1>
        <p className="text-gray-600 mt-2">اكتب كود بايثون، جربه، واحصل على ملاحظات فورية من المعلم الذكي!</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
        <div className="bg-gray-800 rounded-t-lg p-2 text-sm text-gray-400 font-mono">
          main.py
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-64 p-4 font-mono text-lg bg-gray-900 text-green-400 rounded-b-lg focus:outline-none resize-none"
          dir="ltr"
          spellCheck="false"
        />
      </div>

      <div className="text-center my-4">
        <button
          onClick={handleRunCode}
          disabled={isLoading}
          className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700 transition-transform transform hover:scale-105 shadow-lg flex items-center justify-center mx-auto disabled:bg-purple-400 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-6 w-6 ml-2 animate-spin" />
              جاري المراجعة...
            </>
          ) : (
            <>
              <Play className="h-6 w-6 ml-2" />
              تشغيل ومراجعة الكود
            </>
          )}
        </button>
      </div>

      { (output || feedback) && (
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-lg font-bold mb-2 flex items-center text-gray-700">
              <Terminal className="h-5 w-5 ml-2 text-blue-500" />
              الناتج المتوقع
            </h3>
            <pre className="bg-gray-100 p-3 rounded-lg text-gray-800 whitespace-pre-wrap">{output}</pre>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-lg font-bold mb-2 flex items-center text-gray-700">
              <MessageSquare className="h-5 w-5 ml-2 text-green-500" />
              ملاحظات المعلم الذكي
            </h3>
            <p className="bg-green-50 p-3 rounded-lg text-green-800">{feedback}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeLabPage;
