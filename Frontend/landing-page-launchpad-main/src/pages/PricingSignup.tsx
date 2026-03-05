import { useState } from "react";
import { Button } from "@/components/ui/button";

const PricingSignup = () => {
  const [formData, setFormData] = useState({
    shopName: "",
    ownerName: "",
    mobileNumber: "",
    referralCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/pricing-signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shop_name: formData.shopName,
        owner_name: formData.ownerName,
        mobile_number: formData.mobileNumber,
        referral_code: formData.referralCode,
      }),
    });

    const data = await response.json();
    console.log(data);

    alert("Form submitted successfully!");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="bg-card shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Get Started With Pricing
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="shopName"
            placeholder="Shop Name"
            value={formData.shopName}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="ownerName"
            placeholder="Owner Name"
            value={formData.ownerName}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

          <input
            type="tel"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="referralCode"
            placeholder="Referral Code"
            value={formData.referralCode}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <Button type="submit" className="w-full bg-gold-gradient text-accent-foreground font-semibold hover:opacity-90 text-base py-6">
            Proceed to Payment
          </Button>

        </form>
      </div>
    </div>
  );
};

export default PricingSignup;