import "./globals.css";
import CosmicBackground from "../components/CosmicBackground";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Ashtavakra Gita Explorer",
  description: "An Immersive Spatial Experience into Absolute Non-Duality",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#050505] text-[#f5f5f5] antialiased selection:bg-violet-500/30 overflow-x-hidden">
        <CosmicBackground />
        <CustomCursor />
        <Navbar />
        <div className="relative z-10">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
