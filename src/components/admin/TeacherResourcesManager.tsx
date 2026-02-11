import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus, FileText, Video, Edit2 } from 'lucide-react';
import { TeacherResource } from '@/lib/storage';
import {fetchResources, createResource, updateResource, deleteResourceApi} from '@/lib/api/teacherResources';

const resourceCategories = [
  { id: 'bridge-course', name: 'Bridge Course' },
  { id: 'unit-test', name: 'Unit Test' },
  { id: 'sa1-qp', name: 'SA-1 QP' },
  { id: 'sa2-qp', name: 'SA-2 QP' },
  { id: 'lab-qb', name: 'LAB QB' },
  { id: 'lesson-plans', name: 'Lesson Plans' },
  { id: 'annual-plans', name: 'Annual Plans' },
];

const classes = [
  { id: '1', name: 'Class I' },
  { id: '2', name: 'Class II' },
  { id: '3', name: 'Class III' },
  { id: '4', name: 'Class IV' },
  { id: '5', name: 'Class V' },
  { id: '6', name: 'Class VI' },
  { id: '7', name: 'Class VII' },
  { id: '8', name: 'Class VIII' },
];

const subjectsByClass: Record<string, string[]> = {
  '1': ['English', 'Mathematics', 'EVS', 'Urdu', 'Kannada'],
  '2': ['English', 'Mathematics', 'EVS', 'Urdu', 'Kannada'],
  '3': ['English', 'Mathematics', 'EVS', 'Urdu', 'Kannada'],
  '4': ['English', 'Mathematics', 'EVS', 'Urdu', 'Kannada'],
  '5': ['English', 'Mathematics', 'Science', 'Social Studies', 'Urdu', 'Kannada'],
  '6': ['English', 'Mathematics', 'Science', 'Social Studies', 'Urdu', 'Kannada'],
  '7': ['English', 'Mathematics', 'Science', 'Social Studies', 'Urdu', 'Kannada'],
  '8': ['English', 'Mathematics', 'Science', 'Social Studies', 'Urdu', 'Kannada'],
};

export function TeacherResourcesManager() {
  const [resources, setResources] = useState<TeacherResource[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    category: '',
    classId: '',
    subject: '',
    title: '',
    type: 'pdf' as 'pdf' | 'video',
    file: null as File | null,          // for PDF
    youtubeUrl: '',                     // for Video
  });

  // Filters
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterClass, setFilterClass] = useState<string>('all');
  const [filterSubject, setFilterSubject] = useState<string>('all');

  useEffect(() => {
     fetchResources().then(setResources);
  }, []);
// if (
//   !formData.category ||
//   !formData.classId ||
//   !formData.subject ||
//   !formData.type
// ) {
//   alert("Please fill all required fields");
//   return;
// }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // ✅ Validation INSIDE submit
  if (
    !formData.category ||
    !formData.classId ||
    !formData.subject ||
    !formData.type
  ) {
    alert("Please fill all required fields");
    return;
  }

  const fd = new FormData();

  fd.append("category", formData.category);

  // ✅ SAFE append
  if (formData.classId) {
    fd.append("class_id", formData.classId);
  }

  fd.append("subject", formData.subject);
  fd.append("title", formData.title);
  fd.append("type", formData.type);

  if (formData.type === "pdf") {
    if (!formData.file) {
      alert("Please upload a PDF file");
      return;
    }
    fd.append("file", formData.file);
  }

  if (formData.type === "video") {
    if (!formData.youtubeUrl) {
      alert("Please enter YouTube URL");
      return;
    }
    fd.append("youtube_url", formData.youtubeUrl);
  }

  if (editingId) {
    await updateResource(editingId, fd);
  } else {
    await createResource(fd);
  }

  setResources(await fetchResources());
  resetForm();
};



  const resetForm = () => {
  setFormData({
    category: '',
    classId: '',
    subject: '',
    title: '',
    type: 'pdf',
    file: null,
    youtubeUrl: '',
  });
  setEditingId(null);
};


