import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import { formatDate, formatMoney } from "../services/Formatters"

export default function IncomesTable({ incomes }) {


    return <TableContainer component={Paper} sx={{ maxWidth: '80%', width: '80%' }}>
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
                        <TableCell align="right" sx={{ fontSize: '18px' }}>{formatMoney(income.amount)}</TableCell>
                        <TableCell align="right" sx={{ fontSize: '18px' }}>{formatDate(income.date)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
}