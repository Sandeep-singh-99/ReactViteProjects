import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const detectLanguage = createAsyncThunk(
  "language/detectLanguage",
  async (text) => {
    const data = new FormData();
    data.append("q", text);

    const options = {
      method: "POST",
      url: "https://google-translate1.p.rapidapi.com/language/translate/v2/detect",
      headers: {
        "x-rapidapi-key": ProcessingInstruction.env.RAPIDAPI_KEY,
        "x-rapidapi-host": "google-translate1.p.rapidapi.com",
        "Accept-Encoding": "application/gzip",
      },
      data: data,
    };
    const response = await axios.request(options);
    return response.data.data.detections[0][0].language;
  }
);

export const translateText = createAsyncThunk(
  "language/translateText",
  async ({ text, target, source }) => {
    const data = new FormData();
    data.append("q", text);
    data.append("target", target); // Translate to the target language
    data.append("source", source);

    const options = {
      method: "POST",
      url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        "x-rapidapi-host": "google-translate1.p.rapidapi.com",
        "Accept-Encoding": "application/gzip",
      },
      data: data,
    };

    const response = await axios.request(options);
    return response.data.data.translations[0].translatedText;
  }
);

const languageSlice = createSlice({
    name: "language",
    initialState: {
        text: '',
        detectLanguage: '',
        translateText: '',
        loading: false,
        error: null,
    },

    reducers: {
        setText: (state, action) => {
            state.text = action.payload
        }
    }

    
})
