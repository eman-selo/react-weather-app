import { Box, Container, createTheme, ThemeProvider } from "@mui/material";

import "./App.css";

import { useState } from "react";

import WeatherCard from "./components/WeatherCard";
import WeatherControls from "./components/WeatherControls";

import useWeather from "./hooks/useWeather";
import WeatherBackground from "./components/WeatherBackground";

function App() {
  const [language, setLanguage] = useState("en");

  const { weather, loading } = useWeather(language);
  const theme = createTheme({
    typography: {
      fontFamily: ["ReadexPro", "sans-serif"].join(","),
    },

    direction: language === "ar" ? "rtl" : "ltr",

    palette: {
      text: {
        primary: "#ffffff",
        secondary: "rgba(255, 255, 255, 0.75)",
      },
    },
  });

  // ----------------------------
  // Language Changing
  // ----------------------------
  const changeLanguageBtn = () => {
    setLanguage((prev) => {
      const newLanguage = prev === "en" ? "ar" : "en";

      return newLanguage;
    });
  };

  // ----------------------------
  // Convert numbers to Arabic digits
  // ----------------------------
  const toArabicDigits = (num) => {
    if (num === null || num === undefined) {
      return "";
    }

    return new Intl.NumberFormat("ar-EG").format(num);
  };

  // ----------------------------
  // Current Date
  // ----------------------------
  const getDate = (lang) => {
    const date = new Date();

    return new Intl.DateTimeFormat(lang, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };
  return (
    <ThemeProvider theme={theme}>
      <WeatherBackground weatherMain={weather?.main} />
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Container maxWidth="lg">
          <div
            dir={language === "ar" ? "rtl" : "ltr"}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", sm: 480 },
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              <WeatherCard
                weather={weather}
                loading={loading}
                language={language}
                toArabicDigits={toArabicDigits}
                getDate={getDate}
              />

              <WeatherControls
                language={language}
                changeLanguageBtn={changeLanguageBtn}
              />
            </Box>
          </div>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
