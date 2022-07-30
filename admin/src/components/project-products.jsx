import { useMutation, useQuery } from "@apollo/client";
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { ProjectProductStatus } from "constants/transaction";
import { DELETE_PROJECT_PRODUCT } from "graphql/mutations/remove";
import { GET_PROJECT_PRODUCT } from "graphql/queries/project";
import { moneyConverter } from "helpers/money";
import { useEffect, useState } from "react";
import Notification from "ui-component/notifications/notification";

export function statusReader(type) {
    switch (type) {
        case "Available":
            return "Sẵn sàng"
        case "DatCoc":
            return "Đặt cọc"
        case "BanGiao":
            return "Bàn giao"
        case "Lock":
            return "Đã khoá GD"

        default:
            return ""
    }
}

const ProjectProductList = ({ project }) => {
    const [modal, setModal] = useState({
        message: '',
        active: false,
        success: false
    })

    const { data: items, refetch } = useQuery(GET_PROJECT_PRODUCT, { variables: { project }, fetchPolicy: 'network-only' })
    const [deleteProduct, { data: deleteData, error }] = useMutation(DELETE_PROJECT_PRODUCT)

    useEffect(() => {
        if (deleteData && !error) {
            refetch()
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

    }, [deleteData, error])

    const onDelete = (id) => deleteProduct({ variables: { id } })

    return (
        <Grid container>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell align="right">Mã</TableCell>
                            <TableCell align="right">Diện tích</TableCell>
                            <TableCell align="right">Số thửa</TableCell>
                            <TableCell align="right">Giá bán</TableCell>
                            <TableCell align="right">Thổ cư</TableCell>
                            <TableCell align="right">Ghi chú</TableCell>
                            <TableCell align="right">Trạng thái</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items && items.products.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, ":hover": { backgroundColor: "#eee" }, cursor: 'pointer' }}
                            >
                                <TableCell component="th" scope="row" onClick={() => { }}>
                                    {index + 1}
                                </TableCell>
                                <TableCell align="right" onClick={() => { }}>{row.code}</TableCell>
                                <TableCell align="right" onClick={() => { }}>{row.totalAcreage}</TableCell>
                                <TableCell align="right" onClick={() => { }}>{row.quantity}</TableCell>
                                <TableCell align="right" onClick={() => { }}>{moneyConverter(row.price)}</TableCell>
                                <TableCell align="right" onClick={() => { }}>{row.usedAcreage}</TableCell>
                                <TableCell align="right" onClick={() => { }}>{row.description}</TableCell>
                                <TableCell align="right" onClick={() => { }}>{statusReader(row.status)}</TableCell>

                                <TableCell align="right">
                                    {row.status === ProjectProductStatus.Available
                                        && (
                                            <Button
                                                variant="contained"
                                                sx={{ marginLeft: 1 }}
                                                onClick={() => onDelete(row._id)}
                                                color="error"
                                            >
                                                Xoá bỏ
                                            </Button>
                                        )
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Notification active={modal.active} message={modal.message} handleClose={() => setModal(s => ({ ...s, active: false }))} />
        </Grid>
    );
}

export default ProjectProductList;