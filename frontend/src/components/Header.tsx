import { useState } from 'react';
import { Link,NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, ChevronDown, ChevronRight, Globe } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from './ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';
import logo from '@/assets/logo1.png';

export const districts = [
  { id: 'bagalkot', name: 'Bagalkot', nameKn: 'ಬಾಗಲಕೋಟೆ' },
  { id: 'ballari', name: 'Ballari', nameKn: 'ಬಳ್ಳಾರಿ' },
  { id: 'belagavi', name: 'Belagavi', nameKn: 'ಬೆಳಗಾವಿ' },
  { id: 'chikodi', name: 'Chikodi', nameKn: 'ಬೆಳಗಾವಿ' },
  { id: 'bengaluru-rural', name: 'Bengaluru Rural', nameKn: 'ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ' },
  { id: 'bengaluru-urban', name: 'Bengaluru Urban', nameKn: 'ಬೆಂಗಳೂರು ನಗರ' },
  { id: 'bidar', name: 'Bidar', nameKn: 'ಬೀದರ್' },
  { id: 'chamarajanagar', name: 'Chamarajanagar', nameKn: 'ಚಾಮರಾಜನಗರ' },
  { id: 'chikkaballapur', name: 'Chikkaballapur', nameKn: 'ಚಿಕ್ಕಬಳ್ಳಾಪುರ' },
  { id: 'chikkamagaluru', name: 'Chikkamagaluru', nameKn: 'ಚಿಕ್ಕಮಗಳೂರು' },
  { id: 'chitradurga', name: 'Chitradurga', nameKn: 'ಚಿತ್ರದುರ್ಗ' },
  { id: 'dakshina-kannada', name: 'Dakshina Kannada', nameKn: 'ದಕ್ಷಿಣ ಕನ್ನಡ' },
  { id: 'davanagere', name: 'Davanagere', nameKn: 'ದಾವಣಗೆರೆ' },
  { id: 'dharwad', name: 'Dharwad', nameKn: 'ಧಾರವಾಡ' },
  { id: 'gadag', name: 'Gadag', nameKn: 'ಗದಗ' },
  { id: 'hassan', name: 'Hassan', nameKn: 'ಹಾಸನ' },
  { id: 'haveri', name: 'Haveri', nameKn: 'ಹಾವೇರಿ' },
  { id: 'kalaburagi', name: 'Kalaburagi', nameKn: 'ಕಲಬುರಗಿ' },
  { id: 'kodagu', name: 'Kodagu', nameKn: 'ಕೊಡಗು' },
  { id: 'kolar', name: 'Kolar', nameKn: 'ಕೋಲಾರ' },
  { id: 'koppal', name: 'Koppal', nameKn: 'ಕೊಪ್ಪಳ' },
  { id: 'mandya', name: 'Mandya', nameKn: 'ಮಂಡ್ಯ' },
  { id: 'mysuru', name: 'Mysuru', nameKn: 'ಮೈಸೂರು' },
  { id: 'raichur', name: 'Raichur', nameKn: 'ರಾಯಚೂರು' },
  { id: 'ramanagara', name: 'Ramanagara', nameKn: 'ರಾಮನಗರ' },
  { id: 'shivamogga', name: 'Shivamogga', nameKn: 'ಶಿವಮೊಗ್ಗ' },
  { id: 'tumakuru', name: 'Tumakuru', nameKn: 'ತುಮಕೂರು' },
  { id: 'udupi', name: 'Udupi', nameKn: 'ಉಡುಪಿ' },
  { id: 'uttara-kannada', name: 'Uttara Kannada', nameKn: 'ಉತ್ತರ ಕನ್ನಡ' },
  { id: 'vijayanagara', name: 'Vijayanagara', nameKn: 'ವಿಜಯನಗರ' },
  { id: 'vijayapura', name: 'Vijayapura', nameKn: 'ವಿಜಯಪುರ' },
  { id: 'yadgir', name: 'Yadgir', nameKn: 'ಯಾದಗಿರಿ' }
];

function normalizeDistrict(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').trim();
}


