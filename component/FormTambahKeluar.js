import axios from 'axios';
import Router, { useRouter } from 'next/router';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function FormTambahKeluar() {
    const router = useRouter();
    const [tanggalSurat, setTanggalSurat] = useState('');
    const [noSurat, setNoSurat] = useState('');
    const [kepada, setKepada] = useState('');
    const [perihal, setPerihal] = useState('');
    const [lampiran, setLampiran] = useState('');
    const [gambarKeluar, setGambarKeluar] = useState('');
    const [preview, setPreview] = useState("");


    const loadImage = (e) => {
        const image = e.target.files[0];
        setGambarKeluar(image);
        setPreview(URL.createObjectURL(image));
    };

    async function addData(e) {
        e.preventDefault()
        if (!tanggalSurat || !noSurat || !kepada || !perihal || !lampiran) {
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
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    const formData = new FormData();
                    formData.append('tanggalSurat', tanggalSurat);
                    formData.append('noSurat', noSurat);
                    formData.append('kepada', kepada);
                    formData.append('perihal', perihal); // 
                    formData.append('lampiran', lampiran);
                    formData.append('gambarKeluar', gambarKeluar);
                    const apiUrl = `http://localhost:5000/keluar`
                    const res = axios.post(apiUrl, formData, {
                    })
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Data Telah Berhasil Diinput',
                        showConfirmButton: false,
                        timer: 2000  // Waktu animasi berlangsung
                    }).then(() => {
                        // Setelah animasi selesai, jalankan Router.push
                        Router.push('/suratkeluar');
                    });

                } catch (e) {
                    throw Error(e.message);
                }
            }
        });
    };
    // const handleSatuanChange = (e) => {
    //     setSatuan(e.target.value);
    // };
    return (
        <>
            <div className="formbold-main-wrapper">
                <h2 tyle={{ fontSize: '30px' }} >FORM Tambah Data Surat Baru</h2>
                <br></br>
                <div className="formbold-form-wrapper">
                    <form onSubmit={addData}>
                        <div className="formbold-form-step-1 active">

                            <div>
                                <label htmlFor="address" className=""> Gambar barang </label>
                                <input type="file" name="" placeholder="Masukkan Gambar Barang" id="firstname" className="formbold-form-input"
                                    onChange={loadImage} />
                            </div>
                            {preview ? (
                                <figure className="gambardata">
                                    <img className="gambardata" src={preview} alt="Preview Image" />
                                </figure>
                            ) : (
                                ""
                            )}
                            <div className="formbold-input-flex">
                                <div>
                                    <label className="formbold-form-label"> Tanggal Surat</label>
                                    <input
                                        style={{ marginBottom: "10px" }}
                                        type="date"
                                        placeholder="Masukkan Tanggal Keluar Surat"
                                        className="formbold-form-input"
                                        value={tanggalSurat}
                                        onChange={(e) => setTanggalSurat(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Nomer Surat </label>
                                    <input type="text" name="lastname" placeholder="Masukkan Nomer Surat" className="formbold-form-input" value={noSurat}
                                        onChange={(e) => setNoSurat(e.target.value)} />
                                </div>
                            </div>
                            <div className="formbold-input-flex">
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Penerima </label>
                                    <input type="text" name="" placeholder="Masukkan Penerima" id="firstname" className="formbold-form-input" value={kepada}
                                        onChange={(e) => setKepada(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Perihal </label>
                                    <input type="text" name="lastname" placeholder="Masukkan Perihal" className="formbold-form-input" value={perihal}
                                        onChange={(e) => setPerihal(e.target.value)} />
                                </div>
                            </div>
                            <div className="formbold-input-flex">
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Lampiran </label>
                                    <textarea rows={4} name="message" id="message" placeholder="Masukkan Lampiran" className="formbold-form-input" value={lampiran}
                                        onChange={(e) => setLampiran(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="formbold-form-btn-wrapper">
                            <input style={{ marginTop: "20px" }} type='submit' value="SIMPAN" className="btn panjang" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

