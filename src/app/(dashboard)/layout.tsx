import Navbar from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";

const DashboardLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-sidebar border-r border-sidebar-border">
        <Sidebar />
      </div>
      <main className="md:pl-72 min-h-screen bg-background">
        <Navbar />
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
