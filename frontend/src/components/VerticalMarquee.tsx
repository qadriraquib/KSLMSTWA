import { useEffect, useState } from "react";
import { FileText, Download } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const VerticalMarquee = () => {
  const { t } = useTranslation();
  const [circulars, setCirculars] = useState<any[]>([]);
  const [isPaused, setIsPaused] = useState(false);
const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/circulars`)
      .then((res) => res.json())
      .then((data) => setCirculars(data));
  }, []);

  const handleDownload =async (
    url: string,
    title: string,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();
  const response = await fetch(url, { method: "GET" });
    const blob = await response.blob();
    const link = document.createElement("a");
     link.href = window.URL.createObjectURL(blob); link.download = title || "file.pdf";
     link.click();
     window.URL.revokeObjectURL(link.href);
  };

  const isNewCircular = (dateString: string) => {
    const circularDate = new Date(dateString);
    const today = new Date();
    const diffTime = today.getTime() - circularDate.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);
    return diffDays <= 3;
  };

return (
  <div className="bg-card border rounded-2xl p-6 h-[400px] overflow-hidden shadow-md flex flex-col">

    {/* Header */}
    <div className="flex items-center gap-3 mb-4 border-b pb-3">
      <div className="p-2 bg-primary/10 rounded-lg">
        <FileText className="h-5 w-5 text-primary" />
      </div>
      <h3 className="text-lg font-bold text-primary">
        {t("circulars.title")}
      </h3>
    </div>

    {/* Vertical Marquee */}
    <div
      className="relative flex-1 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className={`space-y-4 ${
          isPaused ? "" : "animate-marquee-up"
        }`}
        style={{
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {[...circulars, ...circulars].map((c, index) => (
          <div
            key={`${c.id}-${index}`}
            className="flex items-center gap-3 text-sm py-2 border-b border-border/40 last:border-none"
          >
            {/* PDF Tag */}
            <span className="px-2 py-0.5 bg-gray-800 text-white rounded text-[10px] font-medium">
              PDF
            </span>

            {/* Title */}
            <span className="flex-1 truncate font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer">
              {c.title}
            </span>

            {/* NEW Badge */}
            {isNewCircular(c.date) && (
              <span className="px-2 py-0.5 bg-red-500 text-white rounded text-[10px] font-semibold">
                NEW
              </span>
            )}

            {/* Download */}
            <button
              onClick={(e) =>
                handleDownload(
                  `${API_BASE}/${c.file_path}`,
                  c.title,
                  e
                )
              }
              className="text-primary hover:underline text-xs"
            >
              <Download className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>

    {/* View All Button */}
    <div className="pt-3 border-t mt-3">
    <Button
  variant="ghost"
  className="w-full text-primary hover:bg-primary hover:text-white transition-all duration-300"
  onClick={() => navigate("/circulars")}
>
  View All Circulars
</Button>

    </div>
  </div>
);

};
