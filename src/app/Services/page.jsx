import Breadcrumb from "@/components/Breadcrumb";
import Services from "@/components/Services";
import MasterLayout from "@/masterLayout/MasterLayout";

export const metadata = {
  title: "Arenas Inmobiliaria",
  description:
    "Tu plataforma confiable para buscar inmuebles",
};

const Page = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}

        {/* UsersListLayer */}
        <Services />
      </MasterLayout>
    </>
  );
};

export default Page;
