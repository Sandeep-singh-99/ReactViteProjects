import { useActionState } from "react";
import React from "react";

async function loginAction(prevState, formData) {
  await new Promise(res => setTimeout(res, 1000));

  const email = formData.get("email");

  if (!email.includes("@")) {
    return { error: "Invalid email" };
  }

  return { success: "Login successful" };
}

export default function ActionForm() {
  const [state, formAction, isPending] =
    useActionState(loginAction, {});

  return (
    <form action={formAction}>
      <input name="email" placeholder="Email" />
      <button disabled={isPending}>
        {isPending ? "Submitting..." : "Login"}
      </button>

      {state?.error && <p style={{color:"red"}}>{state.error}</p>}
      {state?.success && <p style={{color:"green"}}>{state.success}</p>}
    </form>
  );
}
