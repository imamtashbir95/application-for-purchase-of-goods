import React, { useState, useEffect } from 'react';
import api from '../services/api';

import { styled } from '@mui/system';
import {
    TablePagination,
    tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

const Officer = () => {
    const [requests, setRequests] = useState([]);
    const [item_name, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [quantityRaw, setQuantityRaw] = useState('');
    const [price, setPrice] = useState('');
    const [priceRaw, setPriceRaw] = useState('');
    const [username, setUsername] = useState('');
    const [errors, setErrors] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Hindari lompatan tata letak saat mencapai halaman terakhir dengan baris kosong.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - requests.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // const handleSearch = async (event) => {
    //     // Lengkapi kode di blok ini
    // }

    const handleAddRequest = async (event) => {
        event.preventDefault();
        const validationErrors = validateInputs();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            const response = await api.post('/purchase-requests', { item_name, quantity: quantityRaw, price: priceRaw });
            setRequests([...requests, response.data]);
            resetForm();
            fetchRequests();
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateRequest = async (event) => {
        event.preventDefault();
        const validationErrors = validateInputs();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            const response = await api.put(`/purchase-requests/${editId}`, { item_name, quantity: quantityRaw, price: priceRaw });
            setRequests(requests.map(request => (request.id === editId ? response.data : request)));
            resetForm();
            setIsEditing(false);
            fetchRequests();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditClick = (request) => {
        setItemName(request.item_name);
        setQuantity(request.quantity);
        setQuantityRaw(request.quantity);
        setPrice(request.price);
        setPriceRaw(request.price);
        setEditId(request.id);
        setIsEditing(true);
    };

    const handleDeleteRequest = async (purchase_request) => {
        try {
            await api.delete(`/purchase-requests/${purchase_request}`);
            setRequests(requests.filter((request) => request.id !== purchase_request));
            fetchRequests();
        } catch (error) {
            console.error(error);
        }
    };

    const validateInputs = () => {
        const errors = {};
        if (!item_name) errors.item_name = "Masukkan nama barang";
        if (!quantityRaw) errors.quantity = "Masukkan jumlah";
        if (!priceRaw) errors.price = "Masukkan harga";
        return errors;
    };

    const handleLogout = async (event) => {
        event.preventDefault();
        try {
            await api.post('/logout');
            localStorage.removeItem('token');
            window.location.href = '/';
        } catch (error) {
            console.error(error);
        }
    };

    const addDots = (num) =>
        num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

    const handleQuantityChange = (event) => {
        const rawValue = removeNonNumeric(event.target.value);
        setQuantityRaw(rawValue);
        setQuantity(addDots(rawValue));
    };

    const handlePriceChange = (event) => {
        const rawValue = removeNonNumeric(event.target.value);
        setPriceRaw(rawValue);
        setPrice(addDots(rawValue));
    };

    const formatNumber = (num) => {
        if (num) {
            num = parseFloat(num).toFixed(2);
            return num.replace(/\.00$/, '').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
        return '';
    };

    const resetForm = () => {
        setItemName('');
        setQuantity('');
        setQuantityRaw('');
        setPrice('');
        setPriceRaw('');
        setErrors({});
    };

    const fetchRequests = async () => {
        try {
            const response = await api.get('/purchase-requests' ,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setRequests(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchRequests();
        const fetchUsername = async () => {
            try {
                const response = await api.get('/user', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setUsername(response.data.username);
                console.log(response.data);
                console.log(response.data.username);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsername();
    }, []);

    return (
        <div style={{ backgroundColor: '#F8F9FA' }}>
            <div className="navbar sticky-top shadow-sm"
                style={{
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    maxWidth: 'max',
                    width: '100%',
                    padding: '20px',
                    top: 0,
                    right: 0,
                    left: 0
                }}>
                <h3 style={{ margin: 0 }}>Selamat Datang, {username}</h3>
                <button type="button" className="btn btn-danger" onClick={handleLogout}>Keluar</button>
            </div>
            <div style={{
                backgroundColor: '#FFFFFF',
                maxWidth: '400px',
                width: '100%',
                padding: '20px',
                margin: '20px auto 20px auto',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
            }}>
                <h2>{isEditing ? "Pembaruan Pengajuan" : "Pengajuan Pembelian Barang"}</h2>
                <hr />
                <form onSubmit={isEditing ? handleUpdateRequest : handleAddRequest}>
                    <div className="mb-3">
                        <label htmlFor="item_name">Nama Barang</label><br />
                        <input
                            type="text"
                            id="item_name"
                            className="form-control"
                            value={item_name}
                            onChange={(event) => setItemName(event.target.value)}
                        />
                        {errors.item_name && <div className="text-danger">{errors.item_name}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="quantity">Jumlah</label><br />
                        <input
                            type="text"
                            id="quantity"
                            className="form-control"
                            value={quantity}
                            onChange={handleQuantityChange}
                        />
                        {errors.quantity && <div className="text-danger">{errors.quantity}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price">Harga</label><br />
                        <input
                            type="text"
                            id="price"
                            className="form-control"
                            value={price}
                            onChange={handlePriceChange}
                        />
                        {errors.price && <div className="text-danger">{errors.price}</div>}
                    </div>
                    {isEditing ? (
                        <>
                            <button type="button" className="btn btn-secondary" onClick={() => { resetForm(); setIsEditing(false); }}>Balik</button>
                            <button type="submit" className="btn btn-primary ms-2">Perbarui</button>
                        </>
                    ) : (
                        <button type="submit" className="btn btn-success">Ajukan</button>
                    )}
                </form>
            </div>

            <div style={{ padding: '20px' }}>
                <h2>Daftar Pengajuan</h2>
                <hr />
                <div className="mb-3" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    maxWidth: '400px',
                    width: '100%',
                    top: 0,
                    right: 0,
                    left: 0
                }}>
                    <input
                        type="text"
                        id="item_name"
                        className="form-control"
                        placeholder="Cari..."
                        // onKeyUp={(event) => handleSearch(event.target.value)}
                    />
                </div>
                <table aria-label="custom pagination table" className="table table-striped table-hover" border="1">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th>Nama Barang</th>
                            <th>Jumlah</th>
                            <th>Harga</th>
                            <th>Status</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(rowsPerPage > 0
                            ? requests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : requests
                        ).map(request => (
                            <tr key={request.id}>
                                <th scope="row">{request.id}</th>
                                <td>{request.item_name}</td>
                                <td>{formatNumber(request.quantity)}</td>
                                <td>Rp{formatNumber(request.price)}</td>
                                <td>{request.status}</td>
                                <td>
                                    {(request.status === 'Pending' || request.status === null) && (
                                        <>
                                            <button className="btn btn-warning me-2" onClick={() => handleEditClick(request)}>Perbarui</button>
                                            <button className="btn btn-danger" onClick={() => handleDeleteRequest(request.id)}>Hapus</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}

                        {emptyRows > 0 && (
                            <tr style={{ height: 53 * emptyRows }}>
                                <td colSpan={6} aria-hidden />
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <CustomTablePagination
                                labelRowsPerPage="Baris per halaman:"
                                labelDisplayedRows={({ from, to, count }) => `${from}–${to} dari ${count}`}
                                rowsPerPageOptions={[5, 10, 25, { label: 'Semua', value: -1 }]}
                                colSpan={100}
                                count={requests.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                slotProps={{
                                    select: {
                                        'aria-label': 'baris per halaman',
                                    },
                                    actions: {
                                        showFirstButton: true,
                                        showLastButton: true,
                                        slots: {
                                            firstPageIcon: FirstPageRoundedIcon,
                                            lastPageIcon: LastPageRoundedIcon,
                                            nextPageIcon: ChevronRightRoundedIcon,
                                            backPageIcon: ChevronLeftRoundedIcon,
                                        },
                                    },
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default Officer;

const CustomTablePagination = styled(TablePagination)(
    ({ theme }) => `
    & .${classes.spacer} {
        display: none;
    }

    & .${classes.toolbar} {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        padding: 4px 0;

        @media (min-width: 768px) {
            flex-direction: row;
            align-items: center;
        }
    }

    & .${classes.selectLabel} {
        margin: 0;
    }

    & .${classes.displayedRows} {
        margin: 0;

        @media (min-width: 768px) {
            margin-left: auto;
        }
    }

    & .${classes.actions} {
        display: flex;
        gap: 6px;
        border: transparent;
        text-align: center;
    }

    & .${classes.actions} > button {
        display: flex;
        align-items: center;
        padding: 0,
        border: transparent;
        background-color: transparent;
    }
`);
