import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllTestimonials = () => {
  const [content, setContent] = useState<any>(null);
  const [livePreview, setLivePreview] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
  const interval = setInterval(async () => {
    const res = await fetch("http://127.0.0.1:8000/api/landing-page/");
    const data = await res.json();
    setContent(data);
  }, 5000); // fetch every 5 seconds
  return () => clearInterval(interval);
}, []);

  useEffect(() => {
    const handler = (event: any) => {
      console.log("Preview message received:", event.data);
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

  useEffect(() => {
    const loadReviews = async () => {
      const res = await fetch("http://127.0.0.1:8000/api/testimonials/");
      const data = await res.json();
      setReviews(data);
    };
    loadReviews();
  }, []);

  return (
    <>
      <Header />

      <main className="bg-[#F5F6FA]">

        {/* HERO SECTION */}
        <section className="bg-gradient-to-br from-[#1F2E4D] to-[#2E4573] text-white py-24">
          <div className="max-w-6xl mx-auto px-6 text-center">

            {/* Breadcrumb */}
            <div className="mb-4 text-sm text-gray-300">
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span>Reviews</span>
            </div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: -60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="text-5xl font-bold mb-6"
            >
              {livePreview?.all_reviews_title ?? content?.all_reviews_title ?? "Customer Reviews"}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="max-w-3xl mx-auto text-gray-200 text-lg"
            >
              {livePreview?.all_reviews_desc ?? content?.all_reviews_desc ?? "See what retailers across India are saying about AI-Setu ERP."}
            </motion.p>

          </div>
        </section>

        {/* REVIEWS SECTION */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              {reviews.map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                >

                  {/* User Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-bold text-sm">{review.name}</p>
                      <p className="text-xs text-gray-500">{review.role}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-sm text-gray-600">"{review.text}"</p>

                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default AllTestimonials;