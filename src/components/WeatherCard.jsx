import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";

import CloudIcon from "@mui/icons-material/Cloud";
const translations = {
  ar: {
    min: "الأدنى",
    max: "الأعلى",
  },
  en: {
    min: "Minimum",
    max: "Maximum",
  },
};
function WeatherCard({ weather, loading, language, toArabicDigits, getDate }) {
  return (
    <Card
      sx={{
        background: "rgba(38, 78, 166, 0.85)",
        backdropFilter: "blur(10px)",
        boxShadow: "0px 12px 32px rgba(9, 33, 87, 0.45)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        borderRadius: 3,
        width: "100%",
        minHeight: 250,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            p: 4,
          }}
        >
          <CircularProgress sx={{ color: "white" }} />
        </Box>
      ) : (
        <>
          <CardHeader
            title={
              <Typography
                variant="h1"
                sx={{
                  fontSize: "1.8rem",
                  fontWeight: 700,
                }}
              >
                {weather.name}
              </Typography>
            }
            subheader={
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 300,
                  opacity: 0.8,
                }}
              >
                {getDate(language === "ar" ? "ar-EG" : "en-US")}
              </Typography>
            }
            sx={{
              pb: 1.5,
              "& .MuiCardHeader-content": {
                display: "flex",
                alignItems: "baseline",
                gap: 1.6,
              },
            }}
          />

          <Divider
            variant="middle"
            sx={{
              borderColor: "rgba(255, 255, 255, 0.2)",
            }}
          />

          <CardContent sx={{ p: 3 }}>
            <Grid
              container
              spacing={2}
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Grid xs={6} sm={7}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: "3.8rem",
                      fontWeight: 700,
                      lineHeight: 1,
                      mb: 1,
                    }}
                  >
                    {language === "ar"
                      ? toArabicDigits(weather.number)
                      : weather.number}
                    °
                  </Typography>

                  {weather.icon && (
                    <img
                      src={weather.icon}
                      alt={weather.description}
                      style={{
                        width: 60,
                        height: 60,
                      }}
                    />
                  )}
                </Box>

                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "1rem",
                    opacity: 0.9,
                    mb: 1.5,
                    fontWeight: 400,
                    textTransform: "capitalize",
                  }}
                >
                  {weather.description}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      opacity: 0.85,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {translations[language].min} :{" "}
                    {language === "ar"
                      ? toArabicDigits(weather.min)
                      : weather.min}
                    °
                  </Typography>

                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                      borderColor: "rgba(255, 255, 255, 0.4)",
                      my: 0.5,
                    }}
                  />

                  <Typography
                    variant="body2"
                    sx={{
                      opacity: 0.85,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {translations[language].max} :{" "}
                    {language === "ar"
                      ? toArabicDigits(weather.max)
                      : weather.max}
                    °
                  </Typography>
                </Box>
              </Grid>

              <Grid
                xs={6}
                sm={5}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CloudIcon
                  sx={{
                    fontSize: "110px",
                    color: "#ffffff",
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </>
      )}
    </Card>
  );
}

export default WeatherCard;
