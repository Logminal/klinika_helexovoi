import React, { useState, useEffect, useRef } from 'react';
import doctorPhoto from '@/src/assets/images/doctor_shelekhova_1779719276785.png';


// Custom high-fidelity inline SVG component of the doctor's logo
const LogoIcon = ({ className = "w-10 h-10 md:w-12 md:h-12" }: { className?: string }) => (
  <svg 
    viewBox="0 0 500 500" 
    className={`${className} shrink-0 transition-transform duration-300 hover:scale-105`}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer styled Heart Ribbon in primary green */}
    <path 
      d="M250,450 C210,410 70,300 70,180 C70,100 130,50 205,50 C245,50 250,85 250,85 C250,85 255,50 295,50 C370,50 430,100 430,180 C430,240 380,310 320,380 C290,320 280,290 290,270 C310,250 340,210 340,170 C340,100 250,90 250,90" 
      stroke="var(--color-primary, #1D3E32)" 
      strokeWidth="38" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      fill="none"
    />
    
    {/* Veterinary Medical Cross in the center */}
    <g transform="translate(190, 160)">
      {/* Horizontal bar */}
      <rect x="0" y="40" width="120" height="40" rx="8" fill="var(--color-primary, #1D3E32)" />
      {/* Vertical bar */}
      <rect x="40" y="0" width="40" height="120" rx="8" fill="var(--color-primary, #1D3E32)" />
      
      {/* White Paw Print layered at the center of the cross */}
      <g fill="#FFFFFF" transform="translate(42, 42)">
        {/* Footpad (meta-pad) */}
        <path d="M18,22 C12,22 8,26 8,30 C8,34 11,36 18,36 C25,36 28,34 28,30 C28,26 24,22 18,22 Z" />
        {/* 4 Toes */}
        <circle cx="10" cy="14" r="3.5" />
        <circle cx="15" cy="8" r="3.5" />
        <circle cx="21" cy="8" r="3.5" />
        <circle cx="26" cy="14" r="3.5" />
      </g>
    </g>
  </svg>
);

// Standard review interface
interface Review {
  id: number;
  name: string;
  pet: string;
  rating: number;
  text: string;
  date: string;
}

// Service category model
interface ServiceCard {
  id: string;
  title: string;
  price: string;
  description: string;
  category: "all" | "therapy" | "surgery" | "hygiene";
}

