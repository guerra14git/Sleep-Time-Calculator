// App de calcular horas de sono por finais/inicio de ciclos de sono
// Baseado no ciclo de sono de 90 minutos
// Utiliza React e Material-UI para a interface

import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Paper,
} from "@mui/material";
import githubIcon from "./icons/github.png";
import linkedinIcon from "./icons/vecteezy_linkedin-logo-png-linkedin-icon-transparent-png_18930480.png";

function sleepCalc(sleep_hour, wake_hour) {
  if (!sleep_hour || !wake_hour) return null; //verificacao
  
  const [h1, m1] = sleep_hour.split(':').map(Number); // separa horas e minutos
  const [h2, m2] = wake_hour.split(':').map(Number);

  let inicio = new Date(0, 0, 0, h1, m1); // cria data com hora de dormir
  let fim = new Date(0, 0, 0, h2, m2);

  if (fim <= inicio) fim.setDate(fim.getDate() + 1); // ajusta se acordou no dia seguinte, por exemplo dormir as 23:00 e acordar as 07:30

  let diffMs = fim - inicio;
  let horas = Math.floor(diffMs / 1000 / 60 / 60);
  let minutos = Math.floor((diffMs / 1000 / 60) % 60);

  return { horas, minutos };
}

function LocalTime(offsetMinutes = 0) {
  const now = new Date();
  now.setMinutes(now.getMinutes() + offsetMinutes);
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export default function App() {
  const [sleep_hour, setSleepHour] = useState('23:00'); // hora de dormir
  const [wake_hour, setWakeHour] = useState('07:30'); // hora de acordar
  const [result, setResult] = useState(null);

  const handleCalcular = () => { // função para calcular horas de sono
    const res = sleepCalc(sleep_hour, wake_hour);
    setResult(res);
  };

  let corResult = "";
  if (result) {
    corResult = result.horas < 7 ? "#ff9800" : "#4caf50";
  }

  return (
  // Main background box
  <Box
    sx={{
      bgcolor: "#23262f",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      px: { xs: 2, sm: 3 },
      py: { xs: 3, sm: 4 },
    }}
  >
    {/* Paper: Card container for the calculator */}
    <Paper
      elevation={8}
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        borderRadius: { xs: 3, sm: 4 },
        width: { xs: "100%", sm: "400px", md: "440px" },
        maxWidth: { xs: "100%", sm: "90vw" },
        bgcolor: "#2e313a",
        mx: { xs: 1, sm: 2 },
      }}
    >
      {/* Header Box */}
      <Box mb={{ xs: 3, sm: 2 }}>
        <Box>
          <Typography
            variant="h5"
            align="center"
            sx={{ 
              color: "#f7f7fa", 
              lineHeight: 1.1, 
              fontSize: { xs: 24, sm: 30, md: 35 },
              fontWeight: { xs: 600, sm: 500 }
            }}
          >
            Sleep time calculator
          </Typography>
        </Box>
      </Box>

      {/* Subtitle */}
      <Typography align="center" sx={{ 
        color: "#E6941A", 
        mb: { xs: 3, sm: 4 }, 
        fontSize: { xs: 13, sm: 15, md: 16 },
        px: { xs: 0.5, sm: 0 },
        lineHeight: 1.3
      }}>
        Find out the ideal sleep duration for you!
      </Typography>

      {/* Sleep hour input */}
      <Box mb={{ xs: 2.5, sm: 2 }}>
        <Typography sx={{ 
          color: "#f7f7fa", 
          fontSize: { xs: 14, sm: 15 }, 
          mb: 1,
          fontWeight: 500
        }}>
          Time to go to sleep?
        </Typography>
        <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 1.5 }}>
          <TextField
            variant="outlined"
            type="time"
            value={sleep_hour}
            onChange={e => setSleepHour(e.target.value)}
            InputProps={{
              style: { color: "#f7f7fa", background: "#23262f" },
            }}
            sx={{
              flex: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                height: { xs: 48, sm: 52, md: 56 },
                fontSize: { xs: 16, sm: 17 },
                "& fieldset": { borderColor: "#41445a" },
                "&:hover fieldset": { borderColor: "#b6b8c3" },
                "&.Mui-focused fieldset": { borderColor: "#E6941A" },
              }
            }}
          />
          <Button
            variant="contained"
            sx={{
              bgcolor: "#E6941A",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: 2,
              fontSize: { xs: 9, sm: 11, md: 12 },
              textTransform: "none",
              minWidth: { xs: 65, sm: 75, md: 80 },
              height: { xs: 48, sm: 52, md: 56 },
              display: "flex",
              flexDirection: "column",
              gap: 0.2,
              "&:hover": { bgcolor: "#B8761A" },
              "&:active": { transform: "scale(0.95)" },
            }}
            onClick={() => setSleepHour(LocalTime(15))}
            title="Usar hora atual + 15 minutos de compensação"
          >
            <Box sx={{ fontSize: { xs: 12, sm: 14 } }}>🕒</Box>
            <Box sx={{ fontSize: { xs: 8, sm: 9 }, lineHeight: 1 }}>
              {LocalTime(15)}
            </Box>
            <Box sx={{ fontSize: { xs: 8, sm: 9 }, lineHeight: 1 }}>
              +15min
            </Box>
          </Button>
        </Box>
      </Box>

      {/* Wake up hour input */}
      <Box mb={{ xs: 2.5, sm: 2 }}>
        <Typography sx={{ 
          color: "#f7f7fa", 
          fontSize: { xs: 14, sm: 15 }, 
          mb: 1,
          fontWeight: 500
        }}>
          Time to wake up?
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          type="time"
          value={wake_hour}
          onChange={e => setWakeHour(e.target.value)}
          InputProps={{
            style: { color: "#f7f7fa", background: "#23262f" },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              height: { xs: 48, sm: 52, md: 56 },
              fontSize: { xs: 16, sm: 17 },
              "& fieldset": { borderColor: "#41445a" },
              "&:hover fieldset": { borderColor: "#b6b8c3" },
              "&.Mui-focused fieldset": { borderColor: "#E6941A" },
            },
          }}
        />
      </Box>

      {/* Calculate button */}
      <Button
        fullWidth
        variant="contained"
        size="large"
        sx={{
          bgcolor: "#E6941A",
          color: "#fff",
          fontWeight: "bold",
          mt: { xs: 1.5, sm: 1 },
          mb: { xs: 3, sm: 3 },
          py: { xs: 1.3, sm: 1.5 },
          borderRadius: 2,
          fontSize: { xs: 16, sm: 17, md: 18 },
          textTransform: "none",
          height: { xs: 50, sm: 54, md: 56 },
          "&:hover": { bgcolor: "#B8761A" },
          "&:active": { transform: "scale(0.98)" },
        }}
        onClick={handleCalcular}
      >
        Calculate
      </Button>

      {/* Result display */}
      {result && (
        <Box mb={{ xs: 2.5, sm: 2 }}>
          <Typography
            sx={{
              fontWeight: 500,
              color: "#f7f7fa",
              fontSize: { xs: 15, sm: 16, md: 17 },
              mb: 0.5,
              lineHeight: 1.4,
            }}
          >
            You will sleep{" "}
            <span style={{ color: corResult, fontWeight: 600 }}>
              {result.horas} hours and {result.minutos} minutes.
            </span>
          </Typography>
          <Typography
            sx={{
              color: corResult,
              fontWeight: 600,
              fontSize: { xs: 14, sm: 15, md: 16 },
            }}
          >
            {result.horas < 7
              ? "Try to sleep more!"
              : "Great! Ideal sleep!"}
          </Typography>
        </Box>
      )}

      {/* Tip box */}
      <Box
        sx={{
          bgcolor: "#23262f",
          borderRadius: 2,
          p: { xs: 1.8, sm: 1.5 },
          display: "flex",
          alignItems: "center",
          mt: { xs: 2.5, sm: 2 },
          mb: { xs: 2.5, sm: 2 },
          border: "1px solid #353840",
        }}
      >
        <Box
          component="span"
          role="img"
          aria-label="tip"
          sx={{ 
            marginRight: { xs: 1.2, sm: 1 }, 
            fontSize: { xs: 16, sm: 18 },
            display: "flex",
            alignItems: "center"
          }}
        >
          💡
        </Box>
        <Typography sx={{ 
          color: "#8d92aa", 
          fontSize: { xs: 13, sm: 14, md: 15 },
          lineHeight: 1.4
        }}>
          Sleep cycles last about 90 minutes. Try to wake up at the end of a cycle for a more refreshed feeling.
        </Typography>
      </Box>

      {/* Social links */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: { xs: 1, sm: 1.5 },
          mt: { xs: 1, sm: 1 },
        }}
      >
        <Button
          variant="outlined"
          sx={{
            color: "#8d92aa",
            borderColor: "transparent",
            borderRadius: 20,
            fontSize: 12,
            textTransform: "none",
            minWidth: { xs: 40, sm: 45 },
            height: { xs: 40, sm: 45 },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 0.5,
            "&:hover": {
              borderColor: "transparent",
              color: "#E6941A",
              bgcolor: "rgba(230, 148, 26, 0.1)",
              transform: "scale(1.05)",
            },
          }}
          onClick={() => window.open("https://github.com/seu-usuario", "_blank")}
          title="GitHub"
        >
          <Box
            component="img"
            src={githubIcon}
            alt="GitHub"
            sx={{
              width: { xs: 24, sm: 28 },
              height: { xs: 24, sm: 28 },
            }}
          />
        </Button>
        <Button
          variant="outlined"
          sx={{
            color: "#8d92aa",
            borderColor: "transparent",
            borderRadius: 20,
            fontSize: 12,
            textTransform: "none",
            minWidth: { xs: 40, sm: 45 },
            height: { xs: 40, sm: 45 },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 0.5,
            "&:hover": {
              borderColor: "transparent",
              color: "#E6941A",
              bgcolor: "rgba(230, 148, 26, 0.1)",
              transform: "scale(1.05)",
            },
          }}
          onClick={() => window.open("https://linkedin.com/in/seu-perfil", "_blank")}
          title="LinkedIn"
        >
          <Box
            component="img"
            src={linkedinIcon}
            alt="LinkedIn"
            sx={{
              width: { xs: 24, sm: 28 },
              height: { xs: 24, sm: 28 },
            }}
          />
        </Button>
      </Box>
    </Paper>
  </Box>
) }