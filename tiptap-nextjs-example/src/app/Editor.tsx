"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListOl,
  FaListUl,
  FaHeading,
} from "react-icons/fa";
import { useState } from "react";

const Tiptap = () => {
  const [headingLevel, setHeadingLevel] = useState(1);

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: "<p>Hello World!</p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none min-h-[250px]",
      },
    },
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  const saveContent = () => {
    if (editor) {
      console.log(editor.getJSON());
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="w-full p-2">
          <h2>Editor</h2>
          <div className="flex space-x-2 mb-2">
            <div className="relative">
              <button className={`p-2`}>
                <FaHeading />
              </button>
              <select
                value={headingLevel}
                onChange={(e) => {
                  const level = Number(e.target.value);
                  setHeadingLevel(level);
                  editor.chain().focus().toggleHeading({ level }).run();
                }}
                className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6].map((level) => (
                  <option key={level} value={level}>
                    H{level}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-2 ${editor.isActive("bold") ? "bg-gray-300" : ""}`}
            >
              <FaBold />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-2 ${
                editor.isActive("italic") ? "bg-gray-300" : ""
              }`}
            >
              <FaItalic />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`p-2 ${
                editor.isActive("underline") ? "bg-gray-300" : ""
              }`}
            >
              <FaUnderline />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-2 ${
                editor.isActive("bulletList") ? "bg-gray-300" : ""
              }`}
            >
              <FaListUl />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`p-2 ${
                editor.isActive("orderedList") ? "bg-gray-300" : ""
              }`}
            >
              <FaListOl />
            </button>
          </div>
          <EditorContent editor={editor} className="border rounded-lg p-2" />
          <button
            onClick={saveContent}
            className="mt-2 p-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default Tiptap;