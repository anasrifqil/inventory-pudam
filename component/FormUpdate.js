import axios from 'axios';
import { Router, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import dataBarang from './dataTetap/dataBarang';



export default function FormUpdate() {
    const [_tanggal, setTanggal] = useState('');
    const [_kodebarang, setKodeBarang] = useState('');
    const [_namabarang, setNamaBarang] = useState('');
    const [_kuantiti, setKuantiti] = useState('');
    const [_satuan, setSatuan] = useState('');
    const [_peminjam, setPeminjam] = useState('');
    const [_NomerSP, setNomerSP] = useState('');
    const [_alamat, setAlamat] = useState('');
    const [_keterangan, setKeterangan] = useState('');
    const [_gambarbarang, setGambarBarang] = useState('');
    const [preview, setPreview] = useState('');

    const router = useRouter();
    const { id, tanggal, kodebarang, namabarang, kuantiti, satuan, peminjam, NomerSP, alamat, keterangan, gambarbarang } = router.query;

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

    useEffect(() => {
        if (typeof tanggal == 'string') {
            setTanggal(tanggal);
        }
        if (typeof kodebarang == 'string') {
            setKodeBarang(kodebarang);
        }
        if (typeof namabarang == 'string') {
            setNamaBarang(namabarang)
        }
        if (typeof kuantiti == 'string') {
            setKuantiti(kuantiti)
        }
        if (typeof satuan == 'string') {
            setSatuan(satuan)
        }
        if (typeof peminjam == 'string') {
            setPeminjam(peminjam)
        }
        if (typeof NomerSP == 'string') {
            setNomerSP(NomerSP)
        }
        if (typeof alamat == 'string') {
            setAlamat(alamat)
        }
        if (typeof keterangan == 'string') {
            setKeterangan(keterangan)
        }
        if (gambarbarang) {
            setGambarBarang(gambarbarang);
        }
        if (gambarbarang) {
            setPreview(`http://localhost:5000/images/${gambarbarang}`);
        }
    }, [id, tanggal, kodebarang, namabarang, kuantiti, satuan, peminjam, NomerSP, alamat, keterangan, gambarbarang])

    const editData = (e) => {
        e.preventDefault()
        if (!_tanggal || !_kodebarang || !_namabarang || !_kuantiti || !_satuan || !_peminjam || !_NomerSP || !_alamat || !_keterangan) {
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
                const formData = new FormData();
                formData.append('kodebarang', _kodebarang);
                formData.append('namabarang', _namabarang);
                formData.append('kuantiti', parseInt(_kuantiti));
                formData.append('satuan', _satuan);
                formData.append('keterangan', _keterangan);
                formData.append('peminjam', _peminjam);
                formData.append('tanggal', _tanggal);
                formData.append('NomerSP', _NomerSP);
                formData.append('alamat', _alamat);
                formData.append('gambarbarang', _gambarbarang);
                try {
                    const apiUrl = `http://localhost:5000/inventaris/${id}`
                    axios.patch(apiUrl, formData, {
                        headers: {
                            "Content-type": "multipart/form-data",
                        },
                    })
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Data Telah Berhasil Diupdate',
                        showConfirmButton: false,
                        timer: 3000
                    }).then(() => {

                        router.push('/databarang')
                    });

                } catch (e) {
                    throw Error(e.message)
                    Swal.fire({
                        icon: 'error',
                        title: 'Terjadi kesalahan',
                        text: 'Terdapat kesalahan saat menyimpan data.'
                    });
                }
            }
        })
    }
 
    return (
        <>
            <div className="formbold-main-wrapper">
                <h2 tyle={{ fontSize: '30px' }} >FORM Edit BON Barang</h2>
                <br></br>
                <div className="formbold-form-wrapper">
                    <form onSubmit={editData}>
                        <div className="formbold-form-step-1 active">
                            <div>
                                <label htmlFor="address" className=""> <strong>Masukkan kembali gambar dari data yang akan anda edit </strong></label>
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
                            <div>
                                <label className="formbold-form-label"> Tanggal </label>
                                <input
                                    style={{ marginBottom: "10px" }}
                                    type="date"
                                    placeholder="Masukkan Tanggal"
                                    className="formbold-form-input"
                                    value={_tanggal} onChange={(e) => setTanggal(e.target.value)} />
                            </div>
                            <div className="formbold-input-flex">
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Kode Barang </label>
                                    <input type="text" name="" placeholder="Masukkan Kode Barang" id="firstname" className="formbold-form-input" value={_kodebarang}
                                        onChange={handleKodeBarangChange} />
                                </div>
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Nama Barang </label>
                                    <input type="text" list="barangList" name="lastname" placeholder="Masukkan Nomer SP" className="formbold-form-input" value={_namabarang}
                                        onChange={handleNamaBarangChange} />
                                    <datalist className='list-saran-barang' id="barangList">
                                        {dataBarang
                                            .filter(barang => barang.nama.toLowerCase().includes(_namabarang.toLowerCase()))
                                            .map((barang, index) => (
                                                <option key={index} value={barang.nama} />
                                            ))}
                                    </datalist>

                                </div>
                            </div>
                            <div className="formbold-input-flex">
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Jumlah </label>
                                    <input type="text" name="" placeholder="Masukkan Jumlah Barang" id="firstname" className="formbold-form-input" value={_kuantiti}
                                        onChange={(e) => setKuantiti(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Satuan </label>
                                    <input type="text" name="lastname" placeholder="Masukkan Nomer SP" className="formbold-form-input" value={_satuan}
                                        onChange={(e) => setSatuan(e.target.value)} />
                                </div>
                            </div>
                            <div className="formbold-input-flex">
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Peminjam </label>
                                    <input type="text" name="" placeholder="Masukkan Nama Peminjam" id="firstname" className="formbold-form-input" value={_peminjam}
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
                                <input type="text" name="address" id="address" placeholder="Masukkan Alamat" className="formbold-form-input" value={_alamat}
                                    onChange={(e) => setAlamat(e.target.value)} />
                            </div>
                        </div>
                        <div className="formbold-form-step-2">
                            <div>
                                <label htmlFor="address" className="formbold-form-label">Keterangan </label>
                                <textarea rows={4} name="message" id="message" placeholder="Masukkan Keterangan" className="formbold-form-input" value={_keterangan}
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
