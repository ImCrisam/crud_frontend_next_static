"use client"

import { useState, useEffect, useCallback } from "react"
import apiService from "../_services/api"
import { ApiError, Brand, CreateBrandRequest, UpdateBrandRequest } from "../_models/models"

export interface UseBrandsApiReturn {
  brands: Brand[]
  loading: boolean
  error: ApiError | null
  createBrand: (brandData: CreateBrandRequest) => Promise<Brand>
  updateBrand: (id: number, brandData: CreateBrandRequest) => Promise<Brand>
  patchBrand: (id: number, brandData: UpdateBrandRequest) => Promise<Brand>
  deleteBrand: (id: number) => Promise<void>
  toggleBrandActive: (id: number) => Promise<Brand>
  refreshBrands: () => Promise<void>
  clearError: () => void
}

export function useBrandsApi(): UseBrandsApiReturn {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<ApiError | null>(null)

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const refreshBrands = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await apiService.getBrands()
      setBrands(data)
    } catch (err) {
      setError(err as ApiError)
    } finally {
      setLoading(false)
    }
  }, [])

  const createBrand = useCallback(async (brandData: CreateBrandRequest): Promise<Brand> => {
    try {
      setError(null)
      const newBrand = await apiService.createBrand(brandData)
      setBrands((prev) => [...prev, newBrand])
      return newBrand
    } catch (err) {
      const error = err as ApiError
      setError(error)
      throw error
    }
  }, [])

  const updateBrand = useCallback(async (id: number, brandData: CreateBrandRequest): Promise<Brand> => {
    try {
      setError(null)
      const updatedBrand = await apiService.updateBrand(id, brandData)
      setBrands((prev) => prev.map((brand) => (brand.id === id ? updatedBrand : brand)))
      return updatedBrand
    } catch (err) {
      const error = err as ApiError
      setError(error)
      throw error
    }
  }, [])

  const patchBrand = useCallback(async (id: number, brandData: UpdateBrandRequest): Promise<Brand> => {
    try {
      setError(null)
      const updatedBrand = await apiService.patchBrand(id, brandData)
      setBrands((prev) => prev.map((brand) => (brand.id === id ? updatedBrand : brand)))
      return updatedBrand
    } catch (err) {
      const error = err as ApiError
      setError(error)
      throw error
    }
  }, [])

  const deleteBrand = useCallback(async (id: number): Promise<void> => {
    try {
      setError(null)
      await apiService.deleteBrand(id)
      setBrands((prev) => prev.filter((brand) => brand.id !== id))
    } catch (err) {
      const error = err as ApiError
      setError(error)
      throw error
    }
  }, [])

  const toggleBrandActive = useCallback(async (id: number): Promise<Brand> => {
    try {
      setError(null)
      const updatedBrand = await apiService.toggleBrandActive(id)
      setBrands((prev) => prev.map((brand) => (brand.id === id ? updatedBrand : brand)))
      return updatedBrand
    } catch (err) {
      const error = err as ApiError
      setError(error)
      throw error
    }
  }, [])

  // Load brands on mount
  useEffect(() => {
    refreshBrands()
  }, [refreshBrands])

  return {
    brands,
    loading,
    error,
    createBrand,
    updateBrand,
    patchBrand,
    deleteBrand,
    toggleBrandActive,
    refreshBrands,
    clearError,
  }
}
