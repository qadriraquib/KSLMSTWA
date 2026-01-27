import { useTranslation } from 'react-i18next';
import { Target, Eye, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Vision = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-primary">{t('vision')}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Eye className="h-8 w-8" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg">
              <p>
                To create an inclusive and equitable educational ecosystem across Karnataka where 
                every student has access to quality education, regardless of their background, 
                location, or economic status.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-accent text-accent-foreground">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Target className="h-8 w-8" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg">
              <p>
                To empower educators and students through innovative teaching methods, comprehensive 
                resources, and continuous support, fostering a culture of excellence and lifelong learning.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl text-primary">
              <Heart className="h-8 w-8" />
              Our Core Values
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Excellence</h3>
                <p className="text-muted-foreground">
                  We strive for the highest standards in educational content, delivery, and support.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Inclusivity</h3>
                <p className="text-muted-foreground">
                  We believe education is a right for all, embracing diversity in language, culture, and background.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Collaboration</h3>
                <p className="text-muted-foreground">
                  We work together with communities, educators, and stakeholders to achieve common goals.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                <p className="text-muted-foreground">
                  We embrace new technologies and methodologies to enhance learning experiences.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Transparency</h3>
                <p className="text-muted-foreground">
                  We maintain open communication and accountability in all our operations.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
                <p className="text-muted-foreground">
                  We build programs and systems that create lasting positive impact.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-semibold mb-4">Our Strategic Goals</h2>
          <ul className="list-disc list-inside space-y-3 text-muted-foreground">
            <li>
              <strong>Quality Education for All:</strong> Ensure every student in Karnataka has access 
              to quality educational resources and opportunities
            </li>
            <li>
              <strong>Teacher Empowerment:</strong> Provide comprehensive training and ongoing support 
              to educators across all districts
            </li>
            <li>
              <strong>Digital Transformation:</strong> Integrate technology effectively to enhance 
              learning outcomes and accessibility
            </li>
            <li>
              <strong>Multilingual Support:</strong> Promote education in Kannada, English, and Urdu 
              to serve diverse communities
            </li>
            <li>
              <strong>Community Engagement:</strong> Build strong partnerships with local communities, 
              parents, and stakeholders
            </li>
            <li>
              <strong>Continuous Improvement:</strong> Regularly assess and enhance our programs based 
              on feedback and outcomes
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Vision;
