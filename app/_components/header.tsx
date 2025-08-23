"use client"

import React from "react"
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LanguageIcon from '@mui/icons-material/Language';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useTheme } from "../_theme/theme-provider";
import { useI18n } from "../_i18n/i18n-provider";
export default function Header() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useI18n()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleLanguageMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLanguageChange = (lang: "en" | "es") => {
    setLanguage(lang)
    handleLanguageMenuClose()
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: "primary.main" }}>
      <Toolbar>
        <DashboardIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
          {t("nav.dashboard")}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            color="inherit"
            startIcon={<LanguageIcon />}
            onClick={handleLanguageMenuOpen}
            sx={{ textTransform: "uppercase" }}
          >
            {language}
          </Button>

          <IconButton color="inherit" onClick={toggleTheme}>
            {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleLanguageMenuClose}>
          <MenuItem onClick={() => handleLanguageChange("en")} selected={language === "en"}>
            English
          </MenuItem>
          <MenuItem onClick={() => handleLanguageChange("es")} selected={language === "es"}>
            Español
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
