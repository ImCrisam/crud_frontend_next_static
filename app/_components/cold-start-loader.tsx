"use client"

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { motion } from "framer-motion"
import { useTheme } from "@mui/material/styles"


export default function ColdStartLoader() {
  const theme = useTheme() // Use the theme from your ThemeProvider
  return (
    <Box
      sx={{
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          width: "100%",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ p: 4, textAlign: "center" }}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <motion.div
              style={{
                position: "relative",
                width: 64,
                height: 64,
                padding: "8px 13px 13px 13px",
                borderTop: `5px solid ${theme.palette.primary.main}`,
                borderRight: `5px`,
                borderRadius: "50%",
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <motion.div
                style={{
                  width: "100%",
                  height: "100%",
                  padding: "11px 7px 11px 11px",
                  borderRight: `3px solid ${theme.palette.secondary.main}`,
                  borderRadius: "50%",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <motion.div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    borderLeft: `1px solid ${theme.palette.secondary.main}`,
                    borderRadius: "50%",
                  }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
              </motion.div>
            </motion.div>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 3 }}>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    backgroundColor: "#1976d2",
                    borderRadius: "50%",
                  }}
                />
              </motion.div>
            ))}
          </Box>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: 600,
                color: "#1a1a1a",
                mb: 1.5,
                lineHeight: 1.3,
              }}
            >
              Estamos despertando nuestros servidores ✨
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
                lineHeight: 1.5,
                mb: 3,
              }}
            >
              Solo la primera vez tarda un poco más, pronto todo irá más rápido 🚀
            </Typography>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <Box sx={{ mb: 2, backgroundColor: "grey.100", marginInline: -32 }}>
              <motion.div
                animate={{ x: ["-150%", "150%"] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",

                }}
              >
                <LinearProgress
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "grey.300",
                    "& .MuiLinearProgress-bar": {
                      background: theme.palette.primary.gradient,
                      borderRadius: 3,
                    },
                  }}
                />
              </motion.div>
            </Box>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.8 }}>
            <Typography
              variant="caption"
              sx={{
                color: "#999",
                fontSize: "0.75rem",
              }}
            >
              Preparando la mejor experiencia para ti...
            </Typography>
          </motion.div>
        </CardContent>
      </Card>
    </Box>
  )
}
