import Breadcrumb from "@/components/Breadcrumb";
import LanguageLayer from "@/components/LanguageLayer";
import MasterLayout from "@/masterLayout/MasterLayout";

export const metadata = {
  title: "GBPay  Business",
  description:
    "GBPay © 2025. Tu plataforma confiable para transferencias internacionales rápidas, seguras y eficientes. Diseñada para facilitar la gestión de tus envíos y ofrecerte el mejor rendimiento en cada operación.",
};

const Page = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Settings - Languages' />

        {/* LanguageLayer */}
        <LanguageLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
