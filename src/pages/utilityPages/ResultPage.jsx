import CallToAction from "@/components/custom-component/CallToAction/call-to-action";
import HeroSectionNonAnimate from "@/components/custom-component/HeroSection/hero-section-nonAnimate";
import { Card, CardContent } from "@/components/ui/card";
import { Cpu, Layers, MapPin, Phone, Sparkles, Star } from "lucide-react";
import React from "react";

const beforeAfterGallery = [
  {
    before:
      "https://png.pngtree.com/png-clipart/20241106/original/pngtree-professional-black-man-png-image_16685655.png",
    after:
      "https://static.vecteezy.com/system/resources/previews/024/354/252/non_2x/businessman-isolated-illustration-ai-generative-free-photo.jpg",
    caption: "6 Months After FUE Hair Transplant",
  },
  {
    before:
      "https://png.pngtree.com/png-clipart/20241106/original/pngtree-professional-black-man-png-image_16685655.png",
    after:
      "https://static.vecteezy.com/system/resources/previews/024/354/252/non_2x/businessman-isolated-illustration-ai-generative-free-photo.jpg",
    caption: "Patient regained natural hairline",
  },
  {
    before:
      "https://png.pngtree.com/png-clipart/20241106/original/pngtree-professional-black-man-png-image_16685655.png",
    after:
      "https://static.vecteezy.com/system/resources/previews/024/354/252/non_2x/businessman-isolated-illustration-ai-generative-free-photo.jpg",
    caption: "Natural density restored after 8 months",
  },
  {
    before:
      "https://png.pngtree.com/png-clipart/20241106/original/pngtree-professional-black-man-png-image_16685655.png",
    after:
      "https://static.vecteezy.com/system/resources/previews/024/354/252/non_2x/businessman-isolated-illustration-ai-generative-free-photo.jpg",
    caption: "Hairline restored with Sapphire FUE",
  },
];
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
  return (
    <div>
      <HeroSectionNonAnimate
        heroImage=""
        title="Transform Your Hair, Transform Your Confidence"
        intro="Real results from real patients — witness the artistry of our advanced hair transplant techniques."
        CTA={{
          href: "/book-appointment",
          text: "Book an Appointment",
        }}
        badge={{ icon: Star, text: "4.8/5" }}
        contact={[
          { icon: MapPin, text: "Sector-15, Chandigarh" },
          { icon: Phone, text: "+91 98765 43210" },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-md md:text-2xl font-semibold text-center max-w-4xl mx-auto mb-4 px-4">
          Witness the transformations of our patients and see real hair
          restoration results.
        </p>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beforeAfterGallery.map((item, index) => (
            <Card key={index} className="p-0">
              <CardContent className="p-0">
                <img
                  src="https://facesurgeon.in/wp-content/uploads/2020/03/hair-transplantation-in-india.jpg"
                  alt="demo"
                  className="rounded-md"
                />
                {/* Caption */}
                <p className="text-gray-800 text-center  p-4 text-lg font-medium border-t border-gray-200">
                  {item.caption}
                </p>
              </CardContent>
            </Card>
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
