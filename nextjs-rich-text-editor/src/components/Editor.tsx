'use client';

import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export default function Editor() {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // Headers (H1, H2, etc.)
            ['bold', 'italic', 'underline', 'strike'], // Bold, italic, underline, strikethrough
            [{ color: [] }, { background: [] }], // Text and background color
            [{ align: [] }], // Text alignment (left, center, right, justify)
            ['link', 'image', 'video'], // Links, images, and videos
            [{ list: 'ordered' }, { list: 'bullet' }], // Ordered and unordered lists
            [{ indent: '-1' }, { indent: '+1' }], // Indent/outdent
            [{ script: 'sub' }, { script: 'super' }], // Subscript/superscript
            ['blockquote', 'code-block'], // Blockquote and code block
            [{ font: [] }], // Font family
            [{ size: ['small', false, 'large', 'huge'] }], // Font size
            ['clean'], // Remove formatting
          ],
        },
      });
    }

    return () => {
      if (quillRef.current) {
        quillRef.current = null;
      }
    };
  }, []);

  return <div id="editor" ref={editorRef}></div>;
}