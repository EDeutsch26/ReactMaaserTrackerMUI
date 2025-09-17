import { Paper, TableContainer,Table,TableHead,TableRow,TableCell,TableBody } from "@mui/material"


export default function IncomesTable({incomes}){


    return  <TableContainer component={Paper} sx={{ maxWidth: '80%', width: '80%' }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
                    <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
                    <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {incomes.map((income) => (
                    <TableRow key={income.id}>
                      <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                        {income.incomeSourceName}
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: '18px' }}>${income.amount}</TableCell>
                      <TableCell align="right" sx={{ fontSize: '18px' }}>{income.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
}