import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    
    return (
        <div>
            <Navbar></Navbar>
            {children}
            <Footer></Footer>  
        </div>
    )
}