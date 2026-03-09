import { motion } from "framer-motion";
import { Camera, Cpu, Zap, Sparkles } from "lucide-react";
import aiScan from "@/assets/ai-scan.jpg";

const features = [
  {
    icon: Camera,
    title: "Photo-Based Product Detection",
    desc: "Instant product recognition from images",
  },
  {
    icon: Cpu,
    title: "AI Auto Identify Product",
    desc: "Smart AI-powered identification system",
  },
  {
    icon: Zap,
    title: "Add Directly to Bill",
    desc: "Seamless one-click billing integration",
  },
];

const USPSection = () => (
  <section className="relative py-16 lg:py-32 bg-gradient-to-br from-[#1F2E4D] via-[#2D3748] to-[#1A202C] text-primary-foreground overflow-hidden">
    
    {/* Background glow elements */}
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
      />
    </div>

    <div className="container relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full border border-accent/30 mb-6">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              AI-Powered (Beta Feature)
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
            No Barcode?{" "}
            <span className="bg-gradient-to-r from-[#F4B400] via-[#FFD700] to-[#F4B400] bg-clip-text text-transparent">
              No Problem.
            </span>
          </h2>

          <p className="text-lg text-gray-300 mb-10 max-w-md leading-relaxed">
            Our AI technology identifies products from photos — just snap and bill.
            No barcode scanner needed. Lightning-fast, accurate, and incredibly simple.
          </p>

          {/* FEATURES */}
          <div className="space-y-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.04, x: 8 }}
                className="group flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-yellow-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <f.icon className="h-6 w-6 text-[#1F2E4D]" />
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-1 group-hover:text-accent transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.03,
              rotate: 1,
            }}
            className="relative w-[420px]"
          >
            {/* Soft Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 blur-3xl rounded-3xl"></div>

            {/* Rectangle Image */}
            <motion.img
              src={aiScan}
              alt="AI Product Scanning"
              className="relative z-10 w-full h-auto object-cover rounded-2xl shadow-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />

            {/* Light Sweep Effect */}
            <motion.div
              animate={{ x: ["-120%", "120%"] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-2xl z-20"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default USPSection;

