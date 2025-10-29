import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import Autoplay from "embla-carousel-autoplay";

export function CrouselCs({
  children,
  autoScrollenabled,
  autoPlayEnabled,
  isButtonEnabled = true,
}) {
  if (autoPlayEnabled && autoScrollenabled) {
    throw new Error(
      "AutoPlay and AutoScroll can't be enabled at the same time"
    );
  }
  return (
    <div className="w-full max-w-screen">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          ...(autoScrollenabled ? [AutoScroll({ delay: 2000 })] : []),
          ...(autoPlayEnabled ? [Autoplay({ delay: 3000 })] : []),
        ]}
        className="w-full"
      >
        <CarouselContent>{children}</CarouselContent>
        {isButtonEnabled && (
          <>
            <CarouselPrevious className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 rounded-sm shadow-2xl bg-white/80 hover:bg-white" />
            <CarouselNext className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 rounded-sm shadow-2xl bg-white/80 hover:bg-white" />
          </>
        )}
      </Carousel>
    </div>
  );
}
