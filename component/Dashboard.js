import axios from 'axios';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    const [rowsbarang, setRowsBarang] = useState(0);
    const [rowsaset, setRowsAset] = useState(0);
    const [rowspegawai, setRowsPegawai] = useState(0);
    const [rowsmasuk, setRowsMasuk] = useState(0);
    const [rowskeluar, setRowsKeluar] = useState(0);
    const [rowshistory, setRowsHistory] = useState(0);


    const getInventaris = async () => {
        const response = await axios.get(
            `http://localhost:5000/inventaris`
        );
        setRowsBarang(response.data.totalRows);
    };
    const getAset = async () => {
        const response = await axios.get(
            `http://localhost:5000/aset`
        );
        setRowsAset(response.data.totalRows);
    };
    const getPegawai = async () => {
        const response = await axios.get(
            `http://localhost:5000/pegawai`
        );
        setRowsPegawai(response.data.totalRows);
    };
    const getMasuk = async () => {
        const response = await axios.get(
            `http://localhost:5000/masuk`
        );
        setRowsMasuk(response.data.totalRows);
    };
    const getKeluar = async () => {
        const response = await axios.get(
            `http://localhost:5000/keluar`
        );
        setRowsKeluar(response.data.totalRows);
    };
    const getHistory = async () => {
        const response = await axios.get(
            `http://localhost:5000/laporan`
        );
        setRowsHistory(response.data.totalRows);
    };
    useEffect(() => {
        getInventaris();
        getAset();
        getPegawai();
        getMasuk();
        getKeluar();
        getHistory();

    });
    console.log(rowsbarang, rowsaset, rowspegawai, rowsmasuk, rowskeluar, rowshistory)
    return (
        <>
            <div className="cardBox" id="cardBox">
                <div className="card">
                    <Link className='content-wreaper' href='databarang' style={{ textDecoration: 'none', }}>
                        <div className="content">
                            <div className="text">
                                <div className="numbers">{rowsbarang}</div>
                                <div className="cardName">Data BON Barang</div>
                            </div>
                            <div className="iconBx">
                                <ion-icon name="briefcase-outline" />
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="card">
                    <Link className='content-wreaper' href='datapegawai' style={{ textDecoration: 'none' }}>
                        <div className="content">
                            <div className="text">
                                <div className="numbers">{rowspegawai}</div>
                                <div className="cardName">Data Pegawai</div>
                            </div>
                            <div className="iconBx">
                                <ion-icon name="people-outline"></ion-icon>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="card">
                    <Link className='content-wreaper' href='dataaset' style={{ textDecoration: 'none' }}>
                        <div className="content">
                            <div className="text">
                                <div className="numbers">{rowsaset}</div>
                                <div className="cardName">Data Aset</div>
                            </div>
                            <div className="iconBx">
                                <ion-icon name="diamond-outline"></ion-icon>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="card">
                    <Link className='content-wreaper' href='laporan' style={{ textDecoration: 'none' }}>
                        <div className="content">
                            <div className="text">
                                <div className="numbers">{rowshistory}</div>
                                <div className="cardName">History BON</div>
                            </div>
                            <div className="iconBx">
                                <ion-icon name="book-outline"></ion-icon>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="card">
                    <Link className='content-wreaper' href='suratmasuk' style={{ textDecoration: 'none' }}>
                    <div className="content">
                        <div className="text">
                            <div className="numbers">{rowsmasuk}</div>
                            <div className="cardName">Data Surat Masuk</div>
                        </div>
                        <div className="iconBx">
                            <ion-icon name="mail-unread-outline"></ion-icon>
                        </div>
                        </div>
                    </Link>
                </div>
                <div className="card">
                    <Link className='content-wreaper' href='suratkeluar' style={{ textDecoration: 'none' }}>
                    <div className="content">
                        <div className="text">
                            <div className="numbers">{rowskeluar}</div>
                            <div className="cardName">Data Surat Keluar</div>
                        </div>
                        <div className="iconBx">
                            <ion-icon name="mail-open-outline"></ion-icon>
                        </div>
                        </div>
                    </Link>
                </div>
            </div>
        </>

    );
}

export default Dashboard;
