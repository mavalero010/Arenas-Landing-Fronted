import Breadcrumb from "@/components/Breadcrumb";
import Testimonials from "@/components/TestimonialsLayer";
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
        <Testimonials />
      </MasterLayout>
    </>
  );
};

export default Page;
