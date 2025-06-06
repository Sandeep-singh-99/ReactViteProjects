import React from 'react'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditorSection from './page/EditorSection';
import Home from './page/Home';

export default function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="editor" element={<EditorSection />} />
      </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}
