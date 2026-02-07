import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-primary">{t('about')}</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">About Our Organization</h2>
            <p className="text-muted-foreground mb-4">
              Karnataka State Linguistic Minorities (KEDO) is a dedicated non-profit organization 
              committed to transforming education across Karnataka. Established with the vision of providing 
              quality education to all, we work tirelessly to bridge educational gaps and empower communities.
            </p>
            <p className="text-muted-foreground mb-4">
              Our organization operates across all districts of Karnataka, bringing together educators, 
              administrators, and community leaders to create a robust educational ecosystem. We believe 
              in the power of collaborative learning and community-driven development.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our History</h2>
            <p className="text-muted-foreground mb-4">
              Founded in 2010, KEDO has grown from a small group of passionate educators to a 
              comprehensive organization spanning all 30+ districts of Karnataka. Over the years, 
              we have touched the lives of thousands of students and trained hundreds of teachers.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Provide quality educational resources and materials</li>
              <li>Conduct teacher training and professional development programs</li>
              <li>Organize educational workshops and seminars</li>
              <li>Facilitate knowledge sharing across districts and talukas</li>
              <li>Support digital learning initiatives</li>
              <li>Promote multilingual education (Kannada, English, Urdu)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
            <p className="text-muted-foreground mb-4">
              KEDO is powered by a dedicated team of over 500 members across Karnataka, including 
              district coordinators, taluka leaders, teachers, and education specialists. Each member 
              brings unique expertise and passion for educational excellence.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
