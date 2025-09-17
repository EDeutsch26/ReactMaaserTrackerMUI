import { Box, Button } from "@mui/material"

export default function AddSrcBtn({handleOpen}){

    return       <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            <Button onClick={() => handleOpen()} variant="contained" color="primary" sx={{ minWidth: '200px' }}>
              Add Source
            </Button>
          </Box>
}