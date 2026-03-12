import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Package, TrendingDown, Users, Barcode } from "lucide-react";
import { fetchLandingPageContent, LandingPageContent } from "@/services/api";

const defaultProblems = [
  {
    icon: Clock,
    title: "Slow Billing",
    desc: "Manual billing wastes time & creates long queues",
  },
  {
    icon: Package,
    title: "No Stock Control",
    desc: "Inventory mismatches lead to lost sales",
  },
  {
    icon: TrendingDown,
    title: "Unknown Profit Margin",
    desc: "Can't track real profit per product",
  },
  {
    icon: Users,
    title: "Staff Dependency",
    desc: "Business stops when key staff is absent",
  },
  {
    icon: Barcode,
    title: "Barcode Not Available",
    desc: "Most Indian products lack barcodes",
  },
];

const ProblemSection = () => {

  const [content, setContent] = useState<LandingPageContent | null>(null);

  const [livePreview, setLivePreview] = useState<any>(null);

  // Fetch data from Django API
  useEffect(() => {

    const loadContent = async () => {
      const data = await fetchLandingPageContent();
      if (data) {
        setContent(data);
      }
    };

    loadContent();

  }, []);

  // Listen for admin live preview
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

  const problems = [
    {
      icon: Clock,
      title:
        livePreview?.problem1_title ||
        content?.problem1_title ||
        defaultProblems[0].title,
      desc:
        livePreview?.problem1_description ||
        content?.problem1_description ||
        defaultProblems[0].desc,
    },
    {
      icon: Package,
      title:
        livePreview?.problem2_title ||
        content?.problem2_title ||
        defaultProblems[1].title,
      desc:
        livePreview?.problem2_description ||
        content?.problem2_description ||
        defaultProblems[1].desc,
    },
    {
      icon: TrendingDown,
      title:
        livePreview?.problem3_title ||
        content?.problem3_title ||
        defaultProblems[2].title,
      desc:
        livePreview?.problem3_description ||
        content?.problem3_description ||
        defaultProblems[2].desc,
    },
    {
      icon: Users,
      title:
        livePreview?.problem4_title ||
        content?.problem4_title ||
        defaultProblems[3].title,
      desc:
        livePreview?.problem4_description ||
        content?.problem4_description ||
        defaultProblems[3].desc,
    },
    {
      icon: Barcode,
      title:
        livePreview?.problem5_title ||
        content?.problem5_title ||
        defaultProblems[4].title,
      desc:
        livePreview?.problem5_description ||
        content?.problem5_description ||
        defaultProblems[4].desc,
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">

      <div className="container">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >

          <span className="text-accent font-semibold text-sm uppercase tracking-wider">

            {livePreview?.problem_section_label ||
              content?.problem_section_label ||
              "The Challenge"}

          </span>

          <h2 className="text-3xl lg:text-4xl font-bold mt-2 text-foreground">

            {livePreview?.problem_section_title ||
              content?.problem_section_title ||
              "Retailers Face These Daily Problems"}

          </h2>

        </motion.div>

        {/* Problem Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">

          {problems.map((p, i) => (

            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl p-6 shadow-card border border-border hover:shadow-card-hover transition-shadow"
            >

              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                <p.icon className="h-5 w-5 text-destructive" />
              </div>

              <h3 className="font-heading font-bold text-foreground mb-1">
                {p.title}
              </h3>

              <p className="text-sm text-muted-foreground">
                {p.desc}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default ProblemSection;