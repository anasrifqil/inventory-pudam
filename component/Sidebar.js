import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
const Sidebar = () => {
    const router = useRouter();
    const isActive = (pathname) => router.pathname === pathname;
    useEffect(() => {
        const handleMouseOver = (event) => {
            const listItems = document.querySelectorAll(".navigation li");
            listItems.forEach((item) => item.classList.remove("hovered"));
            event.target.classList.add("hovered");
        };
        const listItems = document.querySelectorAll(".navigation li");
        listItems.forEach((item) => item.addEventListener("mouseover", handleMouseOver));
        return () => {
            // Clean up the event listeners when the component unmounts
            listItems.forEach((item) => item.removeEventListener("mouseover", handleMouseOver));
        };
    }, []); // Empty dependency array ensures that this effect runs only once on mount

    function handleToggle  () {
        const navigation = document.querySelector(".navigation");
        const main = document.querySelector(".main");
        navigation.classList.toggle("active");
        main.classList.toggle("active");
    }
    return (
        <div className="navigation">
            <ul>

                <li >
                     <Link className= "a " href="#">
                        <span className="icon">
                                
                        </span>
                        <span className="title">PUDAM WONGSOREJO</span>
                     </Link>
                </li>
                <li className={isActive("/dashboard") ? "actif" : ""}>
                     <Link className= "a" href="dashboard">
                        <span className="icon">
                            <ion-icon name="home-outline" />
                        </span>
                        <span className="title">Dashboard</span>
                     </Link>
                </li>
                <li className={isActive("/databarang") ? "actif" : ""}>
                     <Link className= "a" href="databarang">
                        <span className="icon">
                        <ion-icon name="briefcase-outline"/>
                        </span>
                        <span className="title">Data BON Barang</span>
                     </Link>
                </li>
                <li className={isActive("/datapegawai") ? "actif" : ""}>
                     <Link className= "a" href="datapegawai">
                        <span className="icon">
                        <ion-icon name="people-outline"></ion-icon>
                        </span>
                        <span className="title">Data Pegawai</span>
                     </Link>
                </li>
                <li className={isActive("/dataaset") ? "actif" : ""}>
                     <Link className= "a" href="dataaset">
                        <span className="icon">
                        <ion-icon name="diamond-outline"></ion-icon>
                        </span>
                        <span className="title">Data Aset</span>
                     </Link>
                </li>
                <li className={isActive("/laporan") ? "actif" : ""}>
                     <Link className= "a" href="laporan">
                        <span className="icon">
                        <ion-icon name="book-outline"></ion-icon>
                        </span>
                        <span className="title">History BON</span>
                     </Link>
                </li>
                <li className={isActive("") ? "actif" : ""}>
                     <Link className= "a" href="suratmasuk">
                        <span className="icon">
                        <ion-icon name="mail-unread-outline"></ion-icon>
                        </span>
                        <span className="title">Data Surat Masuk</span>
                     </Link>
                </li>
                <li className={isActive("") ? "actif" : ""}>
                     <Link className= "a" href="suratkeluar">
                        <span className="icon">
                        <ion-icon name="mail-open-outline"></ion-icon>
                        </span>
                        <span className="title">Data Surat Keluar</span>
                     </Link>
                </li>
            </ul>
            <div className="toggle">
            <ion-icon name="menu-outline" onClick={handleToggle} style={{ color: 'white' }} />

                </div>
        </div>
        
    );
}

export default Sidebar ;
