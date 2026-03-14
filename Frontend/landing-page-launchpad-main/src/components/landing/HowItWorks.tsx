import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, Settings, Rocket } from "lucide-react";
import { fetchHowItWorks } from "@/services/api";

const iconMap: any = {
  calendar: CalendarCheck,
  settings: Settings,
  rocket: Rocket
};

const HowItWorks = () => {

  const [steps, setSteps] = useState<any[]>([]);

  useEffect(() => {

    const loadSteps = async () => {

      const data = await fetchHowItWorks();
      setSteps(data);

    };

    loadSteps();

  }, []);

  return (
    <section className="py-16 lg:py-24 bg-background">

      <div className="container">

        <div className="text-center mb-12">

          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Simple Process
          </span>

          <h2 className="text-3xl lg:text-4xl font-bold mt-2 text-foreground">
            How It Works
          </h2>

        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">

          {steps.map((s, i) => {

            const Icon = iconMap[s.icon];

            return (

              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="text-center relative"
              >

                <div className="w-16 h-16 rounded-2xl bg-gold-gradient flex items-center justify-center mx-auto mb-4">
                  {Icon && <Icon className="h-7 w-7 text-accent-foreground" />}
                </div>

                <span className="text-xs font-bold text-accent tracking-widest">
                  {String(s.step_number).padStart(2, "0")}
                </span>

                <h3 className="font-heading font-bold text-xl text-foreground mt-1 mb-2">
                  {s.title}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {s.description}
                </p>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
};

export default HowItWorks;