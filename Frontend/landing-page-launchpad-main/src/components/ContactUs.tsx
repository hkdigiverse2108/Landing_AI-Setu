import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, Zap } from "lucide-react";

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  officeAddress: string;
  message: string;
}

export const submitContactForm = async (data: any) => {
  const response = await fetch("http://127.0.0.1:8000/api/contact/submit/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
};

const ContactUsPage = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    phone: "",
    email: "",
    officeAddress: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await submitContactForm(formData);

      if (res.message) {
        toast.success(res.message);

        setFormData({
          name: "",
          phone: "",
          email: "",
          officeAddress: "",
          message: "",
        });
      } else {
        toast.error("Something went wrong");
      }
    } catch {
      toast.error("Server error");
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: "+91 98765 43210",
      description: "Mon-Fri 9AM-6PM",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: "hello@ai-setu.com",
      description: "We'll respond within 24 hours",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "Delhi NCR, India",
      description: "Schedule a meeting",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Clock,
      title: "Support Hours",
      details: "24/7 Available",
      description: "Always here to help",
      color: "from-orange-500 to-red-500"
    }
  ];

  const features = [
    { icon: Users, text: "Experienced Team", color: "text-blue-600" },
    { icon: Zap, text: "Fast Implementation", color: "text-purple-600" },
    { icon: MessageSquare, text: "24/7 Support", color: "text-green-600" },
    { icon: Send, text: "Quick Response", color: "text-orange-600" }
  ];

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] bg-gradient-to-br from-[#1F2E4D] via-[#2D3748] to-[#1A202C] overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#F4B400]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#F4B400]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#F4B400]/5 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Let's Start a
              <span className="bg-gradient-to-r from-[#F4B400] to-[#E6B800] bg-clip-text text-transparent"> Conversation</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Ready to transform your business with AI? We're here to help you every step of the way.
              Reach out and let's build something amazing together.
            </motion.p>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-20 w-16 h-16 bg-[#F4B400]/20 rounded-full blur-sm"
        ></motion.div>
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-32 left-20 w-12 h-12 bg-[#F4B400]/15 rounded-full blur-sm"
        ></motion.div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-gradient-to-br from-[#F5F6FA] via-[#F0F2F9] to-[#E8ECF4]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-20 relative z-20"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${info.color} flex items-center justify-center mb-4`}>
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#1F2E4D] mb-2">{info.title}</h3>
                <p className="text-[#1F2E4D] font-semibold mb-1">{info.details}</p>
                <p className="text-gray-600 text-sm">{info.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 bg-gradient-to-br from-white via-[#F8FAFC] to-[#F1F5F9]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-[#1F2E4D] mb-6"
              >
                Send us a Message
              </motion.h2>

              <motion.form
                onSubmit={handleSubmit}
                className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/30 space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="space-y-2"
                  >
                    <label className="text-sm font-semibold text-[#1F2E4D]">Full Name</label>
                    <Input
                      placeholder="Enter your full name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="h-12 border-2 border-gray-200 focus:border-[#F4B400] transition-colors duration-300 rounded-xl"
                    />
                  </motion.div>

                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="space-y-2"
                  >
                    <label className="text-sm font-semibold text-[#1F2E4D]">Phone Number</label>
                    <Input
                      placeholder="Enter your phone number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="h-12 border-2 border-gray-200 focus:border-[#F4B400] transition-colors duration-300 rounded-xl"
                    />
                  </motion.div>
                </div>

                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="space-y-2"
                >
                  <label className="text-sm font-semibold text-[#1F2E4D]">Email Address</label>
                  <Input
                    placeholder="Enter your email address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-12 border-2 border-gray-200 focus:border-[#F4B400] transition-colors duration-300 rounded-xl"
                  />
                </motion.div>

                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="space-y-2"
                >
                  <label className="text-sm font-semibold text-[#1F2E4D]">Office Address</label>
                  <Input
                    placeholder="Enter your office address"
                    name="officeAddress"
                    value={formData.officeAddress}
                    onChange={handleChange}
                    required
                    className="h-12 border-2 border-gray-200 focus:border-[#F4B400] transition-colors duration-300 rounded-xl"
                  />
                </motion.div>

                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="space-y-2"
                >
                  <label className="text-sm font-semibold text-[#1F2E4D]">Message</label>
                  <Textarea
                    placeholder="Tell us about your requirements and how we can help..."
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="min-h-[120px] border-2 border-gray-200 focus:border-[#F4B400] transition-colors duration-300 rounded-xl resize-none"
                  />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full h-14 bg-gradient-to-r from-[#F4B400] to-[#E6B800] hover:from-[#E6B800] hover:to-[#D4A600] text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </motion.div>
              </motion.form>
            </motion.div>

            {/* Features & Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-[#1F2E4D] mb-6">Why Choose AI-Setu?</h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  We're not just another ERP solution. We're your technology partner, committed to transforming
                  your business operations with cutting-edge AI and personalized support.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <feature.icon className={`w-8 h-8 ${feature.color} mb-3`} />
                    <h3 className="font-semibold text-[#1F2E4D]">{feature.text}</h3>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-[#F4B400]/10 to-[#E6B800]/10 rounded-2xl p-8 border border-[#F4B400]/20"
              >
                <h3 className="text-2xl font-bold text-[#1F2E4D] mb-4">Ready to Get Started?</h3>
                <p className="text-gray-600 mb-6">
                  Join hundreds of businesses already using AI-Setu to streamline their operations and boost productivity.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Free Consultation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Custom Solutions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>24/7 Support</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ContactUsPage;