import Breadcrumb from "@/components/Breadcrumb";
import UsersListLayer from "@/components/Footer";
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
        <Breadcrumb title='Users Grid' />

        {/* UsersListLayer */}
        <UsersListLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
