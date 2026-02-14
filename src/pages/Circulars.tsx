import { useEffect, useState } from "react";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

interface Circular {
  id: string;
  title: string;
  date: string;
  file_path: string;
}

const Circulars = () => {
  const [circulars, setCirculars] = useState<Circular[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/circulars`)
      .then((res) => res.json())
      .then((data) => setCirculars(data));
  }, []);

  const handleDownload = (url: string) => {
    window.open(url, "_blank");
  };

  const isNewCircular = (dateString: string) => {
    const circularDate = new Date(dateString);
    const today = new Date();
    const diffTime = today.getTime() - circularDate.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);
    return diffDays <= 3;
  };

  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="container mx-auto px-4">

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            All Circulars
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">

          {circulars.map((circular) => (
            <div
              key={circular.id}
              className="
                relative p-4 rounded-xl border
                bg-card shadow-sm
                hover:shadow-md hover:-translate-y-1
                transition-all duration-300
                flex flex-col justify-between
              "
            >
              {/* NEW Badge */}
              {isNewCircular(circular.date) && (
                <span className="absolute top-2 right-2 text-[10px] px-2 py-1 bg-red-500 text-white rounded-full font-semibold">
                  NEW
                </span>
              )}

              {/* Icon */}
              <div className="mb-3 flex justify-center">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-sm font-semibold text-center mb-2 line-clamp-2">
                {circular.title}
              </h3>

              {/* Date */}
              <p className="text-xs text-muted-foreground text-center mb-4">
                {circular.date}
              </p>

              {/* Download Button */}
              <Button
                size="sm"
                variant="outline"
                className="w-full hover:bg-primary hover:text-white transition-all duration-300"
                onClick={() =>
                  handleDownload(`${API_BASE}/${circular.file_path}`)
                }
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default Circulars;
