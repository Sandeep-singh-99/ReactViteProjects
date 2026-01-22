import { Link } from "react-router-dom";
import React from "react";


export default function Home() {
  return (
    <div>
      <h2>React 19 Hooks Demo</h2>
      <Link to="/action">useActionState</Link><br />
      <Link to="/optimistic">useOptimistic</Link><br />
      <Link to="/use">use() Hook</Link>
    </div>
  );
}
