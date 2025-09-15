import React, { createContext, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import MainLayout from './components/templates/MainLayout';
import About from './pages/About';
import Resume from './pages/Resume';
import Project from './pages/Project';
import Certificate from './pages/Certificate';
import { projects } from './utils/data/projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';

export type AppState = {
    mail?: { subject: string; message: string } | null;
    scrollPadding: number;
};

export type AppContextType = AppState & {
    setGlobalValue: React.Dispatch<React.SetStateAction<AppState>>;
};

export const AppContext = createContext<AppContextType | null>(null);

const router = createBrowserRouter([
    {
        Component: MainLayout,
        children: [
            { index: true, Component: About },
            { path: '/resumes', Component: Resume },
            { path: '/projects', Component: Project },
            { path: '/certificates', Component: Certificate },
            { path: '/contact', Component: Contact },
        ],
    },
    {
        path: '/projects/:id',
        loader: async ({ params }) => {
            const project = projects.find(value => value.id === params.id);

            if (!project) throw new Response('Not Found', { status: 404 });

            return project;
        },
        Component: ProjectDetail,
    },
]);

const App = () => {
    const [globalValue, setGlobalValue] = useState<AppState>({
        mail: null,
        scrollPadding: 0
    });

    return (
        <AppContext.Provider value={{ ...globalValue, setGlobalValue }}>
            <RouterProvider router={router} />
        </AppContext.Provider>
    );
};

export default App;
