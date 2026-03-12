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
import { fetchLandingPageContent, LandingPageContent } from "@/services/api";

const defaultModules = [
  {
    icon: CreditCard,
    title: "POS Billing",
    desc: "Lightning-fast billing with GST compliance",
    color: "from-blue-600 to-blue-800",
  },
  {
    icon: Package,
    title: "Inventory Management",
    desc: "Real-time stock tracking & alerts",
    color: "from-blue-700 to-blue-900",
  },
  {
    icon: Heart,
    title: "CRM & Loyalty",
    desc: "Customer management & loyalty programs",
    color: "from-blue-800 to-indigo-900",
  },
  {
    icon: Calculator,
    title: "Accounting",
    desc: "Automated bookkeeping & reports",
    color: "from-indigo-700 to-indigo-900",
  },
  {
    icon: UserCheck,
    title: "Employee Management",
    desc: "Attendance, payroll & performance",
    color: "from-blue-800 to-purple-900",
  },
  {
    icon: BarChart3,
    title: "Reports & Dashboard",
    desc: "Insights at a glance with smart analytics",
    color: "from-purple-700 to-purple-900",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
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
  const [content, setContent] = useState<LandingPageContent | null>(null);
  const [livePreview, setLivePreview] = useState<any>(null);

  // Fetch DB data
  useEffect(() => {
    const loadContent = async () => {
      const data = await fetchLandingPageContent();
      if (data) setContent(data);
    };
    loadContent();
  }, []);

  // Live preview from admin
  useEffect(() => {
    const handler = (event: any) => {
      if (event.data) {
        setLivePreview((prev: any) => ({
          ...prev,
          ...event.data,
        }));
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const modules = [
    {
      icon: CreditCard,
      title:
        livePreview?.solution1_title ||
        content?.solution1_title ||
        defaultModules[0].title,
      desc:
        livePreview?.solution1_desc ||
        content?.solution1_desc ||
        defaultModules[0].desc,
      color: defaultModules[0].color,
    },
    {
      icon: Package,
      title:
        livePreview?.solution2_title ||
        content?.solution2_title ||
        defaultModules[1].title,
      desc:
        livePreview?.solution2_desc ||
        content?.solution2_desc ||
        defaultModules[1].desc,
      color: defaultModules[1].color,
    },
    {
      icon: Heart,
      title:
        livePreview?.solution3_title ||
        content?.solution3_title ||
        defaultModules[2].title,
      desc:
        livePreview?.solution3_desc ||
        content?.solution3_desc ||
        defaultModules[2].desc,
      color: defaultModules[2].color,
    },
    {
      icon: Calculator,
      title:
        livePreview?.solution4_title ||
        content?.solution4_title ||
        defaultModules[3].title,
      desc:
        livePreview?.solution4_desc ||
        content?.solution4_desc ||
        defaultModules[3].desc,
      color: defaultModules[3].color,
    },
    {
      icon: UserCheck,
      title:
        livePreview?.solution5_title ||
        content?.solution5_title ||
        defaultModules[4].title,
      desc:
        livePreview?.solution5_desc ||
        content?.solution5_desc ||
        defaultModules[4].desc,
      color: defaultModules[4].color,
    },
    {
      icon: BarChart3,
      title:
        livePreview?.solution6_title ||
        content?.solution6_title ||
        defaultModules[5].title,
      desc:
        livePreview?.solution6_desc ||
        content?.solution6_desc ||
        defaultModules[5].desc,
      color: defaultModules[5].color,
    },
  ];

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-br from-background via-secondary to-muted overflow-hidden">
      <div className="container relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-accent text-accent-foreground font-semibold text-sm uppercase tracking-wider rounded-full shadow-lg mb-4">
            {livePreview?.solution_section_label ||
              content?.solution_section_label ||
              "The Solution"}
          </span>

          <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            {livePreview?.solution_section_title ||
              content?.solution_section_title ||
              "One Smart ERP For Complete Store Management"}
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
          {modules.map((m, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="group bg-card rounded-2xl p-8 shadow-card border border-border hover:shadow-card-hover transition-all"
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center mb-6`}
              >
                <m.icon className="h-8 w-8 text-white" />
              </div>

              <h3 className="font-bold text-xl text-foreground mb-3">
                {m.title}
              </h3>

              <p className="text-muted-foreground">{m.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionSection;