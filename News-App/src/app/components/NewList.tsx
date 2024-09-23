"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const API_KEY: string = "47b8b58359314c5f82b38fe409843466";

interface News {
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface NewsResponse {
  articles: News[];
}

function NewList() {
  const [data, setData] = useState<News[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get<NewsResponse>(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
      );
      setData(response.data.articles);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-5 p-5">
      {data &&data.map((article, index) => (
        <div
          key={article.url || index}
          className="border p-4 rounded-lg shadow-md"
        >
          {article.urlToImage && (
            <img
              src={article.urlToImage}
              alt={article.title}
              width={400}
              height={250}
              className="rounded-md"
              layout="responsive"
            />
          )}
          <h2 className="font-bold text-lg mt-2">{article.title}</h2>
          <p className="text-sm">{article.description}</p>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline mt-2 block"
          >
            Read more
          </a>
        </div>
      ))}
    </div>
  );
}

export default NewList;
