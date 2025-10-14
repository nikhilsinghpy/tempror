import React from "react";
import { Bell, MapPin, MessageSquare, Phone } from "lucide-react";
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
    <div className="p-4 space-y-8">
      <div
        className="w-full min-h-[50vh] rounded-lg flex flex-col justify-center items-center gap-4"
        style={{
          backgroundImage: `url(${vectorbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* <img src={logo} alt="logo" className="w-28 h-auto object-contain" /> */}
        <p className="text-2xl sm:text-3xl md:text-6xl capitalize font-bold">
          Connect To Our{" "}
          <span className="text-primary underline">Friendly Team</span>
        </p>
        <p className="text-md sm:text-lg md:text-xl font-light">
          Let us help you with your queries. We're here to support you every
          step of the way.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-4 gap-2">
        {data.map((item, index) => (
          <ServiceCard serviceData={item} key={index} />
        ))}
      </div>

      <div>
        <p className="text-md md:text-2xl font-semibold text-center max-w-4xl mx-auto mb-4 px-4">
          Frequently Asked Questions
        </p>
        <div className="max-w-xl mx-auto py-6">
          <Accordion type="single" collapsible>
            {accordionData.map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger className="font-bold px-2">
                  {item.trigger}
                </AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardContent>
          <p className="text-md md:text-2xl font-semibold text-center max-w-4xl mx-auto mb-4 px-4">
            Fell Free To Contact Us : )
          </p>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type={"text"} placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type={"tel"} placeholder="+91  0000-0000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type={"email"} placeholder="m@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lookingfor">Looking For</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="branch">Nearest Branch To Visit</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Textarea placeholder="Type your message here." />
            </div>
          </div>
        </CardContent>
        <CardFooter className={"flex items-center justify-center"}>
          <Button>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
