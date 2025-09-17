import { Container } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import AddEditDialog from '../components/AddEditDialog'
import DeleteDialog from '../components/DeleteDialog'
import SourcesTable from '../components/SourcesTable'
import AddSrcBtn from '../components/AddSrcBtn'


const ManageSourcesPage = () => {
  const [sources, setSources] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [currentSourceName, setCurrentSourceName] = useState('')
  const [selectedSource, setSelectedSource] = useState(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)


  async function loadSources() {
    const { data } = await axios.get('/api/maasertracker/GetActiveSources')
    setSources(data)
    setIsLoading(false)
  }

  useEffect(() => {
    loadSources()
  }, [])

  const handleOpen = (source = null) => {
    if (source !== null) {
      setCurrentSourceName(source.name)
    }

    setIsOpen(true)
    setSelectedSource(source)
  }

  const handleClose = () => {
    setIsOpen(false)
    setCurrentSourceName('')
    setSelectedSource(null)
  }

  const handleAddEdit = async () => {
    if (selectedSource) {
      await axios.post('/api/maasertracker/editsource', { ...selectedSource, name: currentSourceName })
    } else {
      await axios.post('/api/maasertracker/AddSource', { name: currentSourceName })
    }
    loadSources()
    handleClose()
  }

  const handleDelete = async(source) => {
    setSelectedSource(source)
    console.log(source)
    console.log(selectedSource)

    try {
      const { data } = await axios.get(`api/maasertracker/hasincome?id=${source.id}`)
      source.hasIncome = data

      if (source.hasIncome) {
        setConfirmOpen(true)
      } else {
        deleteSource(source)

      }
    } catch (error) {
      console.error('error getting if has incomes', error)
    }


  }

  const handleConfirmClose = () => {
    loadSources()
    setConfirmOpen(false)
    setSelectedSource(null)

  }

  async function deleteSource(source = selectedSource) {
    console.log(selectedSource)
    await axios.post('/api/maasertracker/DeleteSource', source)
    loadSources()
  }

  const handleConfirmedDelete = () => {
    deleteSource() // here change from delete to inactive
    handleConfirmClose()
  }

  return (isLoading ? <Loader /> :
    <Container>

      <AddSrcBtn handleOpen={handleOpen} />

      <SourcesTable
        sources={sources}
        handleDelete={handleDelete}
        handleOpen={handleOpen}

      />

      <AddEditDialog
        isOpen={isOpen}
        handleClose={handleClose}
        editingSource={selectedSource}
        handleAddEdit={handleAddEdit}
        currentSourceName={currentSourceName}
        setCurrentSourceName={setCurrentSourceName} />

      <DeleteDialog
        confirmOpen={confirmOpen}
        handleConfirmClose={handleConfirmClose}
        handleDeleteConfirm={handleConfirmedDelete} />

    </Container>
  )
}

export default ManageSourcesPage  
