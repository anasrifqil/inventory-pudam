import dynamic from 'next/dynamic';
const Sidebar = dynamic(() => import('@/component/Sidebar'));
const Header = dynamic(() => import('@/component/Header'));
const Laporan = dynamic(() => import('@/component/Laporan'));
const Footer = dynamic(() => import('@/component/Footer'));
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import SessionTimeout from '@/component/Auth/SessionTimeout';
import React, { useState, useEffect } from 'react';

function laporan() {
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
          <Laporan />
          <Footer />
        </div>
      </div>
      <SessionTimeout maxInactiveTime={10 * 60 * 1000} logoutCallback={handleLogout} />
    </>

  );
}

export default laporan;
