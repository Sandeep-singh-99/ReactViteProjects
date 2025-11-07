"use client";
"use i18n";

import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  return (
     <div className="p-4 bg-white shadow-md rounded-2xl text-center">
      <h2 className="text-2xl font-semibold mb-3">
        Welcome to our multilingual website!
      </h2>

      <p className="text-lg text-gray-700 mb-4">
        This text is automatically translated using Gemini and Lingo.dev.
      </p>

      <button
        onClick={() => setCount((c) => c + 1)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Click Me
      </button>

      <p className="mt-3 text-sm text-gray-600">Clicked {count} times.</p>
    </div>
  );
}
