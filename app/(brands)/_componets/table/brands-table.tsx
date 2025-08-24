import TableHead from "@mui/material/TableHead";
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { useI18n } from "../../../_i18n/i18n-provider";

import { useBrandsTable } from "../../_hooks/use-brands-table";
import { useBrandsView } from "../../_hooks/use-brands-view";


export function TableBrands() {
  const { t } = useI18n()
  const { handleToggleActive, openDialog } = useBrandsTable()

  const { filteredBrands, page, rowsPerPage, setPage, setRowsPerPage, searchTerm } = useBrandsView()
  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>{t("brands.name")}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t("brands.owner")}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t("brands.status")}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t("brands.actions")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBrands.map((brand) => (
              <TableRow key={brand.id} hover>
                <TableCell>
                  <Typography variant="body1" fontWeight={500}>
                    {brand.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {brand.owner}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={brand.is_active ? t("brands.active") : t("brands.inactive")}
                    color={brand.is_active ? "success" : "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Tooltip title={t("brands.toggle")}>
                      <IconButton
                        size="small"
                        onClick={() => handleToggleActive(brand)}
                        color={brand.is_active ? "success" : "default"}
                      >
                        {brand.is_active ? <ToggleOnIcon /> : <ToggleOffIcon />}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t("common.edit")}>
                      <IconButton size="small" onClick={() => openDialog("edit",brand)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t("common.delete")}>
                      <IconButton size="small" onClick={() => openDialog("delete",brand)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {filteredBrands.length === 0 && searchTerm && (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    {searchTerm ? "No brands found matching your search" : "No brands available"}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredBrands.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

    </>
  );
}
