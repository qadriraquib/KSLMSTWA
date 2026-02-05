import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FileText, Video, Download, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { fetchResources } from '@/lib/api/teacherResources';

export interface TeacherResource {
  id: string;
  category: string;
  classId: string;
  subject: string;
  title: string;
  type: 'pdf' | 'video';
  filePath?: string;
  youtubeUrl?: string;
}


// Resource categories
const resourceCategories = [
  { id: 'bridge-course', name: 'Bridge Course', nameKn: 'ಸೇತು ಕೋರ್ಸ್' },
  { id: 'unit-test', name: 'Unit Test', nameKn: 'ಘಟಕ ಪರೀಕ್ಷೆ' },
  { id: 'sa1-qp', name: 'SA-1 QP', nameKn: 'SA-1 ಪ್ರಶ್ನೆ ಪತ್ರಿಕೆ' },
  { id: 'sa2-qp', name: 'SA-2 QP', nameKn: 'SA-2 ಪ್ರಶ್ನೆ ಪತ್ರಿಕೆ' },
  { id: 'lab-qb', name: 'LAB QB', nameKn: 'ಲ್ಯಾಬ್ ಪ್ರಶ್ನೆ ಬ್ಯಾಂಕ್' },
  { id: 'lesson-plans', name: 'Lesson Plans', nameKn: 'ಪಾಠ ಯೋಜನೆಗಳು' },
  { id: 'annual-plans', name: 'Annual Plans', nameKn: 'ವಾರ್ಷಿಕ ಯೋಜನೆಗಳು' },
];

// Classes in Roman numerals
const classes = [
  { id: '1', roman: 'I', name: '1st Standard' },
  { id: '2', roman: 'II', name: '2nd Standard' },
  { id: '3', roman: 'III', name: '3rd Standard' },
  { id: '4', roman: 'IV', name: '4th Standard' },
  { id: '5', roman: 'V', name: '5th Standard' },
  { id: '6', roman: 'VI', name: '6th Standard' },
  { id: '7', roman: 'VII', name: '7th Standard' },
  { id: '8', roman: 'VIII', name: '8th Standard' },
];

// Subjects per class (simplified - can be expanded)
const subjectsByClass: Record<string, string[]> = {
  '1': ['Kannada','Urdu',  'English', 'Mathematics', 'EVS'],
  '2': ['Kannada','Urdu',  'English', 'Mathematics', 'EVS'],
  '3': ['Kannada','Urdu',  'English', 'Mathematics', 'EVS'],
  '4': ['Kannada','Urdu',  'English', 'Mathematics', 'EVS', 'Science'],
  '5': ['Kannada', 'Urdu', 'English', 'Mathematics', 'EVS', 'Science'],
  '6': ['Kannada', 'English', 'Urdu', 'Mathematics', 'Science', 'Social Science'],
  '7': ['Kannada', 'English', 'Urdu', 'Mathematics', 'Science', 'Social Science'],
  '8': ['Kannada', 'English', 'Urdu', 'Mathematics', 'Science', 'Social Science'],
};

