import axios from 'axios';
import { router, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';



export default function FormUpdatePegawai() {
    const router = useRouter();
    const [_nama, setNama] = useState('');
    const [_nik, setNik] = useState('');
    const [_tempat, setTempat] = useState('');
    const [_tanggalLahir, settanggalLahir] = useState('');
    const [_alamat, setAlamat] = useState('');
    const [_nomerHP, setNomerHP] = useState(''); 
    const [_ijazah, setIjazah] = useState('');
    const [_tanggalPegawai, settanggalPegawai] = useState('');
    const [_golongan, setGolongan] = useState('');
    const [_jabatan, setJabatan] = useState('');
    const [_keterangan, setKeterangan] = useState('');
    const [_fotoPegawai, setFotoPegawai] = useState(null);
    const [preview, setPreview] = useState('');

    const { id, nama, nik, tempat, tanggalLahir, alamat, nomerHP, ijazah, tanggalPegawai, golongan, jabatan,  keterangan, fotoPegawai } = router.query;

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFotoPegawai(image);
        setPreview(URL.createObjectURL(image));
    };

    useEffect(() => {
        if (typeof nama == 'string') {
            setNama(nama);
        }
        if (typeof nik == 'string') {
            setNik(nik);
        }
        if (typeof tempat == 'string') {
            setTempat(tempat)
        }
        if (typeof tanggalLahir == 'string') {
            settanggalLahir(tanggalLahir)
        }
        if (typeof alamat== 'string') {
            setAlamat(alamat)
        }
        if (typeof nomerHP == 'string') {
            setNomerHP(nomerHP)
        }
        if (typeof ijazah == 'string') {
            setIjazah(ijazah)
        }
        if (typeof tanggalPegawai == 'string') {
            settanggalPegawai(tanggalPegawai)
        }
        if (typeof golongan == 'string') {
            setGolongan(golongan)
        }
        if (typeof jabatan == 'string') {
            setJabatan(jabatan)
        }
        if (typeof keterangan == 'string') {
            setKeterangan(keterangan)
        }
        if (fotoPegawai) {
            setFotoPegawai(fotoPegawai);
        }
        if (fotoPegawai) {
            setPreview(`http://localhost:5000/images/${fotoPegawai}`);
        }
    }, [id,nama, nik, tempat, tanggalLahir, alamat, nomerHP, ijazah, tanggalPegawai, golongan, jabatan,  keterangan, fotoPegawai])
    const editData = (e) => {
        e.preventDefault()
        if (!_nama || !_nik || !_tempat || !_tanggalLahir || !_alamat || !_nomerHP || !_ijazah || !_tanggalPegawai || !_golongan || !_jabatan || !_keterangan ) {
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
                formData.append('nama', _nama);
                formData.append('nik', _nik);
                formData.append('tempat', _tempat);
                formData.append('tanggalLahir', _tanggalLahir); // Assuming YYYY-MM-DD format
                formData.append('alamat', _alamat);
                formData.append('nomerHP', _nomerHP);
                formData.append('ijazah', _ijazah);
                formData.append('tanggalPegawai', _tanggalPegawai); // Assuming YYYY-MM-DD format
                formData.append('golongan', _golongan);
                formData.append('jabatan', _jabatan);
                formData.append('keterangan', _keterangan);
                formData.append('fotoPegawai', _fotoPegawai);
                try {
                    const apiUrl = `http://localhost:5000/pegawai/${id}`
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

                        router.push('/datapegawai');
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
    // const handleSatuanChange = (e) => {
    //     setSatuan(e.target.value);
    // };
    return (
        <>
            <div className="formbold-main-wrapper">
                <h2 tyle={{ fontSize: '30px' }} >FORM Edit Data Pegawai</h2>
                <br></br>
                <div className="formbold-form-wrapper">
                    <form onSubmit={editData}>
                        <div className="formbold-form-step-1 active">
                        <div>
                        <label htmlFor="address" className=""> <strong>Masukkan kembali gambar dari data yang akan anda edit </strong></label>
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
                                    <input type="text" name="" placeholder="Masukkan Kode Barang" id="firstname" className="formbold-form-input" value={_nama}
                                                onChange={(e) => setNama(e.target.value)}/>
                                </div>
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> NIK </label>
                                    <input type="text" name="lastname" placeholder="Masukkan Nama Barang" className="formbold-form-input" value={_nik}
                                                onChange={(e) => setNik(e.target.value)} />
                                </div>
                            </div>
                            <div className="formbold-input-flex">
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Tempat Lahir </label>
                                    <input type="text" name="lastname" placeholder="Masukkan Nama Barang" className="formbold-form-input" value={_tempat}
                                        onChange={(e) => setTempat(e.target.value)} />
                                </div>
                                <div>
                                    <label className="formbold-form-label"> Tanggal Lahir</label>
                                    <input
                                        style={{ marginBottom: "10px" }}
                                        type="date"
                                        placeholder="Masukkan Tanggal"
                                        className="formbold-form-input"
                                        value={_tanggalLahir}
                                        onChange={(e) => settanggalLahir(e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="address" className="formbold-form-label">Alamat </label>
                                <input type="text" name="address" id="address" placeholder="Masukkan Alamat" className="formbold-form-input" value={_alamat}
                                    onChange={(e) => setAlamat(e.target.value)} style={{ marginBottom: "10px" }}/>
                            </div>
                            <div className="formbold-input-flex">
                            <div>
                                    <label htmlFor="address" className="formbold-form-label"> Nomer HP </label>
                                    <input type="text" name="" placeholder="Masukkan Kode Barang" id="firstname" className="formbold-form-input" value={_nomerHP}
                                        onChange={(e) => setNomerHP(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Ijazah Dimiliki </label>
                                    <input type="text" name="lastname" placeholder="Masukkan Nama Barang" className="formbold-form-input" value={_ijazah}
                                        onChange={(e) => setIjazah(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Tanggal Pegawai </label>
                                    <input type="date" name="lastname" placeholder="Masukkan Nama Barang" className="formbold-form-input" value={_tanggalPegawai}
                                        onChange={(e) => settanggalPegawai(e.target.value)} />
                                </div>
                            </div>
                            <div className="formbold-input-flex">
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Golongan </label>
                                    <input type="text" name="" placeholder="Masukkan Nama Peminjam" id="firstname" className="formbold-form-input" value={_golongan}
                                        onChange={(e) => setGolongan(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Jabatan </label>
                                    <input type="text" name="lastname" placeholder="Masukkan Nomer SP" className="formbold-form-input" value={_jabatan}
                                        onChange={(e) => setJabatan(e.target.value)} />
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
    );
}

