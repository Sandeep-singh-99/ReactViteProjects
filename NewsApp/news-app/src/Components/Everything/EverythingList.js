import React, { useEffect, useState } from "react";
import axios from "axios";
import NewItem from "./EverythingItem";
function NewList() {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/news/everything",
          {
            params: {
              q: "technology",
              apiKey: "47b8b58359314c5f82b38fe409843466",
            },
          }
        );
        setArticle(response.data);
        setLoading(false);
        console.log("success: ", response.data);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.log("Error", error);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error Loading articles: {error.message}</div>;
  return (
    <div>
      <div className="bg-slate-950">
        <h1 className="flex justify-center items-center pt-10 text-4xl font-semibold text-white">
          News App
        </h1>
        {article.map((articles, index) => (
          <NewItem key={index} article={articles} />
        ))}
      </div>
    </div>
  );
}

export default NewList;
