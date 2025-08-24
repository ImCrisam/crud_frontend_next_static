"use client"
import Box from '@mui/material/Box';
import { useI18n } from '../_i18n/i18n-provider';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { BrandsTableProvider } from './_hooks/use-brands-table';
import { BrandsViewProvider } from './_hooks/use-brands-view-data';
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { t } = useI18n()

  return (

    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: "primary.main",
            mb: 4,
          }}
        >
          {t("brands.title")}
        </Typography>
        <BrandsTableProvider >
          <BrandsViewProvider>
            {children}
          </BrandsViewProvider>
        </BrandsTableProvider>
      </Container>
    </Box>
  )
}
