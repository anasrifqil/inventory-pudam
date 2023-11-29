import axios from 'axios';
import Router, { useRouter } from 'next/router';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import dataBarang from './dataTetap/dataBarang';

export default function FormTambah() {
    const [tanggal, setTanggal] = useState('');
    const [kodebarang, setKodeBarang] = useState('');
    const [namabarang, setNamaBarang] = useState('');
    const [kuantiti, setKuantiti] = useState('');
    const [satuan, setSatuan] = useState('');
    const [peminjam, setPeminjam] = useState('');
    const [NomerSP, setNomerSP] = useState('');
    const [alamat, setAlamat] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [gambarbarang, setGambarBarang] = useState('');
    const [preview, setPreview] = useState("");


    const loadImage = (e) => {
        const image = e.target.files[0];
        setGambarBarang(image);
        setPreview(URL.createObjectURL(image));
    };
    const handleKodeBarangChange = (e) => {
        const inputKodeBarang = e.target.value;

        const selectedBarang = dataBarang.find(barang => barang.kode === inputKodeBarang);

        if (selectedBarang) {
            setNamaBarang(selectedBarang.nama);
            setSatuan(selectedBarang.satuan);
        } else {
            setNamaBarang('');
            setSatuan('');
        }

        setKodeBarang(inputKodeBarang);
    };

    const handleNamaBarangChange = (e) => {
        const inputNamaBarang = e.target.value;

        const selectedBarang = dataBarang.find(barang => barang.nama === inputNamaBarang);

        if (selectedBarang) {
            setKodeBarang(selectedBarang.kode);
            setSatuan(selectedBarang.satuan);
        } else {
            setKodeBarang('');
            setSatuan('');
        }

        setNamaBarang(inputNamaBarang);
    };


    const addData = async (e) => {
        e.preventDefault();

        if (!tanggal || !kodebarang || !namabarang || !kuantiti || !satuan || !peminjam || !NomerSP || !alamat || !keterangan ) {
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
                    formData.append('kodebarang', kodebarang);
                    formData.append('namabarang', namabarang);
                    formData.append('kuantiti', parseInt(kuantiti));
                    formData.append('satuan', satuan);
                    formData.append('keterangan', keterangan);
                    formData.append('peminjam', peminjam);
                    formData.append('tanggal', tanggal);
                    formData.append('NomerSP', NomerSP);
                    formData.append('alamat', alamat);
                    formData.append('gambarbarang', gambarbarang);
                    const apiUrl = 'http://localhost:5000/inventaris'
                    const res = await axios.post(apiUrl, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    })

                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Data Telah Berhasil Diinput',
                        showConfirmButton: false,
                        timer: 3000
                    }).then(() => {
                        Router.push('/databarang');
                    });

                } catch (error) {
                    console.error('Error adding data:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Terjadi Kesalahan',
                        text: 'Gagal menambahkan data. Cek kembali input Anda.'
                    });
                }
            }
        });
    };

    return (
        <>

            <div className="formbold-main-wrapper">
                <h2 tyle={{ fontSize: '30px' }} >FORM Tambah BON Barang</h2>
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
                                <label className="formbold-form-label"> Tanggal </label>
                                <input
                                    style={{ marginBottom: "10px" }}
                                    type="date"
                                    placeholder="Masukkan Tanggal"
                                    className="formbold-form-input"
                                    value={tanggal}
                                    onChange={(e) => setTanggal(e.target.value)} />
                            </div>
                            </div>
                            <div className="formbold-input-flex">
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Kode Barang </label>
                                    <input
                                        type="text"
                                        name="" placeholder="Masukkan Kode Barang"
                                        id="firstname" className="formbold-form-input"
                                        value={kodebarang}
                                        onChange={handleKodeBarangChange} />
                                </div>
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Nama Barang </label>
                                    <input type="text" list="barangList" name="lastname" placeholder="Masukkan Nama Barang" className="formbold-form-input" value={namabarang}
                                        onChange={handleNamaBarangChange} />
                                    <datalist className='list-saran-barang' id="barangList">
                                        {dataBarang
                                            .filter(barang => barang.nama.toLowerCase().includes(namabarang.toLowerCase()))
                                            .map((barang, index) => (
                                                <option key={index} value={barang.nama} />
                                            ))}
                                    </datalist>

                                </div>


                            </div>
                            <div className="formbold-input-flex">
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Jumlah </label>
                                    <input type="text" name="" placeholder="Masukkan Jumlah Barang" id="firstname" className="formbold-form-input" value={kuantiti}
                                        onChange={(e) => setKuantiti(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Satuan </label>
                                    <input type="text" name="lastname" placeholder="Masukkan Satuan" className="formbold-form-input" value={satuan}
                                        onChange={(e) => setSatuan(e.target.value)} />
                                </div>
                            </div>
                            <div className="formbold-input-flex">
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Peminjam </label>
                                    <input type="text" name="" placeholder="Masukkan Nama Peminjam" id="firstname" className="formbold-form-input" value={peminjam}
                                        onChange={(e) => setPeminjam(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Nomer SP </label>
                                    <input type="text" name="lastname" placeholder="Masukkan Nomer SP" className="formbold-form-input" value={NomerSP}
                                        onChange={(e) => setNomerSP(e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="address" className="formbold-form-label">Alamat </label>
                                <input type="text" name="address" id="address" placeholder="Masukkan Alamat" className="formbold-form-input" value={alamat}
                                    onChange={(e) => setAlamat(e.target.value)} />
                            </div>
                        </div>
                        <div className="formbold-form-step-2">
                            <div>
                                <label htmlFor="address" className="formbold-form-label">Keterangan </label>
                                <textarea rows={4} name="message" id="message" placeholder="Masukkan Keterangan" className="formbold-form-input" value={keterangan}
                                    onChange={(e) => setKeterangan(e.target.value)} />
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