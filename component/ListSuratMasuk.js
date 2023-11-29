import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { parseISO, format } from 'date-fns';
import ReactPaginate from 'react-paginate';

export default function ListSuratMasuk({ data }) {
    const [message, setMessage] = useState(false);
    const router = useRouter();

    const [masuk, setMasuk] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        getMasuk();
    }, [page, keyword]);

    const getMasuk = async () => {
        const response = await axios.get(
            `http://localhost:5000/masuk?search_query=${keyword}&page=${page}&limit=${limit}`
        );
        setMasuk(response.data.result);
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


    async function HapusMasuk(id, perihal) {
        try {
            const konfirmasi = await Swal.fire({
                title: 'Konfirmasi',
                text: 'Apakah Anda yakin ingin menghapus data Surat Masuk?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya, Hapus'
            });

            if (konfirmasi.isConfirmed) {
                const response = await axios.delete(
                    `http://localhost:5000/masuk/${id}`
                );

                if (response.data.message) {
                    setMessage(response.data.message);
                }

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Hapus Data Berhasil',
                    text: `Data Surat masuk Dengan Perihal ${perihal} Telah Berhasil Di Hapus`,
                    showConfirmButton: false,
                    timer: 1000
                });

                router.push('/suratmasuk');
                getMasuk()
            }
        } catch (error) {
            console.log({ message: error.message });
        }
    }



    const formatDate = (dateString) => {
        // Parse tanggal dari string
        const date = parseISO(dateString);

        // Format tanggal sesuai keinginan
        const formattedDate = format(date, 'd MMMM yyyy',);

        return formattedDate;
    };

    function handleDetailButtonClick(dt) {
        router.push({
            pathname: '/detailmasuk',
            query: { data: JSON.stringify(dt) },
        });
    }

    return (
        <>
            <div className="details">
                <div className="recentOrders" id="recentOrders">
                    <div className="cardHeader">
                        <h2 tyle={{ fontSize: '30px' }} >list Surat Masuk</h2>
                        <div className="search">
                            <form className='label' onSubmit={searchData}>
                                <input type="text"  value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Cari............" />
                                <ion-icon name="search-outline" />
                            </form>
                        </div>
                        <Link title='tambah Surat Masuk' href="tambahsuratmasuk" className="btn" >Tambah Surat Baru</Link>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <td>No</td>
                                <td>Tanggal Surat</td>
                                <td>Nomer Surat</td>
                                <td>Pengirim</td>
                                <td>Perihal</td>
                                <td>Tanggal Terima</td>
                                <td colSpan={2} style={{ textAlign: 'center' }}>Aksi</td>
                            </tr>
                        </thead>

                        <tbody>
                            {masuk.map((dt, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? 'even-row' : 'odd-row'}>
                                    <td>{idx + 1}</td>
                                    <td>{formatDate(dt.tanggalSurat)}</td>
                                    <td>{dt.noSurat}</td>
                                    <td>{dt.dari}</td>
                                    <td>{dt.perihal}</td>
                                    <td>{formatDate(dt.terimaTgl)}</td>
                                    <td>
                                        <button className="status delivered">
                                            <Link
                                            title='EDIT'
                                            style={{ textDecoration: "none", }}
                                                href={{
                                                    pathname: '/editmasuk',
                                                    query: {
                                                        id: dt.id,
                                                        tanggalSurat: dt.tanggalSurat,
                                                        noSurat: dt.noSurat,
                                                        dari: dt.dari,
                                                        perihal: dt.perihal,
                                                        terimaTgl: dt.terimaTgl,
                                                        gambarMasuk: dt.gambarMasuk
                                                    }
                                                }}
                                            >
                                                <span title='EDIT' className='aksi'><i aria-label="EDIT"><ion-icon name="create-outline"/></i></span>
                                            </Link>
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            style={{ color: "black" }}
                                            className="status pending"
                                            onClick={() => handleDetailButtonClick(dt)}
                                        >
                                            <span className='aksi'><ion-icon name="alert-circle-outline"></ion-icon></span>
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            style={{ color: "black" }}
                                            className="status return"
                                            value={dt.perihal}
                                            onClick={(e) => HapusMasuk(dt.id, dt.perihal)} ><span className='aksi'><ion-icon name="trash-bin-outline"></ion-icon></span></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <br></br>
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

