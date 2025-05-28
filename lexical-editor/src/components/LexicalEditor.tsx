// 'use client';

// import React, { useEffect, useState } from 'react';
// import { LexicalComposer } from '@lexical/react/LexicalComposer';
// import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
// import { ContentEditable } from '@lexical/react/LexicalContentEditable';
// import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
// import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
// import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
// import {
//   $getRoot,
//   $getSelection,
//   $createParagraphNode,
//   $createTextNode,
//   FORMAT_TEXT_COMMAND,
// } from 'lexical';
// import {
//   TRANSFORMERS,
//   $convertToMarkdownString,
// } from '@lexical/markdown';
// import { toast, Toaster } from 'react-hot-toast';

// const theme = {
//   paragraph: 'mb-3',
//   text: {
//     bold: 'font-bold',
//     italic: 'italic',
//     underline: 'underline',
//     strikethrough: 'line-through',
//     code: 'bg-gray-800 text-pink-400 font-mono px-1.5 py-0.5 rounded',
//   },
// };

// function Placeholder() {
//   return (
//     <div className="absolute text-gray-500 pointer-events-none p-4 top-12">
//       Write something amazing...
//     </div>
//   );
// }

// function Toolbar() {
//   const [editor] = useLexicalComposerContext();
//   const [isSaving, setIsSaving] = useState(false);

//   const applyFormat = (type) => {
//     editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);
//   };

//   const handleSave = async () => {
//     setIsSaving(true);
//     try {
//       editor.getEditorState().read(() => {
//         const markdown = $convertToMarkdownString(TRANSFORMERS);
//         setTimeout(() => {
//           console.log('Saved Markdown:', markdown);
//           toast.success('Content saved successfully!');
//           setIsSaving(false);
//         }, 1000);
//       });
//     } catch (error) {
//       toast.error('Failed to save content');
//       setIsSaving(false);
//     }
//   };

//   return (
//     <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-gray-700 p-3 bg-gray-900/80 backdrop-blur-sm rounded-t-xl shadow-lg">
//       <div className="flex gap-2">
//         {[
//           { type: 'bold', label: 'B', className: 'font-bold', title: 'Bold (Ctrl+B)' },
//           { type: 'italic', label: 'I', className: 'italic', title: 'Italic (Ctrl+I)' },
//           { type: 'underline', label: 'U', className: 'underline', title: 'Underline (Ctrl+U)' },
//           { type: 'strikethrough', label: 'S', className: 'line-through', title: 'Strikethrough' },
//           { type: 'code', label: '</>', className: 'font-mono text-sm', title: 'Code' },
//         ].map(({ type, label, className, title }) => (
//           <button
//             key={type}
//             onClick={() => applyFormat(type)}
//             className={`px-3 py-1.5 border border-gray-600 rounded-lg hover:bg-gray-700 text-gray-200 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
//             title={title}
//             aria-label={title}
//           >
//             {label}
//           </button>
//         ))}
//       </div>
//       <button
//         onClick={handleSave}
//         disabled={isSaving}
//         className={`px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//           isSaving ? 'opacity-50 cursor-not-allowed' : ''
//         }`}
//         aria-label="Save content"
//       >
//         {isSaving ? (
//           <span className="flex items-center gap-2">
//             <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//               />
//             </svg>
//             Saving...
//           </span>
//         ) : (
//           'Save'
//         )}
//       </button>
//     </div>
//   );
// }

// function CharacterCount() {
//   const [editor] = useLexicalComposerContext();
//   const [charCount, setCharCount] = useState(0);

//   useEffect(() => {
//     const updateCharCount = () => {
//       editor.getEditorState().read(() => {
//         const text = $getRoot().getTextContent();
//         setCharCount(text.length);
//       });
//     };

//     updateCharCount();
//     const removeUpdateListener = editor.registerUpdateListener(updateCharCount);
//     return () => removeUpdateListener();
//   }, [editor]);

