import { use, Suspense } from "react";
import React from "react";

function fetchUser() {
  return new Promise(res =>
    setTimeout(() => res({ name: "Akash" }), 1000)
  );
}

function User() {
  const user = use(fetchUser());
  return <h3>User: {user.name}</h3>;
}

export default function UseHook() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <User />
    </Suspense>
  );
}
