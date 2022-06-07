import React, {useEffect, useState} from "react";
import Paper from "@mui/material/Paper";
import {Content} from "../../components/Content";
import {useQuery} from "../../hooks/useQuery/useQuery";
import useHead from "../../hooks/useHead";
import {createSearchParams, useNavigate} from "react-router-dom";

import {
    addPurchaseApi,
    deletePurchaseApi,
    getPurchaseApi,
    getPurchasesApi,
    updPurchaseApi
} from "../../api/purchasesApi";

import {FilterLayout} from "../../components/Filter/FilterLayout";

import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Backdrop, CircularProgress, Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalData from "../../components/ModalData";
import validationSchemaModal from "./validationModal";
import ConfirmDelete from "../../components/ConfirmDelete";
import {StoreFilterSelect} from "../../components/Filter/StoreFilterSelect";
import {DateFilterRange} from "../../components/Filter/DateFilterRange.";
import {StoreModalSelect} from "../../components/ModalFields/StoreModalSelect";
import {DateModalField} from "../../components/ModalFields/DateModalField";
import {CustomerFilterSelect} from "../../components/Filter/CustomerFilterSelect";
import {CustomerModalSelect} from "../../components/ModalFields/СustomerModalSelect";

const PurchasesPage = () => {
    const query = useQuery();

    const head = useHead();

    const [purchases, setPurchases] = useState([]);

    const [total, setTotal] = useState(0);

    const [page, setPage] = useState((query.get("page") ? parseInt(query.get("page")) : false) || 1);

    const rowsPerPage = 30;

    const [dataFetched, setDataFetched] = useState(true);

    const [loading, setLoading] = useState(false);

    const [loadingConfirm, setLoadingConfirm] = useState(false);

    const [confirmDelete, setConfirmDelete] = useState(false);

    const [filter, setFilter] = useState({
        customer_id: query.get("customer_id") || '',
        store_id: query.get("store_id") || '',
        date: query.get("date") || '',
    });

    const [openBackdrop, setOpenBackdrop] = useState(false)

    const [openModal, setOpenModal] = useState(false);

    const [purchaseId, setPurchaseId] = useState(null);

    const navigate = useNavigate();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const updateSinglePurchase = ({
                                      id,
                                      product_id,
                                      store_id,
                                      purchase_date,
                                      created_at,
                                      updated_at,
                                      customer_name,
                                      store_name
                                  }) => {
        const purchasesNew = purchases.map(currentItem => {
            return currentItem.id === id ? {
                id, product_id, store_id, purchase_date, created_at, updated_at, customer_name, store_name
            } : currentItem;
        })

        setPurchases(purchasesNew);
        setOpenModal(false);
        setPurchaseId(null);
    }

    const insertSinglePurchase = ({
                                      id,
                                      product_id,
                                      store_id,
                                      purchase_date,
                                      created_at,
                                      updated_at,
                                      customer_name,
                                      store_name
                                  }) => {
        setPurchases([
            {id, product_id, store_id, purchase_date, created_at, updated_at, customer_name, store_name},
            ...purchases
        ]);
        setOpenModal(false);
        setPurchaseId(null);
    }

    const deleteSinglePurchase = (id) => {
        setPurchases(purchases.filter(item => item.id !== id));
    }

    useEffect(() => {
        setDataFetched(true);

        let params = Object.fromEntries(Object.entries({
            page: page,
            rowsPerPage,
            ...filter
        }).filter(([key, value]) => value !== '' && key !== 'rowsPerPage' && !(key === 'page' && value === 1)));

        navigate({
            search: createSearchParams(params).toString()
        });

        getPurchasesApi({page: page, rowsPerPage, ...filter}).then(({data: purchasesData, total}) => {
            setPurchases(purchasesData);
            setTotal(total);

        }).finally(() => {
            setDataFetched(false);
            setLoading(false);
        });

    }, [page, rowsPerPage, filter]);

    const openPurchase = (e, id) => {
        e.preventDefault();
        setPurchaseId(id);
        setOpenBackdrop(true);
    }

    const handleCloseModal = () => {
        setPurchaseId(null);
        setOpenModal(false);
    };

    const isLoadSingle = () => {
        setOpenModal(true);
        setOpenBackdrop(false);
    }

    const handleConfirmDelete = (id) => {
        setConfirmDelete(id);
    }

    const handleDelete = (id) => {
        setLoadingConfirm(true);

        deletePurchaseApi(id)
            .then((data) => {
                deleteSinglePurchase(id);
            })
            .catch((error) => {
                console.log(error);
            }).finally(() => {
            setLoadingConfirm(false);
            setConfirmDelete(false);
        });
    }

    return (
        <Content title="Purchases" titlePage="Purchases">
            <FilterLayout
                setPage={page => setPage(page + 1)}
                filter={filter}
                setFilter={setFilter}
                loading={loading}
                setLoading={setLoading}
                resetFields={{customer_id: '', store_id: '', date: ''}}
            >
                <CustomerFilterSelect defaultValue={filter.customer_id}/>
                <StoreFilterSelect defaultValue={filter.store_id}/>
                <DateFilterRange defaultValue={filter.date}/>
            </FilterLayout>
            <Box sx={{width: '100%'}}>
                <Paper sx={{width: '100%', mb: 2}}>
                    <Pagination count={Math.ceil(total / rowsPerPage)} page={page} onChange={handleChangePage}
                                color="primary" sx={{pt: 2, pb: 1}}/>
                    <Toolbar sx={{pl: {sm: 2}, pr: {xs: 1, sm: 1}}}>
                        <Typography
                            sx={{flex: '1 1 100%'}}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                        >
                            {head.titlePage}
                        </Typography>
                        <Button variant="outlined" size="small" onClick={() => setOpenModal(true)}>Create</Button>
                    </Toolbar>
                    <TableContainer>
                        <Table
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                            size="medium"
                        >
                            <TableHead>
                                <TableRow>
                                    {['Customer', 'Store name', 'Purchase date', 'Created', 'Updated'].map((headCell) => (
                                        <TableCell key={headCell}>{headCell}</TableCell>
                                    ))}
                                    <TableCell>&nbsp;</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataFetched ? (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                    >
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            colSpan={7}
                                            sx={{textAlign: 'center'}}
                                        >
                                            <CircularProgress/>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    <React.Fragment>
                                        {purchases.map(({
                                                            id,
                                                            customer_id,
                                                            customer_name,
                                                            store_id,
                                                            store_name,
                                                            purchase_date,
                                                            created_at,
                                                            updated_at,
                                                        }, index) => {
                                            return (
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    tabIndex={-1}
                                                    key={id}
                                                >
                                                    <TableCell component="th" scope="row"><a href="#"
                                                                                             onClick={(e) => openPurchase(e, id)}>{customer_name}</a></TableCell>
                                                    <TableCell>{store_name}</TableCell>
                                                    <TableCell>{new Date(purchase_date).toLocaleDateString()}</TableCell>
                                                    <TableCell>{new Date(created_at).toLocaleDateString()}</TableCell>
                                                    <TableCell>{new Date(updated_at).toLocaleDateString()}</TableCell>
                                                    <TableCell align="right">
                                                        <Tooltip title="Delete">
                                                            <IconButton aria-label="delete" size="small"
                                                                        onClick={() => handleConfirmDelete(id)}>
                                                                <DeleteIcon fontSize="small"/>
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </React.Fragment>)
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Pagination count={Math.ceil(total / rowsPerPage)} page={page} onChange={handleChangePage}
                                color="primary" sx={{pt: 2, pb: 2}}/>
                </Paper>
            </Box>
            {(openBackdrop || openModal) && (
                <React.Fragment>
                    <Backdrop
                        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                        open={openBackdrop}
                    >
                        <CircularProgress color="inherit"/>
                    </Backdrop>
                    <ModalData
                        title="purchase"
                        id={purchaseId}
                        isLoadSingle={isLoadSingle}
                        openModal={openModal}
                        handleCloseModal={handleCloseModal}
                        updateSingle={updateSinglePurchase}
                        insertSingle={insertSinglePurchase}
                        getApi={getPurchaseApi}
                        addApi={addPurchaseApi}
                        updApi={updPurchaseApi}
                        validationSchema={validationSchemaModal}
                    >
                        <CustomerModalSelect name="customer_id"/>
                        <StoreModalSelect name="store_id"/>
                        <DateModalField name="purchase_date" label="Purchase date"/>
                    </ModalData>
                </React.Fragment>
            )}
            <ConfirmDelete confirmDelete={confirmDelete} setConfirmDelete={setConfirmDelete} loading={loadingConfirm}
                           handleDelete={handleDelete}/>
        </Content>
    );
}
export default PurchasesPage;