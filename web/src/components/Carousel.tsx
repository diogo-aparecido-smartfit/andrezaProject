import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";

interface CarouselProps {
  options?: EmblaOptionsType;
  children: React.ReactNode;
}

export default function Carousel({ options, children }: CarouselProps) {
  const [emblaRef] = useEmblaCarousel({
    slidesToScroll: 1,
    align: "start",
    ...options,
  });

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-10">{children}</div>
    </div>
  );
}
