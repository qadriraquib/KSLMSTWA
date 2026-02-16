import { Target, Eye, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Vision = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-primary">
          Vision & Mission
        </h1>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Vision */}
          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Eye className="h-8 w-8" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg">
              <p>
                Welfare, survival, excellence, and modernization of linguistic minority schools.
              </p>
              <p className="mt-4">
                Making our schools attractive and recognized through Best School Awards.
              </p>
            </CardContent>
          </Card>

          {/* Mission */}
          <Card className="bg-accent text-accent-foreground">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Target className="h-8 w-8" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg space-y-3">
              <p>
                Attract students, streamline admissions, provide quality education, and focus on excellence.
              </p>
              <p>
                Striving for implementation of proper student-teacher ratio in linguistic minority schools.
              </p>
              <p>
                Recruitment for Linguistic Minority Teachers.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Focus */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl text-primary">
              <Heart className="h-8 w-8" />
              Our Core Focus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-muted-foreground">
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Leadership & Appointments</h3>
                <p>
                  Appointment of Urdu and other linguistic language-knowing headmasters 
                  in high schools and appointment of Urdu subject inspectors and 
                  linguistic minorities nodal officers.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Community Involvement</h3>
                <p>
                  Arranging admission rallies including all sections of society and 
                  involving society in school activities.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Teacher Development</h3>
                <p>
                  Arranging online and offline teacher motivation programs, seminars, 
                  and subject content-oriented discussions.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Infrastructure & Technology</h3>
                <p>
                  Connecting government schools to modern technology and setting 
                  smart classes, science labs, geography labs, and other works.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Cultural Development</h3>
                <p>
                  Resumption of talent carnivals and other cultural programs for 
                  students of linguistic minority schools.
                </p>
              </div>

            </div>
          </CardContent>
        </Card>

        {/* Closing Statement */}
        <div className="text-center text-2xl font-bold text-primary">
          TOGETHER WE CAN AND TOGETHER WE WILL
        </div>

      </div>
    </div>
  );
};

export default Vision;
