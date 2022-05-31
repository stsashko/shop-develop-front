import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Content} from "../../components/Content";
import {useQuery} from "../../hooks/useQuery/useQuery";
import useHead from "../../hooks/useHead";
import {createSearchParams, useNavigate} from "react-router-dom";

import {FilterLayout} from "../../components/Filter/FilterLayout";
import {SearchFilterField} from "../../components/Filter/SearchFilterField";
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
import {TextModalField} from "../../components/ModalFields/TextModalField";
import ConfirmDelete from "../../components/ConfirmDelete";
import {
    addManufacturerApi,
    deleteManufacturerApi,
    getManufacturerApi, getManufacturersApi,
    updManufacturerApi
} from "../../api/manufacturerApi";

const ManufacturersPage = () => {

    const query = useQuery();

    const head = useHead();

    const [manufacturers, setManufacturers] = useState([]);

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
    const [manufacturerId, setManufacturerId] = useState(null);

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


    const updateSingleManufacturer = ({id, manufacturer_name, created_at, updated_at}) => {
        const manufacturersNew = manufacturers.map(currentItem => {
            return currentItem.id === id ? {
                id, manufacturer_name, created_at, updated_at
            } : currentItem;
        })

        setManufacturers(manufacturersNew);
        setOpenModal(false);
        setManufacturerId(null);
    }

    const insertSingleManufacturer = ({id, manufacturer_name, created_at, updated_at}) => {
        setManufacturers([
            {id, manufacturer_name, created_at, updated_at},
            ...manufacturers
        ]);
        setOpenModal(false);
        setManufacturerId(null);
    }

    const deleteSingleManufacturer = (id) => {
        setManufacturers(manufacturers.filter(item => item.id !== id));
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

        getManufacturersApi({page: page, rowsPerPage, ...filter}).then(({data: manufacturersData, total}) => {
            setManufacturers(manufacturersData);
            setTotal(total);

        }).finally(() => {
            setDataFetched(false);
            setLoading(false);
        });

    }, [page, rowsPerPage, filter]);

    const openManufacturer = (e, id) => {
        e.preventDefault();
        setManufacturerId(id);
        setOpenBackdrop(true);
    }

    const handleCloseModal = () => {
        setManufacturerId(null);
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

        deleteManufacturerApi(id)
            .then((data) => {
                deleteSingleManufacturer(id);
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
        <Content title="Manufacturers" titlePage="Manufacturers">
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
                                    {['Manufacturer name', 'Created', 'Updated'].map((headCell) => (
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
                                            colSpan={6}
                                            sx={{textAlign: 'center'}}
                                        >
                                            <CircularProgress/>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    <React.Fragment>
                                        {manufacturers.map(({
                                                                id,
                                                                manufacturer_name,
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
                                                                                             onClick={(e) => openManufacturer(e, id)}>{manufacturer_name}</a></TableCell>
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
                        title="manufacturer"
                        id={manufacturerId}
                        isLoadSingle={isLoadSingle}
                        openModal={openModal}
                        handleCloseModal={handleCloseModal}
                        updateSingle={updateSingleManufacturer}
                        insertSingle={insertSingleManufacturer}
                        getApi={getManufacturerApi}
                        addApi={addManufacturerApi}
                        updApi={updManufacturerApi}
                        validationSchema={validationSchemaModal}
                    >
                        <TextModalField
                            name="manufacturer_name"
                            label="Manufacturer name"
                        />
                    </ModalData>
                </React.Fragment>
            )}

            <ConfirmDelete confirmDelete={confirmDelete} setConfirmDelete={setConfirmDelete} loading={loadingConfirm}
                           handleDelete={handleDelete}/>
        </Content>
    );
}

export default ManufacturersPage;
