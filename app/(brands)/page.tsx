"use client"
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useI18n } from '../_i18n/i18n-provider';

import { useBrandsTable } from './_hooks/use-brands-table';
import { useBrandsViewData } from './_hooks/use-brands-view-data';
import { TableBrands } from './_componets/table/brands-table';
import BrandDialog from './_componets/brand-dialog';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function BrandsPage() {
	const { t } = useI18n()
	const { brands, loading, refresh, openDialog, snackbar, closeSnackbar } = useBrandsTable()
	const { searchTerm, setSearchTerm } = useBrandsViewData()

	if (loading && brands.length === 0) {
		return (
			<Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
				<CircularProgress size={48} />
				<Typography variant="h6" sx={{ ml: 2 }}>
					{t("common.loading")}
				</Typography>
			</Box>
		)
	}
	return (
		<Box>
			<Card>
				<BrandDialog />
				<CardContent>
					{/* Header with actions */}
					<Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
						<Typography variant="h5" component="h2" fontWeight={600}>
							{t("nav.brands")}
						</Typography>
						<Box display="flex" gap={1}>
							<Tooltip title="Refresh">
								<IconButton onClick={refresh} disabled={loading}>
									<RefreshIcon />
								</IconButton>
							</Tooltip>
							<Button variant="contained" startIcon={<AddIcon />} onClick={() => { openDialog("create") }} sx={{ textTransform: "none" }}>
								{t("brands.create")}
							</Button>
						</Box>
					</Box>

					{/* Search */}
					<TextField
						fullWidth
						variant="outlined"
						color='secondary'
						placeholder={t("common.search")}
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						sx={{ mb: 3 }}
					/>

				</CardContent>
			</Card>
			<TableBrands />
			<Snackbar
				open={snackbar.open}
				autoHideDuration={3000}
				onClose={closeSnackbar}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<MuiAlert onClose={closeSnackbar} severity={snackbar.severity} elevation={6} variant="filled">
					{snackbar.message}
				</MuiAlert>
			</Snackbar>
		</Box>
	)
}
