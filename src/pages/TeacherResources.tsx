import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FileText, Video, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchResources } from "@/lib/api/teacherResources";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export interface TeacherResource {
  id: string;
  category: string;
  classId: string;
  subject: string;
  title: string;
  type: "pdf" | "video";
  filePath?: string;
  youtubeUrl?: string;
}

const TeacherResources = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allResources, setAllResources] = useState<TeacherResource[]>([]);

  const category = searchParams.get("category") || "";
  const classId = searchParams.get("class") || "";
  const subject = searchParams.get("subject") || "";

  useEffect(() => {
    fetchResources().then(setAllResources);
  }, []);

  const filteredResources = allResources.filter((r) => {
    if (category && r.category !== category) return false;
    if (classId && r.classId !== classId) return false;
    if (subject && r.subject !== subject) return false;
    return true;
  });

  const pdfResources = filteredResources.filter((r) => r.type === "pdf");
  const videoResources = filteredResources.filter((r) => r.type === "video");

  const handleDownload = (resource: TeacherResource) => {
    if (!resource.filePath) return;

    // If backend already returns full URL
    if (resource.filePath.startsWith("http")) {
      window.open(resource.filePath, "_blank");
    } else {
      window.open(`${API_BASE}/${resource.filePath}`, "_blank");
    }
  };

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container mx-auto px-4">

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-primary">
            Teacher Resources
          </h1>
          <p className="text-muted-foreground">
          Creating, organizing, and delivering essential teaching materials.
          </p>
        </div>

        {/* ================= PDF SECTION ================= */}
        {pdfResources.length > 0 && (
          <div className="mb-14">
            <h2 className="text-lg font-semibold mb-6 text-red-700 border-l-4 border-red-600 pl-3">
              PDF Resources
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {pdfResources.map((resource) => (
                <Card
                  key={resource.id}
                  className="bg-white border hover:shadow-md transition"
                >
                  <CardContent className="p-4 flex flex-col justify-between h-full">

                    <div className="mb-4">
                      <FileText className="h-8 w-8 text-red-600 mb-2" />
                      <p className="text-sm font-medium line-clamp-2">
                        {resource.title}
                      </p>
                    </div>

                    <Button
                      onClick={() => handleDownload(resource)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white text-xs"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>

                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ================= VIDEO SECTION ================= */}
        {videoResources.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-6 text-blue-700 border-l-4 border-blue-600 pl-3">
              Video Resources
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {videoResources.map((resource) => (
                <Card
                  key={resource.id}
                  className="bg-white border hover:shadow-md transition"
                >
                  <CardContent className="p-4 flex flex-col justify-between h-full">

                    <div className="mb-4">
                      <Video className="h-8 w-8 text-blue-600 mb-2" />
                      <p className="text-sm font-medium line-clamp-2">
                        {resource.title}
                      </p>
                    </div>

                    <Button
                      onClick={() =>
                        window.open(resource.youtubeUrl, "_blank")
                      }
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs"
                    >
                      Watch
                    </Button>

                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {pdfResources.length === 0 && videoResources.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              No resources available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherResources;
