"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "es"

type I18nContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const translations = {
  en: {
    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.brands": "Brands",
    "nav.settings": "Settings",

    // Common
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.create": "Create",
    "common.search": "Search",
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "common.confirm": "Confirm",
    "common.yes": "Yes",
    "common.no": "No",

    // Brands
    "brands.title": "Brands Management",
    "brands.create": "Create Brand",
    "brands.name": "Name",
    "brands.owner": "Owner",
    "brands.status": "Status",
    "brands.active": "Active",
    "brands.inactive": "Inactive",
    "brands.actions": "Actions",
    "brands.toggle": "Toggle Status",
    "brands.delete.confirm": "Are you sure you want to delete this brand?",
    "brands.created": "Brand created successfully",
    "brands.updated": "Brand updated successfully",
    "brands.deleted": "Brand deleted successfully",
    "brands.error.create": "Error creating brand",
    "brands.error.update": "Error updating brand",
    "brands.error.delete": "Error deleting brand",
    "brands.error.fetch": "Error fetching brands",

    // Forms
    "form.name.required": "Name is required",
    "form.owner.required": "Owner is required",
    "form.name.placeholder": "Enter brand name",
    "form.owner.placeholder": "Enter owner name",

    // Theme
    "theme.light": "Light",
    "theme.dark": "Dark",
    "theme.system": "System",
  },
  es: {
    // Navigation
    "nav.dashboard": "Panel",
    "nav.brands": "Marcas",
    "nav.settings": "Configuración",

    // Common
    "common.save": "Guardar",
    "common.cancel": "Cancelar",
    "common.delete": "Eliminar",
    "common.edit": "Editar",
    "common.create": "Crear",
    "common.search": "Buscar",
    "common.loading": "Cargando...",
    "common.error": "Error",
    "common.success": "Éxito",
    "common.confirm": "Confirmar",
    "common.yes": "Sí",
    "common.no": "No",

    // Brands
    "brands.title": "Gestión de Marcas",
    "brands.create": "Crear Marca",
    "brands.name": "Nombre",
    "brands.owner": "Propietario",
    "brands.status": "Estado",
    "brands.active": "Activo",
    "brands.inactive": "Inactivo",
    "brands.actions": "Acciones",
    "brands.toggle": "Cambiar Estado",
    "brands.delete.confirm": "¿Estás seguro de que quieres eliminar esta marca?",
    "brands.created": "Marca creada exitosamente",
    "brands.updated": "Marca actualizada exitosamente",
    "brands.deleted": "Marca eliminada exitosamente",
    "brands.error.create": "Error al crear la marca",
    "brands.error.update": "Error al actualizar la marca",
    "brands.error.delete": "Error al eliminar la marca",
    "brands.error.fetch": "Error al obtener las marcas",

    // Forms
    "form.name.required": "El nombre es requerido",
    "form.owner.required": "El propietario es requerido",
    "form.name.placeholder": "Ingresa el nombre de la marca",
    "form.owner.placeholder": "Ingresa el nombre del propietario",

    // Theme
    "theme.light": "Claro",
    "theme.dark": "Oscuro",
    "theme.system": "Sistema",
  },
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedLanguage = localStorage.getItem("brands-dashboard-language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "es")) {
      setLanguage(savedLanguage)
    }
    setMounted(true)
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("brands-dashboard-language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)["en"]] || key
  }

  if (!mounted) {
    return null
  }

  return <I18nContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>{children}</I18nContext.Provider>
}

export const useI18n = () => {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
