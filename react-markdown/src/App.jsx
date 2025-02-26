import MarkdownIt from 'markdown-it';
import { useState } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

function App() {
  const [profile, setProfile] = useState('');

  const mdParser = new MarkdownIt();

  function onImageUpload(file) {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = data => {
        resolve(data.target.result);
      };
      reader.readAsDataURL(file);
    });
  }

  return (
    <>
      <MdEditor
        style={{ height: '500px', width: '600px' }}
        value={profile}
        onImageUpload={onImageUpload}
        onChange={({ text }) => setProfile(text)}
        renderHTML={(text) => mdParser.render(text)}
      />
    </>
  );
}

export default App;
