import { useState, useEffect } from 'react';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Placeholder from '@tiptap/extension-placeholder';
import { Button, Tooltip, Text, Group, MantineProvider, createTheme } from '@mantine/core';
import '@mantine/tiptap/styles.css';
import '@mantine/core/styles.css';
import './EditorSection.css'; 


const theme = createTheme({
  primaryColor: 'blue',
  colors: {
    blue: [
      '#e6f0ff',
      '#b3d1ff',
      '#80b2ff',
      '#4d94ff',
      '#1a75ff',
      '#0057e6',
      '#0043b3',
      '#002f80',
      '#001b4d',
      '#00071a',
    ],
  },
  shadows: {
    md: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
});

export default function EditorSection() {
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ['heading', 'paragraph', 'blockquote', 'listItem'] }),
      Placeholder.configure({
        placeholder: 'Start typing your content here...',
      }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      // Update word and character count
      const text = editor.getText();
      setWordCount(text.split(/\s+/).filter(Boolean).length);
      setCharCount(text.length);
      // Autosave content to localStorage
      localStorage.setItem('editor-content', editor.getHTML());
    },
  });

  // Load saved content from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('editor-content');
    if (savedContent && editor) {
      editor.commands.setContent(savedContent);
    }
  }, [editor]);

  // Prevent rendering if editor is not initialized
  if (!editor) {
    return <Text>Loading editor...</Text>;
  }

  // Save content manually
  const handleSave = () => {
    const content = editor.getHTML();
    localStorage.setItem('editor-content', content);
    alert('Content saved!');
  };

  return (
    <MantineProvider theme={theme}>
      <div className="editor-container">
        <RichTextEditor editor={editor} withCodeHighlightStyles withTypographyStyles>
          <RichTextEditor.Toolbar sticky stickyOffset="var(--docs-header-height)">
            <Group gap="xs" className="toolbar-group">
              {/* Formatting Controls */}
              <RichTextEditor.ControlsGroup>
                <Tooltip label="Bold (Ctrl+B)">
                  <RichTextEditor.Bold />
                </Tooltip>
                <Tooltip label="Italic (Ctrl+I)">
                  <RichTextEditor.Italic />
                </Tooltip>
                <Tooltip label="Underline (Ctrl+U)">
                  <RichTextEditor.Underline />
                </Tooltip>
                <Tooltip label="Strikethrough">
                  <RichTextEditor.Strikethrough />
                </Tooltip>
                <Tooltip label="Clear Formatting">
                  <RichTextEditor.ClearFormatting />
                </Tooltip>
                <Tooltip label="Highlight">
                  <RichTextEditor.Highlight />
                </Tooltip>
                <Tooltip label="Code">
                  <RichTextEditor.Code />
                </Tooltip>
              </RichTextEditor.ControlsGroup>

              {/* Headings */}
              <RichTextEditor.ControlsGroup>
                <Tooltip label="Heading 1">
                  <RichTextEditor.H1 />
                </Tooltip>
                <Tooltip label="Heading 2">
                  <RichTextEditor.H2 />
                </Tooltip>
                <Tooltip label="Heading 3">
                  <RichTextEditor.H3 />
                </Tooltip>
                <Tooltip label="Heading 4">
                  <RichTextEditor.H4 />
                </Tooltip>
              </RichTextEditor.ControlsGroup>

              {/* Block Elements */}
              <RichTextEditor.ControlsGroup>
                <Tooltip label="Blockquote">
                  <RichTextEditor.Blockquote />
                </Tooltip>
                <Tooltip label="Horizontal Rule">
                  <RichTextEditor.Hr />
                </Tooltip>
                <Tooltip label="Bullet List">
                  <RichTextEditor.BulletList />
                </Tooltip>
                <Tooltip label="Ordered List">
                  <RichTextEditor.OrderedList />
                </Tooltip>
                <Tooltip label="Subscript">
                  <RichTextEditor.Subscript />
                </Tooltip>
                <Tooltip label="Superscript">
                  <RichTextEditor.Superscript />
                </Tooltip>
              </RichTextEditor.ControlsGroup>

              {/* Links */}
              <RichTextEditor.ControlsGroup>
                <Tooltip label="Insert Link (Ctrl+K)">
                  <RichTextEditor.Link />
                </Tooltip>
                <Tooltip label="Remove Link">
                  <RichTextEditor.Unlink />
                </Tooltip>
              </RichTextEditor.ControlsGroup>

              {/* Alignment */}
              <RichTextEditor.ControlsGroup>
                <Tooltip label="Align Left">
                  <RichTextEditor.AlignLeft />
                </Tooltip>
                <Tooltip label="Align Center">
                  <RichTextEditor.AlignCenter />
                </Tooltip>
                <Tooltip label="Align Justify">
                  <RichTextEditor.AlignJustify />
                </Tooltip>
                <Tooltip label="Align Right">
                  <RichTextEditor.AlignRight />
                </Tooltip>
              </RichTextEditor.ControlsGroup>

              {/* Undo/Redo */}
              <RichTextEditor.ControlsGroup>
                <Tooltip label="Undo (Ctrl+Z)">
                  <RichTextEditor.Undo />
                </Tooltip>
                <Tooltip label="Redo (Ctrl+Y)">
                  <RichTextEditor.Redo />
                </Tooltip>
              </RichTextEditor.ControlsGroup>
            </Group>

            {/* Save Button and Stats */}
            <Group gap="md" className="toolbar-stats">
              <Text size="sm">
                Words: {wordCount} | Characters: {charCount}
              </Text>
              <Button size="xs" onClick={handleSave} color="blue">
                Save
              </Button>
            </Group>
          </RichTextEditor.Toolbar>

          <RichTextEditor.Content className="editor-content" />
        </RichTextEditor>
      </div>
    </MantineProvider>
  );
}