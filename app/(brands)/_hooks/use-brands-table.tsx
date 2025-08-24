"use client"
import { createContext, useContext, useState } from "react"
import { ApiError, Brand, CreateBrandRequest } from "../_models/models"
import { useBrandsApi } from "./use-brand-api"


type DialogType = "create" | "edit" | "delete" | null

interface TableBrandsContextValue {
  // data
  brands: Brand[]
  loading: boolean
  error: ApiError | null

  // dialog state
  dialog: DialogType
  openDialog: (type: DialogType, brand?: Brand) => void
  closeDialog: () => void
  selectedBrand: Brand | null

  // actions
  handleCreate: (data: CreateBrandRequest) => Promise<void>
  handleUpdate: (data: CreateBrandRequest) => Promise<void>
  handleDelete: (brand?: Brand) => Promise<void>
  handleToggleActive: (brand: Brand) => Promise<void>
  refresh: () => void

  // snackbar
  snackbar: { open: boolean; message: string; severity: "success" | "error" }
  closeSnackbar: () => void
}

const BrandsTableContext = createContext<TableBrandsContextValue | null>(null)

export const BrandsTableProvider = ({ children }: { children: React.ReactNode }) => {
  const { brands, loading, error, createBrand, updateBrand, deleteBrand, toggleBrandActive, refreshBrands, clearError } =
    useBrandsApi()

  const [dialog, setDialog] = useState<DialogType>(null)
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null)
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  })

  const showSnackbar = (message: string, severity: "success" | "error" = "success") =>
    setSnackbar({ open: true, message, severity })
  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false })

  const openDialog = (type: DialogType, brand?: Brand) => {
    setDialog(type)
    if (brand) setSelectedBrand(brand)
    else setSelectedBrand(null)
  }
  const closeDialog = () => setDialog(null)

  const handleCreate = async (data: CreateBrandRequest) => {
    await createBrand(data)
    showSnackbar("Brand created")
    closeDialog()
  }

  const handleUpdate = async (data: CreateBrandRequest) => {
    if (!selectedBrand) return
    await updateBrand(selectedBrand.id, data)
    showSnackbar("Brand updated")
    closeDialog()
  }

  const handleDelete = async (brand?: Brand) => {
    const target = brand ?? selectedBrand
    if (!target) return

    await deleteBrand(target.id)
    showSnackbar("Brand deleted")
    closeDialog()
  }

  const handleToggleActive = async (brand: Brand) => {
    await toggleBrandActive(brand.id)
    showSnackbar(brand.is_active ? "Brand deactivated" : "Brand activated")
  }


  return (
    <BrandsTableContext.Provider
      value={{
        brands,
        loading,
        error,

        // dialog state
        dialog,
        openDialog,
        closeDialog,
        selectedBrand,

        // actions
        handleCreate,
        handleUpdate,
        handleDelete,
        handleToggleActive,
        refresh: refreshBrands,

        // snackbar
        snackbar,
        closeSnackbar,
      }} >
      {children}
    </BrandsTableContext.Provider>
  )
}

export const useBrandsTable = () => {
  const ctx = useContext(BrandsTableContext)
  if (!ctx) throw new Error("useTableBrands must be used inside TableBrandsProvider")
  return ctx
}