import { Dialog,DialogTitle, DialogActions, DialogContent, Button, TextField } from "@mui/material"


export default function AddEditDialog({isOpen, handleClose, editingSource, handleAddEdit,  currentSourceName,  setCurrentSourceName}) {

    

    return <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>{editingSource ? 'Edit Source' : 'Add Source'}</DialogTitle>
        <DialogContent>
          {console.log(currentSourceName)}
            <TextField autoFocus margin="dense" label="Source" type="text" 
            fullWidth 
            value={currentSourceName} 
            onChange={(e) => setCurrentSourceName(e.target.value )} />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleAddEdit} color="primary">
                {editingSource ? 'Save' : 'Add'}
            </Button>
        </DialogActions>
    </Dialog>
}