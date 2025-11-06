import React, { useEffect, useState } from "react";
import HeroSection from "@/components/custom-component/HeroSection/hero-section";
import RatingCard from "@/components/custom-component/card/rating-card";
import {
  Anchor,
  ArrowRight,
  MessageCircle,
  UserCheck,
  UserPlus,
} from "lucide-react";
import ServiceCard from "@/components/custom-component/card/service-card";
import { CrouselCs } from "@/components/custom-component/crouselcs/crousel-cs";
import { CarouselItem } from "@/components/ui/carousel";
import DoctorCard from "@/components/custom-component/card/doctor-card";
import ReviewCard from "@/components/custom-component/card/review-card";
import { Button } from "@/components/ui/button";
import HeroBanner from "@/components/custom-component/HeroSection/hero-banner";
import { toast } from "sonner";
import { getHandler } from "@/services/api.services";
import YouTubeCard from "@/components/custom-component/card/youtube-video-card";

const ratingData = [
  {
    platform: "Google",
    rating: 4.8,
    rating_type: "average",
    max_rating: 5,
    stars_displayed: 5,
  },
  {
    platform: "Proven Expert",
    rating: 4.8,
    rating_type: "average",
    max_rating: 5,
    stars_displayed: 5,
  },
  {
    platform: "RealSelf",
    rating: 5.0,
    rating_type: "average",
    max_rating: 5,
    stars_displayed: 5,
  },
  {
    platform: "Trustpilot",
    rating: 4.8,
    rating_type: "average",
    max_rating: 5,
    stars_displayed: 5,
  },
];

const serviceData = [
  {
    title: "Expert Medical Consultants",
    value: "75",
    subtitle: "Specialists in Various Fields",
    description:
      "Our team includes 75 experienced consultants across multiple medical disciplines to ensure you receive expert care.",
    icon: UserCheck,
  },
  {
    title: "Outstanding Patient Feedback",
    value: "2,000+",
    subtitle: "Verified Reviews",
    description:
      "Over 2,000 satisfied patients have rated our services, reflecting our commitment to excellence and care.",
    icon: MessageCircle,
  },
  {
    title: "Global Patient Reach",
    value: "30,000+",
    subtitle: "Patients Worldwide",
    description:
      "Serving more than 30,000 patients globally, we provide trusted healthcare solutions across borders.",
    icon: UserPlus,
  },
  {
    title: "Years of Proven Experience",
    value: "15",
    subtitle: "In the Healthcare Industry",
    description:
      "With 15 years of medical expertise, we combine innovation with trust to deliver exceptional outcomes.",
    icon: ArrowRight,
  },
];

