import Breadcrumb from "@/components/Breadcrumb";
import AddBankLayer from "@/components/AddBankLayer";
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
        <Breadcrumb title='Users Grid' />

        {/* TransferListHistoryLayer */}
        <AddBankLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
