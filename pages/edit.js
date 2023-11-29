import dynamic from 'next/dynamic';
const Sidebar = dynamic(() => import('@/component/Sidebar'));
const Header = dynamic(() => import('@/component/Header'));
const Footer = dynamic(() => import('@/component/Footer'));
const FormUpdate = dynamic(() => import('@/component/FormUpdate'));
import SessionTimeout from '@/component/Auth/SessionTimeout';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

const edit = () => {
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
                    <FormUpdate/>
                    <Footer/>
                </div>
            </div>
            <SessionTimeout maxInactiveTime={10 * 60 * 1000} logoutCallback={handleLogout} />
        </>
    );
}

export default edit;
