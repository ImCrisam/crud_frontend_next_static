import { useState } from "react"
import { Box, TextField, Button, CircularProgress } from "@mui/material"
import { Brand, CreateBrandRequest } from "../_models/models"

export default function BrandForm({
  initialData,
  onSubmit,
}: {
  initialData?: Brand
  onSubmit: (data: CreateBrandRequest) => Promise<void>
}) {
  const [formData, setFormData] = useState<CreateBrandRequest>({
    name: initialData?.name || "",
    owner: initialData?.owner || "",
    is_active: initialData?.is_active ?? true,
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    await onSubmit(formData)
    setLoading(false)
  }

  return (
    <Box display="flex" flexDirection="column" gap={2} pt={1}>
      <TextField
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <TextField
        label="Owner"
        value={formData.owner}
        onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
      />
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? <CircularProgress size={20} /> : "Save"}
        </Button>
      </Box>
    </Box>
  )
}
