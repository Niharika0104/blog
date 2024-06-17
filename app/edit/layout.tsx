import type { Metadata } from "next";
import { AuthProvider } from "../Context/AuthContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
      <AuthProvider>
           <ToastContainer 
        position="top-center" 
        autoClose={5000} 
        className={"rounded-full h-10"}
      
        newestOnTop 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
          {children}
        
        </AuthProvider>
    
  );
}
