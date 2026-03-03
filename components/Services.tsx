import React from 'react';
import { Sparkles, Syringe, Activity, Baby, Disc } from 'lucide-react';

const ServiceItem = ({ title, icon: Icon, align }: { title: string, icon: any, align: 'left' | 'right' }) => (
    <div className={`flex flex-col ${align === 'left' ? 'items-end text-right' : 'items-start text-left'} group`}>
        <div className="flex items-center gap-4 mb-2">
            {align === 'left' ? (
                <>
                    <span className="text-xl md:text-2xl font-serif text-white group-hover:text-accent transition-colors">{title}</span>
                    <div className="w-12 h-12 rounded-full border border-dashed border-accent/50 flex items-center justify-center bg-white/5 group-hover:bg-accent/10 transition-colors">
                        <Icon className="text-accent w-6 h-6" />
                    </div>
                </>
            ) : (
                <>
                    <div className="w-12 h-12 rounded-full border border-dashed border-accent/50 flex items-center justify-center bg-white/5 group-hover:bg-accent/10 transition-colors">
                        <Icon className="text-accent w-6 h-6" />
                    </div>
                    <span className="text-xl md:text-2xl font-serif text-white group-hover:text-accent transition-colors">{title}</span>
                </>
            )}
        </div>
        {/* Decorative dashed line indicating connection to center */}
        <div className={`w-24 h-px border-t border-dashed border-accent/30 hidden md:block ${align === 'left' ? 'mr-16' : 'ml-16'}`}></div>
    </div>
);

export const Services = () => {
    return (
        <section id="services" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-serif font-light text-white mb-2 tracking-wide">
                        Conoce mis
                    </h2>
                    <span className="text-5xl md:text-7xl font-serif font-bold text-accent italic">
                        servicios
                    </span>
                </div>

                {/* Desktop Radial Layout */}
                <div className="hidden md:flex justify-center items-center gap-16 lg:gap-32 max-w-5xl mx-auto mt-16">
                    {/* Left Column */}
                    <div className="flex flex-col gap-20 w-1/3">
                        <ServiceItem title="Estética dental" icon={Sparkles} align="left" />
                        <ServiceItem title="Implantes" icon={Syringe} align="left" />
                        <ServiceItem title="Endodoncia" icon={Activity} align="left" />
                    </div>

                    {/* Center Graphic - Abstract Tooth representation using glowing emoji or icon */}
                    <div className="flex-shrink-0 relative w-64 h-64 flex items-center justify-center">
                        {/* Soft inner glow */}
                        <div className="absolute inset-0 bg-white/5 rounded-full blur-2xl"></div>
                        {/* Big tooth emoji styled to look premium */}
                        <span className="text-[120px] drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] relative z-10 animate-pulse-slow">
                            🦷
                        </span>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-32 w-1/3 mt-[-40px]">
                        {/* Offset to balance the visual weight against the 3 items on the left */}
                        <ServiceItem title="Odontopediatría" icon={Baby} align="right" />
                        <ServiceItem title="Prótesis" icon={Disc} align="right" />
                    </div>
                </div>

                {/* Mobile Grid Layout */}
                <div className="md:hidden grid grid-cols-1 gap-6 max-w-md mx-auto relative z-10">
                    {/* Central Tooth for mobile */}
                    <div className="flex justify-center mb-8">
                        <span className="text-8xl drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                            🦷
                        </span>
                    </div>

                    {[
                        { title: "Estética dental", icon: Sparkles },
                        { title: "Implantes", icon: Syringe },
                        { title: "Endodoncia", icon: Activity },
                        { title: "Odontopediatría", icon: Baby },
                        { title: "Prótesis", icon: Disc },
                    ].map((service, index) => (
                        <div key={index} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                            <div className="w-12 h-12 rounded-full border border-dashed border-accent/50 flex items-center justify-center bg-white/5">
                                <service.icon className="text-accent w-6 h-6" />
                            </div>
                            <span className="text-xl font-serif text-white">{service.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
