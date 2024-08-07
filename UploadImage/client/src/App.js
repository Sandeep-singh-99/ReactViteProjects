import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [file, setFile] = useState(null)
  const [imageUrl, setImageUrl] = useState([])

  useEffect(() => {
    // Fetch the list of images from the backend
    axios.get('http://localhost:5000/images')
      .then(response => {
        setImageUrl(response.data);
        console.log(response.data);
        
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  }, []);

  const onFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const onFileUpload = async() => {
    const formData = new FormData()
    formData.append('file', file)

    const response = await axios.post('http://localhost:5000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => {
      // setImageUrl(res.data.filePath)
      console.log(res.data.filePath);
      
      alert('File uploaded successfully')
    })
    .catch(err => alert('error uploading file'))
  }

  return (
   <div className='App'>
    <h1>Upload images</h1>
    <input type='file' onChange={onFileChange}/>
    <button onClick={onFileUpload}>Submit</button>

    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {imageUrl.map((image, index) => (
          <img
            key={index}
            src={`http://localhost:5000${image}`}
            alt={`Uploaded ${index}`}
            style={{ width: '200px', height: 'auto', margin: '10px' }}
          />
        ))}
      </div>

   </div>
  );
}

export default App;
