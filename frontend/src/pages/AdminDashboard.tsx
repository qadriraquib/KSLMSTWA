import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { isAuthenticated, logout } from "@/lib/adminAuth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut } from "lucide-react";
import { TeamMembersManager } from "@/components/admin/TeamMembersManager";
import { ResourcesManager } from "@/components/admin/ResourcesManager";
import { GalleryManager } from "@/components/admin/GalleryManager";
import { CircularsManager } from "@/components/admin/CircularsManager";
import { BlogManager } from "@/components/admin/BlogManager";
import { TeacherResourcesManager } from "@/components/admin/TeacherResourcesManager";
import MembershipManager from "@/components/admin/MembershipManager";
import AdminResources from "@/components/admin/AdminResources";
import {getAdminUser, logoutAdmin } from '@/data/api-auth'
export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getAdminUser()) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    logoutAdmin();
    navigate("/login");
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
  <TabsList
    className="
      flex w-full
      border-b
      bg-muted/30
      overflow-x-auto
      whitespace-nowrap
      gap-1
    "
  >
    <TabsTrigger
      value="team"
      className="
        px-5 py-3
        font-medium
        data-[state=active]:text-primary
        data-[state=active]:border-b-2
        data-[state=active]:border-primary
        data-[state=active]:bg-background
        rounded-none
        transition-all
      "
    >
      Team
    </TabsTrigger>

    <TabsTrigger value="resources" className="admin-tab">
      Resource Team
    </TabsTrigger>

    <TabsTrigger value="teacher-resources" className="admin-tab">
      Teacher Resources
    </TabsTrigger>

    <TabsTrigger value="gallery" className="admin-tab">
      Gallery
    </TabsTrigger>

    <TabsTrigger value="circulars" className="admin-tab">
      Circulars
    </TabsTrigger>

    <TabsTrigger value="blog" className="admin-tab">
      Blog
    </TabsTrigger>

    <TabsTrigger value="memberships" className="admin-tab">
      Association Members
    </TabsTrigger>
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
<TabsContent value="resources" className="mt-6">
            <AdminResources />
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
           <TabsContent value="memberships" className="mt-6">
            <MembershipManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
