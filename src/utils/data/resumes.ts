export interface ExperienceRecord {
    role: string;
    startYear: number;
    endYear: number;
}

export interface InnerDataRecord {
    role: string;
    startYear: number;
    endYear: number;
}

export interface ResumeItem {
    title: string;
    startYear: number;
    endYear?: number;
    gpa?: string;
    records: string[] | Record<string, ExperienceRecord[]>;
}

// Education Data
export const educationData: ResumeItem[] = [
    {
        title: 'University of Technology',
        startYear: 2018,
        endYear: 2022,
        gpa: '3.87',
        records: [
            'Bachelor in Computer Science with focus on Web Development',
            'President of Coding Club, organized annual tech events',
            'Completed final year thesis on Progressive Web Apps',
        ],
    },
    {
        title: 'Advanced Design Bootcamp',
        startYear: 2021,
        endYear: 2021,
        records: ['Intensive 3-month program focused on UI/UX design and prototyping'],
    },
    {
        title: 'High School Of Art And Design',
        startYear: 2015,
        endYear: 2018,
        records: {
            organizations: [
                { role: 'Leader of Japanese Club', startYear: 2016, endYear: 2017 },
                { role: 'Member of Computer Club', startYear: 2015, endYear: 2017 },
            ],
        },
    },
];

// Experience Data
export const experienceData: ResumeItem[] = [
    {
        title: 'UI/UX Designer at Creative Studio',
        startYear: 2022,
        records: ['Designing interactive prototypes for web and mobile apps', 'Conducting user research and usability testing', 'Mentoring junior designers'],
    },
    {
        title: 'Freelance Frontend Developer',
        startYear: 2020,
        records: {
            clients: [
                { role: 'Portfolio Websites for Designers', startYear: 2022, endYear: 2023 },
                { role: 'E-commerce Platform', startYear: 2021, endYear: 2022 },
                { role: 'Local Business Website', startYear: 2020, endYear: 2021 },
            ],
        },
    },
    {
        title: 'Frontend Developer at ABC Tech',
        startYear: 2019,
        records: [
            'Developed responsive web apps with React and TypeScript',
            'Collaborated with UI/UX designers to implement modern interfaces',
            'Improved site performance and SEO optimization',
        ],
    },
    {
        title: 'Intern at XYZ Corp',
        startYear: 2018,
        endYear: 2019,
        records: {
            projects: [
                { role: 'Automation Tools Development', startYear: 2018, endYear: 2019 },
                { role: 'Internal Dashboard Developer', startYear: 2018, endYear: 2018 },
            ],
        },
    },
];
