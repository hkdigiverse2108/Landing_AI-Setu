import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Store, ShoppingBag, Pill, Wrench, TrendingUp } from "lucide-react";
import { fetchStoreTypes } from "@/services/api";

const iconMap: any = {
  store: Store,
  shopping: ShoppingBag,
  medical: Pill,
  hardware: Wrench,
  growth: TrendingUp
};

const WhoIsThisFor = () => {

  const [types, setTypes] = useState<any[]>([]);

  useEffect(() => {

    const loadStoreTypes = async () => {

      const data = await fetchStoreTypes();
      setTypes(data);

    };

    loadStoreTypes();

  }, []);

  return (
    <section className="py-16 lg:py-24 bg-secondary">

      <div className="container">

        <div className="text-center mb-12">

          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Perfect For
          </span>

          <h2 className="text-3xl lg:text-4xl font-bold mt-2 text-foreground">
            Who Is This For?
          </h2>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

          {types.map((t, i) => {

            const Icon = iconMap[t.icon];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-xl p-6 text-center shadow-card border border-border hover:shadow-card-hover transition-shadow"
              >

                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  {Icon && <Icon className="h-7 w-7 text-primary" />}
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