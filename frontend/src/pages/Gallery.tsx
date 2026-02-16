import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ZoomIn } from "lucide-react";
import ImageLightbox from "@/components/ImageLightbox";
import { fetchGallery } from "@/lib/api/galleryApi";
import { buildFileUrl } from "@/utils/url";

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description?: string;
}

const Gallery = () => {
  const { t } = useTranslation();

  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
    fetchGallery()
      .then(setGalleryImages)
      .catch(() => setGalleryImages([]));
  }, []);

  const images = galleryImages.map((img) =>
  buildFileUrl(img.url) || ""
);


  const handlePrev = () => {
    setPhotoIndex((photoIndex + images.length - 1) % images.length);
  };

  const handleNext = () => {
    setPhotoIndex((photoIndex + 1) % images.length);
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-primary">
            {t("galleryPage.title")}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t("galleryPage.subtitle")}
          </p>
        </div>

        {/* ✅ EMPTY STATE */}
        {galleryImages.length === 0 && (
          <p className="text-center text-muted-foreground">
            No images available
          </p>
        )}

        {/* ✅ DYNAMIC GALLERY */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
              onClick={() => {
                setPhotoIndex(index);
                setIsOpen(true);
              }}
            >
             <img
  src={buildFileUrl(image.url)}
  alt={image.title}
  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
/>


              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <ZoomIn className="h-8 w-8 text-white" />
              </div>
            </div>
          ))}
        </div>

        {/* ✅ LIGHTBOX */}
        <ImageLightbox
          images={images}
          currentIndex={photoIndex}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onPrev={handlePrev}
          onNext={handleNext}
          title={galleryImages[photoIndex]?.title}
          description={galleryImages[photoIndex]?.description}
        />
      </div>
    </div>
  );
};

export default Gallery;
