import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const UserHomePage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen pt-4">
      <div className="border min-w-sm  md:min-w-md  rounded-2xl md:shadow-md overflow-hidden">
        <div className="bg-amber-50 p-4 rounded-b-[6rem] h-[150px] w-full relative flex justify-center">
          <div className="absolute -bottom-16 flex flex-col items-center">
            <Avatar className="w-24 h-24  border-4 border-amber-800">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-lg mt-2 font-semibold">Nikhil Thakur</p>
          </div>
        </div>
        <div className="mt-18 grid grid-cols-2 gap-2 p-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" value="Nikhil Thakur" readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" value="Nikhil Thakur" readOnly />
          </div>
          <div className="space-y-2 col-span-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value="nikhil.thakur@pm.me" readOnly />
          </div>
          <div className="space-y-2 col-span-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" value="1234567890" readOnly />
          </div>
          <div className="space-y-2 col-span-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value="123 Main St, Anytown, USA"
              readOnly
              className={"resize-none"}
            />
          </div>
          <div className="space-y-2 col-span-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input id="dob" value="01/01/2000" readOnly />
          </div>

          <Button className="col-span-2 mt-8 bg-primary-foreground text-primary hover:bg-primary hover:text-primary-foreground">
            Update Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;
