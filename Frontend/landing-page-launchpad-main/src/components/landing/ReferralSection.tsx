import { motion } from "framer-motion";
import { Gift, RefreshCw, Infinity, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import ReferralPopup from "@/components/ReferralPopup";
import { fetchLandingPageContent } from "@/services/api";

const ReferralSection = () => {

  const [openPopup, setOpenPopup] = useState(false);
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

  const perks = [
    {
      icon: Gift,
      title: livePreview?.referral_item1_value || content?.referral_item1_value || "₹2,000",
      desc: livePreview?.referral_item1_text || content?.referral_item1_text || "Per Successful Sale"
    },
    {
      icon: RefreshCw,
      title: livePreview?.referral_item2_value || content?.referral_item2_value || "₹1,000",
      desc: livePreview?.referral_item2_text || content?.referral_item2_text || "Renewal Incentive"
    },
    {
      icon: UserPlus,
      title: livePreview?.referral_item3_value || content?.referral_item3_value || "₹1,000",
      desc: livePreview?.referral_item3_text || content?.referral_item3_text || "For Every Successful Referral Purchase"
    },
    {
      icon: Infinity,
      title: livePreview?.referral_item4_value || content?.referral_item4_value || "Unlimited",
      desc: livePreview?.referral_item4_text || content?.referral_item4_text || "Referrals Allowed"
    }
  ];

  // Popup reset handler (unchanged)
  const handleOpenPopup = () => {
    setOpenPopup(false);
    setTimeout(() => setOpenPopup(true), 10);
  };

  return (
    <section className="py-16 lg:py-24 bg-hero text-primary-foreground">

      <div className="container">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >

          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            {livePreview?.referral_label ||
             content?.referral_label ||
             "Referral Program"}
          </span>

          <h2 className="text-3xl lg:text-4xl font-bold mt-2">
            {livePreview?.referral_title ||
             content?.referral_title ||
             "Earn With AI-Setu ERP"}
          </h2>

        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-10">

          {perks.map((p, i) => {

            const Icon = p.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >

                <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-3">
                  <Icon className="h-7 w-7 text-accent" />
                </div>

                <h3 className="text-2xl font-bold text-gradient-gold">
                  {p.title}
                </h3>

                <p className="text-primary-foreground/70 text-sm mt-1">
                  {p.desc}
                </p>

              </motion.div>
            );

          })}

        </div>

        <div className="text-center">
          <Button
            onClick={handleOpenPopup}
            className="bg-gold-gradient text-accent-foreground font-semibold hover:opacity-90 px-8"
          >
            {livePreview?.join_referral ||
             content?.join_referral ||
             "Join Referral Program"}
          </Button>
        </div>

      </div>

      <ReferralPopup
        open={openPopup}
        onClose={() => setOpenPopup(false)}
      />

    </section>
  );
};

export default ReferralSection;