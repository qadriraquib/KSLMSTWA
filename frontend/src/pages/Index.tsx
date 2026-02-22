import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { HeroCarousel } from "@/components/HeroCarousel";
import { VerticalMarquee } from "@/components/VerticalMarquee";
import HomeImageMarquee from "@/components/HomeImageMarquee";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Quote } from "lucide-react";
const API_BASE = import.meta.env.VITE_API_BASE_URL;
const Index = () => {
  const { t } = useTranslation();

  // ✅ Hooks MUST be inside the component
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/testimonials`)
      .then((res) => res.json())
      .then(setTestimonials)
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Welcome Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            {t("hero.title")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("hero.subtitle")}
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Circulars Marquee */}
          <div className="lg:col-span-1 space-y-6">
  <VerticalMarquee />

  {/* YouTube Video Card */}
  <div className="bg-card border rounded-lg p-6 shadow-sm">
    <h3 className="text-xl font-semibold mb-4">
      Organization Video
    </h3>

    <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md">
      <iframe
        className="absolute inset-0 w-full h-full"
        src="https://www.youtube.com/embed/ZArbSUnaIOI?si=XFiuwGO3YGGvBsMZ"
        title="YouTube video"
        allowFullScreen
      ></iframe>
    </div>
  </div>
</div>

          {/* Testimonials */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-8">
              {t("testimonials.title")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial: any) => (
                <Card key={testimonial.id} className="bg-secondary/30">
                  <CardHeader>
                    <Quote className="h-8 w-8 text-accent mb-2" />
                    <CardDescription className="text-base italic">
                      "{testimonial.content}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
<section className="mb-20">
  <HomeImageMarquee />
</section>

        {/* Quick Stats */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-4xl font-bold">30+</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Districts Covered
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center bg-accent text-accent-foreground">
            <CardHeader>
              <CardTitle className="text-4xl font-bold">3000+</CardTitle>
              <CardDescription className="text-accent-foreground/80">
                Team Members
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center bg-education-green text-white">
            <CardHeader>
              <CardTitle className="text-4xl font-bold">1000+</CardTitle>
              <CardDescription className="text-white/80">
                Resources Shared
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center bg-muted">
            <CardHeader>
              <CardTitle className="text-4xl font-bold">50K+</CardTitle>
              <CardDescription className="text-muted-foreground">
                Students Impacted
              </CardDescription>
            </CardHeader>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Index;
