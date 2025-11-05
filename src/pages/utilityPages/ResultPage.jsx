import CallToAction from "@/components/custom-component/CallToAction/call-to-action";
import ResultCard from "@/components/custom-component/card/result-card";
import HeroSectionNonAnimate from "@/components/custom-component/HeroSection/hero-section-nonAnimate";
import { Card, CardContent } from "@/components/ui/card";
import { getHandler } from "@/services/api.services";
import { Cpu, Layers, Sparkles, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const treatments = [
  {
    icon: Cpu,
    title: "FUE (Follicular Unit Extraction)",
    description:
      "Precision extraction for natural hairlines, ensuring minimal scarring and natural results.",
  },
  {
    icon: Sparkles,
    title: "Sapphire FUE",
    description:
      "Uses sapphire blades for minimal scarring, faster recovery, and precise hair placement.",
  },
  {
    icon: Layers,
    title: "DHI (Direct Hair Implantation)",
    description:
      "Provides dense and natural hair growth by implanting follicles directly with advanced tools.",
  },
];
export default function ResultPage() {
  const [surgeryResults, setSurgeryResults] = useState([]);
  const fetchData = async () => {
    try {
      const reponse = await getHandler("/surgeryResult/get");
      setSurgeryResults(reponse.data);
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || "Something went wrong!");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <HeroSectionNonAnimate
        heroImage="/images/hair-clinic-banner.jpg" // replace with your banner image
        title="Transform Your Hair, Beard & Eyebrows with Confidence"
        intro="Real results from real patients — witness the artistry of our advanced hair, beard, and eyebrow transplant techniques."
        CTA={[
          {
            label: "Book an Appointment",
            link: "/book-appointment",
            type: "primary",
            icon: "ArrowRight",
          },
        ]}
        badge={{ icon: Star, text: "4.8/5" }}
        features={[
          { icon: "MapPin", text: "Sector-15, Chandigarh" },
          { icon: "Phone", text: "+91 98765 43210" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4">
        <p className="text-md md:text-2xl font-semibold text-center max-w-4xl mx-auto mb-4 px-4">
          Witness the transformations of our patients and see real hair
          restoration results.
        </p>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {surgeryResults.map((item, index) => (
            <ResultCard data={item} key={index} />
          ))}
        </div>
      </div>
      <section className="py-16 bg-white">
        <div className="container mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Treatment Details
          </h2>
          <p className="text-gray-600 mt-2">
            Every patient’s hair restoration journey is unique. Our team
            customizes each treatment to match your hair type, scalp condition,
            and desired outcome.
          </p>
        </div>

        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {treatments.map((treatment, index) => (
            <Card key={index}>
              <CardContent className="flex flex-col items-center text-center p-6">
                <treatment.icon className="text-primary-foreground w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {treatment.title}
                </h3>
                <p className="text-gray-700">{treatment.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <CallToAction />
      </section>
    </div>
  );
}
