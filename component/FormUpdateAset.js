import axios from 'axios';
import { router, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function FormUpdateData() {
    const router = useRouter();
    const [_namaBarang, setNamaBarang] = useState('');
    const [_kodePerkiraan, setKodePerkiraan] = useState('');
    const [_luas, setLuas] = useState('');
    const [_jumlah, setJumlah] = useState('');
    const [_debit, setDebit] = useState('');
    const [_nomerSeri, setNomerSeri] = useState(''); // State untuk satuan
    const [_merk, setMerk] = useState('');
    const [_tanuhPerolehan, setTanuhPerolehan] = useState('');
    const [_harga, setHarga] = useState('');
    const [_lokasi, setLokasi] = useState('');
    const [_kondisi, setKondisi] = useState('');
    const [_keterangan, setKeterangan] = useState('');
    const [_fotoBarang, setFotoBarang] = useState(null);
    const [preview, setPreview] = useState('');

    const { id, namaBarang, kodePerkiraan, luas, jumlah, debit, nomerSeri, merk, tanuhPerolehan, harga, lokasi, kondisi, keterangan, fotoBarang } = router.query;

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFotoBarang(image);
        setPreview(URL.createObjectURL(image));
    };
    useEffect(() => {
        if (typeof namaBarang == 'string') {
            setNamaBarang(namaBarang);
        }
        if (typeof kodePerkiraan == 'string') {
            setKodePerkiraan(kodePerkiraan);
        }
        if (typeof luas == 'string') {
            setLuas(luas)
        }
        if (typeof jumlah == 'string') {
            setJumlah(jumlah)
        }
        if (typeof debit == 'string') {
            setDebit(debit)
        }
        if (typeof nomerSeri == 'string') {
            setNomerSeri(nomerSeri)
        }
        if (typeof merk == 'string') {
            setMerk(merk)
        }
        if (typeof tanuhPerolehan == 'string') {
            setTanuhPerolehan(tanuhPerolehan)
        }
        if (typeof harga == 'string') {
            setHarga(harga)
        }
        if (typeof lokasi == 'string') {
            setLokasi(lokasi)
        }
        if (typeof kondisi == 'string') {
            setKondisi(kondisi)
        }
        if (typeof keterangan == 'string') {
            setKeterangan(keterangan)
        }
        if (fotoBarang) {
            setFotoBarang(fotoBarang);
        }
        if (fotoBarang) {
            setPreview(`http://localhost:5000/images/${fotoBarang}`);
        }
    }, [id, namaBarang, kodePerkiraan, luas, jumlah, debit, nomerSeri, merk, tanuhPerolehan, harga, lokasi, kondisi, keterangan, fotoBarang])
    const editData = (e) => {
        e.preventDefault()
        if (!_namaBarang || !_kodePerkiraan || !_luas || !_jumlah || !_debit || !_nomerSeri || !_merk || !_tanuhPerolehan || !_harga || !_lokasi || !_kondisi || !_keterangan) {
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
                formData.append('namaBarang', _namaBarang);
                formData.append('kodePerkiraan', _kodePerkiraan);
                formData.append('luas', _luas);
                formData.append('jumlah', parseInt(_jumlah));
                formData.append('debit', _debit);
                formData.append('nomerSeri', _nomerSeri);
                formData.append('merk', _merk);
                formData.append('tanuhPerolehan', _tanuhPerolehan);
                formData.append('harga', parseInt(_harga));
                formData.append('lokasi', _lokasi);
                formData.append('kondisi', _kondisi);
                formData.append('keterangan', _keterangan);
                formData.append('fotoBarang', _fotoBarang);

                try {
                    const apiUrl = `http://localhost:5000/aset/${id}`
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

                        router.push('/dataaset');
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
                <h2 tyle={{ fontSize: '30px' }} >FORM EDIT Data Aset </h2>
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
                            <div className="formbold-input-flex">
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Nama Barang </label>
                                    <input type="text" name="" placeholder="Masukkan Nama Barang" id="firstname" className="formbold-form-input" value={_namaBarang}
                                        onChange={(e) => setNamaBarang(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Kode Perkiraan </label>
                                    <input type="text" name="lastname" placeholder="Masukkan Kode Perkiraan" className="formbold-form-input" value={_kodePerkiraan}
                                        onChange={(e) => setKodePerkiraan(e.target.value)} />
                                </div>
                            </div>
                            <div className="formbold-input-flex">
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Luas </label>
                                    <input type="text" name="lastname" placeholder="Masukkan Luas" className="formbold-form-input" value={_luas}
                                        onChange={(e) => setLuas(e.target.value)} />
                                </div>
                                <div>
                                    <label className="formbold-form-label"> Jumlah</label>
                                    <input
                                        style={{ marginBottom: "10px" }}
                                        type="text"
                                        placeholder="Masukkan Jumlah"
                                        className="formbold-form-input"
                                        value={_jumlah}
                                        onChange={(e) => setJumlah(e.target.value)} />
                                </div>
                                <div>
                                    <label className="formbold-form-label"> Debit</label>
                                    <input
                                        style={{ marginBottom: "10px" }}
                                        type="text"
                                        placeholder="Masukkan Debit"
                                        className="formbold-form-input"
                                        value={_debit}
                                        onChange={(e) => setDebit(e.target.value)} />
                                </div>
                            </div>
                            <div className="formbold-input-flex">
                                <div>
                                    <label className="formbold-form-label"> NomerSeri</label>
                                    <input
                                        style={{ marginBottom: "10px" }}
                                        type="text"
                                        placeholder="Masukkan Nomer Seri"
                                        className="formbold-form-input"
                                        value={_nomerSeri}
                                        onChange={(e) => setNomerSeri(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Merek </label>
                                    <input type="text" name="lastname" placeholder="Masukkan Merek" className="formbold-form-input" value={_merk}
                                        onChange={(e) => setMerk(e.target.value)} />
                                </div>

                            </div>
                            <div className="formbold-input-flex">
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Tahun Perolehan </label>
                                    <input type="text" name="lastname" placeholder="Masukkan Tahun Perolehan" className="formbold-form-input" value={_tanuhPerolehan}
                                        onChange={(e) => setTanuhPerolehan(e.target.value)} />
                                </div>
                                <div>
                                    <label className="formbold-form-label"> Harga</label>
                                    <input
                                        style={{ marginBottom: "10px" }}
                                        type="text"
                                        placeholder="Masukkan Harga"
                                        className="formbold-form-input"
                                        value={_harga}
                                        onChange={(e) => (setHarga(e.target.value))} />
                                </div>
                            </div>
                            <div className="formbold-input-flex">
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Lokasi </label>
                                    <input type="text" name="lastname" placeholder="Masukkan Lokasi" className="formbold-form-input" value={_lokasi}
                                        onChange={(e) => setLokasi(e.target.value)} />
                                </div>
                                <div>
                                    <label className="formbold-form-label"> Kondisi</label>
                                    <input
                                        style={{ marginBottom: "10px" }}
                                        type="text"
                                        placeholder="Masukkan kondisi"
                                        className="formbold-form-input"
                                        value={_kondisi}
                                        onChange={(e) => setKondisi(e.target.value)} />
                                </div>
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
    )
}