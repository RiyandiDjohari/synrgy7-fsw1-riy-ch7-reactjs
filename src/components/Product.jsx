import { Card, CardContent } from "@mui/material";
import React from "react";

const Product = ({ name }) => {
  return (
    <Card variant="outlined">
      <CardContent>{name}</CardContent>
    </Card>
  );
};

export default Product;
