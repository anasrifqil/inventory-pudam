
import React, { useEffect, useRef, useState } from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { parseISO, format } from 'date-fns';
import ReactPaginate from 'react-paginate';


export default function Laporan() {
    const tableRef = useRef(null);

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Data BON Barang Yang Sudah Terselesaikan',
        sheet: 'Laporan Peminjaman'
    })

    const [laporan, setLaporan] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(8);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        getLaporan();
    }, [page, keyword]);

    const getLaporan = async () => {
        const response = await axios.get(
            `http://localhost:5000/laporan?search_query=${keyword}&page=${page}&limit=${limit}`
        );
        setLaporan(response.data.result);
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
    const formatDate = (dateString) => {
        // Parse tanggal dari string
        const date = parseISO(dateString);

        // Format tanggal sesuai keinginan
        const formattedDate = format(date, 'd MMMM yyyy',);

        return formattedDate;
    };

    return (
        <div className="details">
            <div className="recentOrders" id="recentOrders">
                <div className="cardHeader">
                    <h2>History BON Barang</h2>
                    <div className="search">
                            <form className='label' onSubmit={searchData}>
                                <input type="text" value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Cari.........." />
                                <ion-icon name="search-outline" />
                            </form>
                        </div>
                    <Link href="laporan" className="btn" onClick={onDownload} title="Export">
                        Export To Excel
                    </Link>
                </div>
                <table ref={tableRef}>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Tgl Pinjam</th>
                            <th>Tgl Bayar</th>
                            <th>Kode Barang</th>
                            <th>Nama Barang</th>
                            <th>Jumlah</th>
                            <th>Satuan</th>
                            <th>Peminjam</th>
                            <th>Nomer SP</th>
                            <th>Alamat</th>
                            <th>Keterangan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {laporan.map((dt, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? 'even-row' : 'odd-row'}>
                                <td>{idx + 1}</td>
                                <td>{formatDate(dt.tanggal)}</td>
                                <td>{formatDate(dt.tglPengembalian)}</td>
                                <td>{dt.kode}</td>
                                <td>{dt.nama}</td>
                                <td>{dt.jumlah}</td>
                                <td>{dt.satuan}</td>
                                <td>{dt.peminjam}</td>
                                <td>{dt.nomerSP}</td>
                                <td>{dt.alamat}</td>
                                <td>{dt.ket}</td>
                                
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

    )
}



