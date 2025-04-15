import AddUserLayer from "@/components/AddUserLayer";
import Breadcrumb from "@/components/Breadcrumb";
import FormPageLayer from "@/components/FormPageLayer";
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
        <Breadcrumb title='Input Form' />

        {/* FormPageLayer */}
        <FormPageLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
