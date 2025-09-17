import { Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"

export default function GroupedIncomesTable({ groupedIncomes }) {

    return groupedIncomes.map(incomeSource => (
        <div key={incomeSource.id} sx={{ width: '80%', maxWidth: '80%' }}>
            <Typography variant="h5" gutterBottom component="div" sx={{ mt: 5 }}>
                {incomeSource.name}
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
                            <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
                            <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {incomeSource.incomes.map((income) => (
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
        </div>
    ))
}