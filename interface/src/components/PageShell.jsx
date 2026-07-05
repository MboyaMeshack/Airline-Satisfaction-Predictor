import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";

export default function PageShell({ title, description, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg">
      
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-[26rem] w-[26rem] rounded-full bg-accent-teal/[0.08] blur-[130px]" />
        <div className="absolute top-1/3 -right-32 h-[26rem] w-[26rem] rounded-full bg-blue-500/[0.08] blur-[130px]" />
        <div className="absolute bottom-0 left-1/4 h-[24rem] w-[24rem] rounded-full bg-accent-cyan/[0.06] blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.035),transparent_55%)]" />
      </div>

      <div className="relative z-10 flex min-h-screen">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex min-h-screen flex-1 flex-col">
          <Topbar title={title} description={description} onMenuClick={() => setSidebarOpen(true)} />
          <motion.main
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex-1 px-5 py-6 sm:px-8 sm:py-8"
          >
            <div className="mx-auto w-full max-w-6xl">{children}</div>
          </motion.main>
        </div>
      </div>
    </div>
  );
}
