import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const InputField = ({ label, id, value, onChange }) => (
  <div className="space-y-1">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} value={value} onChange={onChange} placeholder={label} />
  </div>
);

export default function BranchForm({ branchData, setBranchData }) {
  const handleBranchDataChange = (e) => {
    let { id, value } = e.target;
    setBranchData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleContactInputChange = (e) => {
    let { id, value } = e.target;
    setBranchData((prevData) => ({
      ...prevData,
      contact: {
        ...prevData.contact,
        [id]: value,
      },
    }));
  };

  const handleVideoInputChange = (e, index) => {
    const { id, value } = e.target;
    setBranchData((prevData) => {
      const updatedClinicVideo = [...prevData.clinicVideo];
      // Determine which field is being updated
      if (id.startsWith("video-title")) {
        updatedClinicVideo[index].title = value;
      } else if (id.startsWith("video-url")) {
        updatedClinicVideo[index].youTubeVideoUrl = value;
      } else if (id.startsWith("video-image-url")) {
        updatedClinicVideo[index].image.url = value;
      } else if (id.startsWith("video-image-alt")) {
        updatedClinicVideo[index].image.alt = value;
      }
      return {
        ...prevData,
        clinicVideo: updatedClinicVideo,
      };
    });
  };

  const handleWhyChooseUsInputChange = (e) => {
    let { id, value } = e.target;
    setBranchData((prevData) => ({
      ...prevData,
      whyChooseUs: {
        ...prevData.whyChooseUs,
        [id]: value,
      },
    }));
  };

  const handleWhyChooseUsFeatureInputChange = (e, index) => {
    const { id, value } = e.target;

    setBranchData((prevData) => {
      const updatedFeatures = [...prevData.whyChooseUs.features];
      if (id.includes("feature-title")) {
        updatedFeatures[index].title = value;
      } else if (id.includes("feature-description")) {
        updatedFeatures[index].description = value;
      } else if (id.includes("feature-icon")) {
        updatedFeatures[index].icon = value;
      }
      return {
        ...prevData,
        whyChooseUs: {
          ...prevData.whyChooseUs,
          features: updatedFeatures,
        },
      };
    });
  };

  const handleSeoChange = (e) => {
    let { id, value } = e.target;
    if (id === "metaKeywords") {
      setBranchData((prevData) => ({
        ...prevData,
        seo: {
          ...prevData.seo,
          [id]: value.split(",").map((keyword) => keyword.trim()),
        },
      }));
    } else if (id === "ogImageAlt") {
      setBranchData((prevData) => ({
        ...prevData,
        seo: {
          ...prevData.seo,
          ogImage: {
            ...prevData.seo.ogImage,
            alt: value,
          },
        },
      }));
    } else if (id === "structuredData") {
      let parsedValue;

      try {
        parsedValue = JSON.parse(value);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        parsedValue = value;
      }
      setBranchData((prevData) => ({
        ...prevData,
        seo: {
          ...prevData.seo,
          [id]: parsedValue,
        },
      }));
    } else {
      setBranchData((prevData) => ({
        ...prevData,
        seo: {
          ...prevData.seo,
          [id]: value,
        },
      }));
    }
  };

  const handleImageUpload = (e) => {
    const { id, files } = e.target;
    setBranchData((prevData) => ({
      ...prevData,
      [id]: files[0],
    }));
  };
  const handleClinicImageUpload = (e, index) => {
    const file = e.target.files?.[0];
    if (!file) return; // safety check

    setBranchData((prevData) => {
      const updatedClinicImages = [...(prevData.clinicImages || [])];
      updatedClinicImages[index] = file;
      return {
        ...prevData,
        clinicImages: updatedClinicImages,
      };
    });
  };

  return (
    <div className="space-y-4">
      {/* Branch Information */}
      <Label>Branch Information</Label>
      <div className="space-y-4 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Badge */}
          <div className="space-y-2">
            <Label htmlFor="badge">Badge</Label>
            <Input
              placeholder="Badge"
              id="badge"
              onChange={handleBranchDataChange}
              value={branchData.badge}
            />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              placeholder="Title"
              id="title"
              onChange={handleBranchDataChange}
              value={branchData.title}
            />
          </div>

          {/* Description */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Input
              placeholder="Description"
              id="description"
              onChange={handleBranchDataChange}
              value={branchData.description}
            />
          </div>

          {/* Image */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="image">Image</Label>
            <Input
              type="file"
              placeholder="Image"
              id="image"
              onChange={handleImageUpload}
            />
          </div>

          {/* Opening Hours */}
          <div className="space-y-2 flex gap-4 md:col-span-2">
            <div className="flex-1 space-y-2">
              <Label htmlFor="openingHours">OpeningHours</Label>
              <Input
                id="openingHours"
                className="w-full"
                onChange={handleBranchDataChange}
                value={branchData.openingHours}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Buttons */}
          <div
            className={`flex flex-col items-center gap-4 w-full border rounded-md shadow p-3`}
          >
            {branchData.buttons.map((button, index) => (
              <div key={index} className="space-y-4 w-full relative ">
                <Label htmlFor={`button-label-${index}`}>
                  Button {index + 1}
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Label"
                    id={`button-label-${index}`}
                    value={button.label}
                    onChange={(e) => {
                      const newButtons = [...branchData.buttons];
                      newButtons[index].label = e.target.value;
                      setBranchData({ ...branchData, buttons: newButtons });
                    }}
                  />
                  <InputField
                    label="Type"
                    id={`button-type-${index}`}
                    value={button.type}
                    onChange={(e) => {
                      const newButtons = [...branchData.buttons];
                      newButtons[index].type = e.target.value;
                      setBranchData({ ...branchData, buttons: newButtons });
                    }}
                  />
                  <InputField
                    label="Link"
                    id={`button-link-${index}`}
                    value={button.link}
                    onChange={(e) => {
                      const newButtons = [...branchData.buttons];
                      newButtons[index].link = e.target.value;
                      setBranchData({ ...branchData, buttons: newButtons });
                    }}
                  />
                  <InputField
                    label="Icon"
                    id={`button-icon-${index}`}
                    value={button.icon}
                    onChange={(e) => {
                      const newButtons = [...branchData.buttons];
                      newButtons[index].icon = e.target.value;
                      setBranchData({ ...branchData, buttons: newButtons });
                    }}
                  />
                </div>
                <Button
                  onClick={() => {
                    const newButtons = [...branchData.buttons];
                    newButtons.splice(index, 1);
                    setBranchData({ ...branchData, buttons: newButtons });
                  }}
                  className={`${
                    index === 0 ? "hidden" : ""
                  } absolute top-0 right-0`}
                  variant="destructive"
                  size="icon"
                >
                  <Trash2 />
                </Button>
              </div>
            ))}
            <Button
              onClick={() =>
                setBranchData((prevData) => ({
                  ...prevData,
                  buttons: [
                    ...prevData.buttons,
                    { label: "", type: "", link: "", icon: "" },
                  ],
                }))
              }
            >
              + Add New Button
            </Button>
          </div>
          {/* Features */}
          <div className="flex flex-col items-center gap-4 w-full border rounded-md shadow p-3">
            {branchData.features.map((feature, index) => (
              <div key={index} className="space-y-4 w-full ">
                <Label htmlFor={`feature-text-${index}`}>
                  Feature {index + 1}
                </Label>
                <div className="flex items-center gap-2 w-full  ">
                  {/* Text input */}
                  <div className="flex-1">
                    <InputField
                      label="Text"
                      id={`feature-text-${index}`}
                      value={feature.text}
                      onChange={(e) => {
                        const newFeatures = [...branchData.features];
                        newFeatures[index].text = e.target.value;
                        setBranchData({ ...branchData, features: newFeatures });
                      }}
                    />
                  </div>

                  {/* Icon input */}
                  <div className="flex-1">
                    <InputField
                      label="Icon"
                      id={`feature-icon-${index}`}
                      value={feature.icon}
                      onChange={(e) => {
                        const newFeatures = [...branchData.features];
                        newFeatures[index].icon = e.target.value;
                        setBranchData({ ...branchData, features: newFeatures });
                      }}
                    />
                  </div>

                  {/* Remove button */}
                  {branchData.features.length > 1 && (
                    <Button
                      onClick={() => {
                        const newFeatures = [...branchData.features];
                        newFeatures.splice(index, 1);
                        setBranchData({ ...branchData, features: newFeatures });
                      }}
                      className="mt-6" // aligns button with inputs
                      variant="destructive"
                      size="icon"
                    >
                      <Trash2 />
                    </Button>
                  )}
                </div>
              </div>
            ))}
            <Button
              onClick={() =>
                setBranchData((prevData) => ({
                  ...prevData,
                  features: [...prevData.features, { text: "", icon: "" }],
                }))
              }
            >
              + Add New Feature
            </Button>
          </div>
        </div>
      </div>

      <Label>Contact Information</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            type="tel"
            placeholder="Phone"
            id="phone"
            value={branchData.contact.phone}
            onChange={handleContactInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            placeholder="Email"
            id="email"
            value={branchData.contact.email}
            onChange={handleContactInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            placeholder="Address"
            id="address"
            value={branchData.contact.address}
            onChange={handleContactInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mapLink">Map Link</Label>
          <Input
            placeholder="Map Link"
            id="mapLink"
            value={branchData.contact.mapLink}
            onChange={handleContactInputChange}
          />
        </div>
      </div>

      <div>
        <Label>Video Gallery</Label>
        {branchData.clinicVideo.map((video, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4"
          >
            <div className="space-y-2">
              <Label htmlFor={`video-title-${index}`}>
                Video {index + 1} Title
              </Label>
              <Input
                placeholder="Video Title"
                id={`video-title-${index}`}
                onChange={(e) => handleVideoInputChange(e, index)}
                value={video.title}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`video-url-${index}`}>YouTube Video URL</Label>
              <Input
                placeholder="YouTube Video URL"
                id={`video-url-${index}`}
                onChange={(e) => handleVideoInputChange(e, index)}
                value={video.youTubeVideoUrl}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`clinicVideoImage`}>Thumbnail Image</Label>
              <Input
                type="file"
                placeholder="Image URL"
                id={`clinicVideoImage`}
                onChange={(e) => handleClinicImageUpload(e, index)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`video-image-alt-${index}`}>
                Thumbnail Image Alt Text
              </Label>
              <Input
                placeholder="Image Alt Text"
                id={`video-image-alt-${index}`}
                onChange={(e) => handleVideoInputChange(e, index)}
                value={video.image.alt}
              />
            </div>
          </div>
        ))}
        <Button
          onClick={() =>
            setBranchData((prevData) => ({
              ...prevData,
              clinicVideo: [
                ...prevData.clinicVideo,
                {
                  title: "",
                  youTubeVideoUrl: "",
                  image: { url: "", alt: "" },
                },
              ],
            }))
          }
        >
          + Add New Video
        </Button>
      </div>

      <Label>Why Choose Us</Label>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="whyChooseUsTitle">Why Choose Us Title</Label>
            <Input
              placeholder="Why Choose Us Title"
              id="title"
              onChange={handleWhyChooseUsInputChange}
              value={branchData.whyChooseUs.title}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whyChooseUsDescription">
              Why Choose Us Description
            </Label>
            <Input
              placeholder="Why Choose Us Description"
              id="description"
              onChange={handleWhyChooseUsInputChange}
              value={branchData.whyChooseUs.description}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whyChooseUsImage">Why Choose Us Image</Label>
            <Input
              type="file"
              placeholder="Why Choose Us Image"
              id="whyChooseUsImage"
              onChange={handleImageUpload}
            />
          </div>
        </div>
        {branchData.whyChooseUs.features.map((feature, index) => (
          <div key={index} className="space-y-2 ">
            {/* Feature Title */}
            <Label htmlFor={`feature-title-${index}`}>
              Feature {index + 1} Title
            </Label>
            <Input
              placeholder="Feature Title"
              id={`feature-title-${index}`}
              value={feature.title}
              onChange={(e) => handleWhyChooseUsFeatureInputChange(e, index)}
            />

            {/* Feature Description */}
            <Label htmlFor={`feature-description-${index}`}>
              Feature Description
            </Label>
            <Input
              placeholder="Feature Description"
              id={`feature-description-${index}`}
              value={feature.description}
              onChange={(e) => handleWhyChooseUsFeatureInputChange(e, index)}
            />

            {/* Feature Icon */}
            <Label htmlFor={`feature-icon-${index}`}>Feature Icon</Label>
            <Input
              placeholder="Feature Icon"
              id={`feature-icon-${index}`}
              value={feature.icon}
              onChange={(e) => handleWhyChooseUsFeatureInputChange(e, index)}
            />
          </div>
        ))}
      </div>

      <Label>SEO</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {/* Meta Title */}
        <div className="space-y-2">
          <Label htmlFor="metaTitle">Meta Title</Label>
          <Input
            placeholder="Meta Title"
            id="metaTitle"
            value={branchData.seo.metaTitle}
            onChange={handleSeoChange}
          />
        </div>

        {/* Meta Description */}
        <div className="space-y-2">
          <Label htmlFor="metaDescription">Meta Description</Label>
          <Input
            placeholder="Meta Description"
            id="metaDescription"
            value={branchData.seo.metaDescription}
            onChange={handleSeoChange}
          />
        </div>

        {/* Meta Keywords (comma separated) */}
        <div className="space-y-2">
          <Label htmlFor="metaKeywords">Meta Keywords</Label>
          <Input
            placeholder="Meta Keywords (comma separated)"
            id="metaKeywords"
            value={branchData.seo.metaKeywords.join(", ")}
            onChange={handleSeoChange}
          />
        </div>

        {/* Canonical URL */}
        <div className="space-y-2">
          <Label htmlFor="canonicalUrl">Canonical URL</Label>
          <Input
            placeholder="Canonical URL"
            id="canonicalUrl"
            value={branchData.seo.canonicalUrl}
            onChange={handleSeoChange}
          />
        </div>

        {/* OG Image URL */}
        <div className="space-y-2">
          <Label htmlFor="ogImage">OG Image </Label>
          <Input
            type="file"
            placeholder="OG Image "
            id="ogImage"
            onChange={handleImageUpload}
          />
        </div>

        {/* OG Image Alt */}
        <div className="space-y-2">
          <Label htmlFor="ogImageAlt">OG Image Alt Text</Label>
          <Input
            placeholder="OG Image Alt Text"
            id="ogImageAlt"
            value={branchData.seo.ogImage.alt}
            onChange={handleSeoChange}
          />
        </div>

        {/* Structured Data (JSON) */}
        <div className="space-y-2 ">
          <Label htmlFor="structuredData">Structured Data (JSON)</Label>
          <p className="text-sm capitalize">
            the data should be in JSON format as shown in the demo
          </p>
          <Textarea
            placeholder=""
            id="structuredData"
            value={JSON.stringify(branchData.seo.structuredData)}
            onChange={handleSeoChange}
            className={`resize-none h-full`}
          />
        </div>
        <div>
          <Label htmlFor="structuredData">Structured Data (JSON) Demo</Label>
          {`{"@context": "https://schema.org",
                "@type": "MedicalBusiness",
                "name": "Belleza Clinic Delhi",
                "image": "https://cdn.belleza.com/branches/delhi-clinic.webp",
                "url": "https://belleza.com/branches/delhi-clinic",
                "telephone": "+91 9999999999",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Connaught Place",
                  "addressLocality": "New Delhi",
                  "addressRegion": "Delhi",
                  "postalCode": "110001",
                  "addressCountry": "IN"
                },
                "openingHours": "Mo-Su 09:00-20:00",
                "sameAs": [
                  "https://www.facebook.com/bellezadelhi",
                  "https://www.instagram.com/bellezadelhi",
                  "https://www.youtube.com/@bellezadelhi"
          ]}`}
        </div>
      </div>
    </div>
  );
}
