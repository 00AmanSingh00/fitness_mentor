import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box mt="80px" bgcolor="#050505">
    <Typography variant="h5" sx={{ fontSize: { lg: '38px', xs: '20px' } }} mt="41px" pt="30px" textAlign="center" fontFamily={" Helvetica"} style={{ textShadow: "2px 2px 4px #07faea",
    color: "white", }} pb="40px">Running From Problems Is Still Cardio</Typography>
  </Box>
);

export default Footer;
