'use client';

import { useEffect, useState } from "react";
import HomePage from "./homepage/page";
import Login from "./auth/login/page";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    
  },[])

  return (
    <div className="py-5">
     {
      token ? (
        <HomePage/>
      ): (
        <Login/>
      )
     }
    </div>
  );
}
