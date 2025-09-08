import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import MainLayout from './components/templates/MainLayout.tsx';
import About from './pages/About.tsx';
import Resume from './pages/Resume.tsx';
import Project from './pages/Project.tsx';
import Contact from './pages/Contact.tsx';
import ProjectDetail from './pages/ProjectDetail.tsx';
import { projects } from './utils/data/projects.ts';
import Certificate from './pages/Certificate.tsx';

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

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
