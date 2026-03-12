import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, Settings, Rocket } from "lucide-react";
import { fetchLandingPageContent, LandingPageContent } from "@/services/api";

const HowItWorks = () => {

  const [content, setContent] = useState<LandingPageContent | null>(null);

  // Live preview
  const [livePreview, setLivePreview] = useState<any>(null);

  useEffect(() => {

    const loadContent = async () => {
      const data = await fetchLandingPageContent();
      if (data) {
        setContent(data);
      }
    };

    loadContent();

  }, []);

  // Live preview from admin panel
  useEffect(() => {

    const handler = (event: any) => {

      if (event.data) {
        setLivePreview((prev: any) => ({
          ...prev,
          ...event.data
        }));
      }

    };

    window.addEventListener("message", handler);

    return () => window.removeEventListener("message", handler);

  }, []);

  const steps = [
    {
      icon: CalendarCheck,
      num: "01",
      title:
        livePreview?.howitworks_step1_title ||
        content?.howitworks_step1_title ||
        "Book Demo",

      desc:
        livePreview?.howitworks_step1_desc ||
        content?.howitworks_step1_desc ||
        "Schedule a quick demo with our team",
    },
    {
      icon: Settings,
      num: "02",
      title:
        livePreview?.howitworks_step2_title ||
        content?.howitworks_step2_title ||
        "Setup & Training",

      desc:
        livePreview?.howitworks_step2_desc ||
        content?.howitworks_step2_desc ||
        "We configure everything for you",
    },
    {
      icon: Rocket,
      num: "03",
      title:
        livePreview?.howitworks_step3_title ||
        content?.howitworks_step3_title ||
        "Start Smart Billing",

      desc:
        livePreview?.howitworks_step3_desc ||
        content?.howitworks_step3_desc ||
        "Go live and start selling instantly",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">

      <div className="container">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >

          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            {livePreview?.howitworks_label ||
              content?.howitworks_label ||
              "Simple Process"}
          </span>

          <h2 className="text-3xl lg:text-4xl font-bold mt-2 text-foreground">
            {livePreview?.howitworks_title ||
              content?.howitworks_title ||
              "How It Works"}
          </h2>

        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">

          {steps.map((s, i) => {

            const Icon = s.icon;

            return (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="text-center relative"
              >

                <div className="w-16 h-16 rounded-2xl bg-gold-gradient flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-7 w-7 text-accent-foreground" />
                </div>

                <span className="text-xs font-bold text-accent tracking-widest">
                  {s.num}
                </span>

                <h3 className="font-heading font-bold text-xl text-foreground mt-1 mb-2">
                  {s.title}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {s.desc}
                </p>

              </motion.div>
            );

          })}

        </div>

      </div>

    </section>
  );
};

export default HowItWorks;