// Teacher resource categories
const teacherResourceCategories = [
  { id: 'bridge-course', name: 'Bridge Course', nameKn: 'ಸೇತು ಕೋರ್ಸ್', nameUr: 'برج کورس' },
  { id: 'unit-test', name: 'Unit Test', nameKn: 'ಘಟಕ ಪರೀಕ್ಷೆ', nameUr: 'یونٹ ٹیسٹ' },
  { id: 'sa1-qp', name: 'SA-1 QP', nameKn: 'SA-1 ಪ್ರಶ್ನೆ ಪತ್ರಿಕೆ', nameUr: 'SA-1 سوالنامہ' },
  { id: 'sa2-qp', name: 'SA-2 QP', nameKn: 'SA-2 ಪ್ರಶ್ನೆ ಪತ್ರಿಕೆ', nameUr: 'SA-2 سوالنامہ' },
  { id: 'lab-qb', name: 'LAB QB', nameKn: 'ಲ್ಯಾಬ್ ಪ್ರಶ್ನೆ ಬ್ಯಾಂಕ್', nameUr: 'لیب سوال بینک' },
  { id: 'lesson-plans', name: 'Lesson Plans', nameKn: 'ಪಾಠ ಯೋಜನೆಗಳು', nameUr: 'سبق کے منصوبے' },
  { id: 'annual-plans', name: 'Annual Plans', nameKn: 'ವಾರ್ಷಿಕ ಯೋಜನೆಗಳು', nameUr: 'سالانہ منصوبے' },
];

// Classes in Roman numerals
const classes = [
  { id: '1', roman: 'I' },
  { id: '2', roman: 'II' },
  { id: '3', roman: 'III' },
  { id: '4', roman: 'IV' },
  { id: '5', roman: 'V' },
  { id: '6', roman: 'VI' },
  { id: '7', roman: 'VII' },
  { id: '8', roman: 'VIII' },
];

// Subjects per class
const subjectsByClass: Record<string, string[]> = {
  '1': ['Kannada','Urdu', 'English', 'Mathematics', 'EVS'],
  '2': ['Kannada','Urdu', 'English', 'Mathematics', 'EVS'],
  '3': ['Kannada','Urdu', 'English', 'Mathematics', 'EVS'],
  '4': ['Kannada', 'Urdu','English', 'Mathematics', 'EVS', 'Science'],
  '5': ['Kannada', 'Urdu','English', 'Mathematics', 'EVS', 'Science'],
  '6': ['Kannada', 'Urdu','English', 'Hindi', 'Mathematics', 'Science', 'Social Science'],
  '7': ['Kannada','Urdu', 'English', 'Hindi', 'Mathematics', 'Science', 'Social Science'],
  '8': ['Kannada','Urdu', 'English', 'Hindi', 'Mathematics', 'Science', 'Social Science'],
};

