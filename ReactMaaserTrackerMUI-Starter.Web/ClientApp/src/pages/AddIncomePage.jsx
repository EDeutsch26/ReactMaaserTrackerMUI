import React, { useEffect, useState } from 'react'
import { Container, TextField, Button, Autocomplete, Typography } from '@mui/material'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import dayjs from 'dayjs'
import axios from 'axios'
import Loader from '../components/Loader'



const AddIncomePage = () => {
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedSource, setSelectedSource] = useState('')
    const [amount, setAmount] = useState('')
    const [sources, setSources] = useState([])
    const isValidForm = selectedDate && selectedSource && amount

    // const [sources, setSources] = useState([])
    // const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function loadSources() {
            const { data } = await axios.get('/api/maasertracker/getActiveSources') //getActive sources
            setSources(data)
        }
        loadSources()
    }, [])

    async function onAddClick() {
        console.log('add clicked!!')
        try {
            await axios.post('/api/maasertracker/addincome', {
                amount,
                date: selectedDate,
                incomeSourceId: selectedSource.id,
                incomeSourceName: selectedSource.name
            })
        } catch (error) {
            console.error('Failed to add income:', error)
        } finally {
            resetForm()
        }

    }

    function resetForm() {
        setAmount('')
        setSelectedDate(null)
        setSelectedSource('')
    }

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh' }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Add Income
            </Typography>
            <Autocomplete
                options={sources}
                getOptionLabel={(option) => option.name || ''}
                fullWidth
                margin="normal"
                renderInput={(params) => <TextField {...params} label="Source" variant="outlined" />}
                onChange={(e, value) => setSelectedSource(value)}
                value={selectedSource}
            />
            <TextField
                label="Amount"
                variant="outlined"
                type="number"
                InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                fullWidth
                margin="normal"
                value={amount}
                onChange={e => setAmount(e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Date"
                    value={selectedDate}
                    onChange={(newValue) => {
                        setSelectedDate(newValue)
                    }}
                    inputFormat="MM/dd/yyyy"
                    renderInput={(params) => (
                        <TextField {...params} fullWidth margin="normal" variant="outlined" />
                    )}
                />
            </LocalizationProvider>
            <Button disabled={!isValidForm} variant="contained" color="primary" onClick={onAddClick}>Add Income</Button>
        </Container>
    )
}

export default AddIncomePage 