//   return (
//     <div className="text-sm text-gray-400 p-3 border-t border-gray-700 bg-gray-900/50">
//       Character count: {charCount}
//     </div>
//   );
// }

// function MarkdownPreview() {
//   const [editor] = useLexicalComposerContext();
//   const [markdown, setMarkdown] = useState('');

//   useEffect(() => {
//     const updateMarkdown = () => {
//       editor.getEditorState().read(() => {
//         const md = $convertToMarkdownString(TRANSFORMERS);
//         setMarkdown(md);
//       });
//     };

//     updateMarkdown();
//     const removeUpdateListener = editor.registerUpdateListener(updateMarkdown);
//     return () => removeUpdateListener();
//   }, [editor]);

//   return (
//     <div className="border-t border-gray-700 p-4 bg-gray-900/50 rounded-b-xl">
//       <h3 className="text-sm font-semibold text-gray-200 mb-2">Markdown Preview</h3>
//       <pre className="text-sm bg-gray-800 text-gray-200 p-4 rounded-lg border border-gray-600 overflow-auto max-h-48">
//         {markdown || 'No content yet...'}
//       </pre>
//     </div>
//   );
// }

// export default function LexicalEditor() {
//   const initialConfig = {
//     namespace: 'MyEditor',
//     theme,
//     onError(error) {
//       console.error('Editor Error:', error);
//       toast.error('An error occurred in the editor');
//     },
//     editorState: () => {
//       const paragraph = $createParagraphNode();
//       paragraph.append($createTextNode('Welcome to the enhanced Lexical Editor!'));
//       $getRoot().append(paragraph);
//     },
//   };

//   return (
//     <div className="min-h-screen bg-black flex items-center justify-center p-4">
//       <LexicalComposer initialConfig={initialConfig}>
//         <div className="border border-gray-700 rounded-xl shadow-2xl max-w-3xl w-full bg-gray-800">
//           <Toaster position="top-right" toastOptions={{ style: { background: '#1F2937', color: '#fff' } }} />
//           <Toolbar />
//           <div className="relative min-h-[300px] bg-gray-900">
//             <RichTextPlugin
//               contentEditable={
//                 <ContentEditable className="min-h-[300px] outline-none p-4 pt-12 text-base text-gray-200 leading-relaxed" />
//               }
//               placeholder={<Placeholder />}
//             />
//             <HistoryPlugin />
//             <OnChangePlugin onChange={(editorState) => console.log('Editor State Updated')} />
//           </div>
//           <CharacterCount />
//           <MarkdownPreview />
//         </div>
//       </LexicalComposer>
//     </div>
//   );
// }



'use client';

import React, { useEffect, useState } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'; // Import LexicalErrorBoundary
import {
  $getRoot,
  $getSelection,
  $createParagraphNode,
  $createTextNode,
  FORMAT_TEXT_COMMAND,
} from 'lexical';
import {
  TRANSFORMERS,
  $convertToMarkdownString,
} from '@lexical/markdown';
import { toast, Toaster } from 'react-hot-toast';

const theme = {
  paragraph: 'mb-3',
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'line-through',
    code: 'bg-gray-800 text-pink-400 font-mono px-1.5 py-0.5 rounded',
  },
};

function Placeholder() {
  return (
    <div className="absolute text-gray-500 pointer-events-none p-4 top-12">
      Write something amazing...
    </div>
  );
}