export const Header = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);

  // const changeLanguage = (lng: string) => {
  //   i18n.changeLanguage(lng);
  // };

  const getDistrictName = (district: typeof districts[0]) => {
    switch (i18n.language) {
      case 'kn':
        return district.nameKn;
      // case 'ur':
      //   return district.nameUr;
      default:
        return district.name;
    }
  };

  const getCategoryName = (cat: typeof teacherResourceCategories[0]) => {
    switch (i18n.language) {
      case 'kn':
        return cat.nameKn;
      case 'ur':
        return cat.nameUr;
      default:
        return cat.name;
    }
  };

  const navigateToResource = (categoryId: string, classId: string, subject: string) => {
    navigate(`/teacher-resources?category=${categoryId}&class=${classId}&subject=${encodeURIComponent(subject)}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative">
      <div className="container mx-auto px-4">
        {/* Top bar with org name */}
<div className="bg-white shadow-sm">
  <div className="h-[3px] bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700"></div>

  <div className="container mx-auto px-4">
    <div className="py-3 md:py-4 text-center border-b border-blue-500/20">
      
      <h1
        className="
          font-[Cinzel]
          text-[1.05rem]
          sm:text-[1.15rem]
          md:text-[1.2rem]
          lg:text-[1.25rem]
          font-semibold
          uppercase
          tracking-[1.5px]
          text-blue-900
          leading-tight
        "
      >
        Karnataka State Linguistic Minorities School Teachers Welfare Association
      </h1>

      {/* <p className="text-[11px] md:text-[12px] text-gray-600 italic mt-1">
        Together We Can And Together We Will
      </p> */}

    </div>
  </div>

  <div className="h-[3px] bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700"></div>
</div>







        {/* Main header */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
  to="/"
  className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-40"
>
  <img
    src={logo}
    alt="Logo"
    className="h-28 w-28 object-contain"
  />
</Link>
<Link
  to="/"
  className="md:hidden flex items-center"
>
  <img
    src={logo}
    alt="Logo"
    className="h-14 w-14 object-contain"
  />
</Link>

          {/* <Link
  to="/"
  className="absolute left-4 top-1/2 -translate-y-1/2 z-50"
>
  <img
    src={logo}
    alt="Logo"
    className="h-24 w-24 object-contain"
  />
</Link> */}
 {/* <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="Logo" className="h-12 w-12" />
          </Link> */}

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 ml-auto">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavLink
  to="/"
  className={({ isActive }) =>
    `px-4 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "text-blue-900 border-b-2 border-blue-900"
        : "hover:text-primary"
    }`
  }
>
  {t('home')}
                  </NavLink>
                  
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavLink
  to="/about"
  className={({ isActive }) =>
    `px-4 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "text-blue-900 border-b-2 border-blue-900"
        : "hover:text-primary"
    }`
  }
>
  {t('about')}
                 </NavLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                                <NavLink
  to="/core-team"
  className={({ isActive }) =>
    `px-4 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "text-blue-900 border-b-2 border-blue-900"
        : "hover:text-primary"
    }`
  }
>
   Core Team
                  </NavLink>
                </NavigationMenuItem>

              <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <button className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors inline-flex items-center gap-1">
      {t('members')}
      <ChevronDown className="h-4 w-4" />
    </button>
  </DropdownMenuTrigger>

<DropdownMenuContent
  align="start"
  className="bg-popover w-56 max-h-72 overflow-y-auto"
>
  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground sticky top-0 bg-popover z-10">
    {t('districts.title')}
  </div>

  {districts.map((district) => (
    <DropdownMenuItem key={district.id} asChild>
      <Link to={`/district/${district.id}`}>
        {getDistrictName(district)}
      </Link>
    </DropdownMenuItem>
  ))}
</DropdownMenuContent>

</DropdownMenu>


                {/* Resources Dropdown - Using pure DropdownMenu for proper nesting */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors inline-flex items-center gap-1">
                      {t('resources')}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="bg-popover w-56 z-50">
                    {/* Resource Team */}
                    <DropdownMenuItem asChild>
                      <Link to="/resources" className="cursor-pointer">
                        {t('resourcesPage.resourceTeam', 'Resource Team')}
                      </Link>
                    </DropdownMenuItem>
                    
                    {/* Resources for Teacher Header */}
                    <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground border-t mt-1 pt-2">
                      {t('resourcesPage.teacherResources', 'Resources for Teacher')}
                    </div>
                    
                    {/* Teacher Resource Categories with nested submenus */}
                    {teacherResourceCategories.map((category) => (
                      <DropdownMenuSub key={category.id}>
                        <DropdownMenuSubTrigger className="cursor-pointer">
                          {getCategoryName(category)}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent className="bg-popover z-50">
                            {classes.map((cls) => (
                              <DropdownMenuSub key={cls.id}>
                                <DropdownMenuSubTrigger className="cursor-pointer">
                                  Class {cls.roman}
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                  <DropdownMenuSubContent className="bg-popover z-50">
                                    {subjectsByClass[cls.id].map((subject) => (
                                      <DropdownMenuItem
                                        key={subject}
                                        className="cursor-pointer"
                                        onClick={() => navigateToResource(category.id, cls.id, subject)}
                                      >
                                        {subject}
                                      </DropdownMenuItem>
                                    ))}
                                  </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                              </DropdownMenuSub>
                            ))}
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <NavigationMenuItem>
                  <NavLink
  to="/gallery"
  className={({ isActive }) =>
    `px-4 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "text-blue-900 border-b-2 border-blue-900"
        : "hover:text-primary"
    }`
  }
>
 {t('gallery')}
                  </NavLink>
                </NavigationMenuItem>

                {/* <NavigationMenuItem>
                  <Link to="/blog" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                    {t('blog')}
                  </Link>
                </NavigationMenuItem> */}

                <NavigationMenuItem>
                <NavLink
  to="/contact"
  className={({ isActive }) =>
    `px-4 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "text-blue-900 border-b-2 border-blue-900"
        : "hover:text-primary"
    }`
  }
>
   {t('contact')}
                  </NavLink>
                </NavigationMenuItem>

                {/* <NavigationMenuItem>
                  <Link to="/table-demo" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                    Table Demo
                  </Link>
                </NavigationMenuItem> */}
                 <NavigationMenuItem>
                  <NavLink
  to="/membershipForm"
  className={({ isActive }) =>
    `px-4 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "text-blue-900 border-b-2 border-blue-900"
        : "hover:text-primary"
    }`
  }
>
   Membership Form
                  </NavLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Language Switcher */}
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Globe className="h-4 w-4" />
                  {i18n.language.toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover">
                <DropdownMenuItem onClick={() => changeLanguage('en')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('kn')}>
                  ಕನ್ನಡ
                </DropdownMenuItem>
                {/* <DropdownMenuItem onClick={() => changeLanguage('ur')}>
                  اردو
                </DropdownMenuItem> */}
              {/* </DropdownMenuContent>
            </DropdownMenu> */} 
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover">
                <DropdownMenuItem onClick={() => changeLanguage('en')}>EN</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('kn')}>ಕನ್ನಡ</DropdownMenuItem>
                {/* <DropdownMenuItem onClick={() => changeLanguage('ur')}>اردو</DropdownMenuItem> */}
              {/* </DropdownMenuContent>
            </DropdownMenu> */} 

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <ul className="space-y-2">
              <li>
                <Link to="/" className="block px-4 py-2 hover:bg-accent rounded-md" onClick={() => setMobileMenuOpen(false)}>
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="block px-4 py-2 hover:bg-accent rounded-md" onClick={() => setMobileMenuOpen(false)}>
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link to="/core-team" className="block px-4 py-2 hover:bg-accent rounded-md" onClick={() => setMobileMenuOpen(false)}>
                  {t('core-team')}
                </Link>
              </li>
              <li>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-accent rounded-md flex items-center justify-between"
                  onClick={() => setMobileSubmenuOpen(!mobileSubmenuOpen)}
                >
                  {t('members')}
                  <ChevronDown className={`h-4 w-4 transition-transform ${mobileSubmenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileSubmenuOpen && (
                  <ul className="ml-4 mt-2 space-y-1">
                    {districts.map((district) => (
                      <li key={district.id}>
                        <Link
                          to={`/district/${district.id}`}
                          className="block px-4 py-2 text-sm hover:bg-accent rounded-md"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileSubmenuOpen(false);
                          }}
                        >
                          {getDistrictName(district)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              {/* Mobile Resources Menu */}
              <li>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-accent rounded-md flex items-center justify-between"
                  onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                >
                  {t('resources')}
                  <ChevronDown className={`h-4 w-4 transition-transform ${mobileResourcesOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileResourcesOpen && (
                  <ul className="ml-4 mt-2 space-y-1">
                    <li>
                      <Link
                        to="/resources"
                        className="block px-4 py-2 text-sm hover:bg-accent rounded-md"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileResourcesOpen(false);
                        }}
                      >
                        {t('resourcesPage.resourceTeam', 'Resource Team')}
                      </Link>
                    </li>
                    <li className="px-4 py-1 text-xs font-semibold text-muted-foreground uppercase">
                      {t('resourcesPage.teacherResources', 'Resources for Teacher')}
                    </li>
                    {teacherResourceCategories.map((category) => (
                      <li key={category.id}>
                        <Link
                          to={`/teacher-resources?category=${category.id}`}
                          className="block px-4 py-2 text-sm hover:bg-accent rounded-md"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileResourcesOpen(false);
                          }}
                        >
                          {getCategoryName(category)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li>
                <Link to="/gallery" className="block px-4 py-2 hover:bg-accent rounded-md" onClick={() => setMobileMenuOpen(false)}>
                  {t('gallery')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="block px-4 py-2 hover:bg-accent rounded-md" onClick={() => setMobileMenuOpen(false)}>
                  {t('blog')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="block px-4 py-2 hover:bg-accent rounded-md" onClick={() => setMobileMenuOpen(false)}>
                  {t('contact')}
                </Link>
              </li>
              <li>
                <Link to="/membershipForm" className="block px-4 py-2 hover:bg-accent rounded-md" onClick={() => setMobileMenuOpen(false)}>
                  Membership Form
                </Link>
              </li>
              {/* <li>
                <Link to="/table-demo" className="block px-4 py-2 hover:bg-accent rounded-md" onClick={() => setMobileMenuOpen(false)}>
                  Table Demo
                </Link>
              </li> */}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};
