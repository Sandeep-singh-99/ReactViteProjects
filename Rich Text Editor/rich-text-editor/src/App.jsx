import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import parse from 'html-react-parser'; // Import parse function from html-react-parser
import 'react-quill/dist/quill.core.css'; // Import Quill core styles
import 'react-quill/dist/quill.bubble.css'; // Import Quill bubble theme styles
import DOMPurify from 'dompurify'; // To sanitize the HTML

export default function App() {
  const [editorValue, setEditorValue] = useState(''); // State to hold the content of the editor

  // Handle changes in the editor content
  const handleChange = (value) => {
    setEditorValue(value);
  };

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'header': '3' }, { 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      [{ 'color': [] }, { 'background': [] }],
      ['emoji'],
      ['clean'], // For clearing content
    ],
  };

  const formats = [
    'header', 'font', 'size', 'list', 'bullet', 'align', 'bold', 'italic', 'underline', 'strike',
    'blockquote', 'code-block', 'link', 'image', 'video', 'color', 'background', 'emoji',
  ];

  // Custom HTML parsing and sanitization
  const customParser = (html) => {
    const sanitizedHtml = DOMPurify.sanitize(html); // Sanitize the HTML to avoid security issues
    return parse(sanitizedHtml, {
      replace: (domNode) => {
        // Customize rendering for specific tags
        if (domNode.name === 'iframe') {
          return (
            <iframe
              src={domNode.attribs.src}
              width="100%"
              height="400"
              title="Iframe Content"
              frameBorder="0"
            />
          );
        }
        if (domNode.name === 'script') {
          // Skip script tags
          return null;
        }
        return null;
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-6">
      <div className="max-w-4xl w-full bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          React Quill Rich Text Editor
        </h1>

        {/* React Quill editor */}
        <ReactQuill
          value={editorValue}
          onChange={handleChange}
          theme="snow"
          modules={modules}
          formats={formats}
          placeholder="Start writing here..."
          className="h-96 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Output section */}
        <div className="mt-8">
          <h3 className="text-xl font-medium text-gray-800 mb-4">Editor Output:</h3>
          <div className="mt-2 text-sm text-gray-700">
            {/* Render the parsed HTML */}
            <div className="prose prose-sm text-gray-700">{customParser(editorValue)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
