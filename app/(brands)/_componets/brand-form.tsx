import { useState } from "react"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { Brand, CreateBrandRequest } from "../_models/models"
import { useI18n } from '../../_i18n/i18n-provider';

export default function BrandForm({
  initialData,
  onSubmit,
}: {
  initialData?: Brand
  onSubmit: (data: CreateBrandRequest) => Promise<void>
}) {
  const { t } = useI18n()
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
        label={t("brands.name")}
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <TextField
        label={t("brands.owner")}
        value={formData.owner}
        onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
      />
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" onClick={handleSubmit} disabled={loading || !formData.name}>
          {loading ? <CircularProgress size={20} /> : t("common.save")}
        </Button>
      </Box>
    </Box>
  )
}
