import { Table, TableContainer, TableRow, TableHead, TableCell, TableBody, Paper, Button } from "@mui/material"

export default function SourcesTable({ sources, handleDelete, handleOpen }) {
  return <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
          <TableCell align="right" sx={{ fontSize: '18px' }}>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sources.map((source) => (
          <TableRow key={source.id}>
            <TableCell sx={{ fontSize: '18px' }}>{source.name}</TableCell>
            <TableCell align="right" sx={{ fontSize: '18px' }}>
              <Button color="primary" variant="outlined" sx={{ margin: '0 5px' }}
                onClick={() => handleOpen(source)}>Edit</Button>
              <Button color="secondary" variant="outlined" sx={{ margin: '0 5px' }}
                onClick={() => handleDelete(source)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
}