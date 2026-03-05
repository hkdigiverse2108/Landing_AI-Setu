import { ShieldCheck, IndianRupee, Cloud, Headphones } from "lucide-react";

const items = [
  { icon: IndianRupee, label: "Made for Indian Retailers" },
  { icon: ShieldCheck, label: "GST Ready" },
  { icon: Cloud, label: "Secure Cloud Data" },
  { icon: Headphones, label: "24/7 Support" },
];

const TrustStrip = () => (
  <section className="bg-accent/10 border-y border-border">
    <div className="container py-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3 justify-center">
            <item.icon className="h-6 w-6 text-accent" />
            <span className="text-sm font-semibold text-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustStrip;
