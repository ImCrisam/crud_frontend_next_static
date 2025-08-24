// use-brands-table-context.tsx
"use client"

import { createContext, useContext, useState, useMemo, ReactNode } from "react"
import { Brand } from "../_models/models"
import { useBrandsTable } from "./use-brands-table"

interface BrandsTableContextType {
  brands: Brand[]
  filteredBrands: Brand[]
  page: number
  rowsPerPage: number
  searchTerm: string
  setSearchTerm: (term: string) => void
  setPage: (page: number) => void
  setRowsPerPage: (rows: number) => void
  resetBrands: () => void
}

const BrandsTableContext = createContext<BrandsTableContextType | undefined>(undefined)

export function BrandsTableProvider({ children }: { children: ReactNode }) {
  const { brands: baseBrands } = useBrandsTable()

  const [brands, setBrands] = useState<Brand[]>(baseBrands)
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const filteredBrands = useMemo(() => {
    const filtered = brands.filter(
      (b) =>
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.owner.toLowerCase().includes(searchTerm.toLowerCase())
    )
    return filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  }, [brands, searchTerm, page, rowsPerPage])

  const resetBrands = () => {
    setBrands(baseBrands)
    setSearchTerm("")
    setPage(0)
  }

  return (
    <BrandsTableContext.Provider
      value={{
        brands,
        filteredBrands,
        page,
        rowsPerPage,
        searchTerm,
        setSearchTerm,
        setPage,
        setRowsPerPage,
        resetBrands,
      }}
    >
      {children}
    </BrandsTableContext.Provider>
  )
}

export function useBrandsView() {
  const ctx = useContext(BrandsTableContext)
  if (!ctx) throw new Error("useBrandsTableContext must be used within BrandsTableProvider")
  return ctx
}


