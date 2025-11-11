import React, { useEffect, useState } from "react";
import { Bell, MapPin, MessageSquare, Phone, Smile } from "lucide-react";
import vectorbg from "../../assets/images/vectorbg.jpg";
import ServiceCard from "@/components/custom-component/card/service-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getHandler, postHandler } from "@/services/api.services";

const data = [
  {
    title: "Visit our clinic",
    value: "Rohini, New Delhi; Lucknow, Uttar Pradesh; Jaipur, Rajasthan",
    description:
      "Drop in for a free consultation. Our doors are open for walk-in appointments or scheduled visits — please call ahead.",
    icon: MessageSquare,
  },
  {
    title: "Call us",
    value: "+91 79823 32206",
    description:
      "Speak to our clinic team directly. Our staff is ready to answer your hair-transplant questions and schedule your visit.",
    icon: MapPin,
  },
  {
    title: "Call us",
    value: "+91 79823 32206",
    description:
      "Mon–Sunday from 9am to 7pm. Give us a call during business hours.",
    icon: Phone,
  },
];

const accordionData = [
  {
    value: "item-1",
    trigger: "How can I book a consultation at Belleza?",
    content:
      "You can easily book a consultation by calling us, filling out the contact form on our website, or messaging us directly on WhatsApp. Our team will help you schedule a visit at your preferred branch in Delhi, Jaipur, or Lucknow.",
  },
  {
    value: "item-2",
    trigger: "Where are Belleza clinics located?",
    content:
      "Belleza has branches in Delhi, Jaipur, and Lucknow. You can find detailed addresses, maps, and directions for each clinic on our Contact Us page.",
  },
  {
    value: "item-3",
    trigger: "What are the clinic’s working hours?",
    content:
      "All Belleza clinics operate from 10:00 AM to 8:00 PM, Monday to Sunday. Appointments are recommended to ensure personalized attention.",
  },
  {
    value: "item-4",
    trigger: "Do I need an appointment for a consultation?",
    content:
      "Yes, we recommend booking your consultation in advance to secure your preferred time slot with our transplant specialist.",
  },
  {
    value: "item-5",
    trigger: "Can I consult online before visiting the clinic?",
    content:
      "Yes, Belleza offers online video consultations for clients who live outside Delhi, Jaipur, or Lucknow. You can request one through our Contact Us form.",
  },
  {
    value: "item-6",
    trigger: "What transplant procedures does Belleza offer?",
    content:
      "We specialize in hair, beard, and eyebrow transplants using advanced FUE and DHI techniques to achieve natural and permanent results.",
  },
  {
    value: "item-7",
    trigger: "How can I choose which branch to visit?",
    content:
      "You can select the branch most convenient for you — Delhi, Jaipur, or Lucknow. Our support team can help coordinate appointments or transfers between locations if needed.",
  },
  {
    value: "item-8",
    trigger: "Is parking available at Belleza clinics?",
    content:
      "Yes, all our clinics have convenient parking options available nearby for both two-wheelers and four-wheelers.",
  },
  {
    value: "item-9",
    trigger: "How can I contact Belleza for pricing or packages?",
    content:
      "For personalized pricing, package details, and offers, please contact us through our website form, phone, or WhatsApp. Our representative will respond promptly.",
  },
  {
    value: "item-10",
    trigger: "Do you assist clients from outside India?",
    content:
      "Yes, Belleza serves national and international clients. We offer online consultations, travel assistance, and post-procedure follow-ups for overseas patients.",
  },
];

export default function ContactUs() {
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    branch: "",
    lookingFor: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "phone") {
      setFormData((prev) => ({ ...prev, [id]: value.replace(/\D/g, "") }));
      return;
    }
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const missingFields = [];
    for (let key in formData) {
      if (!formData[key] || formData[key].trim() === "") {
        missingFields.push(key);
      }
    }
    if (missingFields.length > 0) {
      console.warn("Missing fields:", missingFields);
      toast.warning(
        `Please fill the following fields: ${missingFields
          .map((f) => f.charAt(0).toUpperCase() + f.slice(1))
          .join(", ")}`
      );
      return;
    }
    setLoading(true);
    await toast.promise(postHandler("/contact/create", formData), {
      loading: "Sending message...",
      success: (response) => {
        setFormData({
          name: "",
          phone: "",
          email: "",
          branch: "",
          lookingFor: "",
          message: "",
        });
        setLoading(false);
        return response.message;
      },
      error: (error) =>
        error.message || "Something went wrong! Please try again later.",
    });
    setLoading(false);
  };
  const fetchBranches = async () => {
    try {
      const response = await getHandler("/branch/get");
      setBranches(response.data);
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || "Something went wrong!");
    }
  };
  useEffect(() => {
    fetchBranches();
  }, []);
  return (
    <div className="p-4 space-y-12">
      {/* Hero Section */}
      <div
        className="w-full min-h-[60vh] rounded-2xl flex flex-col justify-center items-center gap-6 text-center text-white relative overflow-hidden"
        style={{
          backgroundImage: `url(${vectorbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <p className="relative text-3xl sm:text-4xl md:text-6xl font-extrabold capitalize">
          Connect To Our <br />
          <span className="text-primary underline">Friendly Team</span>
        </p>
        <p className="relative text-md sm:text-lg md:text-xl font-light max-w-2xl">
          Let us help you with your queries. We're here to support you every
          step of the way.
        </p>
      </div>

      {/* Services Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <ServiceCard serviceData={item} key={index} />
        ))}
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto">
        <p className="text-2xl md:text-3xl font-semibold text-center mb-6 px-4">
          Frequently Asked Questions
        </p>
        <Accordion type="single" collapsible>
          {accordionData.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger className="font-bold text-gray-900 px-2">
                {item.trigger}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 px-2 mt-1">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Contact Form */}
      <Card className="max-w-4xl mx-auto rounded-2xl shadow-lg overflow-hidden">
        <CardContent className="space-y-6">
          <p className="text-2xl md:text-3xl  font-semibold text-center mb-4 px-4">
            Feel Free To Contact Us
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                placeholder="John Doe"
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                placeholder="+91 0000-0000"
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                placeholder="m@example.com"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Looking For</Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("lookingFor", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hair-transplant">
                    Hair Transplant
                  </SelectItem>
                  <SelectItem value="beard-transplant">
                    Beard Transplant
                  </SelectItem>
                  <SelectItem value="eyebrow-transplant">
                    Eye Brow Transplant
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Nearest Branch To Visit</Label>
              <Select
                onValueChange={(value) => handleSelectChange("branch", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select Branch</SelectLabel>
                    {branches.map((branch) => (
                      <SelectItem key={branch._id} value={branch._id}>
                        {branch.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                placeholder="Type your message here."
                id="message"
                value={formData.message}
                onChange={handleChange}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button
            className="px-8 py-3 text-lg font-semibold"
            onClick={handleSubmit}
            disabled={loading}
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
