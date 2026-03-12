import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchLandingPageContent } from "@/services/api";

const FAQSection = () => {

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

  const faqs = [
    {
      q:
        livePreview?.faq1_question ||
        content?.faq1_question ||
        "Is it GST Ready?",

      a:
        livePreview?.faq1_answer ||
        content?.faq1_answer ||
        "Yes! AI-Setu ERP is fully GST compliant with automatic tax calculations, GSTIN integration, and GST-ready invoicing.",
    },
    {
      q:
        livePreview?.faq2_question ||
        content?.faq2_question ||
        "Is Internet Required?",

      a:
        livePreview?.faq2_answer ||
        content?.faq2_answer ||
        "AI-Setu ERP is cloud-based for the best experience. However, basic billing can work offline and syncs when internet is available.",
    },
    {
      q:
        livePreview?.faq3_question ||
        content?.faq3_question ||
        "Do I Need Barcode?",

      a:
        livePreview?.faq3_answer ||
        content?.faq3_answer ||
        "No! Our AI-powered photo detection lets you bill products without barcodes — just snap a photo and the product is identified automatically.",
    },
    {
      q:
        livePreview?.faq4_question ||
        content?.faq4_question ||
        "Is Support Provided?",

      a:
        livePreview?.faq4_answer ||
        content?.faq4_answer ||
        "Yes, we provide 24/7 customer support via phone, email, and chat. Our team is always ready to help.",
    },
    {
      q:
        livePreview?.faq5_question ||
        content?.faq5_question ||
        "Is Training Included?",

      a:
        livePreview?.faq5_answer ||
        content?.faq5_answer ||
        "Absolutely. We provide complete setup and training for you and your staff as part of the package.",
    },
    {
      q:
        livePreview?.faq6_question ||
        content?.faq6_question ||
        "What About Renewal?",

      a:
        livePreview?.faq6_answer ||
        content?.faq6_answer ||
        "Annual renewal is available at a competitive rate. Refer others and earn ₹1,000 per renewal incentive!",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-secondary">

      <div className="container max-w-3xl">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >

          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            FAQ
          </span>

          <h2 className="text-3xl lg:text-4xl font-bold mt-2 text-foreground">
            {livePreview?.faq_title ||
             content?.faq_title ||
             "Frequently Asked Questions"}
          </h2>

        </motion.div>

        <Accordion type="single" collapsible className="space-y-3">

          {faqs.map((f, i) => (

            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-card border border-border rounded-xl px-6"
            >

              <AccordionTrigger className="font-heading font-semibold text-foreground hover:no-underline">
                {f.q}
              </AccordionTrigger>

              <AccordionContent className="text-muted-foreground">
                {f.a}
              </AccordionContent>

            </AccordionItem>

          ))}

        </Accordion>

      </div>

    </section>
  );
};

export default FAQSection;