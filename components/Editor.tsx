"use client";

import { updateEntry } from "@/utils/api";
import { useState } from "react";
import { useAutosave } from "react-autosave";
import Spinner from "./Spinner";

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(entry.analysis);

  const { mood, summary, color, subject, negative } = analysis;

  const analysisData = [
    { name: "Summary", value: summary },
    { name: "Subject", value: subject },
    { name: "Mood", value: mood },
    { name: "Negative", value: negative ? "true" : "false" },
  ];

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true);
      const data = await updateEntry(entry.id, _value);
      setAnalysis(data.analysis);
      setIsLoading(false);
    },
  });

  return (
    <div className='w-full h-full grid grid-cols-3 gap-0 relative overflow-hidden'>
      <div className='absolute left-0 top-0 p-2'>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className='w-4 h-4 rounded-full bg-green-500'></div>
        )}
      </div>
      <div className='col-span-2'>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className='w-full h-full p-8 text-xl outline-none'
        />
      </div>

      <div className='border-l border-black/10'>
        <div className='px-6 py-10' style={{ backgroundColor: color }}>
          <h2 className='text-2xl'>Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((data) => (
              <li
                key={data.name}
                className='flex items-center justify-between gap-5 px-2 py-4 border-b border-t border-black/10'
              >
                <span className='text-lg font-semibold'>{data.name}</span>
                <span>{data.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Editor;
