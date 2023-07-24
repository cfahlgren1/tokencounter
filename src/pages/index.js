import { useState, useMemo } from "react";
import { encode, decode } from "gpt-tokenizer/model/gpt-3.5-turbo";
import Layout from "@/components/Layout";

const MODEL_COST_PER_1K_TOKENS = {
  "gpt-4": 0.03,
  "gpt-4-32k": 0.06,
  "gpt-4-completion": 0.06,
  "gpt-4-32k-completion": 0.12,
  "gpt-3.5-turbo": 0.0015,
  "gpt-3.5-turbo-16k": 0.003,
  "gpt-3.5-turbo-completion": 0.002,
  "gpt-3.5-turbo-16k-completion": 0.004,
  "text-ada-001": 0.0004,
  ada: 0.0004,
  "text-babbage-001": 0.0005,
  babbage: 0.0005,
  "text-curie-001": 0.002,
  curie: 0.002,
  "text-davinci-003": 0.02,
  "text-davinci-002": 0.02,
  "code-davinci-002": 0.02,
  "ada-finetuned": 0.0016,
  "babbage-finetuned": 0.0024,
  "curie-finetuned": 0.012,
  "davinci-finetuned": 0.12,
};

const models = [
  "gpt-3.5-turbo",
  "gpt-3.5-turbo-16k",
  "gpt-3.5-turbo-completion",
  "gpt-3.5-turbo-16k-completion",
  "gpt-4",
  "gpt-4-32k",
  "gpt-4-completion",
  "gpt-4-32k-completion",
  "text-davinci-003",
  "text-ada-001",
  "ada",
  "text-babbage-001",
  "babbage",
  "text-curie-001",
  "curie",
  "text-davinci-002",
  "code-davinci-002",
  "ada-finetuned",
  "babbage-finetuned",
  "curie-finetuned",
  "davinci-finetuned",
];

const colors = [
  "bg-blue-200",
  "bg-red-200",
  "bg-green-200",
  "bg-yellow-200",
  "bg-purple-200",
  "bg-pink-200",
];

const TokenizerPage = () => {
  const exampleText = `Some words become one token, but others, like "indivisible", don't. \nEmojis like 🤚🏾 can turn into many tokens. \n\nCharacters often seen together, like "1234567890", may become one token.`;
  const [inputText, setInputText] = useState(exampleText);
  const [selectedModel, setSelectedModel] = useState(models[0]);

  const encodedTokens = useMemo(() => {
    const result = encode(inputText);
    return Array.isArray(result) ? result : [];
  }, [inputText]);

  const setExampleContent = () => {
    setInputText(exampleText);
  };

  const decodedTokens = useMemo(
    () =>
      Array.isArray(encodedTokens)
        ? encodedTokens.map((token) => decode([token]))
        : [],
    [encodedTokens]
  );
  const colorTokens = useMemo(
    () => decodedTokens.map((_, i) => colors[i % colors.length]),
    [decodedTokens]
  );
  const cost = useMemo(
    () =>
      (encodedTokens.length / 1000) *
      (MODEL_COST_PER_1K_TOKENS[selectedModel] || 0),
    [encodedTokens, selectedModel]
  );

  return (
    <>
      <Layout
        title="TokenCounter | Tokenize and estimate your LLM costs"
        description="TokenCounter provides an easy-to-use interface to tokenize your text and estimate your Large Language Model (LLM) costs. Understand how GPT models process your text into tokens and improve your usage efficiency."
        url="https://www.tokencounter.io"
        imageUrl="/ogg.png"
      >        <div className="mx-auto px-5 py-10 max-w-3xl">
          <h2 className="text-4xl font-bold mb-5">GPT Tokenizer</h2>
          <h4 className="text-xl mb-5">
            Estimate GPT costs and token count from your text!
          </h4>
          <p>
            Tokens are groups of characters often seen together. These models
            can predict what token comes next in a sequence, making them great
            at generating text.
          </p>

          <div className="my-5">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              class="text-md select select-bordered w-full max-w-xs"
            >
              {models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="textarea textarea-success form-textarea block w-full text-lg p-1 mb-5 border-2 border-gray-300 rounded h-64"
          />
          <div className="flex">
            <button
              onClick={setExampleContent}
              className="btn mx-1 btn-md text-sm"
            >
              Show Example
            </button>
            <button
              onClick={() => setInputText("")}
              className="btn mx-1 btn-md text-sm"
            >
              Clear
            </button>
          </div>

          {/* stats */}
          <div className="mt-10 grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-gray-500">Number of Characters</div>
              <div className="text-3xl">{inputText.length}</div>
            </div>
            <div>
              <div className="text-gray-500">Number of Tokens</div>
              <div className="text-3xl">{encodedTokens.length}</div>
            </div>
            <div>
              <div className="text-gray-500">Estimated Cost</div>
              <div className="text-3xl">${cost.toFixed(6)}</div>
            </div>
          </div>

          <div className="border-2 my-10 border-gray-200 bg-gray-200 rounded p-2 h-32 overflow-auto">
            {decodedTokens.map((token, i) => (
              <span
                key={i}
                className={`inline-block rounded px-1 mb-1 ${colorTokens[i]}`}
              >
                {token}
              </span>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default TokenizerPage;
