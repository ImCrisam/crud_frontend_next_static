import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useBrandsTable } from "../_hooks/use-brands-table"
import BrandForm from "./brand-form"
import { useI18n } from '../../_i18n/i18n-provider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function BrandDialog() {
  const { t } = useI18n()
  const { dialog, closeDialog, selectedBrand, handleCreate, handleUpdate, handleDelete } = useBrandsTable()

  if (!dialog) return null

  return (
    <Dialog open={!!dialog} onClose={closeDialog} maxWidth="sm" fullWidth>
      {dialog === "create" && (
        <>
          <DialogTitle>{t("brands.create")}</DialogTitle>
                      <IconButton
              aria-label="close"
              onClick={closeDialog}
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          <DialogContent>
            <BrandForm onSubmit={handleCreate} />
          </DialogContent>
        </>
      )}
      {dialog === "edit" && selectedBrand && (
        <>
          <DialogTitle>{t("common.edit")} {selectedBrand.name}</DialogTitle>
          <DialogContent>
            <BrandForm initialData={selectedBrand} onSubmit={handleUpdate} />
          </DialogContent>
        </>
      )}
      {dialog === "delete" && selectedBrand && (
        <>
          <DialogTitle>{t("brands.delete.confirm")}</DialogTitle>
          <DialogContent>
            {selectedBrand.name}
            <br />
            {selectedBrand.owner}
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog}>{t("common.cancel")}</Button>
            <Button onClick={()=>{handleDelete(selectedBrand)}} color="error" variant="contained">
              {t("common.delete")}
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}
