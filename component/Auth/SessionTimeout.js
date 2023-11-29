import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
const SessionTimeout = ({ maxInactiveTime, logoutCallback }) => {
  const [lastActivity, setLastActivity] = useState(new Date().getTime());
  const handleActivity = () => {
    setLastActivity(new Date().getTime());
  };
  useEffect(() => {
    const token = Cookies.get('token');

    const checkTokenExpiration = () => {
      const currentTime = new Date().getTime();
      if (token && currentTime - lastActivity > maxInactiveTime) {
        Cookies.remove('token');
        logoutCallback(); // Panggil callback untuk logout
        Swal.fire({
          title: 'Sesi Anda telah berakhir, Silahkan Login Kembali.',
          width: 600,
          padding: '3em',
          color: '#716add',
          background: '#2a2185',
          backdrop: `
            rgba(0,0,123,0.4)
            url("/images/nyan-cat.gif")
            left top
            no-repeat
          `
        });
      }
    };
    const tokenCheckInterval = setInterval(checkTokenExpiration, 60000); // Cek setiap menit
    return () => {
      clearInterval(tokenCheckInterval);
    };
  }, [lastActivity, maxInactiveTime]);
  return <div onMouseMove={handleActivity} onFocus={handleActivity} />;
};
export default SessionTimeout;
