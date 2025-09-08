import Button from '../components/atoms/Button';
import { ChevronLeft, Calendar, Clock, ExternalLink, Github, User } from 'lucide-react';
import Badge from '../components/atoms/Badge';
import SafeImage from '../components/atoms/SafeImage';
import CardContainer from '../components/atoms/CardContainer';
import type { IProject } from '../utils/data/projects';
import { useLoaderData, useNavigate } from 'react-router';

const ProjectDetail = () => {
    const data = useLoaderData() as IProject;
    const navigate = useNavigate();

    const backToProjects = () => {
        navigate(`/projects`);
    };

    return (
        <div className="bg-apple-gray6 min-h-screen">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12">
                <Button onClick={backToProjects} size="sm" variant="outline" className="w-fit rounded-lg py-2 ps-3 pe-4">
                    <div className="flex items-center gap-2">
                        <ChevronLeft size={18} />
                        <p>Back to Projects</p>
                    </div>
                </Button>
                <div className="flex flex-wrap items-center justify-between gap-6">
                    <div>
                        <h1 className="text-apple-label-primary mb-4 text-4xl font-bold">{data.name}</h1>
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2">
                                <User size={16} className="text-apple-label-secondary" />
                                <p className="text-apple-label-secondary text-sm">{data.client}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={16} className="text-apple-label-secondary" />
                                <p className="text-apple-label-secondary text-sm">{data.duration}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-apple-label-secondary" />
                                <Badge className="border-apple-blue border px-2 py-0.5 text-xs font-bold">{data.category}</Badge>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Button className="rounded-lg px-3 py-2 text-sm sm:px-4">
                            <div className="flex items-center gap-2">
                                <ExternalLink size={18} />
                                <p>Live Demo</p>
                            </div>
                        </Button>
                        <Button variant="outline" className="rounded-lg px-3 py-2 text-sm sm:px-4">
                            <div className="flex items-center gap-2">
                                <Github size={18} />
                                <p>View Code</p>
                            </div>
                        </Button>
                    </div>
                </div>
                <SafeImage src={data.galeries[0]} wrapperClassName="h-96" className="h-96 rounded-xl" />
                <div className="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-3">
                    <div className="flex flex-col gap-8 lg:col-span-2">
                        <div>
                            <h2 className="text-apple-label-primary mb-3 text-2xl font-bold">Project Overview</h2>
                            <p className="text-apple-label-secondary">{data.overview}</p>
                        </div>
                        <div>
                            <h2 className="text-apple-label-primary mb-3 text-2xl font-bold">Key Features</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {data.keyFeatures.map((value, index) => (
                                    <CardContainer key={`key-feat-${index}`}>
                                        <div className="flex items-center gap-3">
                                            <span className="bg-apple-blue h-2 w-2 rounded-full"></span>
                                            <p className="text-apple-label-primary font-medium">{value}</p>
                                        </div>
                                    </CardContainer>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-apple-label-primary mb-3 text-2xl font-bold">Project Gallery</h2>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {data.galeries.map((value, index) => (
                                    <SafeImage key={`gallery-${index}`} src={value} wrapperClassName="h-64" className="h-64 rounded-xl" />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <CardContainer className="p-6">
                            <div>
                                <h3 className="text-apple-label-primary mb-3 text-lg font-semibold">Technologies Used</h3>
                                <div className="flex flex-wrap gap-2">
                                    {data.technologies.map((value, index) => (
                                        <Badge key={`tech-${index}`} className="border-apple-blue border px-2 py-0.5 text-xs font-bold">
                                            {value}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </CardContainer>
                        <CardContainer className="p-6">
                            <div>
                                <h3 className="text-apple-label-primary mb-4 text-lg font-semibold">Project Details</h3>
                                <div className="flex flex-col gap-3">
                                    <div>
                                        <p className="text-apple-label-secondary text-sm">Category</p>
                                        <h4 className="text-apple-label-primary font-medium">{data.category}</h4>
                                    </div>
                                    <div>
                                        <p className="text-apple-label-secondary text-sm">Client</p>
                                        <h4 className="text-apple-label-primary font-medium">{data.client}</h4>
                                    </div>
                                    <div>
                                        <p className="text-apple-label-secondary text-sm">Duration</p>
                                        <h4 className="text-apple-label-primary font-medium">{data.duration}</h4>
                                    </div>
                                </div>
                            </div>
                        </CardContainer>
                        <CardContainer className="border-apple-fill-primary bg-apple-gray6 border p-6">
                            <div className="flex-1">
                                <h3 className="text-apple-label-primary mb-3 text-lg font-semibold">Like this Project?</h3>
                                <p className="text-apple-label-secondary mb-3 text-sm">Let's discuss how I can help bring your ideas to life.</p>
                                <Button className="bg-apple-white text-apple-blue hover:bg-apple-white/90 w-full rounded-lg text-sm">Get In Touch</Button>
                            </div>
                        </CardContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
