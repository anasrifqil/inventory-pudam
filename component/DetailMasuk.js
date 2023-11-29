import { useRouter } from 'next/router';
import React from 'react';

const DetailMasuk = () => {
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
                        src={`http://localhost:5000/images/${data.gambarMasuk}`}
                        alt={`Gambar ${data.nama}`}
                    />
                </div>
                <div className='description'>
                    <h2>Detail Surat Masuk</h2>
                    <div>
                        <p className='judul'>TANGGAL SURAT </p>
                        <p className='isi'>: {formatDate(data && data.tanggalSurat)}</p>
                    </div>
                    <hr></hr>
                    <div>
                        <p className='judul'>NOMER SURAT </p>
                        <p className='isi'>: {data && data.noSurat}</p>
                    </div>
                    <hr></hr>
                    <div>
                        <p className='judul'>PENGIRIM </p>
                        <p className='isi'>: {data && data.dari} {formatDate(data && data.tanggalLahir)}</p>
                    </div>
                    <hr></hr>
                    <div>
                        <p className='judul'>PERIHAL </p>
                        <p className='isi'>: {data && data.perihal}</p>
                    </div>
                    <hr></hr>
                    <div>
                        <p className='judul'>TANGGAL TERIMA </p>
                        <p className='isi'>: {formatDate(data && data.terimaTgl)}</p>
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

export default DetailMasuk;
