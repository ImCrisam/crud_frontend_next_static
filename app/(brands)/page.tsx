"use client"
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useI18n } from '../_i18n/i18n-provider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
export default function BrandsPage() {
  const { t } = useI18n()

  return (
 	<Box>
	  <Card>
		<CardContent>
		  {/* Header with actions */}
		  <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
			<Typography variant="h5" component="h2" fontWeight={600}>
			  {t("nav.brands")}
			</Typography>
			{/* {children} */}
		  </Box>
		  </CardContent>
		</Card>
	</Box>
  )
}
