import axios from 'axios';
import { Router, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { parseISO, format } from 'date-fns';

export default function FormBayar() {
    const router = useRouter();
    const { id, tanggal, kodebarang, namabarang, kuantiti, satuan, peminjam, NomerSP, alamat, keterangan, gambarbarang } = router.query;
    
    const [tanggalpengembalian, setTanggalPengembalian] = useState('');
    const [ket, setKet] = useState('');

    useEffect(() => {
        if (typeof keterangan == 'string') {
            setKet(keterangan);
        }
    }, [id, keterangan]);

    const formatDate = (dateString) => {
        const date = parseISO(dateString);
        const formattedDate = format(date, 'd MMMM yyyy');
        return formattedDate;
    };

    const imageUrlParts = gambarbarang ? gambarbarang.split('/') : [];
    const imageName = imageUrlParts.length > 0 ? imageUrlParts[imageUrlParts.length - 1] : '';

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
                    // ... bagian logika untuk mengirim data ke server ...

                    const formData = new FormData();
                    // ... bagian logika untuk menyiapkan data form ...

                    const apiUrl = 'http://localhost:5000/laporan';
                    const res = await axios.post(apiUrl, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    });

                    console.error('POST response:', res);
                    // ... bagian logika untuk menghapus data dari server ...

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

    return (
        <>
            <div className="formbold-main-wrapper">
                <h2 style={{ fontSize: '30px' }}>FORM Penyelesaian BON Barang</h2>
                <br />
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
                                        value={tanggalpengembalian}
                                        onChange={(e) => setTanggalPengembalian(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="address" className="formbold-form-label">Keterangan </label>
                                    <textarea
                                        rows={4}
                                        name="message"
                                        id="message"
                                        placeholder="Masukkan Keterangan"
                                        className="formbold-form-input"
                                        value={ket}
                                        onChange={(e) => setKet(e.target.value)}
                                    />
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
                <div className='photo'>
                    <img
                        style={{ maxWidth: "500px" }}
                        src={`http://localhost:5000/images/${imageName}`}
                        alt={`Gambar ${namabarang}`}
                    />
                </div>
                <div className='description'>
                    <h2>Detail Barang BON</h2>
                    {/* ... bagian detail lainnya ... */}
                </div>
            </div>
        </>
    );
}
