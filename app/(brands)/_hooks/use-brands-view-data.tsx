// use-brands-table-context.tsx
"use client"

import { createContext, useContext, useState, useMemo, ReactNode } from "react"
import { Brand } from "../_models/models"
import { useBrandsTable } from "./use-brands-table"

interface BrandsViewContextType {
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

const BrandsViewContext = createContext<BrandsViewContextType | undefined>(undefined)

export function BrandsViewProvider({ children }: { children: ReactNode }) {
  const { brands } = useBrandsTable()

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
    setSearchTerm("")
    setPage(0)
  }

  return (
    <BrandsViewContext.Provider
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
    </BrandsViewContext.Provider>
  )
}

export function useBrandsViewData() {
  const ctx = useContext(BrandsViewContext)
  if (!ctx) throw new Error("useBrandsTableContext must be used within BrandsTableProvider")
  return ctx
}


