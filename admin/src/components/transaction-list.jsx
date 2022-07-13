import { useMutation } from "@apollo/client";
import { Box, Button, Divider, Grid, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { TransactionStatus } from "constants/transaction";
import { UPDATE_TRANSACTION } from "graphql/mutations/update";
import { useEffect, useState } from "react";

function typeReader(type) {
    switch (type) {
        case "CanHo":
            return "Căn hộ/Chung cư"
        case "NhaO":
            return "Nhà ở"
        case "Dat":
            return "Đất đai"
        case "VanPhong":
            return "Văn phòng/Mặt bằng kinh doanh"
        case "PhongTro":
            return "Phòng trọ"

        default:
            return ""
    }
}


const TransactionList = ({ items, onSelect }) => {
    const [modal, setModal] = useState({
        message: '',
        active: false,
        success: false
    })

    const [update, { data, error }] = useMutation(UPDATE_TRANSACTION)

    const onUpdate = (id, status) => {
        update({
            variables: {
                id,
                status
            }
        })
    }

    useEffect(() => {
        if (data && !error) {
            setModal({
                message: 'Cập nhật trạng thái thành công',
                active: true,
                success: true
            })
        }

        if (error) {
            setModal({
                message: 'Cập nhật trạng thái thất bại',
                active: true,
                success: false
            })
        }

    }, [data, error])

    const onCloseModal = () => {
        setModal({
            message: '',
            active: false,
            success: false
        })
    }

    return (
        <Grid container>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Loại BĐS</TableCell>
                            <TableCell align="right">Tên người dùng</TableCell>
                            <TableCell align="right"> Số điện thoại</TableCell>
                            <TableCell align="right">Thời gian GD</TableCell>
                            <TableCell align="right">Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, ":hover": { backgroundColor: "#eee" }, cursor: 'pointer' }}
                            >
                                <TableCell component="th" scope="row" onClick={() => onSelect(row.item)}>
                                    {typeReader(row.item.itemType)}
                                </TableCell>
                                <TableCell align="right" onClick={() => onSelect(row.item)}>{row.user.name}</TableCell>
                                <TableCell align="right" onClick={() => onSelect(row.item)}>{row.user.phone}</TableCell>
                                <TableCell align="right" onClick={() => onSelect(row.item)}>{row.createdAt.slice(0, row.createdAt.indexOf("T"))}</TableCell>
                                <TableCell align="right">
                                    {row.status === TransactionStatus.DatCoc
                                        && (
                                            <Button
                                                variant="contained"
                                                sx={{ marginLeft: 1 }}
                                                onClick={() => onUpdate(row._id, TransactionStatus.BanGiao)}
                                                color="success"
                                            >
                                                Bàn giao
                                            </Button>
                                        )
                                    }
                                    {row.status === TransactionStatus.Locked
                                        && (
                                            <Button
                                                variant="contained"
                                                sx={{ marginLeft: 1 }}
                                                onClick={() => onUpdate(row._id, TransactionStatus.DatCoc)}
                                                color="success"
                                            >
                                                Đặt cọc
                                            </Button>
                                        )
                                    }
                                    {row.status === TransactionStatus.Locked
                                        && (
                                            <Button 
                                                variant="contained" 
                                                sx={{ marginLeft: 1 }} 
                                                color="error"
                                                onClick={() => onUpdate(row._id, TransactionStatus.Rejected)}
                                            > 
                                                Từ chối GD 
                                            </Button>
                                        )
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={modal.active}
                onClose={() => onCloseModal()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
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
                        {modal.message}
                    </Typography>
                </Box>
            </Modal>
        </Grid>
    );
}

export default TransactionList;