import React, { useEffect, useState } from "react";
import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

const getTopics = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching topics:", error);
    return { topics: [] }; // Fallback to empty array
  }
};

export default function TopicsList() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    async function fetchTopics() {
      const data = await getTopics();
      setTopics(data.topics || []);
    }

    fetchTopics();
  }, []);

  return (
    <>
      {topics.length > 0 ? (
        topics.map((t) => (
          <div key={t._id} className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
            <div>
              <h1 className="text-2xl font-bold">{t.title}</h1>
              <div>{t.description}</div>
            </div>

            <div className="flex gap-2">
              <RemoveBtn id={t._id} />
              <Link href={`/editTopic/${t._id}`}>
                <HiPencilAlt size={24} />
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No topics available...</p>
      )}
    </>
  );
}
