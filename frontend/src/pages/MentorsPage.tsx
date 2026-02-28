import { useState, useEffect } from "react";
import { ArrowLeft, ZoomIn, ZoomOut, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

// 👉 Replace with your actual images
import mentors1 from "@/assets/mentors.jpeg";
import mentors2 from "@/assets/mentors2.jpeg";

const MentorsPage = () => {
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  // ✅ Close modal with ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
        setZoom(1);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* ===== Header ===== */}
        <div className="flex flex-col items-center mb-14">

  <div className="flex items-center gap-5 flex-wrap justify-center">

    <h1 className="text-4xl font-bold text-primary">
      Our Mentors
    </h1>

  

  </div>

  <p className="text-xl text-muted-foreground mt-4 text-center">
     Distinguished personalities guiding our mission
  </p>

</div>
        
        {/* ===== Images Grid ===== */}
        <div className="grid md:grid-cols-2 gap-12">

          {[mentors1, mentors2].map((img, index) => (
            <div
              key={index}
              className="
                bg-white rounded-2xl
                shadow-lg hover:shadow-2xl
                hover:scale-[1.02]
                transition duration-300
                p-6
                cursor-pointer
              "
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={img}
                alt="Mentors"
                className="
                  w-full
                  h-auto
                  rounded-xl
                  object-contain
                "
              />
            </div>
          ))}

        </div>

        {/* ===== Premium Lightbox Modal ===== */}
        {selectedImage && (
          <div
            className="
              fixed inset-0
              bg-black/80 backdrop-blur-md
              flex items-center justify-center
              z-50
            "
            onClick={() => {
              setSelectedImage(null);
              setZoom(1);
            }}
          >
            <div
              className="relative w-full h-full flex items-center justify-center p-6"
              onClick={(e) => e.stopPropagation()}
            >

              {/* Controls */}
              <div className="absolute top-6 right-6 flex gap-3">

                <button
                  onClick={() => setZoom((z) => Math.min(z + 0.2, 4))}
                  className="bg-white p-2 rounded-full shadow hover:scale-110 transition"
                >
                  <ZoomIn size={20} />
                </button>

                <button
                  onClick={() => setZoom((z) => Math.max(z - 0.2, 1))}
                  className="bg-white p-2 rounded-full shadow hover:scale-110 transition"
                >
                  <ZoomOut size={20} />
                </button>

                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setZoom(1);
                  }}
                  className="bg-red-500 text-white p-2 rounded-full shadow hover:scale-110 transition"
                >
                  <X size={20} />
                </button>

              </div>

              {/* Image */}
              <div className="overflow-auto max-h-full max-w-full">
                <img
                  src={selectedImage}
                  alt="Mentor"
                  style={{ transform: `scale(${zoom})` }}
                  className="
                    mx-auto
                    rounded-xl
                    shadow-2xl
                    transition-transform duration-200
                    select-none
                  "
                  draggable={false}
                />
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MentorsPage;