import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TeamMemberCard } from "@/components/TeamMemberCard";
import { fetchResourceAuthors, ResourceAuthor } from "@/lib/api/resourceApi";
// import { API_BASE_URL } from "@/lib/api/config";
import { Button } from "@/components/ui/button";
import { buildFileUrl } from "@/utils/url";
const API_BASE =
  import.meta.env.VITE_API_BASE_URL;

const Resources = () => {
  const { t } = useTranslation();

  const [authors, setAuthors] = useState<ResourceAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = 12;

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchResourceAuthors(page, limit);
      setAuthors(data.data);
      setTotal(data.total);
    } catch (error) {
      setAuthors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [page]);

  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold mb-4 text-primary">
            {t("resourcesPage.title") || "Resource Contributors"}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t("resourcesPage.subtitle") || "Meet our dedicated educators"}
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20 text-muted-foreground">
            Loading contributors...
          </div>
        )}

        {/* Empty State */}
        {!loading && authors.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No resource contributors available.
          </div>
        )}

        {/* Grid */}
        {!loading && authors.length > 0 && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {authors.map((author) => (
                <div key={author.id} className="text-center">

                  <TeamMemberCard
                    name={author.name}
                    designation={author.designation}
           photo={author.photo}


                  />

                  {/* School Info */}
                  <div className="mt-3 pt-3 border-t border-primary/10">
                    <p className="text-sm font-medium">
                      {author.school_name}
                    </p>
                    <p className="text-xs text-muted-foreground leading-tight">
                      {author.school_address}
                    </p>
                  </div>

                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-4 mt-12">
              <Button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                variant="outline"
              >
                Previous
              </Button>

              <span className="flex items-center text-sm">
                Page {page}
              </span>

              <Button
                disabled={page * limit >= total}
                onClick={() => setPage(page + 1)}
                variant="outline"
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Resources;
