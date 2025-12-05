import DoctorCard from "@/components/custom-component/card/doctor-card";
import ServiceCard from "@/components/custom-component/card/service-card";
import YouTubeCard from "@/components/custom-component/card/youtube-video-card";
import { CrouselCs } from "@/components/custom-component/crouselcs/crousel-cs";
import HeroSectionNonAnimate from "@/components/custom-component/HeroSection/hero-section-nonAnimate";
import { Button } from "@/components/ui/button";
import { CarouselItem } from "@/components/ui/carousel";
import { getHandler } from "@/services/api.services";
import { ArrowRight, Link, Mail, MapPin, Phone } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BranchPage() {
  const { slug } = useParams();
  const [branch, setBranch] = useState({});
  const fetchBranch = async () => {
    try {
      const response = await getHandler(`/branch/get/${slug}`);
      setBranch(response.data);
    } catch (error) {
      console.error("Error fetching branch:", error);
    }
  };

  useEffect(() => {
    fetchBranch();
  }, []);

  return (
    <div className="p-2 space-y-12">
      <HeroSectionNonAnimate
        heroImage={branch?.image?.url?.secure_url}
        title={branch?.title}
        intro={branch?.description}
        CTA={branch?.buttons}
        badge={{ icon: MapPin, text: branch?.badge }}
        features={branch?.features}
      />
      <div className="max-w-7xl mx-auto">
        <p className="text-md md:text-2xl text-center font-semibold  mb-10 px-4">
          Top Doctors From Our {branch?.badge} Branch
        </p>
        <CrouselCs autoPlayEnabled={true}>
          {branch?.doctors?.map((doctor, index) => (
            <CarouselItem key={index} className="lg:basis-1/3 py-4">
              <DoctorCard
                key={index}
                name={doctor?.name}
                specialty={doctor?.speciality}
                hospital={doctor?.branch?.title}
                rating={doctor?.rating}
                reviewsCount={doctor?.totalReviews}
                experienceYears={doctor?.experience}
                location={doctor?.branch?.contact?.address}
                avatarUrl={doctor?.profile?.secure_url}
                bio={doctor?.bio}
                onBook={() => {
                  window.location.href = "/book-appointment";
                }}
              />
            </CarouselItem>
          ))}
        </CrouselCs>
      </div>
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center lg:justify-end">
            <img
              src={branch?.whyChooseUs?.image?.url?.secure_url}
              alt="Doctors"
              className="rounded-xl shadow-lg object-cover w-full "
            />
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {branch?.whyChooseUs?.title}
            </h2>
            <p className="text-gray-500 mb-6">
              {branch?.whyChooseUs?.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6 py-4">
              {branch?.whyChooseUs?.features?.map((feature, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
            <Button>Book Appointment</Button>
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto">
        <p className="text-md md:text-2xl text-center font-semibold  mb-10 px-4">
          Inside Our Clinic: The Ultimate Hair Transplant Experience
        </p>
        <CrouselCs autoPlayEnabled={true}>
          {branch?.clinicVideo?.map((_, index) => (
            <CarouselItem key={index} className="lg:basis-1/2 py-4">
              <YouTubeCard videoUrl={_.youTubeVideoUrl} title={_.title} />
            </CarouselItem>
          ))}
        </CrouselCs>
      </div>
      <div className="max-w-7xl mx-auto">
        <p className="text-md md:text-2xl text-center font-semibold  mb-10 px-4">
          We’d love to hear from you! Reach out and let’s connect.
        </p>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4 gap-6">
          <ServiceCard
            serviceData={{
              icon: MapPin,
              title: "",
              description:
                "Here’s the complete address of our branch — we’d be delighted to welcome you in person!",
              value: branch?.contact?.address,
            }}
          />
          <ServiceCard
            serviceData={{
              icon: Phone,
              title: "",
              description:
                "Give us a call — our team is always ready to assist and answer your questions.",
              value: branch?.contact?.phone,
            }}
          />
          <ServiceCard
            serviceData={{
              icon: Mail,
              title: "",
              description:
                "Prefer writing to us? Drop an email anytime, and we’ll get back to you as soon as possible.",
              value: branch?.contact?.email,
            }}
          />
          <ServiceCard
            serviceData={{
              icon: Link,
              title: "",
              description:
                "Find us easily — click the map below to get directions straight to our branch.",
              value: branch?.contact?.mapUrl,
            }}
          />
        </div>
      </div>
    </div>
  );
}
