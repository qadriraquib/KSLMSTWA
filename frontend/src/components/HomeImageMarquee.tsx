import { useEffect, useState } from "react";
import { fetchGallery } from "@/lib/api/galleryApi";
import { buildFileUrl } from "@/utils/url";

interface GalleryImage {
  id: string;
  url: string;
  title: string;
}

const HomeImageMarquee = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    fetchGallery()
      .then(setImages)
      .catch(() => setImages([]));
  }, []);

  if (images.length === 0) return null;

  return (
  <div className="relative overflow-hidden bg-muted/30 py-12">

  {/* Section Title */}
  <div className="text-center mb-10">
    <h2 className="text-3xl font-bold text-primary">
      Gallery Highlights
    </h2>
    <div className="w-24 h-1 bg-primary mx-auto mt-3 rounded-full"></div>
  </div>

  {/* Marquee */}
  <div className="relative overflow-hidden marquee-container">

    {/* Fade edges */}
    <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-background to-transparent z-10"></div>
    <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-background to-transparent z-10"></div>

    <div className="flex gap-8 animate-marquee-left px-6">
      {[...images, ...images].map((image, index) => (
        <img
          key={`${image.id}-${index}`}
          src={buildFileUrl(image.url)}
          alt={image.title}
          className="
            h-44 w-72 object-cover rounded-xl shadow-md
             hover:grayscale-0
            transition-all duration-500
            hover:scale-105
          "
        />
      ))}
    </div>

  </div>
</div>

  );
};

export default HomeImageMarquee;
