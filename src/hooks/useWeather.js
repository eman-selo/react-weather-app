import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "c4f59e422d457cfb8702d2b72a6c066a";

const DEFAULT_COORDS = {
  lat: 61.2181,
  lon: -149.9003,
};

const INITIAL_WEATHER = {
  name: "",
  number: null,
  description: "",
  min: null,
  max: null,
  icon: null,
  main: null,
};

// Error Messages Dictionary for Multi-language support
const ERROR_MESSAGES = {
  ar: {
    geoNotSupported: "خدمة تحديد الموقع غير مدعومة في متصفحك",
    geoFailed: "تعذر الحصول على الموقع، تم استخدام الموقع الافتراضي",
    weatherFailed: "حدث خطأ أثناء جلب بيانات الطقس، يرجى المحاولة لاحقاً",
  },
  en: {
    geoNotSupported: "Geolocation is not supported by your browser",
    geoFailed: "Failed to get location, falling back to default location",
    weatherFailed: "Failed to fetch weather data, please try again later",
  },
};

function useWeather(language = "ar") {
  const [coords, setCoords] = useState(DEFAULT_COORDS);
  const [weather, setWeather] = useState(INITIAL_WEATHER);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);
  const [weatherError, setWeatherError] = useState(null);

  const langKey = language === "ar" ? "ar" : "en";

  // --------------------------------
  // Fetch user location on app initialization
  // --------------------------------
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocationError(ERROR_MESSAGES[langKey].geoNotSupported);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setLocationError(null);
      },
      (error) => {
        console.warn(ERROR_MESSAGES[langKey].geoFailed, ":", error.message);
        setLocationError(ERROR_MESSAGES[langKey].geoFailed);
      },
    );
  }, [langKey]);

  // --------------------------------
  // Fetch weather data
  // --------------------------------
  useEffect(() => {
    const controller = new AbortController();

    const fetchWeather = async () => {
      setLoading(true);
      setWeatherError(null);

      try {
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          {
            params: {
              lat: coords.lat,
              lon: coords.lon,
              units: "metric",
              lang: language,
              appid: API_KEY,
            },
            signal: controller.signal,
          },
        );

        const data = response.data;
        console.log(data);
        setWeather({
          name: data.name,
          number: Math.round(data.main.temp),
          description: data.weather[0].description,
          min: Math.round(data.main.temp_min),
          max: Math.round(data.main.temp_max),
          main: data.weather[0].main,
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        });
      } catch (error) {
        // Ignore error caused by request cancellation
        if (axios.isCancel(error) || error.code === "ERR_CANCELED") {
          return;
        }

        console.error(ERROR_MESSAGES[langKey].weatherFailed, error);
        setWeatherError(ERROR_MESSAGES[langKey].weatherFailed);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchWeather();

    // Cancel request on language/coordinates change or component unmount
    return () => {
      controller.abort();
    };
  }, [language, coords, langKey]);

  // --------------------------------
  // Manually update location
  // --------------------------------
  const refreshLocation = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setLocationError(ERROR_MESSAGES[langKey].geoNotSupported);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setLocationError(null);
      },
      (error) => {
        console.error(ERROR_MESSAGES[langKey].geoFailed, error);
        setLocationError(ERROR_MESSAGES[langKey].geoFailed);
      },
    );
  }, [langKey]);

  return {
    weather,
    coords,
    loading,
    locationError,
    weatherError,
    refreshLocation,
  };
}

export default useWeather;
