import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BeforeAfter } from './components/BeforeAfter';
import { Services } from './components/Services';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Star, ShieldCheck, Diamond, BadgeCheck, MapPin, Phone, Mail, Instagram, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Button } from './components/Button';
import { PopupModal } from "react-calendly";

// Placeholder components for sections not requiring heavy logic
const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
    <div className="w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors">
      <Icon className="text-accent w-8 h-8" />
    </div>
    <h3 className="text-xl font-serif font-bold text-primary mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const Step = ({ number, title, text, align = 'left' }: { number: string | any, title: string, text: string, align?: 'left' | 'right' }) => (
  <div className="flex flex-col md:flex-row items-center justify-between mb-12 relative">
    <div className={`md:w-5/12 text-center md:text-${align} ${align === 'right' ? 'order-2 md:order-1' : 'order-2 md:order-3'}`}>
      <h3 className="text-2xl font-serif font-bold text-primary mb-2">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
    <div className={`md:w-2/12 flex justify-center order-1 md:order-2 mb-6 md:mb-0 relative z-10`}>
      <div className={`w-12 h-12 ${typeof number === 'string' ? 'bg-accent' : 'bg-primary'} rounded-full flex items-center justify-center shadow-lg border-4 border-white`}>
        {typeof number === 'string' ? (
          <span className="text-white font-bold font-serif text-xl">{number}</span>
        ) : (
          <span className="text-accent"><BadgeCheck /></span>
        )}
      </div>
    </div>
    <div className={`md:w-5/12 ${align === 'right' ? 'order-3' : 'order-1'}`}></div>
  </div>
);

const featureCards = [
  { icon: ShieldCheck, title: "Sedación Consciente", description: "Procedimientos totalmente indoloros. Relájate profundamente mientras nosotros trabajamos en tu mejor versión." },
  { icon: Star, title: "Resultados Naturales", description: "Diseños que respetan tu fisionomía. Textura, color y forma que se ven y se sienten 100% reales." },
  { icon: Diamond, title: "Atención VIP", description: "Experiencia boutique personalizada. Desde tu llegada, cada detalle está pensado para tu confort." },
];

