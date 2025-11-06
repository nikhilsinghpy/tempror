import React from "react";

export default function HeroBanner({ item }) {
  return (
    <img
      src={item?.image?.secure_url}
      alt="Hero Banner"
      className="w-full max-h-[650px] border object-contain rounded-2xl"
    />
  );
}
