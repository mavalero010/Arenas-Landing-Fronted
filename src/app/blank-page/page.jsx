import BlankPageLayer from "@/components/BlankPageLayer";
import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";

export const metadata = {
  title: "Arenas Inmobiliaria",
  description:
    "Arenas Inmobiliaria © 2025. Tu plataforma confiable para arrendar, comprar o alquilar inmuebles de forma segura.",
};

const Page = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Blank Page' />

        {/* BlankPageLayer */}
        <BlankPageLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
