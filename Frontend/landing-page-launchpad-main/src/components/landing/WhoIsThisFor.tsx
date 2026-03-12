import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Store, ShoppingBag, Pill, Wrench, TrendingUp } from "lucide-react";
import { fetchLandingPageContent, LandingPageContent } from "@/services/api";

const WhoIsThisFor = () => {

  const [content, setContent] = useState<LandingPageContent | null>(null);
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

  // Live Preview Listener
  useEffect(() => {

    const handler = (event:any) => {

      if(event.data){
        setLivePreview((prev:any)=>({
          ...prev,
          ...event.data
        }))
      }

    }

    window.addEventListener("message", handler)

    return () => window.removeEventListener("message", handler)

  },[])

  const types = [
    {
      icon: Store,
      title:
        livePreview?.who1 ||
        content?.who1 ||
        "Kirana Stores",
    },
    {
      icon: ShoppingBag,
      title:
        livePreview?.who2 ||
        content?.who2 ||
        "General Stores",
    },
    {
      icon: Pill,
      title:
        livePreview?.who3 ||
        content?.who3 ||
        "Medical Shops",
    },
    {
      icon: Wrench,
      title:
        livePreview?.who4 ||
        content?.who4 ||
        "Hardware Stores",
    },
    {
      icon: TrendingUp,
      title:
        livePreview?.who5 ||
        content?.who5 ||
        "Margin Business Retailers",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-secondary">

      <div className="container">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >

          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            {livePreview?.who_main_title ||
              content?.who_main_title ||
              "Perfect For"}
          </span>

          <h2 className="text-3xl lg:text-4xl font-bold mt-2 text-foreground">
            {livePreview?.who_title ||
              content?.who_title ||
              "Who Is This For?"}
          </h2>

        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

          {types.map((t, i) => {

            const Icon = t.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-xl p-6 text-center shadow-card border border-border hover:shadow-card-hover transition-shadow"
              >

                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Icon className="h-7 w-7 text-primary" />
                </div>

                <h3 className="font-heading font-semibold text-sm text-foreground">
                  {t.title}
                </h3>

              </motion.div>
            );

          })}

        </div>

      </div>

    </section>
  );
};

export default WhoIsThisFor;