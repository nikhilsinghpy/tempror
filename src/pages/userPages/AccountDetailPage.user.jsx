import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const AccountDetailUser = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-amber-400 to-amber-600 h-44 flex justify-center items-end rounded-b-[6rem]">
          <div className="absolute -bottom-20 flex flex-col items-center">
            <Avatar className="w-28 h-28 border-4 border-white shadow-lg">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-xl mt-3 font-semibold text-gray-800">
              Nikhil Thakur
            </p>
            <p className="text-sm text-gray-500">nikhil.thakur@pm.me</p>
          </div>
        </div>

        {/* Account Info Form */}
        <div className="mt-28 p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-600"
            >
              First Name
            </Label>
            <Input
              id="firstName"
              value="Nikhil"
              readOnly
              className="bg-gray-50 border-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-600"
            >
              Last Name
            </Label>
            <Input
              id="lastName"
              value="Thakur"
              readOnly
              className="bg-gray-50 border-gray-200"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-600"
            >
              Email
            </Label>
            <Input
              id="email"
              value="nikhil.thakur@pm.me"
              readOnly
              className="bg-gray-50 border-gray-200"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label
              htmlFor="phone"
              className="text-sm font-medium text-gray-600"
            >
              Phone
            </Label>
            <Input
              id="phone"
              value="+91 12345 67890"
              readOnly
              className="bg-gray-50 border-gray-200"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label
              htmlFor="address"
              className="text-sm font-medium text-gray-600"
            >
              Address
            </Label>
            <Textarea
              id="address"
              value="123 Main St, Anytown, India"
              readOnly
              className="bg-gray-50 border-gray-200 resize-none"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="dob" className="text-sm font-medium text-gray-600">
              Date of Birth
            </Label>
            <Input
              id="dob"
              value="01/01/2000"
              readOnly
              className="bg-gray-50 border-gray-200"
            />
          </div>

          <div className="md:col-span-2 flex justify-center mt-4">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-8 py-2 rounded-lg transition-all duration-200">
              Update Profile
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t py-3 text-center text-xs text-gray-500 bg-gray-50">
          © 2025 Belleza Wellness | Profile Management
        </div>
      </div>
    </div>
  );
};

export default AccountDetailUser;
