import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material"
import { useBrandsTable } from "../_hooks/use-brands-table"
import BrandForm from "./brand-form"


export default function BrandDialog() {
  const { dialog, closeDialog, selectedBrand, handleCreate, handleUpdate, handleDelete } = useBrandsTable()

  if (!dialog) return null

  return (
    <Dialog open={!!dialog} onClose={closeDialog} maxWidth="sm" fullWidth>
      {dialog === "create" && (
        <>
          <DialogTitle>Create Brand</DialogTitle>
          <DialogContent>
            <BrandForm onSubmit={handleCreate} />
          </DialogContent>
        </>
      )}
      {dialog === "edit" && selectedBrand && (
        <>
          <DialogTitle>Edit {selectedBrand.name}</DialogTitle>
          <DialogContent>
            <BrandForm initialData={selectedBrand} onSubmit={handleUpdate} />
          </DialogContent>
        </>
      )}
      {dialog === "delete" && selectedBrand && (
        <>
          <DialogTitle>Delete Brand</DialogTitle>
          <DialogContent>Are you sure you want to delete "{selectedBrand.name}"?</DialogContent>
          <DialogActions>
            <Button onClick={closeDialog}>Cancel</Button>
            <Button onClick={()=>{handleDelete}} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}
