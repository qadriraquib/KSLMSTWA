import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "@/lib/adminAuth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut } from "lucide-react";
import { TeamMembersManager } from "@/components/admin/TeamMembersManager";
import { ResourcesManager } from "@/components/admin/ResourcesManager";
import { GalleryManager } from "@/components/admin/GalleryManager";
import { CircularsManager } from "@/components/admin/CircularsManager";
import { BlogManager } from "@/components/admin/BlogManager";
import { TeacherResourcesManager } from "@/components/admin/TeacherResourcesManager";

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="team" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="team">Team</TabsTrigger>
            {/* <TabsTrigger value="resources">Resources</TabsTrigger> */}
            <TabsTrigger value="teacher-resources">Teacher Resources</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="circulars">Circulars</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
          </TabsList>

          <TabsContent value="team" className="mt-6">
            <TeamMembersManager />
          </TabsContent>

          {/* <TabsContent value="resources" className="mt-6">
            <ResourcesManager />
          </TabsContent> */}

          <TabsContent value="teacher-resources" className="mt-6">
            <TeacherResourcesManager />
          </TabsContent>

          <TabsContent value="gallery" className="mt-6">
            <GalleryManager />
          </TabsContent>

          <TabsContent value="circulars" className="mt-6">
            <CircularsManager />
          </TabsContent>

          <TabsContent value="blog" className="mt-6">
            <BlogManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