const TeacherResources = () => {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [allResources, setAllResources] = useState<TeacherResource[]>([]);
  
  const category = searchParams.get('category') || '';
  const classId = searchParams.get('class') || '';
  const subject = searchParams.get('subject') || '';

  useEffect(() => {
  fetchResources().then(setAllResources);
}, []);

  // Filter resources based on current selection
  const filteredResources = allResources.filter(r => {
    if (category && r.category !== category) return false;
    if (classId && r.classId !== classId) return false;
    if (subject && r.subject !== subject) return false;
    return true;
  });
const pdfResources = filteredResources.filter(
  (r) => r.type === "pdf"
);

const videoResources = filteredResources.filter(
  (r) => r.type === "video"
);

  const selectedCategory = resourceCategories.find(c => c.id === category);
  const selectedClass = classes.find(c => c.id === classId);
  const subjects = classId ? subjectsByClass[classId] || [] : [];

  const getCategoryName = (cat: typeof resourceCategories[0]) => {
    return i18n.language === 'kn' ? cat.nameKn : cat.name;
  };

  const handleCategorySelect = (catId: string) => {
    setSearchParams({ category: catId });
  };

  const handleClassSelect = (clsId: string) => {
    setSearchParams({ category, class: clsId });
  };

  const handleSubjectSelect = (sub: string) => {
    setSearchParams({ category, class: classId, subject: sub });
  };

  const handleBack = () => {
    if (subject) {
      setSearchParams({ category, class: classId });
    } else if (classId) {
      setSearchParams({ category });
    } else if (category) {
      setSearchParams({});
    }
  };

const handleDownload = (resource: TeacherResource) => {
  if (resource.type === 'pdf' && resource.filePath) {
    window.open(resource.filePath, '_blank');
  }

  if (resource.type === 'video' && resource.youtubeUrl) {
    window.open(resource.youtubeUrl, '_blank');
  }
};
const getYoutubeEmbedUrl = (url?: string) => {
  if (!url) return "";

  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11
    ? `https://www.youtube.com/embed/${match[2]}`
    : "";
};


  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-primary">
            {t('resourcesPage.teacherResources', 'Teacher Resources')}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('resourcesPage.teacherResourcesSubtitle', 'Educational materials for teachers')}
          </p>
        </div>

        {/* Breadcrumb */}
        {(category || classId || subject) && (
          <div className="mb-8 flex items-center gap-2 text-sm">
            <button 
              onClick={() => setSearchParams({})}
              className="text-primary hover:underline"
            >
              Categories
            </button>
            {category && (
              <>
                <span>/</span>
                <button 
                  onClick={() => setSearchParams({ category })}
                  className={classId ? "text-primary hover:underline" : "text-muted-foreground"}
                >
                  {selectedCategory?.name}
                </button>
              </>
            )}
            {classId && (
              <>
                <span>/</span>
                <button 
                  onClick={() => setSearchParams({ category, class: classId })}
                  className={subject ? "text-primary hover:underline" : "text-muted-foreground"}
                >
                  Class {selectedClass?.roman}
                </button>
              </>
            )}
            {subject && (
              <>
                <span>/</span>
                <span className="text-muted-foreground">{subject}</span>
              </>
            )}
          </div>
        )}

        {/* Back Button */}
        {(category || classId || subject) && (
          <Button variant="outline" onClick={handleBack} className="mb-6">
            ← Back
          </Button>
        )}

        {/* Step 1: Show Categories */}
        {!category && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {resourceCategories.map((cat) => (
              <Card 
                key={cat.id}
                className="cursor-pointer hover:shadow-lg transition-shadow hover:border-primary"
                onClick={() => handleCategorySelect(cat.id)}
              >
                <CardHeader className="text-center">
                  <BookOpen className="h-12 w-12 mx-auto text-primary mb-2" />
                  <CardTitle className="text-lg">{getCategoryName(cat)}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}

        {/* Step 2: Show Classes */}
        {category && !classId && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Select Class - {selectedCategory?.name}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 max-w-4xl mx-auto">
              {classes.map((cls) => (
                <Card 
                  key={cls.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow hover:border-primary"
                  onClick={() => handleClassSelect(cls.id)}
                >
                  <CardContent className="p-6 text-center">
                    <span className="text-3xl font-bold text-primary">{cls.roman}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Show Subjects */}
        {category && classId && !subject && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Select Subject - Class {selectedClass?.roman} - {selectedCategory?.name}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {subjects.map((sub) => (
                <Card 
                  key={sub}
                  className="cursor-pointer hover:shadow-lg transition-shadow hover:border-primary"
                  onClick={() => handleSubjectSelect(sub)}
                >
                  <CardContent className="p-6 text-center">
                    <span className="text-lg font-medium">{sub}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Show Resources */}
        {category && classId && subject && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-center">
              {subject} - Class {selectedClass?.roman} - {selectedCategory?.name}
            </h2>
            
            {filteredResources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
               {/* Step 4: Show Resources */}
{category && classId && subject && (
  <div className="space-y-10">
    <h2 className="text-2xl font-semibold text-center">
      {subject} - Class {selectedClass?.roman} - {selectedCategory?.name}
    </h2>

    {/* ================= PDF SECTION ================= */}
    {pdfResources.length > 0 && (
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FileText className="text-red-500" />
          PDF Resources
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pdfResources.map((resource) => (
            <Card key={resource.id}>
              <CardHeader>
                <CardTitle className="text-base">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() =>
                    window.open(
                      `http://127.0.0.1:8000/${resource.filePath}`,
                      "_blank"
                    )
                  }
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
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
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Video className="text-blue-500" />
          Video Resources
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videoResources.map((resource) => (
            <Card key={resource.id}>
              <CardHeader>
                <CardTitle className="text-base">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Embedded Player */}
                <div className="aspect-video">
                <div className="relative w-full overflow-hidden rounded-lg"
     style={{ paddingTop: "56.25%" }}  // 16:9
>
  <iframe
    src={getYoutubeEmbedUrl(resource.youtubeUrl)}
    className="absolute top-0 left-0 w-full h-full"
    title={resource.title}
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
</div>

                </div>

              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )}

    {/* ================= EMPTY STATE ================= */}
    {pdfResources.length === 0 && videoResources.length === 0 && (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No resources available for this selection yet.
        </p>
      </div>
    )}
  </div>
)}

              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No resources available for this selection yet.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherResources;
