import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import MainContent from '../components/organisms/MainContent';
import InputText from '../components/atoms/InputText';
import Button from '../components/atoms/Button';
import { PROJECT_CATEGORIES, projects, type ProjectCategory } from '../utils/data/projects';
import { useWindowWidth } from '../hooks/useWindowWidth';
import ProjectCard from '../components/molecules/ProjectCard';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useNavigate } from 'react-router';
import clsx from 'clsx';

export interface FilterInfo<TCategory extends string> {
    search: string;
    selectedCategory: 'All' | TCategory;
    currentIndex: number;
    pageSize: number;
    visibleCount: number; // Mobile only for infinite scroll
}
const Project = () => {
    const width = useWindowWidth();
    const isMobile = width < 640;

    const navigate = useNavigate();

    const [filterInfo, setFilterInfo] = useState<FilterInfo<ProjectCategory>>({
        search: '',
        selectedCategory: 'All',
        currentIndex: 1,
        pageSize: 6,
        visibleCount: 6,
    });

    // Filter certificates
    const filteredProjects = useMemo(() => {
        return projects.filter(project => {
            const categoryMatch = filterInfo.selectedCategory === 'All' || project.category === filterInfo.selectedCategory;
            const searchMatch = project.name.toLowerCase().includes(filterInfo.search.toLowerCase());

            return categoryMatch && searchMatch;
        });
    }, [filterInfo.search, filterInfo.selectedCategory]);

    // Pagination (desktop)
    const totalPages = Math.ceil(filteredProjects.length / filterInfo.pageSize);
    const pagedProjects = filteredProjects.slice((filterInfo.currentIndex - 1) * filterInfo.pageSize, filterInfo.currentIndex * filterInfo.pageSize);

    // Adjust page size based on screen width
    useEffect(() => {
        const pageSize = width >= 1280 ? 6 : 4;

        setFilterInfo(prev => ({
            ...prev,
            currentIndex: 1,
            pageSize,
            visibleCount: 6,
        }));
    }, [width]);

    // Infinite scroll logic (mobile only)
    const observer = useRef<IntersectionObserver | null>(null);
    const lastCardRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (!isMobile) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    setFilterInfo(prev => ({
                        ...prev,
                        visibleCount: Math.min(prev.visibleCount + 4, filteredProjects.length),
                    }));
                }
            });
            if (node) observer.current.observe(node);
        },
        [isMobile, filteredProjects.length]
    );

    const navigation = (id: string) => {
        navigate(`/projects/${id}`);
    };

    return (
        <MainContent title="Projects">
            {/* Search Input */}
            <InputText
                id="input-search"
                value={filterInfo.search}
                placeholder="Search projects..."
                leftElement={<Search size={20} className="text-apple-label-secondary" />}
                onChange={e =>
                    setFilterInfo({
                        ...filterInfo,
                        search: e.target.value,
                        currentIndex: 1,
                    })
                }
            />

            {/* Category */}
            <div className="scrollbar-none overflow-x-auto">
                <div className="flex items-center gap-4">
                    {(['All', ...PROJECT_CATEGORIES] as const).map(value => (
                        <Button
                            key={value}
                            size="md"
                            className="text-sm"
                            variant={value === filterInfo.selectedCategory ? 'primary' : 'outline'}
                            onClick={() =>
                                setFilterInfo({
                                    ...filterInfo,
                                    selectedCategory: value,
                                    currentIndex: 1,
                                })
                            }
                        >
                            {value}
                        </Button>
                    ))}
                </div>
            </div>

            <div className={clsx('flex-1', !(pagedProjects.length > 0) && 'flex items-center justify-center')}>
                {/* Project Card */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:grid-rows-2 md:gap-8 xl:grid-cols-3">
                    {pagedProjects.length > 0 ? (
                        (isMobile ? filteredProjects.slice(0, filterInfo.visibleCount) : pagedProjects).map((project, index, arr) => {
                            const isLast = index === arr.length - 1;

                            return (
                                <div key={project.id} ref={isMobile && isLast ? lastCardRef : null}>
                                    <ProjectCard {...project} onClick={() => navigation(project.id)} />
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-span-full row-span-full flex flex-col items-center justify-center text-center text-gray-500">
                            <p className="mb-2 text-xl font-medium">No projects found.</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {!isMobile && pagedProjects.length > 0 && (
                    <div className="mt-6 flex items-center justify-center gap-2">
                        {/* Prev button */}
                        <Button
                            size="sm"
                            variant="outline"
                            disabled={filterInfo.currentIndex === 1}
                            className="w-fit rounded-lg py-2 ps-3 pe-4"
                            onClick={() =>
                                setFilterInfo(prev => ({
                                    ...prev,
                                    currentIndex: prev.currentIndex - 1,
                                }))
                            }
                        >
                            <div className="flex items-center gap-2">
                                <ChevronLeft size={18} />
                                <p>Previous</p>
                            </div>
                        </Button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter(page => {
                                return page === 1 || page === totalPages || (page >= filterInfo.currentIndex - 1 && page <= filterInfo.currentIndex + 1);
                            })
                            .map((page, idx, arr) => (
                                <React.Fragment key={page}>
                                    {/* Show ellipsis if skipped */}
                                    {idx > 0 && arr[idx] - arr[idx - 1] > 1 && <span className="text-apple-label-primary px-2">...</span>}

                                    <Button
                                        size="sm"
                                        variant={page === filterInfo.currentIndex ? 'primary' : 'outline'}
                                        className="w-fit rounded-lg px-4 py-2"
                                        onClick={() =>
                                            setFilterInfo(prev => ({
                                                ...prev,
                                                currentIndex: page,
                                            }))
                                        }
                                    >
                                        {page}
                                    </Button>
                                </React.Fragment>
                            ))}

                        {/* Next button */}
                        <Button
                            size="sm"
                            variant="outline"
                            disabled={filterInfo.currentIndex >= totalPages}
                            className="w-fit rounded-lg py-2 ps-4 pe-3"
                            onClick={() =>
                                setFilterInfo(prev => ({
                                    ...prev,
                                    currentIndex: prev.currentIndex + 1,
                                }))
                            }
                        >
                            <div className="flex items-center gap-2">
                                <p>Next</p>
                                <ChevronRight size={18} />
                            </div>
                        </Button>
                    </div>
                )}
            </div>
        </MainContent>
    );
};

export default Project;
