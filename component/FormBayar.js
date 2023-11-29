import axios from 'axios';
import { Router, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { parseISO, format } from 'date-fns';


export default function FormBayar() {
    const router = useRouter();
    const { id, tanggal, kodebarang, namabarang, kuantiti, satuan, peminjam, NomerSP, alamat, keterangan, gambarbarang } = router.query;
    
    const [tanggalpengembalian, setTanggalPengembalian] = useState('')
    const [ket, setKet] = useState('');

    
    
    useEffect(() => {
        if (typeof keterangan == 'string') {
            setKet(keterangan)
        }

    }, [id,  keterangan,])

    const Kembalikan = async (e) => {
        e.preventDefault();

        if (!tanggalpengembalian) {
            Swal.fire({
                icon: 'error',
                title: 'Ada Data Yang Kosong',
                text: 'Harap isi semua kolom.'
            });
            return;
        }

        Swal.fire({
            title: 'Apakah anda yakin ?',
            text: "Kembali dan cek lagi !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yakin'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const formData = new FormData();
                    formData.append('tanggal', tanggal);
                    formData.append('kode', kodebarang);
                    formData.append('nama', namabarang);
                    formData.append('jumlah', parseInt(kuantiti));
                    formData.append('satuan', satuan);
                    formData.append('ket', keterangan);
                    formData.append('tglPengembalian', tanggalpengembalian);
                    formData.append('peminjam', peminjam);
                    formData.append('nomerSP', NomerSP);
                    formData.append('alamat', alamat);
                    formData.append('fotoBarang', gambarbarang);
                    const apiUrl = 'http://localhost:5000/laporan'
                    const res = await axios.post(apiUrl, formData)
                    const deleteResponse = await axios.delete(`http://localhost:5000/inventaris/${id}`);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Bon Telah Diselesaikan',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    router.push('/laporan');
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Terjadi kesalahan',
                        text: 'Terdapat kesalahan.'
                    });
                }
            }
        });
    };
    const formatDate = (dateString) => {
        const date = parseISO(dateString);
        const formattedDate = format(date, 'd MMMM yyyy',);
        return formattedDate;
    };
    return (
        <>
            <div className="formbold-main-wrapper">
                <h2 tyle={{ fontSize: '30px' }} >FORM Penyelesaian BON Barang</h2>
                <br></br>
                <div className="formbold-form-wrapper">
                    <form onSubmit={Kembalikan}>
                        <div className="formbold-form-step-1 active">
                            <div className="formbold-input-flex">
                                <div>
                                    <label className="formbold-form-label"> Tanggal Penyelesaian</label>
                                    <input
                                        style={{ marginBottom: "10px" }}
                                        type="date"
                                        placeholder="Masukkan Tanggal"
                                        className="formbold-form-input"
                                        value={tanggalpengembalian} onChange={(e) => setTanggalPengembalian(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="address" className="formbold-form-label">Keterangan </label>
                                    <textarea rows={4} name="message" id="message" placeholder="Masukkan Keterangan" className="formbold-form-input" value={ket}
                                        onChange={(e) => setKet(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="formbold-form-btn-wrapper">
                            <input style={{ marginTop: "20px" }} type='submit' value="SIMPAN" className="btn panjang" />
                        </div>
                    </form>
                </div>
            </div>
            <div className='detail-container'>
                <div className='photo'
                >
                    <img
                        style={{ maxWidth: "500px" }}
                        src={`http://localhost:5000/images/${gambarbarang}`}
                        alt={`Gambar ${namabarang}`}
                    />
                </div>
                <div className='description'>
                    <h2>Detail Barang BON</h2>
                    <div>
                        <p className='judul'>TANGGAL </p>
                        <p className='isi'>: {formatDate(tanggal)}</p>
                    </div>
                    <hr></hr>
                    <div>
                        <p className='judul'>KODE BARANG </p>
                        <p className='isi'>: {kodebarang}</p>
                    </div>
                    <hr></hr>
                    <div>
                        <p className='judul'>NAMA BARANG </p>
                        <p className='isi'>: {namabarang}</p>
                    </div>
                    <hr></hr>
                    <div>
                        <p className='judul'>JUMLAH </p>
                        <p className='isi'>: {kuantiti}</p>
                    </div>
                    <hr></hr>
                    <div>
                        <p className='judul'>SATUAN </p>
                        <p className='isi'>: {satuan}</p>
                    </div>
                    <hr></hr>
                    <div>
                        <p className='judul'>PEMINJAM </p>
                        <p className='isi'>: {peminjam}</p>
                    </div>
                    <hr></hr>
                    <div>
                        <p className='judul'>NOMER SP </p>
                        <p className='isi'>: {NomerSP}</p>
                    </div>
                    <hr></hr>
                    <div>
                        <p className='judul'>ALAMAT </p>
                        <p className='isi'>: {alamat}</p>
                    </div>
                    <hr></hr>
                </div>
            </div>
        </>
    );
}

