import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import youtubeicon from "@/assets/images/youTubeIcon.webp";
export default function YouTubeCard({ videoUrl, title = "Video Title" }) {
  // Extract video ID from URL
  const videoId = new URL(videoUrl).searchParams.get("v");
  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const videoLink = `https://www.youtube.com/watch?v=${videoId}`;

  // For now, using a placeholder title. You can fetch the real title using YouTube API.

  return (
    <a
      href={videoLink}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <Card className="h-full p-0 rounded-md transition-all duration-500 transform group-hover:scale-[1.02] group-hover:shadow-lg">
        <CardContent className="p-2 relative">
          <div className="relative overflow-hidden rounded-md">
            <img
              src={thumbnail}
              alt={title}
              className="w-full aspect-video object-cover rounded-md transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <img src={youtubeicon} alt="YouTube Icon" className="w-16 h-12" />
            </div>
          </div>
          <h2 className="text-md mt-4 text-center font-semibold text-gray-800 group-hover:text-red-600 transition-colors duration-300">
            {title}
          </h2>
        </CardContent>
      </Card>
    </a>
  );
}
