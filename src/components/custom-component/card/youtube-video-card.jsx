import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function YouTubeCard({ videoUrl }) {
  // Extract video ID from URL
  const videoId = new URL(videoUrl).searchParams.get("v");
  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const videoLink = `https://www.youtube.com/watch?v=${videoId}`;
  const [title, setTitle] = useState("Loading...");

  // For now, using a placeholder title. You can fetch the real title using YouTube API.
  useEffect(() => {
    setTitle("Sample YouTube Video");
  }, [videoId]);

  return (
    <a
      href={videoLink}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <Card className="h-full p-0 rounded-md">
        <CardContent className="p-2 ">
          <img
            src={thumbnail}
            alt={title}
            className="w-full aspect-video object-cover rounded-md"
          />
          <h2 className="text-md mt-4 text-center font-semibold text-gray-800">
            {title}
          </h2>
        </CardContent>
      </Card>
    </a>
  );
}
