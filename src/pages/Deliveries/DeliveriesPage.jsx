import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Content} from "../../components/Content";
import {useQuery} from "../../hooks/useQuery/useQuery";
import useHead from "../../hooks/useHead";
import {createSearchParams, useNavigate} from "react-router-dom";
import {
    addDeliveryApi,
    deleteDeliveryApi,
    getDeliveryApi,
    getDeliveriesApi,
    updDeliveryApi
} from "../../api/deliveriesApi";
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
import {ProductFilterSelect} from "../../components/Filter/ProductFilterSelect";
import {StoreFilterSelect} from "../../components/Filter/StoreFilterSelect";
import {DateFilterRange} from "../../components/Filter/DateFilterRange.";
import {ProductModalSelect} from "../../components/ModalFields/ProductModalSelect";
import {StoreModalSelect} from "../../components/ModalFields/StoreModalSelect";
import {DateModalField} from "../../components/ModalFields/DateModalField";
import {NumberModalField} from "../../components/ModalFields/NumberModalField";

const DeliveriesPage = () => {

    const query = useQuery();

    const head = useHead();

    const [deliveries, setDeliveries] = useState([]);

    const [total, setTotal] = useState(0);
    const [page, setPage] = useState((query.get("page") ? parseInt(query.get("page")) : false) || 1);

    const [rowsPerPage, setRowsPerPage] = useState(30);

    const [dataFetched, setDataFetched] = useState(true);

    const [loading, setLoading] = useState(false);
    const [loadingConfirm, setLoadingConfirm] = useState(false);

    const [confirmDelete, setConfirmDelete] = useState(false);

    const [filter, setFilter] = useState({
        product_name: query.get("product_name") || '',
        store_id: query.get("store_id") || '',
        date: query.get("date") || '',
    });

    const [openBackdrop, setOpenBackdrop] = useState(false)
    const [openModal, setOpenModal] = useState(false);
    // const [productId, setProductId] = useState(null);
    const [deliveryId, setDeliveryId] = useState(null);

    const navigate = useNavigate();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const updateSingleDelivery = ({
                                      id,
                                      product_id,
                                      store_id,
                                      delivery_date,
                                      product_count,
                                      created_at,
                                      updated_at,
                                      product_name,
                                      store_name
                                  }) => {
        const deliveriesNew = deliveries.map(currentItem => {
            return currentItem.id === id ? {
                id, product_id, store_id, delivery_date, product_count, created_at, updated_at, product_name, store_name
            } : currentItem;
        })

        setDeliveries(deliveriesNew);
        setOpenModal(false);
        setDeliveryId(null);
    }

    const insertSingleDelivery = ({
                                      id,
                                      product_id,
                                      store_id,
                                      delivery_date,
                                      product_count,
                                      created_at,
                                      updated_at,
                                      product_name,
                                      store_name
                                  }) => {
        setDeliveries([
            {id, product_id, store_id, delivery_date, product_count, created_at, updated_at, product_name, store_name},
            ...deliveries
        ]);
        setOpenModal(false);
        setDeliveryId(null);
    }

    const deleteSingleDelivery = (id) => {
        setDeliveries(deliveries.filter(item => item.id !== id));
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

        getDeliveriesApi({page: page, rowsPerPage, ...filter}).then(({data: deliveriesData, total}) => {
            setDeliveries(deliveriesData);
            setTotal(total);

        }).finally(() => {
            setDataFetched(false);
            setLoading(false);
        });

    }, [page, rowsPerPage, filter]);

    const openDelivery = (e, id) => {
        e.preventDefault();
        setDeliveryId(id);
        setOpenBackdrop(true);
    }

    const handleCloseModal = () => {
        setDeliveryId(null);
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

        deleteDeliveryApi(id)
            .then((data) => {
                deleteSingleDelivery(id);
            })
            .catch((error) => {
                console.log(error);
            }).finally(() => {
            setLoadingConfirm(false);
            setConfirmDelete(false);
        });
    }

    return (
        <Content title="Deliveries" titlePage="Deliveries">
            <FilterLayout
                setPage={page => setPage(page + 1)}
                filter={filter}
                setFilter={setFilter}
                loading={loading}
                setLoading={setLoading}
                resetFields={{product_name: '', store_id: '', date: ''}}
            >
                <ProductFilterSelect defaultValue={filter.product_name}/>
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
                                    {['Product name', 'Store name', 'Delivery date', 'Product count', 'Created', 'Updated'].map((headCell) => (
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
                                        {deliveries.map(({
                                                             id,
                                                             product_id,
                                                             product_name,
                                                             store_id,
                                                             store_name,
                                                             delivery_date,
                                                             product_count,
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
                                                                                             onClick={(e) => openDelivery(e, id)}>{product_name}</a></TableCell>
                                                    <TableCell>{store_name}</TableCell>
                                                    <TableCell>{new Date(delivery_date).toLocaleDateString()}</TableCell>
                                                    <TableCell>{product_count}</TableCell>
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
                        title="delivery"
                        id={deliveryId}
                        isLoadSingle={isLoadSingle}
                        openModal={openModal}
                        handleCloseModal={handleCloseModal}
                        updateSingle={updateSingleDelivery}
                        insertSingle={insertSingleDelivery}
                        getApi={getDeliveryApi}
                        addApi={addDeliveryApi}
                        updApi={updDeliveryApi}
                        validationSchema={validationSchemaModal}
                    >
                        <ProductModalSelect name="product_id"/>
                        <StoreModalSelect name="store_id"/>
                        <DateModalField name="delivery_date" label="Delivery date"/>
                        <NumberModalField name="product_count" label="Product count"/>
                    </ModalData>
                </React.Fragment>
            )}

            <ConfirmDelete confirmDelete={confirmDelete} setConfirmDelete={setConfirmDelete} loading={loadingConfirm}
                           handleDelete={handleDelete}/>
        </Content>

    );
}

export default DeliveriesPage;