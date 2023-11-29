import { useRouter } from 'next/router';
import React from 'react';

const DetailAset = () => {
    const router = useRouter();
    const dataDetail = router.query.data;

    // Jika dataDetail adalah string, Anda mungkin perlu mengubahnya menjadi objek terlebih dahulu.
    const data = typeof dataDetail === 'string' ? JSON.parse(dataDetail) : dataDetail;

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString('id-ID', options);
        return formattedDate;
    };
    function formatRupiah(number) {
        const formatter = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        });
        
        return formatter.format(number);
      }

    const generateDetail = (data) => {
        console.log(data);
        return (
            <div className='detail-container'>
                <div className='photo'
                    >
                    <img
                    style={{maxWidth : "500px"}} 
                        src={`http://localhost:5000/images/${data.fotoBarang}`}
                        alt={`Gambar ${data.namaBarang}`}
                    />
                </div>
                <div className='description'>
                    <h2>Detail Aset</h2>
                    <div>
                        <p className='judul'>NAMA </p>
                        <p className='isi'>: {data && data.namaBara}</p>
                    </div>
                    <hr></hr>
                    <div>
                        <p className='judul'>KODE PERKIRAAN </p>
                        <p className='isi'>: {data && data.kodePerkiraan}</p>
                    </div>
                    <hr></hr>
                    <div>
                        <p className='judul'>LUAS </p>
                        <p className='isi'>: {data && data.luas}</p>
                    </div>
                    <hr></hr>
                    <div>
                        <p className='judul'>JUMLAH </p>
                        <p className='isi'>: {formatDate(data && data.jumlah)}</p>
                    </div>
                    <hr></hr>
                    <div>
                        <p className='judul'>DEBIT </p>
                        <p className='isi'>: {data && data.debit}</p>
                    </div>
                    <hr></hr>
                    <div>
                        <p className='judul'>MEREK </p>
                        <p className='isi'>: {data && data.merk}</p>
                    </div>
                    <hr></hr>
                    <div>
                        <p className='judul'>NOMER SERI </p>
                        <p className='isi'>: {data && data.nomerSeri}</p>
                    </div>
                    <hr></hr>
                    <div>
                        <p className='judul'>TAHUN PEROLEHAN </p>
                        <p className='isi'>: {data && data.tanuhPerolehan}</p>
                    </div>
                    <hr></hr>
                    <div>
                        <p className='judul'>HARGA </p>
                        <p className='isi'>: {formatRupiah(data && data.harga)}</p>
                    </div>
                    <hr></hr>
                    <div>
                        <p className='judul'>LOKASI </p>
                        <p className='isi'>: {data && data.lokasi}</p>
                    </div>
                    <hr></hr>
                    <div>
                        <p className='judul'>KONDISI </p>
                        <p className='isi'>: {data && data.kondisi}</p>
                    </div>
                    <hr></hr>
                    <div>
                        <p className='judul'>KETERANGAN </p>
                        <p className='isi'>: {data && data.keterangan}</p>
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

export default DetailAset;
