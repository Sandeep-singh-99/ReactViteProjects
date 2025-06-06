import React from 'react'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
      <Routes>
        <Route/>
      </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}
