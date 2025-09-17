import { Dialog,DialogTitle, DialogActions, DialogContent, Button } from "@mui/material"

export default function DeleteDialog({confirmOpen, handleConfirmClose, handleDeleteConfirm}){


    
return <Dialog open={confirmOpen} onClose={handleConfirmClose} fullWidth maxWidth="sm">
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            This source has some income associated with it, are you sure you want to delete it?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
}