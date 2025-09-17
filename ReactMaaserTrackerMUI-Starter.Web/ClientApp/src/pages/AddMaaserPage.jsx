import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';

const AddMaaserPage =() => {
    const [date, setDate] = useState(new Date());
    const [recipient, setRecipient] = useState('')
    const [amount, setAmount] = useState('')
    const isValidForm = date && recipient && amount

    async function onAddClick(){
        try{
            await axios.post('/api/maasertracker/addDonation', {amount, recipient, date})
        } catch(error){
            console.error('error adding donation',error)
        }finally{
            resetForm()
        }
    }

    function resetForm(){
        setDate('')
        setRecipient('')
        setAmount('')
    }

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh' }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Add Maaser
            </Typography>
            <TextField label="Recipient" variant="outlined" fullWidth margin="normal" value={recipient} onChange={e => setRecipient(e.target.value)} />
            <TextField label="Amount" variant="outlined" fullWidth margin="normal" value={amount} onChange={e => setAmount(e.target.value)}/>
            <TextField
                label="Date"
                type="date"
                value={dayjs(date).format('YYYY-MM-DD')}
                onChange={e => setDate(e.target.value)}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" variant="outlined" />}
            />
            <Button disabled={!isValidForm} onClick={onAddClick} variant="contained" color="primary">Add Maaser</Button>
        </Container>
    );
}

export default AddMaaserPage;
