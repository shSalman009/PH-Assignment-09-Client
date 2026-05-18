"use client";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

const slides = [
  {
    id: 1,
    title: "Launch Your Next Big Idea",
    description:
      "Connect with a global community of innovators to validate and refine your startup concepts.",
    image: "/assets/banner-1.jpg",
    cta: "Explore Ideas",
  },
  {
    id: 2,
    title: "Collaborate & Grow",
    description:
      "Get real-world feedback from experienced developers and entrepreneurs to scale faster.",
    image: "/assets/banner-2.jpg",
    cta: "Start Sharing",
  },
  {
    id: 3,
    title: "The Future of Innovation",
    description:
      "Discover trending tech, AI, and healthcare startups that are changing the world today.",
    image: "/assets/banner-3.jpg",
    cta: "Join Today",
  },
];

export default function Banner() {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);

  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  // Track slide changes for the dots
  useEffect(() => {
    if (!api) {
      console.log("no api");
      return;
    }

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="w-full px-4 py-6">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full group"
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative h-[350px] sm:h-[450px] md:h-[550px] w-full overflow-hidden rounded-2xl select-none">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${slide.image}')` }}
                >
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
                </div>

                {/* Content */}
                <div className="relative flex h-full flex-col items-center justify-center px-6 text-center text-white md:px-12">
                  <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-6xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    {slide.title}
                  </h1>
                  <p className="mb-8 max-w-[650px] text-lg text-gray-200 md:text-xl animate-in fade-in slide-in-from-bottom-6 duration-1000">
                    {slide.description}
                  </p>
                  <Button
                    size="lg"
                    className="px-8 font-bold text-lg h-12"
                    asChild
                  >
                    <Link href="/ideas">{slide.cta}</Link>
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom Dot Navigation */}
        <div className="flex justify-center gap-2 mt-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-2 transition-all duration-300 rounded-full",
                current === index
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted hover:bg-muted-foreground",
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
}
