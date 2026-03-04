import { useState, useEffect } from "react";
import { FileText, Video, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { fetchResources } from "@/lib/api/teacherResources";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export interface Resource {
  id: string;
  title: string;
  type: "pdf" | "video";
  filePath?: string;
  youtubeUrl?: string;
}

const MarathiResources = () => {
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    fetchResources().then(setResources);
  }, []);

  const pdfResources = resources.filter((r) => r.type === "pdf");
  const videoResources = resources.filter((r) => r.type === "video");

  const handleDownload = async (
    path: string,
    title: string,
    e: React.MouseEvent
  ) => {
    e.preventDefault();

    if (!path) {
      alert("File not available");
      return;
    }

    const url = path.startsWith("http")
      ? path
      : `${API_BASE}${path.startsWith("/") ? "" : "/"}${path}`;

    const response = await fetch(url);

    if (!response.ok) {
      alert("File not found");
      return;
    }

    const blob = await response.blob();

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${title}.pdf`;
    link.click();

    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container mx-auto px-4">

        {/* Page Heading */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-primary">
            Marathi Resources
          </h1>
        </div>

        {/* PDF */}
        {pdfResources.length > 0 && (
          <div className="mb-14">
            <h2 className="text-lg font-semibold mb-6 text-red-700 border-l-4 border-red-600 pl-3">
              PDF Resources
            </h2>

            {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {pdfResources.map((resource) => (
                <Card key={resource.id}>
                  <CardContent className="p-4 flex flex-col justify-between h-full">
                    <div>
                      <FileText className="h-8 w-8 text-red-600 mb-2" />
                      <p className="text-sm font-medium line-clamp-2">
                        {resource.title}
                      </p>
                    </div>

                    <button
                      onClick={(e) =>
                        handleDownload(resource.filePath || "", resource.title, e)
                      }
                      className="text-primary hover:underline text-xs mt-3"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div> */}
          </div>
        )}

        {/* VIDEO */}
        {videoResources.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-6 text-blue-700 border-l-4 border-blue-600 pl-3">
              Video Resources
            </h2>

            {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {videoResources.map((resource) => (
                <Card key={resource.id}>
                  <CardContent className="p-4 flex flex-col justify-between h-full">
                    <div>
                      <Video className="h-8 w-8 text-blue-600 mb-2" />
                      <p className="text-sm font-medium line-clamp-2">
                        {resource.title}
                      </p>
                    </div>

                    <button
                      onClick={() => window.open(resource.youtubeUrl, "_blank")}
                      className="text-blue-600 text-xs mt-3"
                    >
                      Watch
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div> */}
          </div>
        )}

      </div>
    </div>
  );
};

export default MarathiResources;