"use client";

import { askQuestion } from "@/utils/api";
import { useState } from "react";
import Spinner from "./Spinner";

const Question = () => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState();

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const answer = await askQuestion(value);
    setResponse(answer);
    setValue("");
    setIsLoading(false);
  };

  return (
    <div>
      <form className='space-x-5 mb-3' onSubmit={handleSubmit}>
        <input
          type='search'
          onChange={onChange}
          value={value}
          placeholder='Ask a question'
          className='border border-black/20 px-4 py-2 text-lg rounded-lg'
          disabled={isLoading}
        />
        <button
          type='submit'
          className='bg-blue-400 px-4 py-2 rounded-lg text-lg'
          disabled={isLoading}
        >
          Ask
        </button>
      </form>
      {isLoading && <Spinner />}
      {response && <div>{response}</div>}
    </div>
  );
};

export default Question;
