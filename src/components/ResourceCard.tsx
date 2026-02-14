import { FileText, Video, Download, Eye } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Button } from "./ui/button";
import { useState } from "react";

interface ResourceCardProps {
  title: string;
  description: string;
  subject: string;
  type: "pdf" | "video";
  url: string;
  videoUrl?: string;
  fileSize?: string;
  uploadDate?: string;
}

export const ResourceCard = ({
  title,
  description,
  subject,
  type,
  url,
  videoUrl,
  fileSize,
  uploadDate,
}: ResourceCardProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <>
      <Card className="group border border-gray-200 rounded-xl bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1">

        {/* Header */}
        <CardHeader className="pb-3">
          <div className="flex items-start gap-3">

            {/* Icon */}
            <div
              className={`p-3 rounded-lg ${
                type === "pdf"
                  ? "bg-red-50 text-red-600"
                  : "bg-blue-50 text-blue-600"
              }`}
            >
              {type === "pdf" ? (
                <FileText className="h-5 w-5" />
              ) : (
                <Video className="h-5 w-5" />
              )}
            </div>

            <div className="flex-1">
              <CardTitle className="text-base font-semibold text-gray-800 leading-snug">
                {title}
              </CardTitle>

              <CardDescription className="mt-1 text-sm text-gray-600 line-clamp-2">
                {description}
              </CardDescription>
            </div>
          </div>

          {/* Subject Badge */}
          <div className="mt-3">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
              {subject}
            </span>
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="pt-0">

          {/* Video Preview */}
          {videoUrl && type === "video" && (
            <div className="aspect-video mb-4 rounded-lg overflow-hidden border">
              <iframe
                width="100%"
                height="100%"
                src={videoUrl}
                title={title}
                allowFullScreen
                className="border-0"
              />
            </div>
          )}

          {/* Metadata */}
          {(fileSize || uploadDate) && (
            <div className="text-xs text-gray-500 mb-4 flex justify-between">
              {fileSize && <span>Size: {fileSize}</span>}
              {uploadDate && <span>Uploaded: {uploadDate}</span>}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">

            {/* Preview Button (PDF Only) */}
            {type === "pdf" && (
              <Button
                variant="outline"
                className="flex-1 h-10"
                onClick={() => setPreviewOpen(true)}
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            )}

            {/* Download Button */}
            <Button
              asChild
              className="flex-1 h-10 bg-primary hover:bg-primary/90 text-white"
            >
              <a
                href={url}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* PDF Preview Modal */}
      {previewOpen && type === "pdf" && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-xl overflow-hidden shadow-lg">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-semibold text-gray-800">{title}</h3>
              <button
                onClick={() => setPreviewOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <iframe
              src={url}
              className="w-full h-[75vh]"
              title="PDF Preview"
            />
          </div>
        </div>
      )}
    </>
  );
};