const handleEdit = (resource: TeacherResource) => {
  // ✅ Step 1: Set class FIRST (as string)
  setFormData((prev) => ({
    ...prev,
    category: resource.category,
    classId: String(resource.classId),
    subject: '',           // reset first
    title: resource.title,
    type: resource.type,
    file: null,
    youtubeUrl: resource.youtubeUrl || '',
  }));

  // ✅ Step 2: Set subject AFTER class is set
  setTimeout(() => {
    setFormData((prev) => ({
      ...prev,
      subject: resource.subject,
    }));
  }, 0);

  setEditingId(resource.id);
};



const handleDelete = async (id: string) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this resource?"
  );

  if (!confirmDelete) return;

  try {
    await deleteResourceApi(id);
    setResources(await fetchResources());
  } catch (err) {
    console.error(err);
    alert("Failed to delete resource");
  }
};


  const availableSubjects = formData.classId ? subjectsByClass[formData.classId] || [] : [];
  const filterSubjects = filterClass !== 'all' ? subjectsByClass[filterClass] || [] : [];

  const filteredResources = resources.filter(r => {
    if (filterCategory !== 'all' && r.category !== filterCategory) return false;
    if (filterClass !== 'all' && r.classId !== filterClass) return false;
    if (filterSubject !== 'all' && r.subject !== filterSubject) return false;
    return true;
  });

  const getCategoryName = (id: string) => resourceCategories.find(c => c.id === id)?.name || id;
  const getClassName = (id: string) => classes.find(c => c.id === id)?.name || id;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Edit Resource' : 'Add New Teacher Resource'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {resourceCategories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="classId">Class *</Label>
                <Select
                  value={formData.classId}
                  onValueChange={(value) => setFormData({ ...formData, classId: value, subject: '' })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Select
                  value={formData.subject}
                  onValueChange={(value) => setFormData({ ...formData, subject: value })}
                  disabled={!formData.classId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSubjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Resource Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter resource title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: 'pdf' | 'video') => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* PDF Upload */}
{formData.type === 'pdf' && (
  <div className="space-y-2">
    <Label>Upload PDF *</Label>
    <Input
      type="file"
      accept="application/pdf"
      onChange={(e) =>
        setFormData({ ...formData, file: e.target.files?.[0] || null })
      }
      required
    />
  </div>
)}

{/* YouTube Video */}
{formData.type === 'video' && (
  <div className="space-y-2">
    <Label>YouTube Embed / Video URL *</Label>
    <Input
      value={formData.youtubeUrl}
      onChange={(e) =>
        setFormData({ ...formData, youtubeUrl: e.target.value })
      }
      placeholder="https://www.youtube.com/watch?v=xxxx"
      required
    />
  </div>
)}


            <div className="flex gap-2">
              <Button type="submit" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                {editingId ? 'Update Resource' : 'Add Resource'}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {resourceCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Class</Label>
              <Select 
                value={filterClass} 
                onValueChange={(value) => {
                  setFilterClass(value);
                  setFilterSubject('all');
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Subject</Label>
              <Select 
                value={filterSubject} 
                onValueChange={setFilterSubject}
                disabled={filterClass === 'all'}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {filterSubjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resources List */}
      <Card>
        <CardHeader>
          <CardTitle>
            Resources ({filteredResources.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredResources.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No resources found. Add your first resource above.
            </p>
          ) : (
            <div className="space-y-3">
              {filteredResources.map((resource) => (
                <div
                  key={resource.id}
                  className="flex items-center justify-between p-4 border rounded-lg bg-card"
                >
                  <div className="flex items-center gap-4">
                    {resource.type === 'pdf' ? (
                      <FileText className="h-8 w-8 text-red-500" />
                    ) : (
                      <Video className="h-8 w-8 text-blue-500" />
                    )}
                    <div>
                      <h4 className="font-medium">{resource.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {getCategoryName(resource.category)} • {getClassName(resource.classId)} • {resource.subject}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(resource)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(resource.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
