import React, { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import MainContent from '../components/organisms/MainContent';
import { useWindowWidth } from '../hooks/useWindowWidth';
import type { FilterInfo } from './Project';
import Button from '../components/atoms/Button';
import { certificates, CERTIFICATES_CATEGORIES, type CertificateCategory } from '../utils/data/certificates';
import CertificateCard from '../components/molecules/CertificateCard';
import { ChevronLeft, ChevronRight, Download, ExternalLink } from 'lucide-react';
import Modal from '../components/organisms/Modal';
import SafeImage from '../components/atoms/SafeImage';
import Badge from '../components/atoms/Badge';
import clsx from 'clsx';

const Certificate = () => {
    const width = useWindowWidth();
    const isMobile = width < 640;

    const [filterInfo, setFilterInfo] = useState<Omit<FilterInfo<CertificateCategory>, 'search'>>({
        selectedCategory: 'All',
        currentIndex: 1,
        pageSize: 6,
        visibleCount: 6,
    });

    const [selectedId, setSelectedId] = useState<string | null>(null);

    // Filter certificates
    const filteredCertificates = useMemo(() => {
        return certificates.filter(cert => filterInfo.selectedCategory === 'All' || cert.category === filterInfo.selectedCategory);
    }, [filterInfo.selectedCategory]);

    // Modal data
    const selectedCertificate = filteredCertificates.find(c => c.id === selectedId);

    // Pagination (desktop)
    const totalPages = Math.ceil(filteredCertificates.length / filterInfo.pageSize);
    const pagedCertificates = filteredCertificates.slice((filterInfo.currentIndex - 1) * filterInfo.pageSize, filterInfo.currentIndex * filterInfo.pageSize);

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
                        visibleCount: Math.min(prev.visibleCount + 4, filteredCertificates.length),
                    }));
                }
            });
            if (node) observer.current.observe(node);
        },
        [isMobile, filteredCertificates.length]
    );

    return (
        <MainContent title="Certificates">
            {/* Category Filter */}
            <div className="scrollbar-none overflow-x-auto">
                <div className="flex items-center gap-4">
                    {(['All', ...CERTIFICATES_CATEGORIES] as const).map(value => (
                        <Button
                            key={value}
                            size="md"
                            className="text-sm"
                            variant={value === filterInfo.selectedCategory ? 'primary' : 'outline'}
                            onClick={() => {
                                setFilterInfo(prev => ({
                                    ...prev,
                                    selectedCategory: value,
                                    currentIndex: 1,
                                    visibleCount: 6,
                                }));
                            }}
                        >
                            {value}
                        </Button>
                    ))}
                </div>
            </div>

            <div className={clsx('flex-1', !(pagedCertificates.length > 0) && 'flex items-center justify-center')}>
                {/* Certificate Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:grid-rows-2 md:gap-8 xl:grid-cols-3">
                    {(isMobile ? filteredCertificates.slice(0, filterInfo.visibleCount) : pagedCertificates).map((certificate, index, arr) => {
                        const isLast = index === arr.length - 1;

                        return (
                            <div key={certificate.id} ref={isMobile && isLast ? lastCardRef : null}>
                                <CertificateCard {...certificate} onClick={() => setSelectedId(certificate.id)} />
                            </div>
                        );
                    })}
                </div>

                {/* Pagination (desktop only) */}
                {!isMobile && pagedCertificates.length > 0 && (
                    <div className="mt-6 flex items-center justify-center gap-2">
                        {/* Prev Button */}
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

                        {/* Page Numbers */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter(page => page === 1 || page === totalPages || (page >= filterInfo.currentIndex - 1 && page <= filterInfo.currentIndex + 1))
                            .map((page, idx, arr) => (
                                <React.Fragment key={page}>
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

                        {/* Next Button */}
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

            {/* Modal */}
            <Modal
                isOpen={!!selectedCertificate}
                onClose={() => setSelectedId(null)}
                title={selectedCertificate?.name || ''}
                footer={
                    <div className="flex items-center justify-center gap-4">
                        <Button className="flex-1 rounded-lg px-3 py-2 text-sm">
                            <div className="flex items-center gap-3">
                                <ExternalLink size={18} />
                                <p>Verify Online</p>
                            </div>
                        </Button>
                        <Button variant="secondary" className="flex-1 rounded-lg px-3 py-2 text-sm">
                            <div className="flex items-center gap-3">
                                <Download size={18} />
                                <p>Download PDF</p>
                            </div>
                        </Button>
                    </div>
                }
            >
                {selectedCertificate && (
                    <div className="bg-apple-gray5 flex flex-col gap-4 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold">{selectedCertificate.issuer}</h3>
                            <div className="flex flex-col items-end">
                                <p className="text-apple-label-tertiary text-sm">Issued</p>
                                <p className="text-apple-label-primary text-sm">{selectedCertificate.startDate}</p>
                            </div>
                        </div>
                        <SafeImage wrapperClassName="h-64" className="rounded-lg" src={selectedCertificate.image} alt={selectedCertificate.name} />
                        <div className="flex flex-col gap-4">
                            <div>
                                <h4 className="text-apple-label-primary mb-1 font-medium">Description</h4>
                                <p className="text-apple-label-secondary text-sm">{selectedCertificate.description}</p>
                            </div>
                            <div>
                                <h4 className="text-apple-label-primary mb-1 font-medium">Credential ID</h4>
                                <p className="text-apple-label-secondary text-sm font-semibold">{selectedCertificate.code}</p>
                            </div>
                            <div>
                                <h4 className="text-apple-label-primary mb-1 font-medium">Category</h4>
                                <Badge className="border-apple-blue border px-2 py-0.5 text-xs font-semibold">{selectedCertificate.category}</Badge>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </MainContent>
    );
};

export default Certificate;
