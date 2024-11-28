import { Box, Typography } from '@mui/material'
import Hero from "../Acesses/error.svg"
import React from 'react'

const Errorpage = () => {
  return (
    <Box className="mt-4">
<Box >
<Typography variant='h4'> Something’s wrong here...</Typography>
<Typography variant='body2'> We can’t find the page you’re looking for.
Check out our help center or head back to home.</Typography>
</Box>
<Box>

</Box>
<img src={Hero} alt="" />

    </Box>
  )
}

export default Errorpage