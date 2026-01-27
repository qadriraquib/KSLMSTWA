import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ResourceCard } from '@/components/ResourceCard';
import { TeamMemberCard } from '@/components/TeamMemberCard';
import { getResources, } from '@/lib/storage';
// import { seedSampleData } from '@/lib/sampleData';

const Resources = () => {
  const { t } = useTranslation();
  const [resources, setResources] = useState(getResources());
  const [resourceAuthors, setResourceAuthors] = useState(
    // getTeamMembers().filter(m => !m.taluka).slice(0, 6)
  );

  useEffect(() => {
    // Seed sample data if none exists
    // seedSampleData();
    setResources(getResources());
    // setResourceAuthors(getTeamMembers().filter(m => !m.taluka).slice(0, 12));
  }, []);

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-primary">{t('resourcesPage.title')}</h1>
          <p className="text-xl text-muted-foreground">{t('resourcesPage.subtitle')}</p>
        </div>

        {/* Resource Authors */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Our Resource Contributors</h2>
          {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {resourceAuthors.map((author, index) => (
              <TeamMemberCard
                key={index}
                name={author.name}
                designation={author.designation}
                photo={author.photo}
              />
            ))}
          </div> */}
        </div>

        {/* Resources Grid */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">{t('resourcesPage.subjects')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <ResourceCard key={index} {...resource} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
