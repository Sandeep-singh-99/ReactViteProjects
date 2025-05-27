'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import Heading from '@tiptap/extension-heading';
import Strike from '@tiptap/extension-strike';
import CodeBlock from '@tiptap/extension-code-block';
import Blockquote from '@tiptap/extension-blockquote';
import HardBreak from '@tiptap/extension-hard-break';
import History from '@tiptap/extension-history';
import { memo, useCallback, useMemo } from 'react';
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, List,
  ListOrdered, Quote, Code, Redo, Undo, Heading1, Heading2, Heading3
} from 'lucide-react';

// Editor configuration constants
const EDITOR_EXTENSIONS = [
  StarterKit.configure({ history: false }),
  History,
  Underline,
  Strike,
  Placeholder.configure({ placeholder: 'Write something amazing...' }),
  Heading.configure({ levels: [1, 2, 3] }),
  CodeBlock,
  Blockquote,
  HardBreak.configure({ keepMarks: true }),
];

const INITIAL_CONTENT = '<p>Hello Tiptap with all features!</p>';

// Toolbar button configuration with explicit IDs and compatibility flags
const TOOLBAR_BUTTONS = [
  { id: 'bold', icon: Bold, action: (editor: any) => editor.chain().focus().toggleBold().run(), isActive: (editor: any) => editor.isActive('bold'), incompatibleWithCodeBlock: true },
  { id: 'italic', icon: Italic, action: (editor: any) => editor.chain().focus().toggleItalic().run(), isActive: (editor: any) => editor.isActive('italic'), incompatibleWithCodeBlock: true },
  { id: 'underline', icon: UnderlineIcon, action: (editor: any) => editor.chain().focus().toggleUnderline().run(), isActive: (editor: any) => editor.isActive('underline'), incompatibleWithCodeBlock: true },
  { id: 'strike', icon: Strikethrough, action: (editor: any) => editor.chain().focus().toggleStrike().run(), isActive: (editor: any) => editor.isActive('strike'), incompatibleWithCodeBlock: true },
  { id: 'heading1', icon: Heading1, action: (editor: any) => editor.chain().focus().toggleHeading({ level: 1 }).run(), isActive: (editor: any) => editor.isActive('heading', { level: 1 }), incompatibleWithCodeBlock: true },
  { id: 'heading2', icon: Heading2, action: (editor: any) => editor.chain().focus().toggleHeading({ level: 2 }).run(), isActive: (editor: any) => editor.isActive('heading', { level: 2 }), incompatibleWithCodeBlock: true },
  { id: 'heading3', icon: Heading3, action: (editor: any) => editor.chain().focus().toggleHeading({ level: 3 }).run(), isActive: (editor: any) => editor.isActive('heading', { level: 3 }), incompatibleWithCodeBlock: true },
  { id: 'bulletList', icon: List, action: (editor: any) => editor.chain().focus().toggleBulletList().run(), isActive: (editor: any) => editor.isActive('bulletList'), incompatibleWithCodeBlock: false },
  { id: 'orderedList', icon: ListOrdered, action: (editor: any) => editor.chain().focus().toggleOrderedList().run(), isActive: (editor: any) => editor.isActive('orderedList'), incompatibleWithCodeBlock: false },
  { id: 'blockquote', icon: Quote, action: (editor: any) => editor.chain().focus().toggleBlockquote().run(), isActive: (editor: any) => editor.isActive('blockquote'), incompatibleWithCodeBlock: false },
  { id: 'codeBlock', icon: Code, action: (editor: any) => editor.chain().focus().toggleCodeBlock().run(), isActive: (editor: any) => editor.isActive('codeBlock'), incompatibleWithCodeBlock: false },
  { id: 'undo', icon: Undo, action: (editor: any) => editor.chain().focus().undo().run(), incompatibleWithCodeBlock: false },
  { id: 'redo', icon: Redo, action: (editor: any) => editor.chain().focus().redo().run(), incompatibleWithCodeBlock: false },
];

interface IconButtonProps {
  onClick: () => void;
  icon: React.ComponentType<{ size: number }>;
  isActive?: boolean;
  disabled?: boolean;
  ariaLabel: string;
}

// Reusable Icon Button component
const IconButton = memo(({ onClick, icon: Icon, isActive = false, disabled = false, ariaLabel }: IconButtonProps) => (
  <button
    onClick={onClick}
    className={`p-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
      isActive ? 'bg-gray-300' : ''
    }`}
    type="button"
    disabled={disabled}
    aria-label={ariaLabel}
  >
    <Icon size={16} />
  </button>
));

IconButton.displayName = 'IconButton';

interface EditorProps {
  initialContent?: string;
  placeholder?: string;
  onChange?: (content: string) => void;
}

// Main Editor component
const Editor = memo(({ initialContent = INITIAL_CONTENT, placeholder, onChange }: EditorProps) => {
  const extensions = useMemo(() => {
    const updatedExtensions = [...EDITOR_EXTENSIONS];
    if (placeholder) {
      updatedExtensions[4] = Placeholder.configure({ placeholder });
    }
    return updatedExtensions;
  }, [placeholder]);

  const editor = useEditor({
    extensions,
    content: initialContent,
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(JSON.stringify(editor.getJSON()));
      }
    },
  });

  // Memoize toolbar button rendering
  const renderToolbarButtons = useCallback(() => {
    if (!editor) return null;

    return TOOLBAR_BUTTONS.map(({ id, icon, action, isActive, incompatibleWithCodeBlock }) => (
      <IconButton
        key={id}
        icon={icon}
        onClick={() => action(editor)}
        isActive={isActive?.(editor)}
        disabled={editor.isActive('codeBlock') && incompatibleWithCodeBlock}
        ariaLabel={id.charAt(0).toUpperCase() + id.slice(1)}
      />
    ));
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="p-4 border border-gray-300 rounded-md shadow-md space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border-b pb-2 mb-2">
        {renderToolbarButtons()}
      </div>

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="prose max-w-none min-h-[150px] p-2 focus:outline-none"
      />

      {/* Debug Output (optional, consider removing in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-gray-100 p-2 rounded text-xs text-gray-700 overflow-auto">
          <strong>Debug JSON Output:</strong>
          <pre>{JSON.stringify(editor.getJSON(), null, 2)}</pre>
        </div>
      )}
    </div>
  );
});

Editor.displayName = 'Editor';

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Tiptap Editor in Next.js</h1>
      <Editor />
    </main>
  );
}