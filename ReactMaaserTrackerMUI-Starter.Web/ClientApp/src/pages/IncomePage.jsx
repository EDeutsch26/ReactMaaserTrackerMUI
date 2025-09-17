import React, { useEffect, useState } from 'react';
import { Checkbox, Container, FormControlLabel, Typography } from '@mui/material';
import axios from 'axios';
import Loader from '../components/Loader';
import IncomesTable from '../components/IncomesTable';
import GroupedIncomesTable from '../components/GroupedIncomesTable';



const IncomePage = () => {

  const [groupBySource, setGroupBySource] = useState(false);
  const [incomes, setIncomes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [groupedIncomes, setGroupedIncomes] = useState([])


useEffect(()=>{
  async function loadIncomes() {
    if(groupBySource){
    const {data} = await axios.get('api/maasertracker/GetGroupedIncomes')
  setGroupedIncomes(data)
    } else{
          const {data} = await axios.get('api/maasertracker/GetIncomes')
  setIncomes(data)
    }

  setIsLoading(false)
  }
  loadIncomes()
},[groupBySource])


  return ( isLoading ? <Loader/> :
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
      <Typography variant="h2" gutterBottom component="div">
        Income History
      </Typography>

      <FormControlLabel
        control={
          <Checkbox
            checked={groupBySource}
            onChange={(event) => setGroupBySource(event.target.checked)}
            name="checkedB"
            color="primary"
          />
        }
        label="Group by source"
      />

      {!groupBySource ? (
        <IncomesTable incomes={incomes}/>
      ) : (
        <GroupedIncomesTable groupedIncomes={groupedIncomes}/>
        )
      }
    </Container>
  );
}


export default IncomePage;