export default function HomePage() {
  const [websitedata, setwebsitedata] = useState({});
  const [doctors, setDoctors] = useState([]);
  const fetchData = async () => {
    try {
      const reponse = await getHandler("/doctor/get");
      setDoctors(reponse.data);
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || "Something went wrong!");
    }
  };
  const fetchDataWebsite = async () => {
    try {
      const reponse = await getHandler("/websiteSection/get");
      console.log(reponse.data);
      setwebsitedata(reponse.data);
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || "Something went wrong!");
    }
  };
  useEffect(() => {
    fetchData();
    fetchDataWebsite();
  }, []);
  return (
    <div className="space-y-12">
      <div className="max-w-7xl mx-auto px-4">
        <CrouselCs autoPlayEnabled={true} isButtonEnabled={false}>
          {websitedata?.heroBanner?.map((_, index) => (
            <CarouselItem key={index} className="w-full py-4">
              <HeroBanner item={_} />
            </CarouselItem>
          ))}
        </CrouselCs>
      </div>
      <HeroSection heroData={websitedata?.heroSection} />
      <div>
        <p className="text-md md:text-2xl font-semibold text-center max-w-4xl mx-auto mb-4 px-4">
          Leading with Experience and Excellence – Your Trusted Healthcare
          Partner, Proven Worldwide
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
          {serviceData.map((item, index) => (
            <ServiceCard serviceData={item} key={index} />
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-md md:text-2xl font-semibold text-center max-w-4xl mx-auto mb-4 px-4">
          Meet Our Expert Doctors and Dedicated Clinic Team
        </p>
        <CrouselCs>
          {doctors.map((doctor, index) => (
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
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-md md:text-2xl font-semibold text-center max-w-4xl mx-auto mb-4 px-4">
          See the Transformation: Real Results from Our Hair Transplant
          Procedure
        </p>
        <CrouselCs autoPlayEnabled={true}>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="basis-1 md:basis-1/3 lg:basis-1/4 py-4"
            >
              <div className="p-2 border rounded-md shadow-md ">
                <img
                  src="https://facesurgeon.in/wp-content/uploads/2020/03/hair-transplantation-in-india.jpg"
                  alt="demo"
                  className="rounded-md"
                />
              </div>
            </CarouselItem>
          ))}
        </CrouselCs>
      </div>
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center lg:justify-end">
            <img
              src="https://media.istockphoto.com/id/1496720417/photo/high-five-for-being-such-a-brave-little-boy.jpg?s=612x612&w=0&k=20&c=jrhbbPCEEN5Z3nSmTdu6fBC84v0kFuuJ8L4l2reghn4="
              alt="Doctors"
              className="rounded-xl shadow-lg object-cover w-full "
            />
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-500 mb-6">
              We provide expert care with modern facilities and a compassionate
              team, ensuring personalized treatment for every patient.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6 py-4">
              <div>
                <h3 className="font-semibold text-gray-900">Primary Care</h3>
                <p className="text-gray-500 text-sm">
                  Far far away, behind the word mountains, far from the
                  countries Vokalia.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Lab Test</h3>
                <p className="text-gray-500 text-sm">
                  Far far away, behind the word mountains, far from the
                  countries Vokalia.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Symptom Check</h3>
                <p className="text-gray-500 text-sm">
                  Far far away, behind the word mountains, far from the
                  countries Vokalia.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Heart Rate</h3>
                <p className="text-gray-500 text-sm">
                  Far far away, behind the word mountains, far from the
                  countries Vokalia.
                </p>
              </div>
            </div>

            <Button
              onClick={() => {
                window.location.href = "/book-appointment";
              }}
            >
              Book Appointment <ArrowRight />
            </Button>
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-md md:text-2xl font-semibold text-center max-w-4xl mx-auto mb-4 px-4">
          Inside Our Clinic: The Ultimate Hair Transplant Experience
        </p>
        <CrouselCs autoPlayEnabled={true}>
          {websitedata?.clinicVideo?.map((item, index) => (
            <CarouselItem className="basis-full sm:basis-1/2 py-4">
              <YouTubeCard
                videoUrl={item.youTubeVideoUrl}
                title={item.title}
                key={index}
              />
            </CarouselItem>
          ))}
        </CrouselCs>
      </div>
      <div className="max-w-7xl mx-auto">
        <p className="text-md md:text-2xl font-semibold text-center max-w-4xl mx-auto mb-4 px-4">
          Trusted by Thousands of Patients From Around the India
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ratingData.map((item, index) => (
            <RatingCard ratingData={item} key={index} />
          ))}
        </div>
        <CrouselCs autoScrollenabled={true}>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="lg:basis-1/3 py-4">
              <ReviewCard
                review={{
                  name: "Sana Malik",
                  rating: 3.8,
                  reviewText:
                    "Superb service and amazing results! The clinic maintains high hygiene standards and uses the latest technology. Highly satisfied.",
                  source: "Instagram",
                  sourceUrlLogo:
                    "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
                  sourceUrl: "https://www.instagram.com/bellezaclinic/",
                  createdAt: "2025-11-05T12:40:04.852Z",
                }}
              />
            </CarouselItem>
          ))}
        </CrouselCs>
      </div>
    </div>
  );
}
