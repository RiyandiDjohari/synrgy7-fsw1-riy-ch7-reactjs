import { Box, TextField, Typography } from '@mui/material'
import React from 'react'

const SearchMenu = ({value, handleInputChange}) => {
  return (
    <Box sx={{my: "1rem"}}>
    <Typography variant="h5">Search Menu</Typography>
    <TextField variant='standard' sx={{backgroundColor: "#eee", p: "10px", borderRadius: "4px"}} value={value} onChange={(e) => handleInputChange(e.target.value) }/>
    </Box>
  )
}

export default SearchMenu