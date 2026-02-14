import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import heroImage from '@/assets/hero-education.jpg';
import crausImg1 from '@/assets/1.jpeg';
import crausImg2 from '@/assets/2.jpeg';
import crausImg3 from '@/assets/3.jpeg';
const slides = [
  {
    image: crausImg1,
    text: 'Education must begin in the mother tongue.',
    author: 'Mahatma Gandhi',
  },
  {
    image: crausImg2,
    text: 'Basic education thrives when rooted in the mother tongue and regional languages.',
    author: 'Dr Zakir Husain.',
  },
  {
    image: crausImg3,
    text: 'A child’s imagination blossoms best in the mother tongue.',
    author: 'Rabindranath Tagore',
  },
];


export const HeroCarousel = () => {
  const [api, setApi] = useState<any>();
  
  useEffect(() => {
    if (!api) return;
    
    const plugin = Autoplay({ delay: 5000, stopOnInteraction: false });
    api.plugins().autoplay = plugin;
  }, [api]);

  return (
    <div className="relative w-full">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent>
         {slides.map((slide, index) => (

            <CarouselItem key={index}>
              <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
               <img
  src={slide.image}
  alt="Education"
  className="w-full h-full object-cover"
/>

                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30 flex items-center justify-center">
                  <div className="container mx-auto px-4 text-center">
                    <blockquote className="text-white">
                      <p className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl mx-auto">
                        "{slide.text}"
                      </p>
                      <footer className="text-lg md:text-xl opacity-90">
                        — {slide.author}
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
};