function App() {
  const [isAppointmentOpen, setIsAppointmentOpen] = React.useState(false);
  const [appointmentType, setAppointmentType] = React.useState<'general' | 'aesthetic' | 'urgency'>('general');

  const openAppointment = (type: 'general' | 'aesthetic' | 'urgency') => {
    setAppointmentType(type);
    setIsAppointmentOpen(true);
  };

  return (
    <div className="font-sans text-primary">
      <Navbar onSchedule={() => openAppointment('general')} />
      <Hero
        onAestheticClick={() => openAppointment('aesthetic')}
        onUrgencyClick={() => openAppointment('urgency')}
      />

      {/* Features */}
      <section id="experience" className="py-24 bg-surface">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-6">Tu sonrisa, tu firma personal</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Superamos el miedo al dentista combinando tecnología de vanguardia con un ambiente de spa. Olvídate de los diseños artificiales; aquí creamos arte.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={ShieldCheck}
              title="Sedación Consciente"
              description="Procedimientos totalmente indoloros. Relájate profundamente mientras nosotros trabajamos en tu mejor versión."
            />
            <FeatureCard
              icon={Star}
              title="Resultados Naturales"
              description="Diseños que respetan tu fisionomía. Textura, color y forma que se ven y se sienten 100% reales."
            />
            <FeatureCard
              icon={Diamond}
              title="Atención VIP"
              description="Experiencia boutique personalizada. Desde tu llegada, cada detalle está pensado para tu confort."
            />
          </div>
        </div>
      </section>

      <BeforeAfter />

      <Services />

      {/* Process */}
      <section id="process" className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4">Tu Transformación en 3 Pasos</h2>
            <div className="h-1 w-20 bg-accent mx-auto rounded-full"></div>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2"></div>
            <Step number="1" title="1. Consulta y Diagnóstico" text="Evaluamos tu salud oral y escuchamos tus deseos. Realizamos un escaneo 3D digital para máxima precisión." align="right" />
            <Step number="2" title="2. Diseño Personalizado" text='Creamos tus carillas o diseño de sonrisa. Podrás ver un "mockup" provisional antes del resultado final.' align="left" />
            <Step number={<BadgeCheck />} title="3. La Revelación" text="Colocación final y ajuste. Te entregamos el espejo y descubres tu nueva y radiante sonrisa." align="right" />
          </div>
        </div>
      </section>

      {/* Financing */}
      <section id="financing" className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-2xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

            <div className="md:w-1/2 relative z-10">
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Tu Sonrisa, Tu Mejor Inversión</h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Entendemos que la excelencia tiene su valor. Por eso, ofrecemos planes de financiamiento flexibles para que el dinero no sea un impedimento.
              </p>
              <ul className="space-y-4 mb-8">
                {['Planes a 6, 12 y 24 meses', 'Aceptamos seguros internacionales selectos', 'Sin intereses ocultos'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <BadgeCheck className="text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="gold" className="text-white hover:bg-white hover:text-primary border border-transparent hover:border-white transition-all">Ver Opciones de Pago</Button>
            </div>
            <div className="md:w-1/2 relative z-10 w-full">
              <img
                className="rounded-lg shadow-2xl w-full object-cover h-64 md:h-80"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoGFXjM8FchshHAcE6BfyLKnwVrNvGxh1Ry4xu8_CJUVzYRklEe0-jctYkfk0tSuPOF9kwJtSwJCH3pk7EKM2fsOsLZBaVKqPUONjcEY944fzR7xWqYjVU3pDT65oanzAJLNfi3uO5vPnl7OvtA02sU_Wo2Zoi-MhTboklb8syvGcy61PCYWOvxP3Tfm6fLT88exNseDFJerIl4IQD_q21PTl-bY9NYCevgixmTA_90pD3XOZyKAGNknLg2lgLbhJTIN5L8NeJ"
                alt="Financing"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-background-dark text-white pt-20 pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
            {/* FAQ */}
            <div>
              <h3 className="text-2xl font-serif font-bold mb-8 text-accent">Preguntas Frecuentes</h3>
              <div className="space-y-4">
                {[
                  { q: "¿Cuánto dura el diseño de sonrisa?", a: "Dependiendo del material (resina o cerámica), pueden durar entre 7 a 20 años con el cuidado adecuado." },
                  { q: "¿Es doloroso el procedimiento?", a: "En absoluto. Utilizamos técnicas de anestesia local y sedación consciente." },
                  { q: "¿Tienen facilidades para extranjeros?", a: "Sí, contamos con un concierge dental que te ayuda con traslados y hospedaje." }
                ].map((faq, i) => (
                  <details key={i} className="group bg-white/5 rounded-lg open:bg-white/10 transition-colors">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4">
                      <span>{faq.q}</span>
                      <span className="transition group-open:rotate-180 text-accent">▼</span>
                    </summary>
                    <div className="text-gray-300 text-sm p-4 pt-0 leading-relaxed">{faq.a}</div>
                  </details>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <img src="/logo-lael.png" alt="Lael Dental Logo" className="h-10 w-auto object-contain filter brightness-0 invert" />
                <h2 className="font-serif text-2xl font-bold">Lael Dental Esthetic</h2>
              </div>
              <p className="text-gray-400 mb-8 max-w-sm">Redefiniendo la odontología estética en el Caribe.</p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3"><MapPin className="text-accent mt-1" size={18} /><span className="text-gray-300 text-sm">Gazcue, C/ Santiago #51, Santo Domingo, República Dominicana</span></div>
                <div className="flex items-center gap-3"><Phone className="text-accent" size={18} /><span className="text-gray-300 text-sm">+1 (809) 268-5983</span></div>
                <div className="flex items-center gap-3"><Mail className="text-accent" size={18} /><span className="text-gray-300 text-sm">citas@laeldental.com</span></div>
                <div className="flex items-center gap-3"><Clock className="text-accent" size={18} /><span className="text-gray-300 text-sm">Lunes a Viernes 9:00 AM a 6:00 PM</span></div>
              </div>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/dralbertpresbot?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all"
                >
                  <Instagram size={18} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>© 2026 Lael Dental Esthetic. Todos los derechos reservados.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-accent">Privacidad</a>
              <a href="#" className="hover:text-accent">Términos</a>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppButton />



      {/* Calendly Integration */}
      <PopupModal
        url={
          appointmentType === 'aesthetic' ? "https://calendly.com/monteromercedesmaximojunior/diseno-de-sonrisa" :
            appointmentType === 'urgency' ? "https://calendly.com/monteromercedesmaximojunior/urgencias" :
              "https://calendly.com/monteromercedesmaximojunior/consulta-general"
        }
        pageSettings={{
          backgroundColor: 'ffffff',
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: 'd4af37', // Gold/Accent color
          textColor: '1a1a1a'
        }}
        utm={{
          utmSource: 'Website',
          utmMedium: 'BookingButton',
          utmCampaign: appointmentType
        }}
        rootElement={document.getElementById("root")!}
        open={isAppointmentOpen}
        onModalClose={() => setIsAppointmentOpen(false)}
      />
    </div>
  );
}

export default App;