"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as NextThemeProvider } from "next-themes"
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';


declare module "@mui/material/styles" {
  interface PaletteColor {
    gradient?: string;
  }
  interface SimplePaletteColorOptions {
    gradient?: string;
  }
}
const brandColors = {
  primary: {
    light: "hsl(352, 79%, 65%)", // un poco más claro
    base: "hsl(352, 79%, 55%)", // original
    dark: "hsl(352, 79%, 40%)", // más profundo
  },
  secondary: {
    light: "hsl(333, 85%, 75%)", // un poco más claro
    base: "hsl(333, 85%, 65%)", // original
    dark: "hsl(333, 85%, 50%)", // más intenso
  }
}


type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "brands-dashboard-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const muiTheme = createTheme({
    palette: {
      mode: theme === "dark" ? "dark" : "light",
      primary: {
        main: brandColors.primary.base,
        light: brandColors.primary.light,
        dark: brandColors.primary.dark,
        contrastText: "#ffffff",
        gradient: `linear-gradient(90deg, ${brandColors.primary.light}, ${brandColors.primary.dark})`,
      },
      secondary: {
        main: brandColors.secondary.base,
        light: brandColors.secondary.light,
        dark: brandColors.secondary.dark,
        contrastText: "#ffffff",
        gradient: `linear-gradient(90deg, ${brandColors.secondary.light}, ${brandColors.secondary.dark})`,
      },
      background: {
        default: theme === "dark" ? "#121212" : "#ffffff",
        paper: theme === "dark" ? "#1e1e1e" : "#ffffff",
      },
    },
    typography: {
      fontFamily: "var(--font-sans)",
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: "8px",
            fontWeight: 500,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
            boxShadow: theme === "dark" ? "0 4px 6px -1px rgba(0, 0, 0, 0.3)" : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
  })

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  if (!mounted) {
    return null
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      <NextThemeProvider enableSystem storageKey={storageKey}>
        <MuiThemeProvider theme={muiTheme}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </NextThemeProvider>
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
