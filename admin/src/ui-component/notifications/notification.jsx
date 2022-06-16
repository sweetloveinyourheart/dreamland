import { Box, Divider, Modal, Typography } from "@mui/material";

function Notification({ active, message, handleClose }) {
    return (
        <Modal
            open={active}
            onClose={() => handleClose()}
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '1px solid #eee',
                boxShadow: 0,
                p: 4,
            }}>
                <Typography id="modal-modal-title" variant="h4" component="h2" marginBottom={1}>
                    Thông báo
                </Typography>
                <Divider />
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {message}
                </Typography>
            </Box>
        </Modal>
    );
}

export default Notification;