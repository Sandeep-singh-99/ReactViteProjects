import LexicalEditor from '@/components/LexicalEditor';
import dynamic from 'next/dynamic';

// const LexicalEditor = dynamic(() => import('@/components/LexicalEditor'), { ssr: false });

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lexical Editor in Next.js</h1>
      <LexicalEditor />
    </main>
  );
}
