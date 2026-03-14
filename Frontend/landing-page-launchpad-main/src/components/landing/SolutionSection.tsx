import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  CreditCard,
  Package,
  Heart,
  Calculator,
  UserCheck,
  BarChart3,
} from "lucide-react";

import { fetchSolutions } from "@/services/api";

const iconMap: any = {
  "credit-card": CreditCard,
  package: Package,
  heart: Heart,
  calculator: Calculator,
  "user-check": UserCheck,
  "bar-chart": BarChart3,
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 12 },
  },
};

const SolutionSection = () => {

  const [solutions, setSolutions] = useState<any[]>([]);

  useEffect(() => {

    const loadSolutions = async () => {

      const data = await fetchSolutions();
      setSolutions(data);

    };

    loadSolutions();

  }, []);

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-br from-background via-secondary to-muted overflow-hidden">

      <div className="container relative z-10">

        {/* Header */}
        <div className="text-center mb-16">

          <span className="inline-block px-4 py-2 bg-accent text-accent-foreground font-semibold text-sm uppercase tracking-wider rounded-full shadow-lg mb-4">
            The Solution
          </span>

          <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            One Smart ERP For Complete Store Management
          </h2>

        </div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >

          {solutions.map((s, i) => {

            const Icon = iconMap[s.icon];

            return (

              <motion.div
                key={i}
                variants={cardVariants}
                className="group bg-card rounded-2xl p-8 shadow-card border border-border hover:shadow-card-hover transition-all"
              >

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-900 flex items-center justify-center mb-6">

                  {Icon && <Icon className="h-8 w-8 text-white" />}

                </div>

                <h3 className="font-bold text-xl text-foreground mb-3">
                  {s.title}
                </h3>

                <p className="text-muted-foreground">
                  {s.description}
                </p>

              </motion.div>

            );

          })}

        </motion.div>

      </div>

    </section>
  );
};

export default SolutionSection;