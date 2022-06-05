import React, {useEffect, useState} from "react";

import Paper from "@mui/material/Paper";
import {Content} from "../../components/Content";
import Box from "@mui/material/Box";
import {
    Backdrop,
    CircularProgress, Tooltip,
} from "@mui/material";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import {createSearchParams, useNavigate} from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import {getUsersApi, addUserApi, deleteUserApi, getUserApi, updUserApi} from "../../api/userApi";

import Avatar from "@mui/material/Avatar";

import {useQuery} from "../../hooks/useQuery/useQuery";
import {FilterLayout} from "../../components/Filter/FilterLayout";
import {ManufacturerFilterSelect} from "../../components/Filter/ManufacturerFilterSelect";
import {SearchFilterField} from "../../components/Filter/SearchFilterField";
import {CategoryFilterSelect} from "../../components/Filter/CategoryFilterSelect";

import useHead from "../../hooks/useHead";
import {TableHeadSort} from "../../components/Table/TableHeadSort";
import Button from "@mui/material/Button";
// import {ProductModal} from "../../components/ProductModal/ProductModal";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import ConfirmDelete from "../../components/ConfirmDelete";
import {addDeliveryApi, getDeliveryApi, updDeliveryApi} from "../../api/deliveriesApi";
import validationSchemaModal from "./validationModal";
import {ProductModalSelect} from "../../components/ModalFields/ProductModalSelect";
import {StoreModalSelect} from "../../components/ModalFields/StoreModalSelect";
import {DateModalField} from "../../components/ModalFields/DateModalField";
import {NumberModalField} from "../../components/ModalFields/NumberModalField";
import ModalData from "../../components/ModalData";
import {TextModalField} from "../../components/ModalFields/TextModalField";
import {FileImageModalField} from "../../components/ModalFields/FileImageModalField";
import {CategoryModalSelect} from "../../components/ModalFields/CategoryModalSelect";
import {ManufacturerModalSelect} from "../../components/ModalFields/ManufacturerModalSelect";
import TableHead from "@mui/material/TableHead";
import {RoleModalSelect} from "../../components/ModalFields/RoleModalSelect";
import {RoleFilterSelect} from "../../components/Filter/RoleFilterSelect";

const UsersPage = () => {

    const query = useQuery();

    const head = useHead();

    const [users, setUsers] = useState([]);

    // const [order, setOrder] = useState(query.get("order") || '');
    // const [orderBy, setOrderBy] = useState(query.get("orderBy") || '');

    const [total, setTotal] = useState(0);
    const [page, setPage] = useState((query.get("page") ? parseInt(query.get("page")) : false) || 1);

    const [rowsPerPage, setRowsPerPage] = useState(30);
    const [dataFetched, setDataFetched] = useState(true);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState({
        search: query.get("search") || '',
        role: query.get("role") || ''
    });

    const [openBackdrop, setOpenBackdrop] = useState(false)
    const [openModal, setOpenModal] = useState(false);
    const [userId, setUserId] = useState(null);

    const [loadingConfirm, setLoadingConfirm] = useState(false);

    const navigate = useNavigate();

    const [confirmDelete, setConfirmDelete] = useState(false);

    // const {control} = useForm();

    // const handleRequestSort = (event, property) => {
    //     const isAsc = orderBy === property && order === 'asc';
    //     setOrder(isAsc ? 'desc' : 'asc');
    //     setOrderBy(property);
    // };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const deleteSingleUser = (id) => {
        setUsers(users.filter(item => item.id !== id));
    }

    const handleDelete = (id) => {

        setLoadingConfirm(true);

        deleteUserApi(id)
            .then((data) => {
                deleteSingleUser(id);
            })
            .catch((error) => {
                console.log(error);
            }).finally(() => {
            setLoadingConfirm(false);
            setConfirmDelete(false);
        });
    }

    const handleConfirmDelete = (id) => {
        setConfirmDelete(id);
    }

    const updateSingleUser = ({id, name, avatar, email, role, role_name, created_at, updated_at}) => {
        const usersNew = users.map(currentItem => {
            return currentItem.id === id ? {
                id, name, avatar, email, role, role_name, created_at, updated_at
            } : currentItem;
        })

        setUsers(usersNew);
        setOpenModal(false);
        setUserId(null);
    }

    const insertSingleUser = ({id, name, avatar, email, role, role_name, created_at, updated_at}) => {
        setUsers([
            {id, name, avatar, email, role, role_name, created_at, updated_at},
            ...users
        ]);
        setOpenModal(false);
        setUserId(null);
    }

    useEffect(() => {
        setDataFetched(true);

        let params = Object.fromEntries(Object.entries({
            page: page,
            rowsPerPage, ...filter
        }).filter(([key, value]) => value !== '' && key !== 'rowsPerPage' && !(key === 'page' && value === 1)));

        navigate({
            search: createSearchParams(params).toString()
        });

        getUsersApi({page: page, rowsPerPage, ...filter}).then(({data: usersData, total}) => {
            setUsers(usersData);
            setTotal(total);

        }).finally(() => {
            setDataFetched(false);
            setLoading(false);
        });

    }, [page, rowsPerPage, filter]);

    const openUser = (e, id) => {
        e.preventDefault();
        setUserId(id);
        setOpenBackdrop(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
        setUserId(null);
    };

    const isLoadSingle = () => {
        setOpenModal(true);
        setOpenBackdrop(false);
    }

    return (
        <Content title="Users" titlePage="Users">
            <FilterLayout setPage={page => setPage(page + 1)} filter={filter} setFilter={setFilter} loading={loading}
                          setLoading={setLoading} resetFields={{search: '', role: ''}}>
                <SearchFilterField defaultValue={filter.search}/>
                <RoleFilterSelect defaultValue={filter.role}/>
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
                                    {['Name', 'E-mail ', 'Avatar', 'Role', 'Created', 'Updated'].map((headCell) => (
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
                                        {users.map(({
                                                        id,
                                                        name,
                                                        email,
                                                        avatar,
                                                        role,
                                                        role_name,
                                                        created_at,
                                                        updated_at
                                                    }, index) => {
                                            return (
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    tabIndex={-1}
                                                    key={id}
                                                >
                                                    <TableCell component="th" scope="row"><a href="#"
                                                                                             onClick={(e) => openUser(e, id)}>{name}</a></TableCell>
                                                    <TableCell>{email}</TableCell>
                                                    <TableCell><Avatar src={avatar}/></TableCell>
                                                    <TableCell>{role_name}</TableCell>
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
                        title="user"
                        id={userId}
                        isLoadSingle={isLoadSingle}
                        openModal={openModal}
                        handleCloseModal={handleCloseModal}
                        updateSingle={updateSingleUser}
                        insertSingle={insertSingleUser}
                        getApi={getUserApi}
                        addApi={addUserApi}
                        updApi={updUserApi}
                        validationSchema={validationSchemaModal}
                    >
                        <TextModalField name="name" label="Name" />
                        <TextModalField name="email" label="E-mail"/>
                        <FileImageModalField name="avatar"/>
                        <RoleModalSelect name="role"/>
                        <TextModalField name="password" label="Password" type="password"/>
                    </ModalData>
                </React.Fragment>
            )}

            <ConfirmDelete confirmDelete={confirmDelete} setConfirmDelete={setConfirmDelete} loading={loadingConfirm}
                           handleDelete={handleDelete}/>
        </Content>
    );
}

export default UsersPage;