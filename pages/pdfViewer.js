import PrivateRoute from '@/component/Auth/PrivateRoute';
import dynamic from 'next/dynamic';
const PdfViewerPage = dynamic(() => import('@/component/PdfViewerPage'));
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import SessionTimeout from '@/component/Auth/SessionTimeout';
const PdfViewer = () => {
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
    <div>
        <PdfViewerPage />
        <SessionTimeout maxInactiveTime={10 * 60 * 1000} logoutCallback={handleLogout} />
    </div>
  );
}

export default PdfViewer;
