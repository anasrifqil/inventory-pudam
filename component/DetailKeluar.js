import { useRouter } from 'next/router';
import React from 'react';

const DetailKeluar = () => {
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
                        src={`http://localhost:5000/images/${data.gambarKeluar}`}
                        alt={`Gambar ${data.perihal}`}
                    />
                </div>
                <div className='description'>
                    <h2>Detail Surat Keluar</h2>
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
                        <p className='judul'>PENERIMA </p>
                        <p className='isi'>: {data && data.kepada}</p>
                    </div>
                    <hr></hr>
                    <div>
                        <p className='judul'>PERIHAL </p>
                        <p className='isi'>: {data && data.perihal}</p>
                    </div>
                    <hr></hr>
                    <div>
                        <p className='judul'>LAMPIRAN </p>
                        <p className='isi'>: {data && data.lampiran}</p>
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

export default DetailKeluar;
