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

import {getProductsApi, addProductApi, deleteProductApi, getProductApi, updProductApi} from "../../api/productApi";

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

const ProductsPage = () => {

    const query = useQuery();

    const head = useHead();

    const [products, setProducts] = useState([]);

    const [order, setOrder] = useState(query.get("order") || '');
    const [orderBy, setOrderBy] = useState(query.get("orderBy") || '');

    const [total, setTotal] = useState(0);
    const [page, setPage] = useState((query.get("page") ? parseInt(query.get("page")) - 1 : false) || 0);
    const [rowsPerPage, setRowsPerPage] = useState(30);
    const [dataFetched, setDataFetched] = useState(true);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState({
        search: query.get("search") || '',
        category_id: query.get("category_id") || '',
        manufacturer_id: query.get("manufacturer_id") || ''
    });

    const [openBackdrop, setOpenBackdrop] = useState(false)
    const [openModal, setOpenModal] = useState(false);
    const [productId, setProductId] = useState(null);

    const [loadingConfirm, setLoadingConfirm] = useState(false);
    
    const navigate = useNavigate();

    const [confirmDelete, setConfirmDelete] = useState(false);
    
    // const {control} = useForm();

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const deleteSingleProduct = (id) => {
        setProducts(products.filter(item => item.id !== id));
    }
    
    const handleDelete = (id) => {

        setLoadingConfirm(true);

        deleteProductApi(id)
            .then((data) => {
                deleteSingleProduct(id);
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
    
    const updateSingleProduct = ({id, category_name, image, manufacturer_name, price, product_name, updated_at}) => {
        const productsNew = products.map(currentItem => {
            return currentItem.id === id ? {
                id, category_name, image, manufacturer_name, price, product_name, updated_at
            } : currentItem;
        })

        setProducts(productsNew);
        setOpenModal(false);
        setProductId(null);
    }

    const insertSingleProduct = ({id, category_name, image, manufacturer_name, price, product_name, updated_at}) => {
        setProducts([
            {id, category_name, image, manufacturer_name, price, product_name, updated_at},
            ...products
        ]);
        setOpenModal(false);
        setProductId(null);
    }

    useEffect(() => {
        setDataFetched(true);

        let params = Object.fromEntries(Object.entries({
            page: page + 1,
            order,
            orderBy,
            rowsPerPage, ...filter
        }).filter(([key, value]) => value !== '' && key !== 'rowsPerPage' && !(key === 'page' && value === 1)));

        navigate({
            search: createSearchParams(params).toString()
        });

        getProductsApi({page: page + 1, order, orderBy, rowsPerPage, ...filter}).then(({data: productsData, total}) => {
            setProducts(productsData);
            setTotal(total);

        }).finally(() => {
            setDataFetched(false);
            setLoading(false);
        });

    }, [order, orderBy, page, rowsPerPage, filter]);

    const openProduct = (e, id) => {
        e.preventDefault();
        setProductId(id);
        setOpenBackdrop(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
        setProductId(null);
    };

    const isLoadSingle = () => {
        setOpenModal(true);
        setOpenBackdrop(false);
    }

    return (
        <Content title="Products" titlePage="Products">
            <FilterLayout setPage={setPage} filter={filter} setFilter={setFilter} loading={loading}
                          setLoading={setLoading} resetFields={{search: '', category_id: '', manufacturer_id: ''}}>
                <SearchFilterField defaultValue={filter.search}/>
                <CategoryFilterSelect defaultValue={filter.category_id}/>
                <ManufacturerFilterSelect defaultValue={filter.manufacturer_id}/>
            </FilterLayout>


            <Box sx={{width: '100%'}}>
                <Paper sx={{width: '100%', mb: 2}}>
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
                            <TableHeadSort
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                rowCount={dataFetched.length}
                                headCells={[
                                    {id: 'product_name', label: 'Name',},
                                    {id: 'category_name', label: 'Category',},
                                    {id: 'manufacturer_name', label: 'Manufacturer',},
                                    {id: 'price', label: 'Price',},
                                    {id: 'image', label: 'Image',},
                                    {id: 'updated_at', label: 'Updated'},
                                    {id: 'delete'}
                                ]}
                            />
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
                                        {products.map(({
                                                           id,
                                                           product_name,
                                                           price,
                                                           category_name,
                                                           image,
                                                           updated_at,
                                                           manufacturer_name
                                                       }, index) => {
                                            return (
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    tabIndex={-1}
                                                    key={id}
                                                >
                                                    <TableCell component="th" scope="row"><a href="#"
                                                                                             onClick={(e) => openProduct(e, id)}>{product_name}</a></TableCell>
                                                    <TableCell>{category_name}</TableCell>
                                                    <TableCell>{manufacturer_name}</TableCell>
                                                    <TableCell>{price}</TableCell>
                                                    <TableCell><Avatar src={image}/></TableCell>
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

                    <TablePagination
                        rowsPerPageOptions={[30, 50, 100]}
                        component="div"
                        count={total}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
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
                        title="product"
                        id={productId}
                        isLoadSingle={isLoadSingle}
                        openModal={openModal}
                        handleCloseModal={handleCloseModal}
                        updateSingle={updateSingleProduct}
                        insertSingle={insertSingleProduct}
                        getApi={getProductApi}
                        addApi={addProductApi}
                        updApi={updProductApi}
                        validationSchema={validationSchemaModal}
                    >
                        <TextModalField name="product_name" />
                        <FileImageModalField name="image" />
                        <TextModalField name="price" />
                        <CategoryModalSelect name="category_id" />
                        <ManufacturerModalSelect name="manufacturer_id" />
                    </ModalData>
                </React.Fragment>
            )}

            <ConfirmDelete confirmDelete={confirmDelete} setConfirmDelete={setConfirmDelete} loading={loadingConfirm}
                           handleDelete={handleDelete}/>
        </Content>
    );
}

export default ProductsPage;