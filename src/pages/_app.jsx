// _app.js (or equivalent root component)
import { AuthProvider } from '../context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <ToastContainer />
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}

export default MyApp;
