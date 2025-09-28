import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { formatDate, formatMoney } from '../services/Formatters'

export default function MaaserTable({ maaserPayments }) {

    return <TableContainer component={Paper} sx={{ maxWidth: '80%', width: '80%' }}>
        <Table sx={{ minWidth: 650 }}>
            <TableHead>
                <TableRow>
                    <TableCell sx={{ fontSize: '18px' }}>Recipient</TableCell>
                    <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
                    <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {maaserPayments.map((payment) => (
                    <TableRow key={payment.id}>
                        <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                            {payment.recipient}
                        </TableCell>
                        <TableCell align="right" sx={{ fontSize: '18px' }}>{formatMoney(payment.amount)}</TableCell>
                        <TableCell align="right" sx={{ fontSize: '18px' }}>{formatDate(payment.date)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
}