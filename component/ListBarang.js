import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { parseISO, format } from 'date-fns';
import ReactPaginate from 'react-paginate';
export default function ListBarang() {

    const [message, setMessage] = useState(false);
    const [showPdfViewer, setShowPdfViewer] = useState(false);
    const [pdfData, setPdfData] = useState(null);
    const router = useRouter();


    const [inventaris, setInventaris] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        getInventaris();
    }, [page, keyword]);

    const getInventaris = async () => {
        const response = await axios.get(
            `http://localhost:5000/inventaris?search_query=${keyword}&page=${page}&limit=${limit}`
        );
        setInventaris(response.data.response);
        setPage(response.data.page);
        setPages(response.data.totalPage);
        setRows(response.data.totalRows);
    };

    const changePage = ({ selected }) => {
        setPage(selected);
        if (selected === 9) {
            setMsg(
                "Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!"
            );
        } else {
            setMsg("");
        }
    };
    const searchData = (e) => {
        e.preventDefault();
        setPage(0);
        setMsg("");
        setKeyword(query);
    };
    async function HapusBarang(id, namabarang) {
        try {
            const result = await Swal.fire({
                title: 'Apakah Anda yakin?',
                text: `Anda akan menghapus barang dengan Nama ${namabarang}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya, Hapus'
            });
            try {
                if (result.isConfirmed) {
                    const response = await axios.delete(
                        `http://localhost:5000/inventaris/${id}`
                    );

                    if (response.data.message) {
                        const deletedItemName = namabarang || 'Data'; // Fallback to 'Data' if namabarang is undefined

                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Hapus Data Berhasil',
                            text: `Data Dengan Nama ${deletedItemName} Telah Berhasil Di Hapus`,
                            showConfirmButton: true,
                            timer: 3000
                        }).then(() => {
                            // Setelah animasi selesai, jalankan Router.push
                            router.push('/databarang')
                            getInventaris();
                        });
                    }
                }
            } catch (error) {
                console.error('Terjadi kesalahan saat menghapus data:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Terjadi kesalahan',
                    text: 'Terdapat kesalahan saat menghapus data.'
                });
            }
        } catch (error) {
            console.log({ message: error.message });
        }
    }
    function handleDetailButtonClick(dt) {
        router.push({
            pathname: '/pdfViewer',
            query: { pdfData: JSON.stringify(dt) },
        });
    }
    const tableRef = useRef(null);
    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Data BON Barang Yang Belum Diselesaikan',
        sheet: 'Laporan Peminjaman'
    })
    // function handleDetailButtonClick(dt) {
    //     const pdfViewerUrl = `/pdfViewer?pdfData=${encodeURIComponent(JSON.stringify(dt))}`;
    //     window.open(pdfViewerUrl, '_blank');
    // }
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            margin: 10,
            padding: 10,
        },
        title: {
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 10,
        },
    });
    const formatDate = (dateString) => {
        const date = parseISO(dateString);
        const formattedDate = format(date, 'd MMMM yyyy',);
        return formattedDate;
    };
    return (
        <>
            <div className="details">
                <div className="recentOrders" id="recentOrders">
                    <div className="cardHeader">
                        <h2 tyle={{ fontSize: '30px' }} >list BON Barang</h2>
                        <div className="search">
                            <form className='label' onSubmit={searchData}>
                                <input type="text" value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Cari.........." />
                                <ion-icon name="search-outline" />
                            </form>
                        </div>
                        <Link title='tambah barang' href="tambah" className="btn" >Tambah Barang</Link>

                    </div>
                    <table>
                        <thead>
                            <tr>
                                <td>No</td>
                                {/* <td style={{ textAlign: 'center' }}>Gambar</td> */}
                                <td style={{ textAlign: 'center' }}>Tanggal</td>
                                <td>Kode Barang</td>
                                <td>Nama Barang</td>
                                <td>Jumlah</td>
                                <td>Satuan</td>
                                <td>Peminjam</td>
                                <td>Nomer SP</td>
                                <td>Alamat</td>
                                <td colSpan={4} style={{ textAlign: 'center' }}>Aksi</td>
                            </tr>
                        </thead>

                        <tbody>
                            {inventaris.map((dt, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? 'even-row' : 'odd-row'}>
                                    <td>{idx + 1}</td>
                                    {/* <td>
                                        <img
                                            src={`http://localhost:5000/images/${dt.gambarbarang}`}
                                            alt={`Gambar ${dt.namabarang}`}
                                            style={{ width: '200px', height: '200px' }}
                                        />
                                    </td> */}
                                    <td>{formatDate(dt.tanggal)}</td>
                                    <td>{dt.kodebarang}</td>
                                    <td>{dt.namabarang}</td>
                                    <td>{dt.kuantiti}</td>
                                    <td>{dt.satuan}</td>
                                    <td>{dt.peminjam}</td>
                                    <td>{dt.NomerSP}</td>
                                    <td>{dt.alamat}</td>
                                    <td>
                                        <button className="status delivered">
                                            <Link
                                                title='EDIT'
                                                style={{ textDecoration: "none" }}
                                                href={{
                                                    pathname: '/edit',
                                                    query: {
                                                        id: dt.id,
                                                        tanggal: dt.tanggal,
                                                        kodebarang: dt.kodebarang,
                                                        namabarang: dt.namabarang,
                                                        kuantiti: dt.kuantiti,
                                                        satuan: dt.satuan,
                                                        peminjam: dt.peminjam,
                                                        NomerSP: dt.NomerSP,
                                                        alamat: dt.alamat,
                                                        keterangan: dt.keterangan,
                                                        gambarbarang: dt.gambarbarang,
                                                    }
                                                }}
                                            >
                                                <span title='EDIT' className='aksi'><ion-icon name="create-outline" /></span>
                                            </Link>
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            style={{ color: "black" }}
                                            className="status return"
                                            value={dt.namabarang}
                                            onClick={(e) => HapusBarang(dt.id, dt.namabarang)} >
                                            <span className='aksi'><ion-icon name="trash-bin-outline"></ion-icon></span>
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            style={{ color: "black" }}
                                            className="status pending"
                                            onClick={() => handleDetailButtonClick(dt)}
                                        >
                                            <span className='aksi'><ion-icon name="print-outline"></ion-icon></span>
                                        </button>
                                    </td>
                                    <td>
                                        <button className="status inProgress" style={{ textDecoration: "none" }}>
                                            <Link
                                                href={{
                                                    pathname: '/done',
                                                    query: {
                                                        id: dt.id,
                                                        tanggal: dt.tanggal,
                                                        kodebarang: dt.kodebarang,
                                                        namabarang: dt.namabarang,
                                                        kuantiti: dt.kuantiti,
                                                        satuan: dt.satuan,
                                                        peminjam: dt.peminjam,
                                                        NomerSP: dt.NomerSP,
                                                        alamat: dt.alamat,
                                                        keterangan: dt.keterangan,
                                                        gambarbarang: dt.gambarbarang
                                                    }
                                                }}
                                            >
                                                <span style={{ textDecoration: "none", color: "black" }}><ion-icon name="checkmark-done-outline"></ion-icon></span>
                                            </Link>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className='ket-pagenation'>
                        Jumlah Data: {rows} Halaman Ke: {rows ? page + 1 : 0} Dari {pages} Halaman
                    </p>
                    <p className="has-text-centered has-text-danger">{msg}</p>
                    <nav
                        className="pagination is-centered"
                        key={rows}
                        role="navigation"
                        aria-label="pagination"
                    >
                        <ReactPaginate
                            previousLabel={"< Prev"}
                            nextLabel={"Next >"}
                            pageCount={Math.min(10, pages)}
                            onPageChange={changePage}
                            containerClassName={"pagination-list"}
                            pageLinkClassName={"pagination-link"}
                            previousLinkClassName={"pagination-previous"}
                            nextLinkClassName={"pagination-next"}
                            activeLinkClassName={"pagination-link is-current"}
                            disabledLinkClassName={"pagination-link is-disabled"}
                        />
                    </nav>
                </div>
            </div>
        </>
    );
}

