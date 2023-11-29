import React from 'react';
import Link from 'next/link';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie'; // Import Cookies

const Header = () => {
  const handleLogout = () => {
    Swal.fire({
      title: 'Apakah Anda yakin ingin keluar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Keluar',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove('token');
        Swal.fire({
          title: 'Anda berhasil keluar.',
          icon: 'success',
        }).then(() => {
          window.location.href = '/';
        });
      }
    });
  };

  return (
    <>
      <div className="topbar">
        <div className="toggle">
          <span></span>
        </div>
        <div className="user">
        <Link href="register">
          <button className="btn" style={{marginRight : '20px'}}>
            <span>Register</span>
          </button>
          </Link>
          <button className="btn" onClick={handleLogout}>
            <span>Log Out</span>
          </button>
        </div>
      </div>
      <br></br>
      <hr></hr>
    </>
  );
};
export default Header;
