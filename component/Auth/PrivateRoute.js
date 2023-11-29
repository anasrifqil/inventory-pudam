// PrivateRoute.js
import { useAuth } from './AuthContext';
import { useRouter } from 'next/router';

const PrivateRoute = ({ children }) => {
    const { state } = useAuth();
    const router = useRouter();

    // Pemeriksaan status autentikasi
    if (!state.isAuthenticated) {
        // Redirect ke halaman login jika tidak autentikasi
        if (typeof window !== 'undefined') {

            router.push('/');
            return null;
        }

    }

    // Tampilkan konten jika autentikasi
    return children;
};

export default PrivateRoute;
