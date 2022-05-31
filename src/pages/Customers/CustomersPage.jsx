import React, {useEffect, useState} from "react";
import Paper from "@mui/material/Paper";
import {Content} from "../../components/Content";
import {useQuery} from "../../hooks/useQuery/useQuery";
import useHead from "../../hooks/useHead";
import {createSearchParams, useNavigate} from "react-router-dom";
import {FilterLayout} from "../../components/Filter/FilterLayout";
import {SearchFilterField} from "../../components/Filter/SearchFilterField";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Backdrop, CircularProgress, Tooltip} from "@mui/material";
import TableHead from '@mui/material/TableHead';
import {getCustomersApi} from "../../api/customerApi";
import Pagination from '@mui/material/Pagination';
import ModalData from "../../components/ModalData";

import validationSchemaModal from "./validationModal";

import {getCustomerApi, addCustomerApi, updCustomerApi, deleteCustomerApi} from "../../api/customerApi";
import {TextModalField} from "../../components/ModalFields/TextModalField";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import ConfirmDelete from "../../components/ConfirmDelete";

const CustomersPage = () => {

    const query = useQuery();

    const head = useHead();

    // const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);

    const [total, setTotal] = useState(0);
    const [page, setPage] = useState((query.get("page") ? parseInt(query.get("page")) : false) || 1);

    const [rowsPerPage, setRowsPerPage] = useState(30);

    const [dataFetched, setDataFetched] = useState(true);

    const [loading, setLoading] = useState(false);
    const [loadingConfirm, setLoadingConfirm] = useState(false);

    const [confirmDelete, setConfirmDelete] = useState(false);

    const [filter, setFilter] = useState({
        search: query.get("search") || '',
    });

    const [openBackdrop, setOpenBackdrop] = useState(false)
    const [openModal, setOpenModal] = useState(false);
    // const [productId, setProductId] = useState(null);
    const [customerId, setCustomerId] = useState(null);

    const navigate = useNavigate();

    // const {control} = useForm();

    // const handleRequestSort = (event, property) => {
    //     const isAsc = orderBy === property && order === 'asc';
    //     setOrder(isAsc ? 'desc' : 'asc');
    //     setOrderBy(property);
    // };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(1);
    // };


    const updateSingleCustomer = ({id, customer_fname, customer_lname, created_at, updated_at}) => {
        const customersNew = customers.map(currentItem => {
            return currentItem.id === id ? {
                id, customer_fname, customer_lname, created_at, updated_at
            } : currentItem;
        })

        setCustomers(customersNew);
        setOpenModal(false);
        setCustomerId(null);
    }

    const insertSingleCustomer = ({id, customer_fname, customer_lname, created_at, updated_at}) => {
        setCustomers([
            {id, customer_fname, customer_lname, created_at, updated_at},
            ...customers
        ]);
        setOpenModal(false);
        setCustomerId(null);
    }

    const deleteSingleCustomer = (id) => {
        setCustomers(customers.filter(item => item.id !== id));
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

        getCustomersApi({page: page, rowsPerPage, ...filter}).then(({data: customersData, total}) => {
            setCustomers(customersData);
            setTotal(total);

        }).finally(() => {
            setDataFetched(false);
            setLoading(false);
        });

    }, [page, rowsPerPage, filter]);

    const openCustomer = (e, id) => {
        e.preventDefault();
        setCustomerId(id);
        setOpenBackdrop(true);
    }

    const handleCloseModal = () => {
        setCustomerId(null);
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

        deleteCustomerApi(id)
            .then((data) => {
                deleteSingleCustomer(id);
            })
            .catch((error) => {
                console.log(error);
            }).finally(() => {
            setLoadingConfirm(false);
            setConfirmDelete(false);
        });

        // alert(id);

        // setConfirmDelete(true);
        // alert(id);
    }

    return (
        <Content title="Customers" titlePage="Customers">

            <FilterLayout setPage={page => setPage(page + 1)} filter={filter} setFilter={setFilter} loading={loading}
                          setLoading={setLoading} resetFields={{search: ''}}>
                <SearchFilterField defaultValue={filter.search}/>
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
                                    {['First name', 'Last name', 'Created', 'Updated'].map((headCell) => (
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
                                            colSpan={4}
                                            sx={{textAlign: 'center'}}
                                        >
                                            <CircularProgress/>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    <React.Fragment>
                                        {customers.map(({
                                                            id,
                                                            customer_fname,
                                                            customer_lname,
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
                                                                                             onClick={(e) => openCustomer(e, id)}>{customer_fname}</a></TableCell>
                                                    <TableCell>{customer_lname}</TableCell>
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
                        title="customer"
                        id={customerId}
                        isLoadSingle={isLoadSingle}
                        openModal={openModal}
                        handleCloseModal={handleCloseModal}
                        updateSingle={updateSingleCustomer}
                        insertSingle={insertSingleCustomer}
                        getApi={getCustomerApi}
                        addApi={addCustomerApi}
                        updApi={updCustomerApi}
                        validationSchema={validationSchemaModal}
                    >
                        <TextModalField
                            name="customer_fname"
                            label="First name"
                        />
                        <TextModalField
                            name="customer_lname"
                            label="Last name"
                        />
                    </ModalData>
                </React.Fragment>
            )}

            <ConfirmDelete confirmDelete={confirmDelete} setConfirmDelete={setConfirmDelete} loading={loadingConfirm} handleDelete={handleDelete} />

        </Content>
    );


}

export default CustomersPage;
