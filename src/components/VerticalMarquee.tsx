import { useEffect, useState } from "react";
import { FileText, Download } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export const VerticalMarquee = () => {
  const { t } = useTranslation();
  const [circulars, setCirculars] = useState<any[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/circulars")
      .then(res => res.json())
      .then(data => setCirculars(data));
  }, []);

  const handleDownload = (url: string, title: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const link = document.createElement("a");
    link.href = url;
    link.download = `${title}.pdf`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-card border rounded-lg p-6 h-[400px] overflow-hidden">
      {/* ✅ SAME HEADING */}
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FileText className="h-5 w-5 text-primary" />
        {t("circulars.title")}
      </h3>

      {/* ✅ MARQUEE CONTAINER */}
      <div
        className="relative h-[320px] overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={`space-y-3 ${
            isPaused ? "" : "animate-marquee-up"
          }`}
          style={{
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {/* ✅ duplicate array for seamless loop */}
          {[...circulars, ...circulars].map((c, index) => (
            <div
              key={`${c.id}-${index}`}
              className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors group"
            >
              <FileText className="h-5 w-5 text-primary shrink-0" />

              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                  {c.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {c.date}
                </p>
              </div>

              <Button
                size="sm"
                variant="ghost"
                className="shrink-0 h-8 w-8 p-0 hover:bg-primary hover:text-primary-foreground"
                onClick={(e) =>
                  handleDownload(
                    `http://127.0.0.1:8000/${c.file_path}`,
                    c.title,
                    e
                  )
                }
                title="Download PDF"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
