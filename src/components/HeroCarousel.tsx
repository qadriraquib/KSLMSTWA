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

const quotes = [
  {
    text: 'Education is the most powerful weapon which you can use to change the world.',
    author: 'Nelson Mandela',
  },
  {
    text: 'The function of education is to teach one to think intensively and to think critically.',
    author: 'Martin Luther King Jr.',
  },
  {
    text: 'Education is not preparation for life; education is life itself.',
    author: 'John Dewey',
  },
  {
    text: 'The beautiful thing about learning is that no one can take it away from you.',
    author: 'B.B. King',
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
          {quotes.map((quote, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
                <img
                  src={heroImage}
                  alt="Education"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30 flex items-center justify-center">
                  <div className="container mx-auto px-4 text-center">
                    <blockquote className="text-white">
                      <p className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl mx-auto">
                        "{quote.text}"
                      </p>
                      <footer className="text-lg md:text-xl opacity-90">
                        — {quote.author}
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
