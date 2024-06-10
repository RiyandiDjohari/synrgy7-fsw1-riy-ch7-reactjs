import { Box, Card, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Result = ({ value, menus }) => {
  return (
    <Box sx={{mt: "1rem"}}>
      <Typography variant="h5" component="h5">Result: {value}</Typography>
      <Grid container spacing={3}>
        {menus.filter(row => row.name.toLowerCase().includes(value.toLowerCase()))
        .map((menu, index) => (
          <Grid item xs={4} key={menu.id}>
            <Card sx={{p: "16px", mt: "1rem"}}>
              <Link to={menu.url} style={{textDecoration: "none"}}>
              {menu.name}
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Result;
