import React from 'react';
import { Box, Container, Typography, Link, Stack, Grid, Divider } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: '#f8f9fa',
        borderTop: '1px solid #e0e0e0',
      }}
    >
      <Container maxWidth="lg">
        {/* Footer Links Section */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* About Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: '#1f2937' }}>
              About Us
            </Typography>
            <Stack spacing={1}>
              <Link href="#" variant="body2" color="text.secondary" underline="hover">
                About MySmartSociety
              </Link>
              <Link href="#" variant="body2" color="text.secondary" underline="hover">
                Our Mission
              </Link>
              <Link href="#" variant="body2" color="text.secondary" underline="hover">
                Features
              </Link>
              <Link href="#" variant="body2" color="text.secondary" underline="hover">
                Blog
              </Link>
            </Stack>
          </Grid>

          {/* Support Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: '#1f2937' }}>
              Support
            </Typography>
            <Stack spacing={1}>
              <Link href="#" variant="body2" color="text.secondary" underline="hover">
                Help Center
              </Link>
              <Link href="#" variant="body2" color="text.secondary" underline="hover">
                Contact Us
              </Link>
              <Link href="#" variant="body2" color="text.secondary" underline="hover">
                FAQ
              </Link>
              <Link href="#" variant="body2" color="text.secondary" underline="hover">
                Report Issue
              </Link>
            </Stack>
          </Grid>

          {/* Legal Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: '#1f2937' }}>
              Legal
            </Typography>
            <Stack spacing={1}>
              <Link href="#" variant="body2" color="text.secondary" underline="hover">
                Terms of Service
              </Link>
              <Link href="#" variant="body2" color="text.secondary" underline="hover">
                Privacy Policy
              </Link>
              <Link href="#" variant="body2" color="text.secondary" underline="hover">
                Cookie Policy
              </Link>
              <Link href="#" variant="body2" color="text.secondary" underline="hover">
                Disclaimer
              </Link>
            </Stack>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: '#1f2937' }}>
              Contact
            </Typography>
            <Stack spacing={1}>
              <Link href="mailto:anshukumar.sharma.btechcse@ghrua.edu.in" variant="body2" color="text.secondary" underline="hover">
                Email: anshukumar.sharma.btechcse@ghrua.edu.in
              </Link>
              <Typography variant="body2" color="text.secondary">
                Phone: +91 XXXXX XXXXX
              </Typography>
              <Stack direction="row" spacing={1}>
                <Link href="https://www.linkedin.com/in/ianshusharma2005/" target="_blank" rel="noreferrer" color="text.secondary" aria-label="LinkedIn">
                  <LinkedInIcon />
                </Link>
                <Link href="https://www.instagram.com/ianshusharmaa/" target="_blank" rel="noreferrer" color="text.secondary" aria-label="Instagram">
                  <InstagramIcon />
                </Link>
                <Link href="https://github.com/ianshusharmaa" target="_blank" rel="noreferrer" color="text.secondary" aria-label="GitHub">
                  <GitHubIcon />
                </Link>
                <Link href="mailto:anshukumar.sharma.btechcse@ghrua.edu.in" color="text.secondary" aria-label="Email">
                  <EmailIcon />
                </Link>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Footer Bottom Section */}
        <Stack spacing={1} alignItems="center" textAlign="center">
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} MySmartSociety | All Rights Reserved
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
