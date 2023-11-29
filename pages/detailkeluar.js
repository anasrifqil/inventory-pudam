import dynamic from 'next/dynamic';
const Sidebar = dynamic(() => import('@/component/Sidebar'));
const Header = dynamic(() => import('@/component/Header'));
const DetailKeluar = dynamic(() => import('@/component/DetailKeluar'));
const Footer = dynamic(() => import('@/component/Footer'));
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import SessionTimeout from '@/component/Auth/SessionTimeout';
const detailkeluar = () => {
  const router = useRouter();
  const token = Cookies.get('token');
  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/'); // Redirect ke halaman login saat logout
  };
  useEffect(() => {
    if (!token) {
      router.push('/'); 
    }
  }, []);

    return (
      <>
        <div className="container">
        <Sidebar />
        <div className="main">
          <Header />
          <DetailKeluar/>
          <Footer/>
        </div>
      </div>
      <SessionTimeout maxInactiveTime={10 * 60 * 1000} logoutCallback={handleLogout} />
      </>
    );
}

export default detailkeluar;
