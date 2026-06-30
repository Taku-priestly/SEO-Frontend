import { useState } from "react";

interface Props {
  onSubmit: (
    url: string,
    keyword: string
  ) => void;
}

export default function AuditForm({
  onSubmit,
}: Props) {

  const [url,setUrl] =
  useState("");

  const [keyword,setKeyword] =
  useState("");

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-12 shadow-2xl">
        <h2 className="text-white text-4xl font-bold text-center mb-3">Start Your AI SEO Audit</h2>
        <p className="text-slate-300 text-center mb-8">Enter your webpage and target keyword. Our Machine Learning models will analyze the top 10 Google competitors.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-slate-300 text-xs mb-2 uppercase tracking-wider">Target Webpage URL</label>
            <input
              placeholder="https://www.example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-xs mb-2 uppercase tracking-wider">Target Keyword</label>
            <input
              placeholder="e.g., running shoes"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full p-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-500"
            />
          </div>
        </div>

        <button
          onClick={() => onSubmit(url, keyword)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg"
        >
          Generate AI Analysis ⚡
        </button>
      </div>
    </div>
  );

}