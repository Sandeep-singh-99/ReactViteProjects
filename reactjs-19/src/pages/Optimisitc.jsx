import { useOptimistic, useState } from "react";
import React from "react";


export default function Optimistic() {
  const [messages, setMessages] = useState([]);

  const [optimisticMessages, addOptimistic] =
    useOptimistic(messages, (state, newMsg) => [
      ...state,
      { text: newMsg, pending: true },
    ]);

  async function sendMessage(formData) {
    const msg = formData.get("msg");
    addOptimistic(msg);

    await new Promise(res => setTimeout(res, 1500));

    setMessages(prev => [...prev, { text: msg }]);
  }

  return (
    <form action={sendMessage}>
      <input name="msg" />
      <button>Send</button>

      <ul>
        {optimisticMessages.map((m, i) => (
          <li key={i}>
            {m.text} {m.pending && "⏳"}
          </li>
        ))}
      </ul>
    </form>
  );
}
