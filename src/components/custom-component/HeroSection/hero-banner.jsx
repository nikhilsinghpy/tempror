import React from "react";
import { Link } from "react-router-dom";

export default function HeroBanner({ item }) {
  return (
    <Link to={item?.link || "/book-appointment"}>
      <img
        src={item?.image?.secure_url}
        alt="Hero Banner"
        className="w-full max-h-[650px] border object-contain rounded-2xl"
        loading="lazy"
      />
    </Link>
  );
}
