"use client"
import { Add, Refresh, Search } from '@mui/icons-material';
import { Button, CircularProgress, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useI18n } from '../_i18n/i18n-provider';
import { useState } from 'react';
import { useBrands } from './_hooks/use-brands';
export default function BrandsPage() {
	const { t } = useI18n()

	const {
		brands,
		loading,
		error,
		createBrand,
		updateBrand,
		deleteBrand,
		toggleBrandActive,
		refreshBrands,
		clearError,
	} = useBrands()

	const [formErrors, setFormErrors] = useState<Record<string, string>>({})
	const [searchTerm, setSearchTerm] = useState("")

	const filteredBrands = brands.filter(
		(brand) =>
			brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			brand.owner.toLowerCase().includes(searchTerm.toLowerCase()),
	)


	const handleCreateOpen = () => {
		// Open create brand dialog
	}

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
				<CardContent>
					{/* Header with actions */}
					<Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
						<Typography variant="h5" component="h2" fontWeight={600}>
							{t("nav.brands")}
						</Typography>
						<Box display="flex" gap={1}>
							<Tooltip title="Refresh">
								<IconButton onClick={refreshBrands} disabled={loading}>
									<Refresh />
								</IconButton>
							</Tooltip>
							<Button variant="contained" startIcon={<Add />} onClick={handleCreateOpen} sx={{ textTransform: "none" }}>
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
			{/* {children} */}
		</Box>
	)
}