export default function App() {
  // Mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll visibility observers
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const observerOptions = {
      root: null,
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

    return () => {
      revealObserver.disconnect();
    };
  }, []);

  // Form states
  const [clientName, setClientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedPet, setSelectedPet] = useState("Кошка");
  const [selectedService, setSelectedService] = useState("Терапия");
  const [commentText, setCommentText] = useState("");
  const [isAgreementChecked, setIsAgreementChecked] = useState(true);

  // Success dialog popup states
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");

  // Filter state for services
  const [activeTab, setActiveTab] = useState<"all" | "therapy" | "surgery" | "hygiene">("all");

  const bookingFormRef = useRef<HTMLFormElement | null>(null);
  const bookingSectionRef = useRef<HTMLElement | null>(null);

  // Dynamic values
  const phonePrimary = "8 (351) 700-95-90";
  const phoneSecondary = "+7 (965) 856-32-15";
  const addressLine = "Челябинск, Комсомольский проспект, 94 (цокольный этаж)";
  const workingHours = "ежедневно 9:00–21:00, без праздников и выходных";

  // Service items
  const servicesData: ServiceCard[] = [
    {
      id: "ser-1",
      title: "Терапия",
      price: "от 500 ₽",
      category: "therapy",
      description: "Первичный терапевтический прием, сбор анамнеза, бережный физикальный осмотр, пальпация, назначение анализов и эффективной схемы лечения."
    },
    {
      id: "ser-2",
      title: "Хирургия",
      price: "от 1 500 ₽",
      category: "surgery",
      description: "Плановые, травматологические и хирургические вмешательства любой сложности. Профессиональный мониторинг наркоза и современный шовный материал."
    },
    {
      id: "ser-3",
      title: "УЗИ и диагностика",
      price: "от 1 000 ₽",
      category: "therapy",
      description: "Высокоточная визуальная диагностика состояния внутренних органов на экспертном аппарате УЗИ и рентгене для быстрого выявления скрытых патологий."
    },
    {
      id: "ser-4",
      title: "Вакцинация",
      price: "от 1 200 ₽",
      category: "therapy",
      description: "Защита питомца от опасных инфекционных заболеваний. Проверенные импортные и отечественные сертифицированные вакцины с отметкой в паспорте."
    },
    {
      id: "ser-5",
      title: "Кастрация / Стерилизация",
      price: "от 2 500 ₽",
      category: "surgery",
      description: "Бережные малоинвазивные операции с быстрым выходом из наркоза под постоянным присмотром анестезиолога. Минимальный реабилитационный период."
    },
    {
      id: "ser-6",
      title: "Профессиональный груминг",
      price: "от 1 500 ₽",
      category: "hygiene",
      description: "Комплексный гигиенический уход: деликатное вычесывание колтунов, стрижка когтей, чистка ушей и мытье профессиональной гипоаллергенной косметикой."
    },
    {
      id: "ser-7",
      title: "Чипирование",
      price: "от 1 000 ₽",
      category: "hygiene",
      description: "Безопасное введение микрочипа под кожу крупного рогатого или мелкого домашнего зверя с занесением ветеринарных данных в международную базу."
    },
    {
      id: "ser-8",
      title: "Выезд врача на дом",
      price: "от 1 200 ₽",
      category: "therapy",
      description: "Оказание квалифицированной терапевтической помощи в привычных домашних условиях без стресса от транспортировки и контактов с другими больными животными."
    }
  ];

  // Testimonial reviews
  const reviewsData: Review[] = [
    {
      id: 1,
      name: "Екатерина",
      pet: "кот Мурзик",
      rating: 5,
      text: "Огромное спасибо Марии Владимировне! Буквально спасла нашего Мурзика. Кот перестал есть, был очень вялый три дня. В клинике быстро провели УЗИ, расшифровали анализы и поставили капельницу. Мы пошли на поправку уже на следующее утро! Очень чистое и приятное место, а кота гладили как родного.",
      date: "14 мая 2026"
    },
    {
      id: 2,
      name: "Михаил",
      pet: "ретривер Арчи",
      rating: 5,
      text: "Приводили Арчи на плановую кастрацию. Очень переживали, как пес перенесет наркоз. Нам предварительно сделали ЭКГ сердца, все подробно разжевали, успокоили. Операция прошла супер быстро, никаких тяжелых отходняков! Вечером Арчи уже прекрасно кушал и махал хвостом. Сервис на высоте!",
      date: "02 мая 2026"
    },
    {
      id: 3,
      name: "Ольга Владимировна",
      pet: "кошка Соня",
      rating: 5,
      text: "Замечательная клиника! Делаем здесь прививки регулярно. Очень добрый вежливый персонал, идеальный порядок и стерильность во время процедур. Доктор перед уколом сначала приласкал Соню, она даже ничего не успела понять. Цены абсолютно адекватные. Буду советовать ее всем знакомым!",
      date: "28 апреля 2026"
    }
  ];

  // Map service selection to direct booking form auto-scroll
  const handleSelectServiceFromCard = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    
    // Smooth scroll down to form
    if (bookingSectionRef.current) {
      bookingSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Highlight first input field subtly after scroll finishes
    setTimeout(() => {
      const nameInput = document.getElementById('client-name-input');
      if (nameInput) {
        nameInput.focus();
      }
    }, 800);
  };

  // Form custom submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAgreementChecked) return;

    // Build personalized feedback
    setModalTitle("Заявка успешно принята!");
    setModalDescription(`Спасибо большое за доверие, ${clientName}! Мы зафиксировали вашу запись на услугу "${selectedService}" для питомца (${selectedPet.toLowerCase()}). Наш ветеринарный администратор свяжется с вами по указанному телефону ${phoneNumber} в течение ближайших 10 минут, чтобы согласовать удобное точное время визита.`);
    setIsModalVisible(true);

    // Reset inputs
    setClientName("");
    setPhoneNumber("");
    setCommentText("");
  };

  const filteredServices = activeTab === "all" 
    ? servicesData 
    : servicesData.filter(s => s.category === activeTab);

  return (
    <div className="bg-cream font-sans text-stone-850 antialiased selection:bg-primary/20 selection:text-primary min-h-screen flex flex-col relative">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-primary/95 border-b border-primary-dark/30 shadow-md transition-all duration-300 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo and Slogan */}
            <a href="#" className="flex items-center gap-3.5 group">
              <LogoIcon className="w-11 h-11 md:w-13 md:h-13 bg-white rounded-full p-0.5 shadow-md border border-cream/20" />
              <div>
                <h1 className="font-serif font-bold text-base sm:text-lg text-white leading-tight tracking-tight uppercase group-hover:text-gold transition-colors">
                  КЛИНИКА ДОКТОРА ШЕЛЕХОВОЙ
                </h1>
                <p className="text-[10px] text-gold tracking-widest uppercase font-bold leading-none mt-1">
                  «ЛЕЧИМ ЖИВОТНЫХ КАК РОДНЫХ»
                </p>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold text-cream/95">
              <a href="#why-us" className="hover:text-gold transition-colors py-2">Почему мы</a>
              <a href="#services" className="hover:text-gold transition-colors py-2">Услуги и цены</a>
              <a href="#doctors" className="hover:text-gold transition-colors py-2">Наши врачи</a>
              <a href="#reviews" className="hover:text-gold transition-colors py-2">Отзывы</a>
              <a href="#contacts" className="hover:text-gold transition-colors py-2">Контакты</a>
              <a 
                href="#booking" 
                className="bg-gold hover:bg-gold-hover text-white px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg shadow-gold/20 ml-2"
              >
                Записаться
              </a>
            </nav>

            {/* Side Contacts on Desktop */}
            <div className="hidden lg:flex items-center gap-5">
              <div className="text-right">
                <a href={`tel:${phonePrimary.replace(/[^\d+]/g, '')}`} className="block text-cream hover:text-gold text-sm font-bold transition-colors">
                  {phonePrimary}
                </a>
                <a href={`tel:${phoneSecondary.replace(/[^\d+]/g, '')}`} className="block text-gold hover:text-white text-xs font-medium transition-colors mt-0.5">
                  {phoneSecondary}
                </a>
              </div>
            </div>

            {/* Mobile Burger Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="md:hidden text-cream p-2 focus:outline-none hover:text-gold transition-colors"
              aria-label="Открыть меню"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-primary-dark/98 border-t border-primary/20 absolute w-full left-0 shadow-2xl transition-all duration-300">
            <div className="px-4 pt-4 pb-6 space-y-3.5 flex flex-col text-cream text-base font-semibold">
              <a 
                href="#why-us" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-gold py-2 border-b border-cream/5 transition-colors"
              >
                Почему мы
              </a>
              <a 
                href="#services" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-gold py-2 border-b border-cream/5 transition-colors"
              >
                Услуги и цены
              </a>
              <a 
                href="#doctors" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-gold py-2 border-b border-cream/5 transition-colors"
              >
                Наши врачи
              </a>
              <a 
                href="#reviews" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-gold py-2 border-b border-cream/5 transition-colors"
              >
                Отзывы
              </a>
              <a 
                href="#contacts" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-gold py-2 transition-colors"
              >
                Контакты и адрес
              </a>
              
              <div className="pt-4 border-t border-cream/10 flex flex-col gap-3">
                <div className="text-center text-xs text-gold font-normal">Ежедневно 9:00–21:00 • Челябинск</div>
                <a href={`tel:${phonePrimary.replace(/[^\d+]/g, '')}`} className="text-center bg-cream/10 hover:bg-cream/20 py-2.5 rounded-xl text-sm font-bold">
                  {phonePrimary}
                </a>
                <a 
                  href="#booking" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-center bg-gold hover:bg-gold-hover text-white py-2.5 rounded-xl text-sm font-bold tracking-wider uppercase shadow-md shadow-gold/10"
                >
                  Записаться на приём
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-[#091D15] text-cream py-16 lg:py-24 overflow-hidden">
        {/* Subtle geometric line overlay to convey trustworthiness and cleanliness */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="hero-grid" width="45" height="45" patternUnits="userSpaceOnUse">
              <path d="M 45 0 L 0 0 0 45" fill="none" stroke="currentColor" strokeWidth="0.8"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Text column */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left reveal active">
              
              <div className="inline-flex self-center lg:self-start items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-bold tracking-wider uppercase">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold"></span>
                </span>
                Челябинск • Комсомольский пр-т, 94
              </div>
              
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6.5xl font-extrabold tracking-tight leading-tight lg:leading-none">
                Профессиональное лечение с теплой заботой
              </h1>
              
              <p className="text-base sm:text-lg text-cream/90 font-sans leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Ветеринарная клиника доктора Шелеховой М.В. — это полный спектр ветеринарных услуг, доступные медицинские цены, сертифицированная аптека и искренний ветеринарный зарок: <strong className="text-gold font-serif text-lg sm:text-xl italic font-semibold">«Лечим животных как родных»</strong>.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <a 
                  href="#booking" 
                  className="w-full sm:w-auto text-center bg-gold hover:bg-gold-hover text-white px-8 py-4 rounded-full text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-gold/30 hover:shadow-xl"
                >
                  Записаться на приём
                </a>
                <a 
                  href={`tel:${phonePrimary.replace(/[^\d+]/g, '')}`} 
                  className="w-full sm:w-auto text-center bg-transparent hover:bg-cream/10 border-2 border-cream/30 hover:border-cream/80 text-cream px-8 py-3.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 "
                >
                  <svg className="w-4 h-4 text-gold shrink-0 fill-current" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-1C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  Позвонить в клинику
                </a>
              </div>

              {/* Stat counters */}
              <div className="grid grid-cols-3 gap-4 border-t border-cream/10 pt-8 mt-5 text-left">
                <div>
                  <p className="font-serif text-xl sm:text-3.5xl font-bold text-gold">10 лет+</p>
                  <p class="text-[11px] sm:text-xs text-cream/75 mt-1 leading-normal font-medium">Безупречной клинической практики врачей</p>
                </div>
                <div>
                  <p className="font-serif text-xl sm:text-3.5xl font-bold text-gold">9:00–21</p>
                  <p class="text-[11px] sm:text-xs text-cream/75 mt-1 leading-normal font-medium">Работаем без праздников и выходных</p>
                </div>
                <div>
                  <p className="font-serif text-xl sm:text-3.5xl font-bold text-gold">10k+</p>
                  <p class="text-[11px] sm:text-xs text-cream/75 mt-1 leading-normal font-medium font-medium">Вылеченных и привитых животных</p>
                </div>
              </div>

            </div>

            {/* Visual Column / Showcase */}
            <div className="lg:col-span-5 flex justify-center reveal active">
              <div className="relative w-full max-w-sm sm:max-w-md">
                
                {/* Decorative glowing backdrops with logo's vibrant green */}
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-primary to-gold rounded-3xl blur-md opacity-35 animate-pulse"></div>
                
                <div className="relative bg-primary-dark/50 rounded-2xl p-3 border border-cream/10 overflow-hidden shadow-2xl">
                  {/* Real visual placeholder with friendly vet tone */}
                  <img 
                    src={doctorPhoto} 
                    alt="Клиника доктора Шелеховой" 
                    className="w-full h-[450px] sm:h-[550px] lg:h-[640px] rounded-xl object-cover hover:scale-[1.02] transition-transform duration-500 shadow-md"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Float doctor badge details inside card info */}
                  <div className="absolute bottom-6 left-6 right-6 bg-primary/95 border border-gold/35 backdrop-blur-md p-4.5 rounded-xl shadow-xl flex items-center gap-3">
                    <LogoIcon className="w-10 h-10 bg-white rounded-full p-1" />
                    <div>
                      <p className="text-[9px] text-gold uppercase tracking-widest font-extrabold leading-none">ГЛАВНЫЙ ВРАЧ КЛИНИКИ</p>
                      <h3 className="font-serif text-base font-bold text-white mt-1">Шелехова М.В.</h3>
                      <p className="text-xs text-cream/85 mt-0.5 leading-tight font-medium">«Лечим животных как родных»</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Us Section (Почему мы) */}
      <section id="why-us" class="py-20 bg-cream relative overflow-hidden">
        {/* Soft fading top gradient transition */}
        <div className="absolute left-0 right-0 top-0 h-40 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
          
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary-light/75 px-3.5 py-1.5 rounded-full inline-block font-mono">
              НАШИ ПРЕИМУЩЕСТВА
            </span>
            <h2 className="font-serif text-3xl sm:text-4.5xl text-primary-dark font-bold tracking-tight mt-3">
              Почему владельцы доверяют нам своих любимцев?
            </h2>
            <div className="w-20 h-0.5 bg-primary/40 mx-auto mt-4"></div>
            <p className="text-stone-600 mt-4 leading-relaxed font-medium">
              Мы понимаем, что визит к ветеринару — это стресс для всей семьи. Поэтому мы соединили высокую медицинскую экспертность с атмосферой домашнего уюта и неподдельного тепла.
            </p>
          </div>

          {/* 6 Icon Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Advantage 1 */}
            <div className="bg-white rounded-2xl p-8 border border-stone-200/70 hover:border-primary/45 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group reveal">
              <div className="w-13 h-13 rounded-2xl bg-primary-light flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 mb-6 shadow-sm">
                <svg className="w-6.5 h-6.5 fill-none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-bold text-primary-dark mb-3">Без выходных</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Двери нашей клиники открыты ветеринарной помощи <strong className="text-stone-850">ежедневно с 9:00 до 21:00</strong>. Работаем в праздники и выходные дни, чтобы оказать помощь вашему питомцу именно тогда, когда это потребуется.
              </p>
            </div>

            {/* Advantage 2 */}
            <div className="bg-white rounded-2xl p-8 border border-stone-200/70 hover:border-primary/45 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group reveal">
              <div className="w-13 h-13 rounded-2xl bg-primary-light flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 mb-6 shadow-sm">
                <svg className="w-6.5 h-6.5 fill-none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-bold text-primary-dark mb-3">Опытные врачи</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Доктора клиники Шелеховой — это высококвалифицированные профессионалы со стажем свыше 10 лет, постоянно обучающиеся новым хирургическим и терапевтическим методикам в России.
              </p>
            </div>

            {/* Advantage 3 */}
            <div className="bg-white rounded-2xl p-8 border border-stone-200/70 hover:border-primary/45 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group reveal">
              <div className="w-13 h-13 rounded-2xl bg-primary-light flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 mb-6 shadow-sm">
                <svg className="w-6.5 h-6.5 fill-none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-bold text-primary-dark mb-3">Современное оборудование</h3>
              <p class="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Наш кабинет укомплектован качественным экспертным диагностическим оборудованием УЗИ, ЭКГ контролерами и хирургическим инструментарием для точной постановки медицинского диагноза.
              </p>
            </div>

            {/* Advantage 4 */}
            <div className="bg-white rounded-2xl p-8 border border-stone-200/70 hover:border-primary/45 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group reveal">
              <div className="w-13 h-13 rounded-2xl bg-primary-light flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 mb-6 shadow-sm">
                <svg className="w-6.5 h-6.5 fill-none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-bold text-primary-dark mb-3">Личный подход</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Никакой конвейерной спешки и жестокой фиксации! Мы разговариваем с животными на их языке, ласкаем и успокаиваем. Наша цель — минимизировать страх кошки или собаки перед белым халатом.
              </p>
            </div>

            {/* Advantage 5 */}
            <div className="bg-white rounded-2xl p-8 border border-stone-200/70 hover:border-primary/45 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group reveal">
              <div className="w-13 h-13 rounded-2xl bg-primary-light flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 mb-6 shadow-sm">
                <svg className="w-6.5 h-6.5 fill-none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-bold text-primary-dark mb-3">Ветаптека на месте</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Не нужно никуда бежать за лекарствами! Наш собственный аптечный пункт предлагает необходимые сертифицированные препараты, антипаразитарные средства, лечебную косметику и премиум-корма.
              </p>
            </div>

            {/* Advantage 6 */}
            <div className="bg-white rounded-2xl p-8 border border-stone-200/70 hover:border-primary/45 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group reveal">
              <div className="w-13 h-13 rounded-2xl bg-primary-light flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 mb-6 shadow-sm">
                <svg className="w-6.5 h-6.5 fill-none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1M5.25 10.75h1.5m12 0h-1.5m-1.5 0h-5.25" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-bold text-primary-dark mb-3">Выезд на дом</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Если животное плохо переносит поездки или его состояние критическое — врач подъедет с необходимым портативным набором для минимизации паники и экстренной стабилизации любимца.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Services and Prices Section (Услуги и цены) */}
      <section id="services" className="py-20 bg-cream-dark relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary-light px-3.5 py-1.5 rounded-full inline-block font-mono">
              НЕСЕМ ОТВЕТСТВЕННОСТЬ
            </span>
            <h2 className="font-serif text-3xl sm:text-4.5xl text-primary-dark font-bold mt-3">
              Ветеринарные услуги и стоимость
            </h2>
            <div className="w-20 h-0.5 bg-primary/40 mx-auto mt-4"></div>
            <p className="text-stone-700 mt-4 leading-relaxed font-semibold">
              Прозрачные тарифы без скрытых переплат и лишней бюрократии. Мы проводим только те медицинские манипуляции, которые действительно показаны питомцу.
            </p>

            {/* Filter Tabs matching active selection */}
            <div className="flex flex-wrap justify-center items-center gap-2 mt-10">
              <button 
                onClick={() => setActiveTab("all")} 
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${activeTab === 'all' ? 'bg-primary text-white shadow-md shadow-primary/25' : 'bg-white hover:bg-stone-200/50 text-stone-700 hover:text-primary border border-stone-300/60'}`}
              >
                Все услуги
              </button>
              <button 
                onClick={() => setActiveTab("therapy")} 
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${activeTab === 'therapy' ? 'bg-primary text-white shadow-md shadow-primary/25' : 'bg-white hover:bg-stone-200/50 text-stone-700 hover:text-primary border border-stone-300/60'}`}
              >
                Терапия и диагностика
              </button>
              <button 
                onClick={() => setActiveTab("surgery")} 
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${activeTab === 'surgery' ? 'bg-primary text-white shadow-md shadow-primary/25' : 'bg-white hover:bg-stone-200/50 text-stone-700 hover:text-primary border border-stone-300/60'}`}
              >
                Хирургия и стерилизация
              </button>
              <button 
                onClick={() => setActiveTab("hygiene")} 
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${activeTab === 'hygiene' ? 'bg-primary text-white shadow-md shadow-primary/25' : 'bg-white hover:bg-stone-200/50 text-stone-700 hover:text-primary border border-stone-300/60'}`}
              >
                Уход и чистка
              </button>
            </div>
          </div>

          {/* Service Cards Grid Container */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
              <div 
                key={service.id}
                className="bg-cream rounded-2xl p-6 border border-stone-300/70 hover:border-primary/45 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 flex flex-col justify-between shadow-sm reveal active"
              >
                <div>
                  <div className="mb-4 border-b border-stone-300 pb-3 flex flex-col gap-2.5">
                    <h3 className="font-serif font-bold text-primary-dark text-lg leading-tight min-h-[48px] flex items-center">
                      {service.title}
                    </h3>
                    <div>
                      <span className="text-xs font-extrabold text-white bg-primary px-3 py-1.5 rounded-full inline-block font-sans shadow-sm tracking-wide">
                        {service.price}
                      </span>
                    </div>
                  </div>
                  <p className="text-stone-600 text-xs sm:text-xs.1 leading-relaxed mb-6 font-medium">
                    {service.description}
                  </p>
                </div>
                
                <button 
                  onClick={() => handleSelectServiceFromCard(service.title)}
                  className="w-full text-left font-serif text-xs font-bold text-primary hover:text-gold flex items-center gap-1.5 transition-colors tracking-widest py-1 border-t border-stone-200/60 pt-3 group mt-auto align-bottom uppercase"
                >
                  ЗАПИСАТЬСЯ НА ПРИЁМ
                  <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 text-gold" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Our Doctors Section (Наши врачи) */}
      <section id="doctors" className="py-20 bg-cream relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary-light/75 px-3.5 py-1.5 rounded-full inline-block font-mono">
              ВРАЧЕБНАЯ ЭТИКА И СТАЖ
            </span>
            <h2 className="font-serif text-3xl sm:text-4.5xl text-primary-dark font-bold tracking-tight mt-3">
              Ветеринарная команда доктора Шелеховой
            </h2>
            <div className="w-20 h-0.5 bg-primary/40 mx-auto mt-4"></div>
            <p className="text-stone-600 mt-4 leading-relaxed font-medium">
              Каждый доктор в нашей клинике — это не просто дипломированный врач широкой ветеринарной практики, а любящий животных союзник, готовый биться за здоровье вашего хвостика до полного исцеления.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Spotlight Chief Doctor Card - Шелехова Мария Владимировна */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-8 border border-stone-200/80 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-6 items-center reveal">
              <div className="w-full md:w-64 h-[480px] rounded-2xl overflow-hidden shrink-0 border border-primary-light relative shadow-md">
                <img 
                  src={doctorPhoto} 
                  alt="Доктор Шелехова Мария Владимировна" 
                  className="w-full h-full object-cover rounded-2xl"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent pointer-events-none"></div>
              </div>
              
              <div className="flex flex-col h-full justify-between gap-4">
                <div>
                  <span className="inline-block bg-gold/10 text-gold text-[10px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full mb-3 border border-gold/25">
                    ГЛАВНЫЙ ВРАЧ & ОСНОВАТЕЛЬ
                  </span>
                  <h3 className="font-serif text-2.5xl font-bold text-primary-dark leading-snug">
                    Шелехова Мария Владимировна
                  </h3>
                  <p className="text-xs text-primary font-bold tracking-wide mt-1 mb-3">
                    Клинический опыт: более 15 лет • Ведущий ординатор
                  </p>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-semibold">
                    Главный хирург и многопрофильный терапевт клиники. Специализируется на сложнейшей абдоминальной хирургии у собак, лечении патологий почек у кастрированных котов и кардиологическом мониторинге пожилых питомцев.
                  </p>
                </div>
                
                <button 
                  onClick={() => {
                    setSelectedService("Терапия");
                    if (bookingSectionRef.current) {
                      bookingSectionRef.current.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="mt-2 text-xs font-bold text-gold hover:text-primary-dark transition-colors flex items-center gap-1.5 self-start uppercase tracking-wider"
                >
                  Записаться к главврачу
                  <svg className="w-3.5 h-3.5 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Doctor Card 2 - Смирнова А.И. */}
            <div className="lg:col-span-3 bg-white rounded-3xl p-6 border border-stone-200/80 hover:border-primary/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between reveal">
              <div>
                <div className="w-full h-64 rounded-2xl overflow-hidden mb-5 relative border border-stone-100 shadow-sm">
                  <img 
                    src="https://placehold.co/400x500/00A83F/FAF8F4?text=Смирнова+А.И." 
                    alt="Смирнова Анна Игоревна" 
                    className="w-full h-full object-cover rounded-2xl"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="bg-primary-light/85 text-primary text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full mb-2 inline-block font-mono">
                  ТЕРАПЕВТ-ДЕРМАТОЛОГ
                </span>
                <h3 className="font-serif text-lg font-bold text-primary-dark tracking-tight leading-snug">
                  Смирнова Анна Игоревна
                </h3>
                <p className="text-[11px] text-stone-500 font-bold mb-3 mt-0.5">
                  Ветеринарный стаж: 10 лет
                </p>
                <p className="text-xs text-stone-600 leading-relaxed font-medium">
                  Специализируется на дерматологии домашних питомцев, лечении аллергических дерматитов кошек и лечении инфекционных поражений шерсти и когтей мелких грызунов и экзотов.
                </p>
              </div>
              
              <button 
                onClick={() => {
                  setSelectedService("Терапия");
                  if (bookingSectionRef.current) {
                    bookingSectionRef.current.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="text-xs font-bold text-primary hover:text-gold transition-colors flex items-center gap-1.5 mt-5 uppercase tracking-wider"
              >
                ЗАПИСЬ К ТЕРАПЕВТУ
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>

            {/* Doctor Card 3 - Ковалев Д.С. */}
            <div className="lg:col-span-3 bg-white rounded-3xl p-6 border border-stone-200/80 hover:border-primary/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between reveal">
              <div>
                <div className="w-full h-64 rounded-2xl overflow-hidden mb-5 relative border border-stone-100 shadow-sm">
                  <img 
                    src="https://placehold.co/400x500/00A83F/FAF8F4?text=Ковалев+Д.С." 
                    alt="Ковалев Дмитрий Сергеевич" 
                    className="w-full h-full object-cover rounded-2xl"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="bg-primary-light/85 text-primary text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full mb-2 inline-block font-mono">
                  ХИРУРГ-ОРТОПЕД
                </span>
                <h3 className="font-serif text-lg font-bold text-primary-dark tracking-tight leading-snug">
                  Ковалев Дмитрий Сергеевич
                </h3>
                <p className="text-[11px] text-stone-500 font-bold mb-3 mt-0.5">
                  Ветеринарный стаж: 12 лет
                </p>
                <p className="text-xs text-stone-600 leading-relaxed font-medium">
                  Проводит ортопедические операции животных после высотных травм или ударов машин. Профессионально вправляет суставы, лечит дисплазию тазобедренных суставов и восстанавливает связки.
                </p>
              </div>
              
              <button 
                onClick={() => {
                  setSelectedService("Хирургия");
                  if (bookingSectionRef.current) {
                    bookingSectionRef.current.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="text-xs font-bold text-primary hover:text-gold transition-colors flex items-center gap-1.5 mt-5 uppercase tracking-wider"
              >
                ЗАПИСЬ К ХИРУРГУ
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Reviews Section (Отзывы) */}
      <section id="reviews" className="py-20 bg-cream-dark relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary-light px-3.5 py-1.5 rounded-full inline-block font-mono">
              ИСТОРИИ И БЛАГОДАРНОСТИ
            </span>
            <h2 className="font-serif text-3xl sm:text-4.5xl text-primary-dark font-bold mt-3">
              Отзывы благодарных владельцев
            </h2>
            <div className="w-20 h-0.5 bg-primary/40 mx-auto mt-4"></div>
            <p className="text-stone-700 mt-4 leading-relaxed font-semibold">
              Искренние отзывы челябинцев, доверивших здоровье своих любимцев ветеринарам клиники доктора Шелеховой.
            </p>
          </div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {reviewsData.map((review) => (
              <div 
                key={review.id}
                className="bg-cream rounded-2xl p-8 border border-stone-300/65 shadow-sm relative reveal active"
              >
                {/* Visual quote indicator asset */}
                <span className="absolute top-4 right-6 text-7xl text-gold/15 font-serif select-none pointer-events-none">“</span>
                
                {/* Render active gold stars */}
                <div className="flex items-center gap-1 mb-4 text-gold">
                  {[...Array(review.rating)].map((_, idx) => (
                    <svg key={idx} className="w-4 h-4 fill-current shrink-0" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-stone-600 italic leading-relaxed mb-6 font-medium">
                  «{review.text}»
                </p>

                <div className="border-t border-stone-300 pt-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-serif font-bold text-primary-dark text-sm sm:text-base">
                      {review.name}
                    </h4>
                    <p className="text-[11px] text-stone-500 font-bold mt-0.5">
                      Владелец: <span className="text-stone-700">{review.pet}</span>
                    </p>
                  </div>
                  <span className="text-[9px] font-black tracking-widest bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full uppercase">
                    ПРОВЕРЕНО
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Booking Form Section (Запись на приём) */}
      <section id="booking" ref={bookingSectionRef} className="py-20 paw-bg relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 reveal">
          
          <div className="bg-white rounded-3xl border border-primary/10 shadow-2xl p-8 sm:p-12 relative overflow-hidden">
            
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full font-mono">
                РЯДОМ С ВАМИ И СЕМЬЕЙ
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-primary-dark font-bold tracking-tight mt-3">
                Онлайн-запись на ветеринарный приём
              </h2>
              <p className="text-stone-550 text-xs sm:text-sm leading-relaxed mt-2 font-medium">
                Заполните простую анкету ниже. Администратор клиники доктора Шелеховой сразу зафиксирует вашу заявку и перезвонит вам в течение 10 минут, чтобы подобрать комфортное время без очередей.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} ref={bookingFormRef} className="space-y-6 font-sans">
              
              <div class="grid sm:grid-cols-2 gap-6">
                
                {/* User Name Input */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="client-name-input" className="text-xs font-extrabold text-stone-700 tracking-wider uppercase">
                    Ваше полное имя <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="client-name-input"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Александр Павлович" 
                    className="w-full bg-cream-dark/25 border border-stone-250 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-sm font-medium transition-all focus:outline-none placeholder-stone-400"
                  />
                </div>

                {/* User Phone Input */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="client-phone-input" className="text-xs font-extrabold text-stone-700 tracking-wider uppercase">
                    Ваш мобильный телефон <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="tel" 
                    id="client-phone-input"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+7 (912) 345-67-89" 
                    className="w-full bg-cream-dark/25 border border-stone-250 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-sm font-medium transition-all focus:outline-none placeholder-stone-400"
                  />
                </div>

              </div>

              <div class="grid sm:grid-cols-2 gap-6">
                
                {/* Pet select pills */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-extrabold text-stone-700 tracking-wider uppercase">
                    Кто ваш питомец? <span className="text-red-500">*</span>
                  </span>
                  <div className="grid grid-cols-5 gap-1.5">
                    {["Кошка", "Собака", "Грызун", "Птица", "Другое"].map((petName) => (
                      <button
                        key={petName}
                        type="button"
                        onClick={() => setSelectedPet(petName)}
                        className={`py-2 rounded-xl text-xs font-bold transition-all border ${selectedPet === petName ? 'bg-primary/10 border-primary text-primary-dark font-extrabold shadow-sm' : 'bg-cream-dark/30 border-stone-200 text-stone-600 hover:border-stone-400'}`}
                      >
                        {petName}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Service Dropdown Selector */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="service-dropdown" className="text-xs font-extrabold text-stone-700 tracking-wider uppercase">
                    Какая ветеринарная услуга необходима? <span className="text-red-500">*</span>
                  </label>
                  <select 
                    id="service-dropdown"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-cream-dark/25 border border-stone-250 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3.5 text-sm font-semibold transition-all focus:outline-none text-stone-700"
                  >
                    <option value="Терапия">Терапия (первичный прием)</option>
                    <option value="Хирургия">Хирургия (операционное лечение)</option>
                    <option value="УЗИ и диагностика">УЗИ и визуальная диагностика</option>
                    <option value="Вакцинация">Вакцинация (профилактическая прививка)</option>
                    <option value="Кастрация / Стерилизация">Кастрация / Стерилизация</option>
                    <option value="Профессиональный груминг">Гигиенический груминг</option>
                    <option value="Чипирование">Чипирование и база AnimalID</option>
                    <option value="Выезд врача на дом">Экстренный выезд врача на дом</option>
                  </select>
                </div>

              </div>

              {/* Extra Comments */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="form-comment-text" className="text-xs font-extrabold text-stone-700 tracking-wider uppercase">
                  Дополнительный вопрос, симптомы или удобное время звонка
                </label>
                <textarea 
                  id="form-comment-text"
                  rows={3}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Опишите вкратце возраст животного, симптомы или желаемое время для приёма в нашей клинике..." 
                  className="w-full bg-cream-dark/25 border border-stone-250 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-sm font-medium transition-all focus:outline-none placeholder-stone-400"
                />
              </div>

              {/* Legal checkbox */}
              <div className="flex items-start gap-2.5 pt-2">
                <input 
                  type="checkbox" 
                  id="legal-checkbox-input"
                  required
                  checked={isAgreementChecked}
                  onChange={(e) => setIsAgreementChecked(e.target.checked)}
                  className="mt-1 accent-primary h-4 w-4 cursor-pointer" 
                />
                <label htmlFor="legal-checkbox-input" className="text-xs text-stone-500 leading-normal cursor-pointer select-none">
                  Нажимая кнопку, вы соглашаетесь с условиями хранения персональных данных и нашей Политикой конфиденциальности. Информация используется исключительно для координации медицинского визита.
                </label>
              </div>

              {/* Form trigger submission */}
              <button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:shadow-xl shadow-primary/20 hover:-translate-y-0.5 cursor-pointer"
              >
                ОТПРАВИТЬ ЗАЯВКУ НА ПРИЁМ
              </button>

            </form>

          </div>
        </div>
      </section>

      {/* Contacts + map */}
      <section id="contacts" className="py-20 bg-cream-dark border-t border-stone-300 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Info Column */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-8 reveal">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <LogoIcon className="w-9 h-9" />
                  <span className="text-xs font-bold uppercase tracking-wider text-primary font-mono">ЖДЁМ ВАС</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4.5xl text-primary-dark font-bold tracking-tight">
                  Контакты нашей клиники
                </h2>
                <div className="w-16 h-0.5 bg-primary/40 mt-4 mb-8"></div>

                <div className="space-y-6">
                  
                  {/* Address info item */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shrink-0 shadow-sm">
                      <svg className="w-5 h-5 fill-none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-3.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-stone-550 uppercase tracking-widest font-extrabold">НАШ АДРЕС</p>
                      <p className="text-stone-850 font-bold text-sm sm:text-base mt-0.5">
                        {addressLine}
                      </p>
                    </div>
                  </div>

                  {/* Phone contacts item */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shrink-0 shadow-sm">
                      <svg className="w-5 h-5 fill-none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.035 12.035 0 0 1-7.143-7.143c-.156-.441.01-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-stone-550 uppercase tracking-widest font-extrabold">ТЕЛЕФОНЫ ДЛЯ СВЯЗИ</p>
                      <a href={`tel:${phonePrimary.replace(/[^\d+]/g, '')}`} className="block text-stone-850 font-bold text-base hover:text-primary transition-colors mt-0.5">
                        {phonePrimary}
                      </a>
                      <a href={`tel:${phoneSecondary.replace(/[^\d+]/g, '')}`} className="block text-stone-700 font-bold text-sm hover:text-primary transition-colors mt-0.5">
                        {phoneSecondary}
                      </a>
                    </div>
                  </div>

                  {/* Hours item */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shrink-0 shadow-sm">
                      <svg className="w-5 h-5 fill-none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-stone-550 uppercase tracking-widest font-extrabold font-mono">ВРЕМЯ РАБОТЫ</p>
                      <p className="text-stone-850 font-bold text-sm sm:text-base mt-0.5">
                        {workingHours}
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Founder quote signature */}
              <div className="border-l-4 border-primary px-4 py-2 bg-white/70 rounded-r-xl">
                <p className="text-xs text-stone-600 italic font-medium">
                  «Мы верим, что каждое животное заслуживает такого же уважения и заботы во время лечения, как и человек. Мы не навязываем ненужных препаратов, а боремся за каждый шанс на здоровую жизнь.»
                </p>
                <p className="text-stone-800 text-[11px] font-bold mt-2 font-serif text-right">
                  — М.В. Шелехова, основатель клиники
                </p>
              </div>
            </div>

            {/* Embedded Yandex Maps Frame Placeholder with clean styles */}
            <div className="lg:col-span-7 rounded-3xl overflow-hidden min-h-[350px] shadow-lg border border-stone-300 relative reveal">
              <iframe 
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A7a195e87aedac3e6c0c1b489d81373e449a37e8cdafc21cde95cfbfda2871f30&amp;source=constructor" 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                title="Ветеринарная клиника доктора Шелеховой на карте Челябинска"
                className="w-full h-full border-0 rounded-3xl min-h-[400px]"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-dark text-cream/90 pt-16 pb-8 border-t border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 pb-12 border-b border-cream/10">
            
            {/* Column 1: Logo & Slogan */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <LogoIcon className="w-10 h-10 bg-white rounded-full p-0.5" />
                <div>
                  <h4 className="font-serif font-extrabold text-sm text-white tracking-tight uppercase leading-tight">
                    клиника Шелеховой М.В.
                  </h4>
                  <p className="text-[9px] text-gold font-bold tracking-widest leading-none mt-1 uppercase">«лечим как родных»</p>
                </div>
              </div>
              <p className="text-xs text-cream/70 leading-relaxed mt-2 font-medium">
                Комфортная, теплая и стерильная ветеринарная помощь для ваших питомцев в Челябинске. Профессионально заботимся о здоровье и спокойствии всей семьи.
              </p>
            </div>

            {/* Column 2: Navigation shortcuts */}
            <div>
              <h4 className="font-serif font-extrabold text-white text-sm tracking-widest uppercase mb-4">Навигация</h4>
              <ul className="space-y-2 text-xs font-semibold">
                <li><a href="#why-us" className="hover:text-gold transition-colors block py-1">Почему владельцы выбирают нас</a></li>
                <li><a href="#services" className="hover:text-gold transition-colors block py-1">Ветеринарные услуги и цены</a></li>
                <li><a href="#doctors" className="hover:text-gold transition-colors block py-1">Наши ветеринарные специалисты</a></li>
                <li><a href="#reviews" className="hover:text-gold transition-colors block py-1">Отзывы благодарных клиентов</a></li>
                <li><a href="#booking" className="hover:text-gold transition-colors block py-1">Запись на приём на сегодня</a></li>
              </ul>
            </div>

            {/* Column 3: Contact quicklinks */}
            <div>
              <h4 className="font-serif font-extrabold text-white text-sm tracking-widest uppercase mb-4 font-mono">Телефоны</h4>
              <ul className="space-y-3.5 text-xs">
                <li>
                  <span className="text-[10px] text-cream/50 uppercase block font-medium">ГЛАВНЫЙ НОМЕР КЛИНИКИ</span>
                  <a href={`tel:${phonePrimary.replace(/[^\d+]/g, '')}`} className="hover:text-gold text-white font-bold text-sm transition-colors mt-0.5 block">
                    {phonePrimary}
                  </a>
                </li>
                <li>
                  <span className="text-[10px] text-cream/50 uppercase block font-medium">ДЕЖУРНЫЙ / МОБИЛЬНЫЙ ПРИЕМНЫЙ</span>
                  <a href={`tel:${phoneSecondary.replace(/[^\d+]/g, '')}`} className="hover:text-gold text-white font-bold text-sm transition-colors mt-0.5 block">
                    {phoneSecondary}
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Location details & VKontakte */}
            <div className="flex flex-col gap-4">
              <h4 className="font-serif font-extrabold text-white text-sm tracking-widest uppercase">Соцсети и адрес</h4>
              <p className="text-xs text-cream/70 leading-relaxed font-medium">
                {addressLine}
                <br />
                <span className="text-gold text-[10px] uppercase font-bold tracking-wider mt-1.5 block">Режим работы: {workingHours}</span>
              </p>
              
              {/* VK Link Placeholder Styled and aligned */}
              <a 
                href="https://vk.com/shelekhovamv" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold bg-white/10 hover:bg-white/15 hover:text-white text-cream px-4 py-2.5 rounded-xl border border-cream/10 mt-2 self-start transition-all"
              >
                {/* VK icon inline SVG */}
                <svg className="w-5 h-5 shrink-0 fill-current text-[#4C75A3]" viewBox="0 0 24 24">
                  <path d="M15.011 25.12c-9.13 0-14.362-6.25-14.582-16.634h4.591c.15 7.618 3.5 10.841 5.151 11.258V8.486H14.5v12.219c2.614-.28 5.34-3.268 6.273-7.219h4.59c-.77 5.253-4.576 8.24-6.273 9.231v4.331s-.413.417-.98.417c-1.396 0-1.748-.417-1.748-1.42s1.42-3.125 1.42-3.125l-2.75-2.75z" transform="scale(0.8) translate(3, 3)"/>
                </svg>
                Сообщество ВКонтакте
              </a>
            </div>

          </div>

          {/* Legal statement bar */}
          <div className="pt-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between text-xs text-cream/50 gap-4">
            <p>
              © {new Date().getFullYear()} Ветеринарная клиника доктора Шелеховой М.В. Все права защищены.
            </p>
            <p className="text-[10px] leading-relaxed max-w-md text-center sm:text-right">
              Информация на сайте носит рекомендательно-ознакомительный характер и не является публичной офертой. Лицензии на фармацевтическую и терапевтическую деятельность зарегистрированы в г. Челябинск.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button (bottom-right) WhatsApp connecting to wa.me/79658563215 */}
      <a 
        href="https://wa.me/79658563215"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
        title="Связаться в WhatsApp"
      >
        {/* Subtle glow border animate-ping */}
        <span className="absolute inset-0 bg-[#25D366] rounded-full opacity-30 group-hover:animate-ping pointer-events-none"></span>
        
        {/* Inside is the real official WhatsApp icon inline SVG */}
        <svg className="w-7 h-7 relative z-10 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.455h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* Booking Form Success Confirmation Dialog Modal Backdrop */}
      {isModalVisible && (
        <div className="fixed inset-0 z-50 bg-stone-900/70 py-10 px-4 flex items-center justify-center backdrop-blur-sm transition-all animate-fadeIn">
          <div className="bg-cream border border-gold/30 rounded-3xl p-6 sm:p-10 max-w-lg w-full relative shadow-2xl scale-100 transition-all font-sans text-center">
            
            {/* Logo highlight inside modal */}
            <div className="mx-auto w-16 h-16 rounded-full bg-primary-light flex items-center justify-center text-primary font-serif font-bold text-2xl mb-6 shadow-inner">
              <LogoIcon className="w-11 h-11" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-primary-dark mb-3">
              {modalTitle}
            </h3>
            
            <p className="text-stone-600 text-sm leading-relaxed mb-8">
              {modalDescription}
            </p>

            <button 
              onClick={() => setIsModalVisible(false)}
              className="w-full bg-primary hover:bg-primary-dark text-white py-3.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md shadow-primary/20 cursor-pointer"
            >
              ОЛИЧНО, ЖДУ ЗВОНКА АДМИНИСТРАТОРА!
            </button>
            
          </div>
        </div>
      )}

    </div>
  );
}