function Toolbar() {
  const [editor] = useLexicalComposerContext();
  const [isSaving, setIsSaving] = useState(false);

  const applyFormat = (type) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      editor.getEditorState().read(() => {
        const markdown = $convertToMarkdownString(TRANSFORMERS);
        setTimeout(() => {
          console.log('Saved Markdown:', markdown);
          toast.success('Content saved successfully!');
          setIsSaving(false);
        }, 1000);
      });
    } catch (error) {
      toast.error('Failed to save content');
      setIsSaving(false);
    }
  };

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-gray-700 p-3 bg-gray-900/80 backdrop-blur-sm rounded-t-xl shadow-lg">
      <div className="flex gap-2">
        {[
          { type: 'bold', label: 'B', className: 'font-bold', title: 'Bold (Ctrl+B)' },
          { type: 'italic', label: 'I', className: 'italic', title: 'Italic (Ctrl+I)' },
          { type: 'underline', label: 'U', className: 'underline', title: 'Underline (Ctrl+U)' },
          { type: 'strikethrough', label: 'S', className: 'line-through', title: 'Strikethrough' },
          { type: 'code', label: '</>', className: 'font-mono text-sm', title: 'Code' },
        ].map(({ type, label, className, title }) => (
          <button
            key={type}
            onClick={() => applyFormat(type)}
            className={`px-3 py-1.5 border border-gray-600 rounded-lg hover:bg-gray-700 text-gray-200 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            title={title}
            aria-label={title}
          >
            {label}
          </button>
        ))}
      </div>
      <button
        onClick={handleSave}
        disabled={isSaving}
        className={`px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          isSaving ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        aria-label="Save content"
      >
        {isSaving ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            Saving...
          </span>
        ) : (
          'Save'
        )}
      </button>
    </div>
  );
}

function CharacterCount() {
  const [editor] = useLexicalComposerContext();
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const updateCharCount = () => {
      editor.getEditorState().read(() => {
        const text = $getRoot().getTextContent();
        setCharCount(text.length);
      });
    };

    updateCharCount();
    const removeUpdateListener = editor.registerUpdateListener(updateCharCount);
    return () => removeUpdateListener();
  }, [editor]);

  return (
    <div className="text-sm text-gray-400 p-3 border-t border-gray-700 bg-gray-900/50">
      Character count: {charCount}
    </div>
  );
}

function MarkdownPreview() {
  const [editor] = useLexicalComposerContext();
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    const updateMarkdown = () => {
      editor.getEditorState().read(() => {
        const md = $convertToMarkdownString(TRANSFORMERS);
        setMarkdown(md);
      });
    };

    updateMarkdown();
    const removeUpdateListener = editor.registerUpdateListener(updateMarkdown);
    return () => removeUpdateListener();
  }, [editor]);

  return (
    <div className="border-t border-gray-700 p-4 bg-gray-900/50 rounded-b-xl">
      <h3 className="text-sm font-semibold text-gray-200 mb-2">Markdown Preview</h3>
      <pre className="text-sm bg-gray-800 text-gray-200 p-4 rounded-lg border border-gray-600 overflow-auto max-h-48">
        {markdown || 'No content yet...'}
      </pre>
    </div>
  );
}

export default function LexicalEditor() {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError(error) {
      console.error('Editor Error:', error);
      toast.error('An error occurred in the editor');
    },
    editorState: () => {
      const paragraph = $createParagraphNode();
      paragraph.append($createTextNode('Welcome to the enhanced Lexical Editor!'));
      $getRoot().append(paragraph);
    },
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <LexicalComposer initialConfig={initialConfig}>
        <div className="border border-gray-700 rounded-xl shadow-2xl max-w-3xl w-full bg-gray-800">
          <Toaster position="top-right" toastOptions={{ style: { background: '#1F2937', color: '#fff' } }} />
          <Toolbar />
          <div className="relative min-h-[300px] bg-gray-900">
            <RichTextPlugin
              contentEditable={
                <ContentEditable className="min-h-[300px] outline-none p-4 pt-12 text-base text-gray-200 leading-relaxed" />
              }
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary} // Add ErrorBoundary prop
            />
            <HistoryPlugin />
            <OnChangePlugin onChange={(editorState) => console.log('Editor State Updated')} />
          </div>
          <CharacterCount />
          <MarkdownPreview />
        </div>
      </LexicalComposer>
    </div>
  );
}