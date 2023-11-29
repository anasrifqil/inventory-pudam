import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
export default function FormTambahPegawai() {
    const router = useRouter();
    const [nama, setNama] = useState('');
    const [nik, setNik] = useState('');
    const [tempat, setTempat] = useState('');
    const [tanggalLahir, settanggalLahir] = useState('');
    const [alamat, setAlamat] = useState('');
    const [nomerHP, setNomerHP] = useState('');
    const [ijazah, setIjazah] = useState('');
    const [tanggalPegawai, settanggalPegawai] = useState('');
    const [golongan, setGolongan] = useState('');
    const [jabatan, setJabatan] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [fotopegawai, setFotoPegawai] = useState(null);
    const [preview, setPreview] = useState("");
    const loadImage = (e) => {
        const image = e.target.files[0];
        setFotoPegawai(image);
        setPreview(URL.createObjectURL(image));
    };
    const addData = async (e) => {
        e.preventDefault();

        if (!nama || !nik || !tempat || !tanggalLahir || !alamat || !nomerHP || !ijazah || !tanggalPegawai || !golongan || !jabatan || !keterangan) {
            Swal.fire({
                icon: 'error',
                title: 'Ada Data Yang Kosong',
                text: 'Harap isi semua kolom.'
            });
            return;
        }
        Swal.fire({
            title: 'Apakah anda yakin ?',
            text: "JIka Tidak, Kembali dan cek lagi !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yakin'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const formData = new FormData();
                    formData.append('nama', nama);
                    formData.append('nik', nik);
                    formData.append('tempat', tempat);
                    formData.append('tanggalLahir', tanggalLahir);
                    formData.append('alamat', alamat);
                    formData.append('nomerHP', nomerHP);
                    formData.append('ijazah', ijazah);
                    formData.append('tanggalPegawai', tanggalPegawai); 
                    formData.append('golongan', golongan);
                    formData.append('jabatan', jabatan);
                    formData.append('keterangan', keterangan);
                    formData.append('fotoPegawai', fotopegawai);
                    const apiUrl = 'http://localhost:5000/pegawai'
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
                        router.push('/datapegawai');
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

    // async function addData(e) {
    //     e.preventDefault()
    //     if (!nama || !nik || !tempat || !tanggalLahir || !alamat || !nomerHP || !ijazah || !tanggalPegawai || !golongan || !jabatan || !keterangan) {
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Ada Data Yang Kosong',
    //             text: 'Harap isi semua kolom.'
    //         });
    //         return;
    //     }
    //     Swal.fire({
    //         title: 'Apakah anda yakin ?',
    //         text: "Kembali dan cek lagi !",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yakin'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //              try {
    //                 const formData = new FormData();
    //                 formData.append('nama', nama);
    //                 formData.append('nik', parseInt(nik));
    //                 formData.append('tempat', tempat);
    //                 formData.append('tanggalLahir', tanggalLahir);
    //                 formData.append('alamat', alamat);
    //                 formData.append('nomerHP', parseInt(nomerHP));
    //                 formData.append('ijazah', ijazah);
    //                 formData.append('tanggalPegawai', tanggalPegawai); 
    //                 formData.append('golongan', golongan);
    //                 formData.append('jabatan', jabatan);
    //                 formData.append('keterangan', keterangan);
    //                 formData.append('fotoPegawai', fotopegawai);

    //                 const apiUrl = `http://localhost:5000/pegawai`
    //                 const res = await axios.post(apiUrl, formData, {
    //                     headers: {
    //                         'Content-Type': 'multipart/form-data',
    //                     }
    //                 })
    //                 Swal.fire({
    //                     position: 'top-end',
    //                     icon: 'success',
    //                     title: 'Data Telah Berhasil Diinput',
    //                     showConfirmButton: false,
    //                     timer: 10000  // Waktu animasi berlangsung
    //                 }).then(() => {
    //                     // Setelah animasi selesai, jalankan Router.push
    //                     router.push('/datapegawai');
    //                 });
    //             } catch (e) {
    //                 throw Error(e.message);
    //             }

    //         }
    //     });
    // };
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
                                <label htmlFor="address" className=""> foto Pegawai </label>
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
                                    <label htmlFor="address" className="formbold-form-label"> Nama </label>
                                    <input type="text" name="" placeholder="Masukkan Nama Pegawai" id="firstname" className="formbold-form-input" value={nama}
                                        onChange={(e) => setNama(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> NIK </label>
                                    <input type="text" name="lastname" placeholder="Masukkan NIK" className="formbold-form-input" value={nik}
                                        onChange={(e) => setNik(e.target.value)} />
                                </div>
                            </div>
                            <div className="formbold-input-flex">
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Tempat Lahir </label>
                                    <input type="text" name="lastname" placeholder="Masukkan Tempat Lahir" className="formbold-form-input" value={tempat}
                                        onChange={(e) => setTempat(e.target.value)} />
                                </div>
                                <div>
                                    <label className="formbold-form-label"> Tanggal Lahir</label>
                                    <input
                                        style={{ marginBottom: "10px" }}
                                        type="date"
                                        placeholder="Masukkan Tanggal Lahir"
                                        className="formbold-form-input"
                                        value={tanggalLahir}
                                        onChange={(e) => settanggalLahir(e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="address" className="formbold-form-label">Alamat </label>
                                <input type="text" name="address" id="address" placeholder="Masukkan Alamat" className="formbold-form-input" value={alamat}
                                    onChange={(e) => setAlamat(e.target.value)} style={{ marginBottom: "10px" }} />
                            </div>
                            <div className="formbold-input-flex">
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Nomer HP </label>
                                    <input type="text" name="" placeholder="Masukkan Nomer HP" id="firstname" className="formbold-form-input" value={nomerHP}
                                        onChange={(e) => setNomerHP(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Ijazah Dimiliki </label>
                                    <input type="text" name="lastname" placeholder="Masukkan Ijazah" className="formbold-form-input" value={ijazah}
                                        onChange={(e) => setIjazah(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Tanggal Pegawai </label>
                                    <input type="date" name="lastname" placeholder="Masukkan Tanggal Pegawai" className="formbold-form-input" value={tanggalPegawai}
                                        onChange={(e) => settanggalPegawai(e.target.value)} />
                                </div>
                            </div>
                            <div className="formbold-input-flex">
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Golongan </label>
                                    <input type="text" name="" placeholder="Masukkan Golongan" id="firstname" className="formbold-form-input" value={golongan}
                                        onChange={(e) => setGolongan(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Jabatan </label>
                                    <input type="text" name="lastname" placeholder="Masukkan Jabatan" className="formbold-form-input" value={jabatan}
                                        onChange={(e) => setJabatan(e.target.value)} />
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

