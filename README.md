# 🌤️ Weather Application

A modern, high-performance, responsive React weather application featuring real-time meteorological data, dynamic CSS animated backgrounds, and full Arabic/English internationalization.

---

## 📌 About The Project

This project was built and enhanced while following the **React JS** course provided by **Tarmeez Academy**.

I built and expanded the application by introducing several production-ready features:
- **Auto-Location Detection**: Dynamically fetches real-time weather based on the user's current coordinates using the `Geolocation API`.
- **Dynamic Weather Backgrounds**: Custom GPU-accelerated CSS animations that react to live weather conditions (Rain, Snow, Clouds, Clear Sun, and Thunderstorms).
- **Full Bilingual Support**: Seamless switching between Arabic (RTL) and English with localized date formatting, Eastern Arabic numerals, and contextual error messages.

---

## 🛠️ Tech Stack & Overview

* **React 19**: Modern UI component architecture and efficient DOM updates.
* **Vite**: Ultra-fast build tool and local development environment.
* **Material-UI (MUI v5)**: Clean, responsive, and accessible layout structure.
* **Axios**: Efficient HTTP requests handling integrated with `AbortController` signal handling to prevent race conditions.
* **OpenWeatherMap API**: Live weather data provider.
* **Pure CSS3 Keyframe Animations**: High-performance (60fps) weather animations (Rain, Snow, Clouds, Rays) using native CSS keyframes without external animation bloat.

---

## 🔍 Code Architecture & Implementation Highlights

* **`useWeather` Hook**: 
  - Manages central application state, data fetching lifecycle, and browser geolocation fallbacks.
  - Features an integrated multi-language error dictionary (`ar` / `en`) that dynamically delivers localized messages based on the active language state.
  - Implements clean request lifecycle management using standard `AbortController` signals to immediately cancel pending requests when dependencies change or components unmount.

* **`WeatherBackground` Component**: 
  - Dynamically renders background gradients and animated particle systems according to live weather conditions.
  - Implements **negative CSS animation delays** (`animation-delay: -X.XXs`) across rain and snow arrays to force immediate, natural particle distribution on app launch without top-screen clustering.

* **Custom Utilities (`toArabicDigits` & `getDate`)**: 
  - Lightweight, native utility functions crafted to handle Eastern Arabic numeral formatting and locale-aware date rendering without relying on bulky external i18n libraries.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git)
