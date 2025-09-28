import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import axios from 'axios';

const AddMaaserPage = () => {
    const [date, setDate] = useState(null);
    const [recipient, setRecipient] = useState('')
    const [amount, setAmount] = useState('')
    const isValidForm = date && recipient && amount

    async function onAddClick() {
        try {
            await axios.post('/api/maasertracker/addDonation', { recipient, amount, date })
        } catch (error) {
            console.error('error adding donation', error)
        } finally {
            resetForm()
        }
    }

    function resetForm() {
        setDate(null)
        setRecipient('')
        setAmount('')
    }

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh' }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Add Maaser
            </Typography>
            <TextField label="Recipient" variant="outlined" fullWidth margin="normal" value={recipient} onChange={e => setRecipient(e.target.value)} />
            <TextField label="Amount" variant="outlined" fullWidth margin="normal" value={amount} onChange={e => setAmount(e.target.value)} />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Date"
                    value={date}
                    onChange={(newValue) => {
                        setDate(newValue)
                    }}
                    inputFormat="MM/dd/yyyy"
                    renderInput={(params) => (
                        <TextField {...params} fullWidth margin="normal" variant="outlined" />
                    )}
                />
            </LocalizationProvider>
            <Button disabled={!isValidForm} onClick={onAddClick} variant="contained" color="primary">Add Maaser</Button>
        </Container>
    );
}

export default AddMaaserPage;
