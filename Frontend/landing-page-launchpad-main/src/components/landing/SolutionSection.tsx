import { motion, Variants } from "framer-motion";
import { CreditCard, Package, Heart, Calculator, UserCheck, BarChart3 } from "lucide-react";

const modules = [
  { icon: CreditCard, title: "POS Billing", desc: "Lightning-fast billing with GST compliance", color: "from-blue-600 to-blue-800" },
  { icon: Package, title: "Inventory Management", desc: "Real-time stock tracking & alerts", color: "from-blue-700 to-blue-900" },
  { icon: Heart, title: "CRM & Loyalty", desc: "Customer management & loyalty programs", color: "from-blue-800 to-indigo-900" },
  { icon: Calculator, title: "Accounting", desc: "Automated bookkeeping & reports", color: "from-indigo-700 to-indigo-900" },
  { icon: UserCheck, title: "Employee Management", desc: "Attendance, payroll & performance", color: "from-blue-800 to-purple-900" },
  { icon: BarChart3, title: "Reports & Dashboard", desc: "Insights at a glance with smart analytics", color: "from-purple-700 to-purple-900" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const iconVariants: Variants = {
  idle: { y: 0 },
  hover: { y: -5, scale: 1.1 },
  float: {
    y: [-2, 2, -2],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const SolutionSection = () => (
  <section className="relative py-16 lg:py-24 bg-gradient-to-br from-background via-secondary to-muted overflow-hidden">
    {/* Animated Background Elements */}
    <div className="absolute inset-0">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-20 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [-100, 100, -100],
          y: [-50, 50, -50],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 w-32 h-32 bg-primary/3 rounded-full blur-2xl"
      />
    </div>

    <div className="container relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-16"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-block px-4 py-2 bg-accent text-accent-foreground font-semibold text-sm uppercase tracking-wider rounded-full shadow-lg mb-4"
        >
          The Solution
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-4xl lg:text-5xl font-bold text-foreground leading-tight"
        >
          One Smart ERP For Complete Store Management
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="w-24 h-1 bg-accent mx-auto mt-6 rounded-full"
        />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {modules.map((m, i) => (
          <motion.div
            key={m.title}
            variants={cardVariants}
            whileHover={{
              scale: 1.05,
              rotateY: 5,
              rotateX: 5,
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }}
            className="group relative bg-card/80 backdrop-blur-lg rounded-2xl p-8 shadow-card border border-border hover:shadow-card-hover transition-all duration-500 overflow-hidden"
          >
            {/* Card Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${m.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`} />

            {/* Floating Particles Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <motion.div
                animate={{
                  x: [0, 20, 0],
                  y: [0, -15, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-4 right-4 w-2 h-2 bg-accent rounded-full"
              />
              <motion.div
                animate={{
                  x: [0, -15, 0],
                  y: [0, 20, 0],
                  scale: [1, 0.8, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-primary rounded-full"
              />
            </div>

            <motion.div
              variants={iconVariants}
              initial="idle"
              whileHover="hover"
              animate="float"
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
            >
              <m.icon className="h-8 w-8 text-white group-hover:scale-110 transition-transform duration-300" />
            </motion.div>

            <motion.h3
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1, scale: 1.02 }}
              className="font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300"
            >
              {m.title}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 1 }}
              className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300"
            >
              {m.desc}
            </motion.p>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-accent/0 to-primary/0 group-hover:from-primary/5 group-hover:via-accent/5 group-hover:to-primary/5 transition-all duration-500 pointer-events-none" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default SolutionSection;
