export interface Testimonial {
    name: string;
    rating: number;
    testimonial: string;
    image?: string; // optional, can be used for avatar
}

export const testimonials: Testimonial[] = [
    {
        name: 'Tomoya Aki',
        rating: 5,
        testimonial: 'Tomoya helped us build a corporate identity from scratch. His professionalism and creativity exceeded our expectations.',
        // image: '/avatars/tomoya.png',
    },
    {
        name: 'Sakuya Tanaka',
        rating: 4,
        testimonial: 'Sakuya contributed to the web development project efficiently. Highly recommended for front-end solutions.',
        // image: '/avatars/sakuya.png',
    },
    {
        name: 'Richard Johnson',
        rating: 5,
        testimonial: 'Richard was hired to create a mobile app for our startup. He delivered high-quality results on time and communicated clearly throughout.',
        // image: '/avatars/richard.png',
    },
    {
        name: 'Aiko Yamamoto',
        rating: 5,
        testimonial: 'Aiko provided excellent UI/UX design services. Her attention to detail and modern design sense really improved our product.',
        // image: '/avatars/aiko.png',
    },
    {
        name: 'Kenji Nakamura',
        rating: 4,
        testimonial: 'Kenji worked on our backend APIs and integrations. He’s reliable, and his code is clean and maintainable.',
        // image: '/avatars/kenji.png',
    },
];
