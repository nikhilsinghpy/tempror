import React from "react";
import { Bell, MapPin, MessageSquare, Phone, Smile } from "lucide-react";
import vectorbg from "../../assets/images/vectorbg.jpg";
// import logo from "../../assets/images/logo.png";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
const data = [
  {
    title: "Chat to sales",
    value: "sales@untitledui.com",
    subtitle: "Speak to our friendly team.",
    description: "Email our sales department for any inquiries.",
    icon: MessageSquare,
  },
  {
    title: "Chat to support",
    value: "support@untitledui.com",
    subtitle: "We're here to help.",
    description: "Reach out to our support team for assistance.",
    icon: Bell,
  },
  {
    title: "Visit us",
    value: "View on Google Maps",
    subtitle: "Visit our office HQ.",
    description: "Find us at our headquarters location.",
    icon: MapPin,
  },
  {
    title: "Call us",
    value: "+1 (555) 000-0000",
    subtitle: "Mon–Fri from 8am to 5pm.",
    description: "Give us a call during business hours.",
    icon: Phone,
  },
];
const accordionData = [
  {
    value: "item-1",
    trigger: "Is it accessible?",
    content: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
  {
    value: "item-2",
    trigger: "Is it customizable?",
    content: "Yes. You can style it using your own CSS or utility classes.",
  },
  {
    value: "item-3",
    trigger: "Does it support multiple items open?",
    content: "Yes, if you set the Accordion type to 'multiple'.",
  },
];

export default function ContactUs() {
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
        {/* Optional Decorative Overlay */}
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
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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
          <p className="text-2xl md:text-3xl font-semibold text-center mb-4 px-4">
            Feel Free To Contact Us <Smile />
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" placeholder="+91 0000-0000" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lookingfor">Looking For</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hair-transplant">
                    Hair Transplant
                  </SelectItem>
                  <SelectItem value="skin-care">Skin Care</SelectItem>
                  <SelectItem value="consultation">Consultation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="branch">Nearest Branch To Visit</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rohini">Rohini</SelectItem>
                  <SelectItem value="delhi">Delhi</SelectItem>
                  <SelectItem value="gurgaon">Gurgaon</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="message">Message</Label>
              <Textarea placeholder="Type your message here." />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button className="px-8 py-3 text-lg font-semibold">Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
