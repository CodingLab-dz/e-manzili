import { Inter } from "next/font/google";
import "./globals.css"
import Header from "@/components/header";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "E-manzili",
  description: "E manzili : leader dans le marché immobilier, spécialisée dans les résidences neuves, comparez les meilleures offres pour votre investissement",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-[#F5F5F5]">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
