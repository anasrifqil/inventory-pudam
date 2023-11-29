import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { StyleSheet } from '@react-pdf/renderer';
import { parseISO, format } from 'date-fns';
import ReactPaginate from 'react-paginate';


export default function ListAset({ data }) {
    const [message, setMessage] = useState(false);
    const router = useRouter();

    const [aset, setAset] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        getAset();
    }, [page, keyword]);

    const getAset = async () => {
        const response = await axios.get(
            `http://localhost:5000/aset?search_query=${keyword}&page=${page}&limit=${limit}`
        );
        setAset(response.data.result);
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


    async function HapusAset(id, namaBarang) {
        try {
            const result = await Swal.fire({
                title: 'Apakah Anda yakin?',
                text: `Anda akan menghapus Aset dengan Nama ${namaBarang}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya, Hapus'
            });
    
            if (result.isConfirmed) {
                const response = await axios.delete(
                    `http://localhost:5000/aset/${id}`
                );
    
                if (response.data.message) {
                    setMessage(response.data.message);
                }
    
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Hapus Data Berhasil',
                    text: `Aset Dengan Nama ${namaBarang} Telah Berhasil Di Hapus`,
                    showConfirmButton: false,
                    timer: 3000
                });
                
                router.push('/dataaset');
                getAset();
            }
        } catch (error) {
            console.log({ message: error.message });
        }
    }
    
    function formatRupiah(number) {
        const formatter = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        });
        
        return formatter.format(number);
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
            pathname: '/detailaset',
            query: { data: JSON.stringify(dt) },
        });
    }


    return (
        <>
        <div className="details">
                <div className="recentOrders" id="recentOrders">
                    <div className="cardHeader">
                        <h2 tyle={{ fontSize: '30px' }} >Daftar ASET</h2>
                        <div className="search">
                            <form className='label' onSubmit={searchData}>
                                <input type="text"  value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Cari..........." />
                                <ion-icon name="search-outline" />
                            </form>
                        </div>
                        <Link title='tambah barang' href="tambahaset" className="btn" >Tambah Data Aset</Link>
                    </div>
                    <table>
                        <thead>
                        <tr>
                                <td >No</td>
                                {/* <td style={{ textAlign: 'center' }}> Foto</td> */}
                                <td >Nama</td>
                                <td >Koper</td>
                                <td >Luas</td>
                                <td >jumlah</td>
                                <td >Debit</td>
                                <td >Merk</td>
                                <td >No.Seri</td>
                                <td >Harga</td>
                                <td >Lokasi</td>
                                <td >Kondisi</td>
                                {/* <td>Keterangan</td> */}
                                <td colSpan={2} style={{ textAlign: 'center' }}>Aksi</td>
                            </tr>
                        </thead>

                        <tbody>
                        {aset.map((dt, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? 'even-row' : 'odd-row'}>
                                    <td>{idx + 1}</td>
                                    {/* <td><img
                                            src={`http://localhost:5000/images/${dt.fotoBarang}`}
                                            alt={`Gambar ${dt.namaBarang}`}
                                            style={{ width: '200px', height: '200px' }}
                                        /></td> */}
                                    <td>{dt.namaBarang}</td> 
                                    <td>{dt.kodePerkiraan}</td>
                                    <td>{dt.luas}</td>
                                    <td>{dt.jumlah}</td>
                                    <td>{dt.debit}</td>
                                    <td>{dt.merk}</td>
                                    <td>{dt.nomerSeri}</td>
                                    <td>{formatRupiah(dt.harga)}</td>
                                    <td>{dt.lokasi}</td>
                                    <td>{dt.kondisi}</td>
                                    
                                    <td>
                                        <button className="status delivered" style={{ textDecoration: "none" }}>
                                            <Link
                                            style={{ textDecoration: "none" }}
                                                href={{
                                                    pathname: '/editaset',
                                                    query: {
                                                        id: dt.id,
                                                        namaBarang: dt.namaBarang,
                                                        kodePerkiraan: dt.kodePerkiraan,
                                                        luas: dt.luas,
                                                        jumlah: dt.jumlah,
                                                        debit: dt.debit,
                                                        nomerSeri: dt.nomerSeri,
                                                        merk: dt.merk,
                                                        tanuhPerolehan: dt.tanuhPerolehan,
                                                        harga: dt.harga,
                                                        lokasi: dt.lokasi,
                                                        kondisi: dt.kondisi,
                                                        keterangan: dt.keterangan,
                                                        fotoBarang : dt.fotoBarang
                                                        
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
                                            value={dt.namaBarang}
                                            onClick={(e) => HapusAset(dt.id, dt.namaBarang)} ><span className='aksi'><ion-icon name="trash-bin-outline"></ion-icon></span></button>
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
