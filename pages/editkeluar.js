import dynamic from 'next/dynamic';
import SessionTimeout from '@/component/Auth/SessionTimeout';
const Sidebar = dynamic(() => import('@/component/Sidebar'));
const Footer = dynamic(() => import('@/component/Footer'));
const Header = dynamic(() => import('@/component/Header'));
const FormUpdateKeluar = dynamic(() => import('@/component/FormUpdateKeluar'));
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

const editkeluar = () => {
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
                    <FormUpdateKeluar/>
                    <Footer/>
                </div>
            </div>
            <SessionTimeout maxInactiveTime={10 * 60 * 1000} logoutCallback={handleLogout} />
        </>
    );
}

export default editkeluar;