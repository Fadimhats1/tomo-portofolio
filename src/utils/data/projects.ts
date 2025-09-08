export const PROJECT_CATEGORIES = ['Web Development', 'Mobile Application', 'UI/UX Design', 'API'] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export type Technology =
    | 'React.js'
    | 'TypeScript'
    | 'JavaScript'
    | 'PHP'
    | 'Laravel'
    | 'Go'
    | 'Swift'
    | 'UIKit'
    | 'SwiftUI'
    | 'Android'
    | 'Jetpack Compose'
    | 'Next.js'
    | 'Springboot'
    | 'Java'
    | 'Tailwind CSS'
    | 'Framer Motion'
    | 'Node.js';

export type ProjectStatus = 'Complete' | 'Ongoing' | 'Pending';

export interface IProject {
    id: string;
    name: string;
    category: ProjectCategory;
    overview: string;
    liveDemo?: string;
    sourceURL: string;
    technologies: Technology[];
    client: string;
    duration?: string;
    status: ProjectStatus;
    keyFeatures: string[];
    galeries: string[];
}

export const projects: IProject[] = [
    {
        id: 'proj-1',
        name: 'E-Commerce Platform',
        category: 'Web Development',
        overview: 'A scalable e-commerce platform with multi-vendor support and real-time inventory management.',
        liveDemo: 'https://ecommerce-demo.com',
        sourceURL: 'https://github.com/yourname/ecommerce-platform',
        technologies: ['React.js', 'TypeScript', 'Next.js', 'Tailwind CSS'],
        client: 'ShopX',
        duration: '6 months',
        status: 'Complete',
        keyFeatures: ['Multi-vendor support', 'Integrated Stripe payments', 'Real-time product availability', 'SEO optimized with Next.js'],
        galeries: [
            'https://images.unsplash.com/photo-1755380749576-c2372cc487a7?q=80&w=987&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1755380749576-c2372cc487a7?q=80&w=987&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1755380749576-c2372cc487a7?q=80&w=987&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1755380749576-c2372cc487a7?q=80&w=987&auto=format&fit=crop',
        ],
    },
    {
        id: 'proj-2',
        name: 'Mobile Banking App',
        category: 'Mobile Application',
        overview: 'A secure mobile banking app with biometric login, fund transfers, and real-time notifications.',
        sourceURL: 'https://github.com/yourname/mobile-banking',
        technologies: ['Swift', 'SwiftUI', 'Android', 'Jetpack Compose'],
        client: 'FinBank',
        duration: '8 months',
        status: 'Complete',
        keyFeatures: ['Biometric authentication', 'Cross-platform support', 'Bill payments and transfers', 'Transaction alerts'],
        galeries: ['https://images.unsplash.com/photo-1756745679685-cb39adaf511b?q=80&w=1674&auto=format&fit=crop'],
    },
    {
        id: 'proj-3',
        name: 'UI/UX Design System',
        category: 'UI/UX Design',
        overview: 'Reusable design system with accessible components and animated interactions.',
        sourceURL: 'https://github.com/yourname/design-system',
        technologies: ['React.js', 'Tailwind CSS', 'Framer Motion'],
        client: 'CloudSaaS',
        status: 'Ongoing',
        keyFeatures: ['Atomic design principles', 'Accessible components', 'Customizable theming', 'Framer Motion animations'],
        galeries: ['https://images.unsplash.com/photo-1757074757417-277a22105bc0?q=80&w=1035&auto=format&fit=crop'],
    },
    {
        id: 'proj-4',
        name: 'Logistics API',
        category: 'API',
        overview: 'A logistics API providing shipment tracking and route optimization.',
        sourceURL: 'https://github.com/yourname/logistics-api',
        technologies: ['Go', 'Java', 'Springboot'],
        client: 'LogiTrack',
        duration: '5 months',
        status: 'Complete',
        keyFeatures: ['Shipment tracking', 'Route optimization', 'REST + GraphQL endpoints'],
        galeries: ['https://images.unsplash.com/photo-1757074757417-277a22105bc0?q=80&w=1035&auto=format&fit=crop'],
    },
    {
        id: 'proj-5',
        name: 'Portfolio Website',
        category: 'Web Development',
        overview: 'Personal portfolio showcasing projects with animations and responsive design.',
        liveDemo: 'https://portfolio-demo.com',
        sourceURL: 'https://github.com/yourname/portfolio',
        technologies: ['React.js', 'Tailwind CSS', 'Framer Motion'],
        client: 'Freelancer',
        duration: '3 months',
        status: 'Complete',
        keyFeatures: ['Dark/Light mode', 'Smooth animations', 'SEO optimization'],
        galeries: ['https://images.unsplash.com/photo-1755371034010-51c25321312d?q=80&w=2070&auto=format&fit=crop'],
    },
    {
        id: 'proj-6',
        name: 'Restaurant Ordering App',
        category: 'Mobile Application',
        overview: 'Mobile app for online restaurant ordering with live kitchen tracking.',
        sourceURL: 'https://github.com/yourname/restaurant-app',
        technologies: ['React.js', 'TypeScript', 'SwiftUI'],
        client: 'Foodiez',
        duration: '6 months',
        status: 'Complete',
        keyFeatures: ['Live order tracking', 'Push notifications', 'Secure payment gateway'],
        galeries: ['https://images.unsplash.com/photo-1755380749576-c2372cc487a7?q=80&w=987&auto=format&fit=crop'],
    },
    {
        id: 'proj-7',
        name: 'Healthcare Dashboard',
        category: 'Web Development',
        overview: 'Dashboard for hospitals to manage patient records and appointments.',
        sourceURL: 'https://github.com/yourname/healthcare-dashboard',
        technologies: ['React.js', 'TypeScript', 'Laravel'],
        client: 'MediCare',
        status: 'Ongoing',
        keyFeatures: ['Patient record management', 'Appointment scheduling', 'Data visualization'],
        galeries: ['https://images.unsplash.com/photo-1756745679685-cb39adaf511b?q=80&w=1674&auto=format&fit=crop'],
    },
    {
        id: 'proj-8',
        name: 'Travel Booking API',
        category: 'API',
        overview: 'API for travel agencies providing flight and hotel booking services.',
        sourceURL: 'https://github.com/yourname/travel-booking-api',
        technologies: ['JavaScript', 'Node.js', 'Go'],
        client: 'TravelHub',
        duration: '7 months',
        status: 'Complete',
        keyFeatures: ['Flight search', 'Hotel reservations', 'Payment integration'],
        galeries: ['https://images.unsplash.com/photo-1757074757417-277a22105bc0?q=80&w=1035&auto=format&fit=crop'],
    },
    {
        id: 'proj-9',
        name: 'Fitness Tracker',
        category: 'Mobile Application',
        overview: 'App to track workouts, calories, and provide personalized fitness plans.',
        sourceURL: 'https://github.com/yourname/fitness-tracker',
        technologies: ['Swift', 'UIKit', 'Android'],
        client: 'FitPro',
        status: 'Pending',
        keyFeatures: ['Workout tracking', 'Calorie counter', 'Personalized fitness plans'],
        galeries: ['https://images.unsplash.com/photo-1755380749576-c2372cc487a7?q=80&w=987&auto=format&fit=crop'],
    },
    {
        id: 'proj-10',
        name: 'Project Management Tool',
        category: 'Web Development',
        overview: 'Tool for managing projects with Kanban boards and real-time collaboration.',
        sourceURL: 'https://github.com/yourname/project-management',
        technologies: ['React.js', 'Next.js', 'Laravel'],
        client: 'WorkFlowX',
        duration: '10 months',
        status: 'Complete',
        keyFeatures: ['Kanban boards', 'Real-time chat', 'Task assignment'],
        galeries: ['https://images.unsplash.com/photo-1757023177496-131ded651c01?q=80&w=2070&auto=format&fit=crop'],
    },
    {
        id: 'proj-11',
        name: 'Online Learning Platform',
        category: 'Web Development',
        overview: 'Platform offering online courses with quizzes and progress tracking.',
        sourceURL: 'https://github.com/yourname/learning-platform',
        technologies: ['React.js', 'TypeScript', 'PHP', 'Laravel'],
        client: 'EduMax',
        duration: '9 months',
        status: 'Complete',
        keyFeatures: ['Course management', 'Interactive quizzes', 'Student progress tracking'],
        galeries: ['https://images.unsplash.com/photo-1756745679685-cb39adaf511b?q=80&w=1674&auto=format&fit=crop'],
    },
    {
        id: 'proj-12',
        name: 'Chat Application',
        category: 'Mobile Application',
        overview: 'Real-time chat application with group messaging and media sharing.',
        sourceURL: 'https://github.com/yourname/chat-app',
        technologies: ['React.js', 'SwiftUI', 'Android'],
        client: 'Talkify',
        duration: '4 months',
        status: 'Complete',
        keyFeatures: ['Group messaging', 'Media file sharing', 'Push notifications'],
        galeries: ['https://images.unsplash.com/photo-1757074757417-277a22105bc0?q=80&w=1035&auto=format&fit=crop'],
    },
];
