import Banner from "@/components/Banner";
import MasterLayout from "@/masterLayout/MasterLayout";
export const metadata = {
  title: "Arenas Inmobiliaria",
  description:
    "Arenas Inmobiliaria © 2025. Tu plataforma confiable para arrendar, comprar o alquilar inmuebles de forma segura.",
};

const Page = () => {
  return (
    <>
      <MasterLayout>
        <Banner/>
      </MasterLayout>
    </>
  );
};

export default Page;
