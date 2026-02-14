import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import logo from '@/assets/logo1.png';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const InstitutionalPage = () => {
  return (
    <div className="relative min-h-screen bg-background py-20 overflow-hidden">

      {/* Watermark Logo */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <img
          src={logo}
          alt="Organization Seal"
          className="w-[700px] opacity-[0.05] object-contain"
        />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">

        {/* Gold Ribbon */}
        <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-black px-8 py-3 text-sm font-bold tracking-wider shadow-lg border-l-4 border-yellow-800">
          ESTABLISHED 2021-22
        </div>

        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="w-40 h-[2px] bg-primary mx-auto mb-6"></div>

          <h1 className="text-5xl font-bold text-primary tracking-wide">
            Aims, Vision & Objectives
          </h1>

          <div className="w-40 h-[2px] bg-primary mx-auto mt-6"></div>
        </motion.div>

        {/* ABOUT SECTION */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-20"
        >
          <motion.div variants={itemVariants}>
            <Card className="border-l-4 border-primary shadow-sm hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">
                  About the Organization
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-lg leading-relaxed">
                <ul className="space-y-6">
                  {[
                    "The primary objective of the organization is the welfare and survival of linguistic minority schools.",
                    "The organization is committed to attracting students, streamlining admissions, and ensuring quality education with a focus on excellence.",
                    "Admission rallies are organized to encourage parents towards government schools.",
                    "Active involvement of all sections of society in school activities is promoted.",
                  ].map((text, index) => (
                    <motion.li
                      key={index}
                      variants={itemVariants}
                      className="flex items-start gap-4"
                    >
                      <span className="w-3 h-3 mt-2 rounded-full bg-primary"></span>
                      <span>{text}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>

        {/* VISION SECTION */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-20"
        >
          <motion.div variants={itemVariants}>
            <Card className="border-l-4 border-primary bg-primary text-primary-foreground shadow-sm hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Vision
                </CardTitle>
              </CardHeader>
              <CardContent className="text-lg leading-relaxed space-y-4">
                <motion.p variants={itemVariants}>
                  To ensure the welfare, survival, excellence, and modernization
                  of linguistic minority schools.
                </motion.p>
                <motion.p variants={itemVariants}>
                  To make schools attractive and recognized through institutional
                  development and Best School Awards.
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>

        {/* MISSION & OBJECTIVES */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-20"
        >
          <motion.div variants={itemVariants}>
            <Card className="border-l-4 border-primary shadow-sm hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">
                  Mission & Objectives
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-lg leading-relaxed">
                <ul className="space-y-6">
                  {[
                    "Implementation of proper student-teacher ratio for linguistic minority schools.",
                    "Recruitment of Linguistic Minority Teachers.",
                    "Appointment of Urdu and other linguistic language-knowing headmasters in high schools.",
                    "Appointment of Urdu subject inspectors and linguistic minorities nodal officers.",
                    "Resumption of talent carnivals and cultural programs for students.",
                    "Connecting government schools to modern technology.",
                    "Establishment of smart classes, science laboratories, geography laboratories, and related infrastructure.",
                    "Conducting online and offline teacher motivation programs, seminars, and subject-oriented discussions.",
                  ].map((text, index) => (
                    <motion.li
                      key={index}
                      variants={itemVariants}
                      className="flex items-start gap-4"
                    >
                      <span className="w-3 h-3 mt-2 rounded-full bg-primary"></span>
                      <span>{text}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>

        {/* Closing */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
          className="text-center mt-24"
        >
          <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
          <h2 className="text-3xl font-bold text-primary">
            TOGETHER WE CAN AND TOGETHER WE WILL
          </h2>
        </motion.div>

      </div>
    </div>
  );
};

export default InstitutionalPage;
