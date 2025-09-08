import { useEffect, useRef } from 'react';
import InfoCard from '../components/molecules/InfoCard';
import TestimonialCard from '../components/molecules/TestimonialCard';
import MainContent from '../components/organisms/MainContent';
import { testimonials } from '../utils/data/testimonials';

const About = () => {
    const testimonialRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = testimonialRef.current;
        if (!el) return;

        const onWheel = (e: WheelEvent) => {
            const atStart = el.scrollLeft === 0;
            const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth;

            const isTrackpad = Math.abs(e.deltaY) < 50;

            if ((e.deltaY > 0 && !atEnd) || (e.deltaY < 0 && !atStart)) {
                e.preventDefault();

                if (isTrackpad) {
                    el.scrollLeft += e.deltaY;
                } else {
                    el.scrollLeft += e.deltaY;
                }
            }
        };

        el.addEventListener('wheel', onWheel, { passive: false });
        return () => el.removeEventListener('wheel', onWheel);
    }, []);

    return (
        <MainContent title="About Me">
            {/* About Me */}
            <p className="text-apple-label-secondary text-lg">
                I am an individual full of enthusiasm for exploring new things, especially in technology. My experience and interest in innovation have
                broadened my horizons, while my analytical and problem-solving skills allow me to tackle challenges with confidence. I am always open to new
                learning and sharing knowledge with others, while my commitment to self-development and making positive contributions to the technology industry
                remains the main focus in every step I take.
            </p>

            {/* What I'm Doing */}
            <div>
                <h3 className="text-apple-label-primary mb-6 text-2xl font-bold">What I'm Doing</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <InfoCard
                        name="Palette"
                        className="hover:border-apple-blue hover:bg-apple-blue/25 items-start border border-transparent p-6 transition-all duration-300 hover:border"
                        title="Web Design"
                        titleClassName="text-apple-label-primary text-lg font-semibold mb-1"
                        description="The most modern and high-quality design made at a professional level."
                        descriptionClassName="text-base"
                    />
                    <InfoCard
                        name="Code"
                        className="hover:border-apple-blue hover:bg-apple-blue/25 items-start border border-transparent p-6 transition-all duration-300 hover:border"
                        title="Web Development"
                        titleClassName="text-apple-label-primary text-lg font-semibold mb-1"
                        description="High-quality development of sites at the professional level."
                        descriptionClassName="text-base"
                    />
                    <InfoCard
                        name="Smartphone"
                        className="hover:border-apple-blue hover:bg-apple-blue/25 items-start border border-transparent p-6 transition-all duration-300 hover:border md:col-span-2"
                        title="Mobile Apps Development"
                        titleClassName="text-apple-label-primary text-lg font-semibold mb-1"
                        description="Professional development of applications for iOS and Android."
                        descriptionClassName="text-base"
                    />
                </div>
            </div>

            {/* Testimonials */}
            <div>
                <h3 className="text-apple-label-primary mb-6 text-2xl font-bold">Testimonials</h3>
                <div ref={testimonialRef} className="scrollbar-none overflow-x-auto pb-6">
                    <div className="flex items-start gap-6">
                        {testimonials.map(testimonial => (
                            <TestimonialCard
                                cardClassName="hover:border-apple-blue hover:bg-apple-blue/25 border border-transparent transition-all duration-300 hover:border"
                                key={testimonial.name}
                                name={testimonial.name}
                                rating={testimonial.rating}
                                testimonial={testimonial.testimonial}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </MainContent>
    );
};

export default About;
