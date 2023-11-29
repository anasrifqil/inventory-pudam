import { useRouter } from 'next/router';
import React from 'react';

const DetailPegawai = () => {
    const router = useRouter();
    const dataDetail = router.query.data;

    // Jika dataDetail adalah string, Anda mungkin perlu mengubahnya menjadi objek terlebih dahulu.
    const data = typeof dataDetail === 'string' ? JSON.parse(dataDetail) : dataDetail;

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString('id-ID', options);
        return formattedDate;
    };

    const generateDetail = (data) => {
        console.log(data);
        return (
            <div className='detail-container'>
                <div className='photo'
                    >
                    <img
                    style={{maxWidth : "500px"}} 
                        src={`http://localhost:5000/images/${data.fotoPegawai}`}
                        alt={`Gambar ${data.nama}`}
                    />
                </div>
                <div className='description'>
                    <h2>Detail Pegawai</h2>
                    <div>
                        <p className='judul'>NAMA </p>
                        <p className='isi'>: {data && data.nama}</p>
                    </div>
                    <hr></hr>
                    <div>
                        <p className='judul'>NIP </p>
                        <p className='isi'>: {data && data.nik}</p>
                    </div>
                    <hr></hr>
                    <div>
                        <p className='judul'>TANGGAL LAHIR </p>
                        <p className='isi'>: {data && data.tempat} {formatDate(data && data.tanggalLahir)}</p>
                    </div>
                    <hr></hr>
                    <div>
                        <p className='judul'>ALAMAT </p>
                        <p className='isi'>: {data && data.alamat}</p>
                    </div>
                    <hr></hr>
                    <div>
                        <p className='judul'>NOMER HP </p>
                        <p className='isi'>: {data && data.nomerHP}</p>
                    </div>
                    <hr></hr>
                    <div>
                        <p className='judul'>IJAZAH </p>
                        <p className='isi'>: {data && data.ijazah}</p>
                    </div>
                    <hr></hr>
                    <div>
                        <p className='judul'>TANGGAL PEGAWAI </p>
                        <p className='isi'>: {formatDate(data && data.tanggalPegawai)}</p>
                    </div>
                    <hr></hr>
                    <div>
                        <p className='judul'>GOLONGAN </p>
                        <p className='isi'>: {data && data.golongan}</p>
                    </div>
                    <hr></hr>
                    <div>
                        <p className='judul'>JABATAN </p>
                        <p className='isi'>: {data && data.jabatan}</p>
                    </div>

                </div>
            </div>
        );
    };

    return (
        <>
            {data ? generateDetail(data) : <p>Loading...</p>}
        </>
    );
};

export default DetailPegawai;
