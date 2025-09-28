import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import MaaserTable from '../components/MaaserTable';
import axios from 'axios';
import Loader from '../components/Loader';

const maaserPayments = [
    { id: 1, recipient: 'Charity A', amount: 500, date: '2023-06-10' },
    { id: 2, recipient: 'Charity B', amount: 30, date: '2023-06-09' }
];

const MaaserPage = () => {

    const [donations, setDonations] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function loadDonations() {
            const { data } = await axios.get('/api/maasertracker/GetDonations')
            setDonations(data)
            setIsLoading(false)
        }
        loadDonations()
    }
        , [])

    return (isLoading ? <Loader /> :
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
            <Typography variant="h2" gutterBottom component="div">
                Maaser Payments History
            </Typography>
            <MaaserTable maaserPayments={donations} />
        </Container>
    );
}

export default MaaserPage;
