import { useState, useEffect } from 'react';
import { FileText, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getCirculars } from '@/lib/storage';
import { Button } from '@/components/ui/button';
// import { seedSampleData } from '@/lib/sampleData';

export const VerticalMarquee = () => {
  const { t } = useTranslation();
  const [circulars, setCirculars] = useState(getCirculars());
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Seed sample data if none exists
    // seedSampleData();
    setCirculars(getCirculars());
  }, []);

  const handleDownload = (url: string, title: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-card border rounded-lg p-6 h-[400px] overflow-hidden">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FileText className="h-5 w-5 text-primary" />
        {t('circulars.title')}
      </h3>
      <div 
        className="relative h-[320px] overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          className={`space-y-3 ${isPaused ? '' : 'animate-marquee-up'}`}
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
        >
          {[...circulars, ...circulars].map((circular, index) => (
            <div
              key={`${circular.id}-${index}`}
              className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors group"
            >
              <FileText className="h-5 w-5 text-primary shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                  {circular.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">{circular.date}</p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="shrink-0 h-8 w-8 p-0 hover:bg-primary hover:text-primary-foreground"
                onClick={(e) => handleDownload(circular.url, circular.title, e)}
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
