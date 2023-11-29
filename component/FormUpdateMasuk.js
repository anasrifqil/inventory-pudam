import axios from 'axios';
import { router, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';



export default function FormUpdateMasuk() {
    const router = useRouter();
    const [_tanggalSurat, setTanggalSurat] = useState('');
    const [_noSurat, setNoSurat] = useState('');
    const [_dari, setDari] = useState('');
    const [_perihal, setPerihal] = useState('');
    const [_terimaTgl, setTerimaTgl] = useState('');
    const [_gambarMasuk, setGambarMasuk] = useState('');
    const [preview, setPreview] = useState('');

    const loadImage = (e) => {
        const image = e.target.files[0];
        setGambarMasuk(image);
        setPreview(URL.createObjectURL(image));
    };

    const { id, tanggalSurat, noSurat, dari, perihal, terimaTgl, gambarMasuk } = router.query;

    useEffect(() => {
        if (typeof tanggalSurat == 'string') {
            setTanggalSurat(tanggalSurat);
        }
        if (typeof noSurat == 'string') {
            setNoSurat(noSurat);
        }
        if (typeof dari == 'string') {
            setDari(dari)
        }
        if (typeof perihal == 'string') {
            setPerihal(perihal)
        }
        if (typeof terimaTgl == 'string') {
            setTerimaTgl(terimaTgl)
        }
        if (gambarMasuk) {
            setGambarMasuk(gambarMasuk);
        }
        if (gambarMasuk) {
            setPreview(`http://localhost:5000/images/${gambarMasuk}`);
        }

    }, [id, tanggalSurat, noSurat, dari, perihal, terimaTgl, gambarMasuk])
    const editData = (e) => {
        e.preventDefault()
        if (!_tanggalSurat || !_noSurat || !_dari || !_perihal || !_terimaTgl) {
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
                formData.append('tanggalSurat', tanggalSurat);
                formData.append('noSurat', _noSurat);
                formData.append('dari', _dari);
                formData.append('perihal', _perihal); // 
                formData.append('terimaTgl', _terimaTgl);
                formData.append('gambarMasuk', _gambarMasuk);
                try {
                    const apiUrl = `http://localhost:5000/masuk/${id}`
                    axios.patch(apiUrl, formData, {

                    })
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Data Telah Berhasil Diupdate',
                        showConfirmButton: false,
                        timer: 3000
                    }).then(() => {

                        router.push('/suratmasuk');
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
                <h2 tyle={{ fontSize: '30px' }} >FORM Tambah Data Surat Baru</h2>
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
                                    <label className="formbold-form-label"> Tanggal Masuk</label>
                                    <input
                                        style={{ marginBottom: "10px" }}
                                        type="date"
                                        placeholder="Masukkan Tanggal Masuk Surat"
                                        className="formbold-form-input"
                                        value={_tanggalSurat}
                                        onChange={(e) => setTanggalSurat(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Nomer Surat </label>
                                    <input type="text" name="lastname" placeholder="Masukkan Nomer Surat" className="formbold-form-input" value={_noSurat}
                                        onChange={(e) => setNoSurat(e.target.value)} />
                                </div>
                            </div>
                            <div className="formbold-input-flex">
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Pengirim </label>
                                    <input type="text" name="" placeholder="Masukkan Pengirim" id="firstname" className="formbold-form-input" value={_dari}
                                        onChange={(e) => setDari(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Perihal </label>
                                    <input type="text" name="lastname" placeholder="Masukkan Perihal" className="formbold-form-input" value={_perihal}
                                        onChange={(e) => setPerihal(e.target.value)} />
                                </div>
                            </div>
                            <div className="formbold-input-flex">
                                <div>
                                    <label htmlFor="address" className="formbold-form-label"> Tanggal Diterima </label>
                                    <input type="date" name="lastname" placeholder="Masukkan Tanggal Diterima" className="formbold-form-input" value={_terimaTgl}
                                        onChange={(e) => setTerimaTgl(e.target.value)} />
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

