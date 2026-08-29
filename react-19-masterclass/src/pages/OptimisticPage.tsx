import React, {
  useOptimistic,
  useState,
  useTransition,
} from "react";

export default function OptimisticPage() {
  const [likes, setLikes] = useState(10);

  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (currentLikes, amount: number) => currentLikes + amount
  );

  const [isPending, startTransition] = useTransition();

  async function handleLike() {
    startTransition(async () => {
      // Optimistically add 1 like
      addOptimisticLike(1);

      // Simulate API request
      await new Promise((resolve) =>
        setTimeout(resolve, 2000)
      );

      // Server/API success
      setLikes((prev) => prev + 1);
    });
  }

  return (
    <div className="p-10 text-black">
      <h1 className="text-2xl font-bold">
        React 19 - useOptimistic
      </h1>

      <p className="my-4 text-xl">
        ❤️ Likes: {optimisticLikes}
      </p>

      {isPending && (
        <p className="mb-4 text-gray-500">
          Saving like...
        </p>
      )}

      <button
        onClick={handleLike}
        // disabled={isPending}
        className="rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
      >
        {isPending ? "Saving..." : "❤️ Like"}
      </button>
    </div>
  );
}