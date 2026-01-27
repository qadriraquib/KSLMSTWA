import { FileText, Video, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { useTranslation } from 'react-i18next';

interface ResourceCardProps {
  title: string;
  description: string;
  subject: string;
  type: 'pdf' | 'video';
  url: string;
  videoUrl?: string;
}

export const ResourceCard = ({ title, description, subject, type, url, videoUrl }: ResourceCardProps) => {
  const { t } = useTranslation();

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              {type === 'pdf' ? (
                <FileText className="h-5 w-5 text-primary" />
              ) : (
                <Video className="h-5 w-5 text-accent" />
              )}
              {title}
            </CardTitle>
            <CardDescription className="mt-2">{description}</CardDescription>
          </div>
        </div>
        <div className="mt-2">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
            {subject}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        {videoUrl && type === 'video' && (
          <div className="aspect-video mb-4 rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src={videoUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="border-0"
            />
          </div>
        )}
        <Button asChild className="w-full">
          <a href={url} download={type === 'pdf'} target="_blank" rel="noopener noreferrer">
            <Download className="h-4 w-4 mr-2" />
            {t('download')}
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};
