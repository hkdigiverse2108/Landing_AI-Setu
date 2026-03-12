import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, IndianRupee, Cloud, Headphones } from "lucide-react";
import { fetchLandingPageContent, LandingPageContent } from "@/services/api";

const defaultItems = [
  "Made for Indian Retailers",
  "GST Ready",
  "Secure Cloud Data",
  "24/7 Support",
];

const TrustStrip = () => {

  const [content, setContent] = useState<LandingPageContent | null>(null);

  // LIVE ADMIN PREVIEW
  const [livePreview, setLivePreview] = useState<any>(null);

  // Load DB content
  useEffect(() => {

    const loadContent = async () => {

      const data = await fetchLandingPageContent();

      if (data) {
        setContent(data);
      }

    };

    loadContent();

  }, []);

  // Listen for Django admin preview updates
  useEffect(() => {

    const handler = (event: any) => {

      if (event.data) {
        setLivePreview(event.data);
      }

    };

    window.addEventListener("message", handler);

    return () => window.removeEventListener("message", handler);

  }, []);

  const items = [
    {
      icon: IndianRupee,
      label:
        livePreview?.trust_item1 ||
        content?.trust_item1 ||
        defaultItems[0],
      color: "text-yellow-400",
    },
    {
      icon: ShieldCheck,
      label:
        livePreview?.trust_item2 ||
        content?.trust_item2 ||
        defaultItems[1],
      color: "text-green-400",
    },
    {
      icon: Cloud,
      label:
        livePreview?.trust_item3 ||
        content?.trust_item3 ||
        defaultItems[2],
      color: "text-blue-400",
    },
    {
      icon: Headphones,
      label:
        livePreview?.trust_item4 ||
        content?.trust_item4 ||
        defaultItems[3],
      color: "text-purple-400",
    },
  ];

  return (
    <section className="border-y border-border bg-gradient-to-r from-background via-secondary/30 to-background">
      <div className="container py-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {items.map((item, i) => (

            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3 justify-center px-4 py-3 rounded-xl
              bg-card border border-border shadow-sm
              hover:shadow-card-hover hover:border-accent/30 transition-all duration-200 group"
            >

              <div
                className={`p-2 rounded-lg bg-accent/10 ${item.color} group-hover:scale-110 transition-transform duration-200`}
              >
                <item.icon className="h-4 w-4" />
              </div>

              <span className="text-sm font-semibold text-foreground">
                {item.label}
              </span>

            </motion.div>

          ))}

        </div>
      </div>
    </section>
  );
};

export default TrustStrip;