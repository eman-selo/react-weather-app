import { Box, Button } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";

function WeatherControls({ language, changeLanguageBtn }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Button
        variant="outlined"
        startIcon={
          <LanguageIcon
            sx={{
              ml: language === "ar" ? 1 : 0,
              mr: language === "ar" ? -0.5 : 1,
            }}
          />
        }
        onClick={changeLanguageBtn}
        sx={{
          color: "white",
          borderColor: "rgba(255, 255, 255, 0.35)",
          borderRadius: 2,
          px: 2.5,
          py: 0.6,
          fontSize: "0.9rem",
          "&:hover": {
            borderColor: "#ffffff",
            background: "rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        {language === "ar" ? "إنجليزي" : "Arabic"}
      </Button>
    </Box>
  );
}

export default WeatherControls;
