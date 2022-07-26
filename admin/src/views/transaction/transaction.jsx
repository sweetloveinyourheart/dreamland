import { useLazyQuery, useQuery } from "@apollo/client";
import { Box, Button, CircularProgress, Divider, Grid, Tab, Tabs, Typography } from "@mui/material";
import TransactionList from "components/transaction-list";
import { TransactionStatus } from "constants/transaction";
import { GET_TRANSACTIONS } from "graphql/queries/transaction";
import { useEffect, useState } from "react";
import MainCard from "ui-component/cards/MainCard";
import ReplayIcon from '@mui/icons-material/Replay';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { GET_APARTMENT_BY_ID } from "graphql/queries/apartment";
import { GET_HOUSE_BY_ID } from "graphql/queries/house";
import { GET_LAND_BY_ID } from "graphql/queries/land";
import { GET_BUSINESS_PREMISES_BY_ID } from "graphql/queries/businessPremises";
import { GET_MOTAL_BY_ID } from "graphql/queries/motal";
import PostDetail from "components/post";

const TransactionViewer = ({ item }) => {
    const [post, setPost] = useState()

    const [apartmentQuery, { data: apartmentData }] = useLazyQuery(GET_APARTMENT_BY_ID)
    const [houseQuery, { data: houseData }] = useLazyQuery(GET_HOUSE_BY_ID)
    const [landQuery, { data: landData }] = useLazyQuery(GET_LAND_BY_ID)
    const [premisesQuery, { data: premisesData }] = useLazyQuery(GET_BUSINESS_PREMISES_BY_ID)
    const [motalQuery, { data: motalData }] = useLazyQuery(GET_MOTAL_BY_ID)

    useEffect(() => {
        switch (item.itemType) {
            case "CanHo":
                apartmentQuery({
                    variables: {
                        id: item.itemId
                    }
                })
                return;

            case "NhaO":
                houseQuery({
                    variables: {
                        id: item.itemId
                    }
                })
                return;

            case "Dat":
                landQuery({
                    variables: {
                        id: item.itemId
                    }
                })
                return;

            case "VanPhong":
                premisesQuery({
                    variables: {
                        id: item.itemId
                    }
                })
                return;

            case "PhongTro":
                motalQuery({
                    variables: {
                        id: item.itemId
                    }
                })
                return;

            default:
                return;
        }
    }, [item])

    useEffect(() => {
        if (apartmentData && item.itemType === "CanHo") {
            setPost(apartmentData.apartment)
        }

        if (houseData && item.itemType === "NhaO") {
            setPost(houseData.house)
        }

        if (landData && item.itemType === "Dat") {
            setPost(landData.land)
        }

        if (premisesData && item.itemType === "VanPhong") {
            setPost(premisesData.businessPremises)
        }

        if (motalData && item.itemType === "PhongTro") {
            setPost(motalData.motal)
        }
    }, [apartmentData, houseData, landData, premisesData, motalData])

    if (!post) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        )
    }

    return <PostDetail post={post} />
}

function Transaction() {
    const [menu, setMenu] = useState(0)
    const [canShowMore, setCanShowMore] = useState(true)

    const [status, setStatus] = useState(TransactionStatus.Locked)
    const [paging, setPaging] = useState({
        limit: 20
    })

    const [items, setItems] = useState([])
    const [selectedItem, setSelectedItem] = useState()

    const { data, error, loading, refetch } = useQuery(GET_TRANSACTIONS, {
        variables: {
            status,
            paging
        },
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'no-cache'
    })

    useEffect(() => {
        if (data) {
            if (items.length !== data?.transactions.length) {
                setCanShowMore(true)
            }

            setItems(data.transactions)
        }

    }, [data, error])

    const showMorePost = () => {
        setCanShowMore(false)
        setPaging(s => ({ ...s, limit: s.limit + 20 }))
        refetch({
            paging: { limit: paging.limit + 20 }
        })
    }

    const onSelectMenu = (stage) => {
        switch (stage) {
            case 1:
                setMenu(stage)
                setStatus(TransactionStatus.DatCoc)
                setPaging({
                    limit: 20
                })
                setCanShowMore(true)
                setSelectedItem(undefined)
                return;

            case 2:
                setMenu(stage)
                setStatus(TransactionStatus.BanGiao)
                setPaging({
                    limit: 20
                })
                setSelectedItem(undefined)
                setCanShowMore(true)
                return;

            default:
                setSelectedItem(undefined)
                setCanShowMore(true)
                setMenu(0)
                setStatus(TransactionStatus.Locked)
                setPaging({
                    limit: 20
                })
                return;
        }
    }

    const onSelectItem = (item) => {
        setSelectedItem(item)
        setMenu(3)
    }

    const onReload = () => {
        refetch({
            paging: {
                limit: 20
            },
            status
        })
        setPaging({
            limit: 20
        })
        setCanShowMore(true)
    }

    return (
        <MainCard>
            <Grid container spacing={1}>
                <Grid xl={6} item>
                    <Box display={"flex"} alignItems="center" height={"100%"}>
                        <Typography variant="h3" marginRight={2}>
                            {"Giao dịch bất động sản"}
                        </Typography>
                        <Box sx={{ cursor: 'pointer' }} onClick={() => onReload()}>
                            {loading ? <MoreHorizIcon /> : <ReplayIcon />}
                        </Box>
                    </Box>
                </Grid>
                <Grid xl={6} item>
                    <Box display={"flex"} justifyContent="flex-end">
                        <Box display={"flex"} justifyContent="flex-end">
                            <Tabs value={menu} onChange={(e, value) => onSelectMenu(value)}>
                                <Tab label="Chờ phê duyệt" id={0} value={0} />
                                <Tab label="Đang giao dịch" id={1} value={1} />
                                <Tab label="Đã bàn giao" id={2} value={2} />
                            </Tabs>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Divider sx={{ margin: 2 }} />
            {menu < 3
                ? (<TransactionList items={items} onSelect={onSelectItem} />)
                : (<TransactionViewer item={selectedItem} />)
            }
            {menu < 3
                && (
                    <Grid lg={12} display={"flex"} mt={2} justifyContent="center">
                        <Button onClick={() => showMorePost()} disabled={!canShowMore} variant='outlined'> Xem thêm </Button>
                    </Grid>
                )
            }

        </MainCard>
    );
}

export default Transaction;