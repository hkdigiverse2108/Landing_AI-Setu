import { motion, Variants } from "framer-motion";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchLandingPageContent } from "@/services/api";

const rowVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const ComparisonSection = () => {

  const [content, setContent] = useState<any>(null);
  const [livePreview, setLivePreview] = useState<any>(null);

  // Fetch DB content
  useEffect(() => {
    const loadContent = async () => {
      const data = await fetchLandingPageContent();
      if (data) {
        setContent(data);
      }
    };
    loadContent();
  }, []);

  // Live preview listener
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

  const rows = [
    {
      feature:
        livePreview?.comparison_feature1 ||
        content?.comparison_feature1 ||
        "AI Photo Billing",
      us: true,
      them: false,
    },
    {
      feature:
        livePreview?.comparison_feature2 ||
        content?.comparison_feature2 ||
        "Simple Interface",
      us: true,
      them: false,
    },
    {
      feature:
        livePreview?.comparison_feature3 ||
        content?.comparison_feature3 ||
        "One Package Pricing",
      us: true,
      them: false,
    },
    {
      feature:
        livePreview?.comparison_feature4 ||
        content?.comparison_feature4 ||
        "Retail-Focused",
      us: true,
      them: false,
    },
    {
      feature:
        livePreview?.comparison_feature5 ||
        content?.comparison_feature5 ||
        "GST Ready",
      us: true,
      them: true,
    },
    {
      feature:
        livePreview?.comparison_feature6 ||
        content?.comparison_feature6 ||
        "Cloud Access",
      us: true,
      them: false,
    },
    {
      feature:
        livePreview?.comparison_feature7 ||
        content?.comparison_feature7 ||
        "24/7 Support",
      us: true,
      them: false,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-slate-50 to-slate-100">

      <div className="container mx-auto px-6">

        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >

          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            {livePreview?.comparison_title ||
             content?.comparison_title ||
             "AI-Setu ERP vs Traditional Software"}
          </h2>

          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            {livePreview?.comparison_subtitle ||
             content?.comparison_subtitle ||
             "Discover why retailers are switching to AI-Setu ERP for faster, smarter store management."}
          </p>

        </motion.div>

        {/* COMPARISON CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -5 }}
          className="max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-white border border-gray-200"
        >

          {/* HEADER */}
          <div className="relative grid grid-cols-3 text-center font-semibold text-sm p-5 bg-gradient-to-r from-[#1F2E4D] to-[#2D3748] text-white">

            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />

            <span className="text-left relative z-10">
              {livePreview?.comparison_title1 ||
               content?.comparison_title1 ||
               "Feature"}
            </span>

            <span className="text-yellow-400 relative z-10">
              {livePreview?.comparison_title2 ||
               content?.comparison_title2 ||
               "AI-Setu ERP"}
            </span>

            <span className="opacity-80 relative z-10">
              {livePreview?.comparison_title3 ||
               content?.comparison_title3 ||
               "Traditional"}
            </span>

          </div>

          {/* ROWS */}
          {rows.map((row, i) => (
            <motion.div
              key={row.feature}
              custom={i}
              variants={rowVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{
                backgroundColor: "#f8fafc",
                scale: 1.01,
              }}
              className="grid grid-cols-3 items-center px-6 py-4 border-b last:border-none text-sm transition-all"
            >

              <span className="text-left font-medium text-gray-800">
                {row.feature}
              </span>

              <span className="flex justify-center">
                {row.us ? (
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(34,197,94,0)",
                        "0 0 12px rgba(34,197,94,0.5)",
                        "0 0 0px rgba(34,197,94,0)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100"
                  >
                    <Check className="h-5 w-5 text-green-600" />
                  </motion.div>
                ) : (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
                    <X className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </span>

              <span className="flex justify-center">
                {row.them ? (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                ) : (
                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100"
                  >
                    <X className="h-5 w-5 text-red-500" />
                  </motion.div>
                )}
              </span>

            </motion.div>
          ))}

        </motion.div>

      </div>

    </section>
  );
};

export default ComparisonSection;