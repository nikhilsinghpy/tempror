import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Lock,
  Bell,
  ShieldCheck,
  User,
  Phone,
  Mail,
  Edit,
  ShieldEllipsis,
  KeyRound,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

const UpdateEmail = () => {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" value="xH8o7@example.com" />
    </div>
  );
};
const UpdatePhone = () => {
  return (
    <div className="space-y-2">
      <Label htmlFor="phone">Phone Number</Label>
      <Input type="tel" id="phone" value="+91 12345 67890" />
    </div>
  );
};

const ChangePassword = () => {
  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor="currentPassword">Current Password</Label>
        <Input type="password" id="currentPassword" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="newPassword">New Password</Label>
        <Input type="password" id="newPassword" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input type="password" id="confirmPassword" />
      </div>
    </div>
  );
};
const ForgetPassword = () => {
  return (
    <div className="space-y-2">
      <Label htmlFor="phone">Phone Number</Label>
      <Input type="tel" id="phone" value="+91 12345 67890" />
    </div>
  );
};
const AccountSettingsUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: "",
    description: "",
    updateKey: "",
  });

  const handleClick = (updateKey) => {
    switch (updateKey) {
      case "phone":
        setDialogContent({
          title: "Update Phone Number",
          description:
            "Please enter your new phone number. We’ll send an OTP to verify this number before updating your account.",
          updateKey: "phone",
        });
        break;

      case "email":
        setDialogContent({
          title: "Update Email Address",
          description:
            "Please enter your new email address. A verification link will be sent to confirm this change.",
          updateKey: "email",
        });
        break;

      case "forgetPassword":
        setDialogContent({
          title: "Forgot Password",
          description:
            "Enter your registered phone number. We’ll send you a verification link or OTP to reset your password securely.",
          updateKey: "forgetPassword",
        });
        break;

      case "changePassword":
        setDialogContent({
          title: "Change Password",
          description:
            "Enter your current password and choose a new one to keep your account secure. Make sure your new password is strong.",
          updateKey: "changePassword",
        });
        break;

      default:
        setDialogContent({
          title: "Update Information",
          description:
            "Provide the necessary details to update your account information.",
          updateKey: "",
        });
        break;
    }

    setIsOpen(true);
  };

  const renderContent = () => {
    switch (dialogContent.updateKey) {
      case "phone":
        return <UpdatePhone />;
      case "email":
        return <UpdateEmail />;
      case "forgetPassword":
        return <ForgetPassword />;
      case "changePassword":
        return <ChangePassword />;
      default:
        return "No content available";
    }
  };

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
            <p className="text-sm text-gray-500">Account Settings</p>
          </div>
        </div>
        {/* Settings Section */}
        <div className="mt-28 p-6 space-y-8">
          {/* Profile Settings */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-semibold text-gray-800">
                Profile Settings
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex items-center gap-2">
                  <Input id="phone" value="+91 12345 67890" />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleClick("phone")}
                  >
                    <Edit />
                  </Button>
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email">Email</Label>
                <div className="flex items-center gap-2">
                  <Input id="email" value="zVd1o@example.com" />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleClick("email")}
                  >
                    <Edit />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Password Settings */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-semibold text-gray-800">Security</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <Label>Change Password</Label>
                <Button
                  variant="outline"
                  onClick={() => handleClick("changePassword")}
                >
                  <ShieldEllipsis /> Change
                </Button>
              </div>
              <div className="flex items-center justify-between gap-2">
                <Label>Forget Password</Label>
                <Button
                  variant="outline"
                  onClick={() => handleClick("forgetPassword")}
                >
                  <KeyRound /> Forget
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                <Switch id="twoFactor" />
              </div>
            </div>
          </div>

          <Separator />

          {/* Notifications Settings */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-semibold text-gray-800">
                Notifications
              </h2>
            </div>
            <div className="space-y-5">
              {/* Email Notification Option */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <Label htmlFor="emailNotification">Email Notifications</Label>
                </div>
                <Switch id="emailNotification" defaultChecked />
              </div>

              {/* Phone Notification Option */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <Label htmlFor="smsNotification">SMS Notifications</Label>
                </div>
                <Switch id="smsNotification" />
              </div>

              {/* Promotional Messages */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <Label htmlFor="promoNotification">Promotional Messages</Label>
                <Switch id="promoNotification" defaultChecked />
              </div>
            </div>
          </div>

          <Separator />

          {/* Privacy Settings */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-semibold text-gray-800">Privacy</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="publicProfile">Public Profile</Label>
                <Switch id="publicProfile" defaultChecked={false} disabled />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center mt-8"></div>
        </div>

        {/* Footer */}
        <div className="border-t py-3 text-center text-xs text-gray-500 bg-gray-50">
          © 2025 Belleza Wellness | Settings & Privacy
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogContent.title}</DialogTitle>
            <DialogDescription>{dialogContent.description}</DialogDescription>
          </DialogHeader>
          {renderContent()}
          <DialogFooter>
            <Button className="bg-amber-600 hover:bg-amber-700 text-white ">
              Update
            </Button>
            <DialogClose asChild>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AccountSettingsUser;
