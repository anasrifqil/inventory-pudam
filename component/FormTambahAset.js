
import axios from 'axios';
import Router, { useRouter } from 'next/router';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function FormTambahAset() {
    const router = useRouter();
    const [namaBarang, setNamaBarang] = useState('');
    const [kodePerkiraan, setKodePerkiraan] = useState('');
    const [luas, setLuas] = useState('');
    const [jumlah, setJumlah] = useState('');
    const [debit, setDebit] = useState('');
    const [nomerSeri, setNomerSeri] = useState(''); // State untuk satuan
    const [merk, setMerk] = useState('');
    const [tanuhPerolehan, setTanuhPerolehan] = useState('');
    const [harga, setHarga] = useState('');
    const [lokasi, setLokasi] = useState('');
    const [kondisi, setKondisi] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [fotoBarang, setFotoBarang] = useState(null);
    const [preview, setPreview] = useState("");

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFotoBarang(image);
        setPreview(URL.createObjectURL(image));
    };


    async function addData(e) {
        e.preventDefault()
        if (!namaBarang || !kodePerkiraan || !luas || !jumlah || !debit || !nomerSeri || !merk || !tanuhPerolehan || !harga || !lokasi || !kondisi || !keterangan ) {
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
                    formData.append('namaBarang', namaBarang);
                    formData.append('kodePerkiraan', kodePerkiraan);
                    formData.append('luas', luas);
                    formData.append('jumlah', parseInt(jumlah));
                    formData.append('debit', debit);
                    formData.append('nomerSeri', nomerSeri);
                    formData.append('merk', merk);
                    formData.append('tanuhPerolehan', tanuhPerolehan);
                    formData.append('harga', parseInt(harga));
                    formData.append('lokasi', lokasi);
                    formData.append('kondisi', kondisi);
                    formData.append('keterangan', keterangan);
                    formData.append('fotoBarang', fotoBarang);

                    const apiUrl = `http://localhost:5000/aset`
                    const res = axios.post(apiUrl, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    })
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Data Telah Berhasil Diinput',
                        showConfirmButton: false,
                        timer: 3000 // Waktu animasi berlangsung
                    }).then(() => {
                        // Setelah animasi selesai, jalankan Router.push
                        Router.push('/dataaset');
                    });

                } catch (e) {
                    throw Error(e.message);
                }
            }
        });
    };
    function formatRupiah(number) {
        const formatter = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        });
        
        return formatter.format(number);
      }
    // const handleSatuanChange = (e) => {
    //     setSatuan(e.target.value);
    // };
    return (
        <>
            <div className="formbold-main-wrapper">
                <h2 tyle={{ fontSize: '30px' }} >FORM Tambah Data Pegawai Baru</h2>
                <br></br>
                <div className="formbold-form-wrapper">
                    <form onSubmit={addData}>
                        <div className="formbold-form-step-1 active">
                            <div>
                                <label htmlFor="address" className=""> foto Aset </label>
                                <input type="file" name="" placeholder="Masukkan Foto Pegawai" id="firstname" className="formbold-form-input"
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
                                    <input type="text" name="" placeholder="Masukkan Nama Barang" id="firstname" className="formbold-form-input" value={namaBarang}
                                        onChange={(e) => setNamaBarang(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Kode Perkiraan </label>
                                    <input type="text" name="lastname" placeholder="Masukkan Kode Perkiraan" className="formbold-form-input" value={kodePerkiraan}
                                        onChange={(e) => setKodePerkiraan(e.target.value)} />
                                </div>
                            </div>
                            <div className="formbold-input-flex">
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Luas </label>
                                    <input type="text" name="lastname" placeholder="Masukkan Luas" className="formbold-form-input" value={luas}
                                        onChange={(e) => setLuas(e.target.value)} />
                                </div>
                                <div>
                                    <label className="formbold-form-label"> Jumlah</label>
                                    <input
                                        style={{ marginBottom: "10px" }}
                                        type="text"
                                        placeholder="Masukkan Jumlah"
                                        className="formbold-form-input"
                                        value={jumlah}
                                        onChange={(e) => setJumlah(e.target.value)} />
                                </div>
                                <div>
                                    <label className="formbold-form-label"> Debit</label>
                                    <input
                                        style={{ marginBottom: "10px" }}
                                        type="text"
                                        placeholder="Masukkan Debit"
                                        className="formbold-form-input"
                                        value={debit}
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
                                        value={nomerSeri}
                                        onChange={(e) => setNomerSeri(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Merek </label>
                                    <input type="text" name="lastname" placeholder="Masukkan Merek" className="formbold-form-input" value={merk}
                                        onChange={(e) => setMerk(e.target.value)} />
                                </div>
 
                            </div>
                            <div className="formbold-input-flex">
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Tahun Perolehan </label>
                                    <input type="text" name="lastname" placeholder="Masukkan Tahun Perolehan" className="formbold-form-input" value={tanuhPerolehan}
                                        onChange={(e) => setTanuhPerolehan(e.target.value)} />
                                </div>
                                <div>
                                    <label className="formbold-form-label"> Harga</label>
                                    <input
                                        style={{ marginBottom: "10px" }}
                                        type="text"
                                        placeholder="Masukkan Harga"
                                        className="formbold-form-input"
                                        value={harga}
                                        onChange={(e) => (setHarga(e.target.value), formatRupiah(e.target.value))} />
                                </div>
                            </div>
                            <div className="formbold-input-flex">
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Lokasi </label>
                                    <input type="text" name="lastname" placeholder="Masukkan Lokasi" className="formbold-form-input" value={lokasi}
                                        onChange={(e) => setLokasi(e.target.value)} />
                                </div>
                                <div>
                                    <label className="formbold-form-label"> Kondisi</label>
                                    <input
                                        style={{ marginBottom: "10px" }}
                                        type="text"
                                        placeholder="Masukkan kondisi"
                                        className="formbold-form-input"
                                        value={kondisi}
                                        onChange={(e) => setKondisi(e.target.value)} />
                                </div>
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

