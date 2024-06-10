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

const Finance = () => {
    const [requests, setRequests] = useState([]);
    const [proof, setProof] = useState(null);
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');  // State untuk menyimpan pesan error

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Hindari lompatan tata letak saat mencapai halaman terakhir dengan baris kosong.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - requests.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const fetchRequests = async () => {
        const response = await api.get('/purchase-requests', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        setRequests(response.data);
    };

    const handleApprove = async (id) => {
        try {
            await api.post(`/purchase-requests/${id}/approve`);
            fetchRequests();
        } catch (error) {
            console.error(error);
        }
    };

    const handleReject = async (id, comment) => {
        try {
            await api.post(`/purchase-requests/${id}/reject-finance`, { comment });
            fetchRequests();
        } catch (error) {
            console.error(error);
        }
    };

    const handleUploadProof = async (id) => {
        if (!proof) {  // Cek apakah file sudah diunggah
            setError('Unggah file terlebih dahulu');
            return;
        }
        const formData = new FormData();
        formData.append('transfer_proof', proof);

        try {
            await api.post(`/purchase-requests/${id}/upload-proof`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchRequests();
            setError('');  // Reset pesan error setelah upload berhasil
        } catch (error) {
            console.error(error);
        }
    }

    const handleLogout = async (event) => {
        event.preventDefault();
        try {
            await api.post('/logout');
            localStorage.removeItem('token');
            window.location.href = '/';
        } catch (error) {
            console.error(error);
        }
    }

    const formatNumber = (num) => {
        if (num) {
            num = parseFloat(num).toFixed(2);
            return num.replace(/\.00$/, '').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
        return '';
    }

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
                console.log(response.data.username);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsername();
    }, []);

    return (
        <div style={{
            backgroundColor: '#F8F9FA'
        }}>
                        <div className="navbar sticky-top shadow-sm"
            style={{
                backgroundColor: '#FFFFFF',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                maxWidth: 'max',
                width: '100%',
                padding: '20px',
                // position:'absolute',
                top: 0,
                right: 0,
                left: 0
            }}>
                <h3 style={{
                    margin: 0
                }}>Selamat Datang, {username
                }</h3>
                <button type="button" className="btn btn-danger" onClick={handleLogout}>Keluar</button>
            </div>
            <div style={{
                padding: '20px'
            }}>
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
                <table className="table table-striped table-hover" border="1">
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
                                    {request.status === 'Approved by Manager' && (
                                        <>
                                            {/* <button className="btn btn-primary me-2 mb-2" onClick={() => handleApprove(request.id)}>Approve</button> */}
                                            {/* <button className="btn btn-secondary me-2 mb-2 " onClick={() => handleReject(request.id, 'Menolak')}>Reject</button> */}
                                            <input className="form-control me-2 mb-2" type="file" onChange={(event) => {
                                                setProof(event.target.files[0]);
                                                setError(''); // Reset error saat memilih file baru
                                            }} />
                                            <button className="btn btn-info" onClick={() => handleUploadProof(request.id)}>Unggah Bukti Transfer</button>
                                            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Tampilkan pesan error */}
                                            <button className="btn btn-secondary" onClick={() => handleReject(request.id, 'Menolak')}>Reject</button>
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

export default Finance;

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