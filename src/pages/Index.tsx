import { useTranslation } from 'react-i18next';
import { HeroCarousel } from '@/components/HeroCarousel';
import { VerticalMarquee } from '@/components/VerticalMarquee';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Dr. Rajesh Kumar',
    role: 'Principal, Government School',
    content: 'The resources provided by KEDO have significantly improved our teaching quality and student engagement.',
  },
  {
    name: 'Priya Sharma',
    role: 'Teacher, Primary Education',
    content: 'Outstanding support and training programs. The digital learning materials are excellent.',
  },
  {
    name: 'Mohammed Ali',
    role: 'District Coordinator',
    content: 'KEDO\'s commitment to educational excellence across all districts is truly commendable.',
  },
];

const Index = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Welcome Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Circulars Marquee */}
          <div className="lg:col-span-1">
            <VerticalMarquee />
          </div>

          {/* Testimonials */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-8">{t('testimonials.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-secondary/30">
                  <CardHeader>
                    <Quote className="h-8 w-8 text-accent mb-2" />
                    <CardDescription className="text-base italic">
                      "{testimonial.content}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-4xl font-bold">30+</CardTitle>
              <CardDescription className="text-primary-foreground/80">Districts Covered</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center bg-accent text-accent-foreground">
            <CardHeader>
              <CardTitle className="text-4xl font-bold">500+</CardTitle>
              <CardDescription className="text-accent-foreground/80">Team Members</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center bg-education-green text-white">
            <CardHeader>
              <CardTitle className="text-4xl font-bold">1000+</CardTitle>
              <CardDescription className="text-white/80">Resources Shared</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center bg-muted">
            <CardHeader>
              <CardTitle className="text-4xl font-bold">50K+</CardTitle>
              <CardDescription className="text-muted-foreground">Students Impacted</CardDescription>
            </CardHeader>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Index;
