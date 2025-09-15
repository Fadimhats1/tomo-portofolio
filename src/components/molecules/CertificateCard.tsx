import React from 'react';
import ImageCard from '../atoms/ImageCard';
import type { ICertificate } from '../../utils/data/certificates';
import { Award, Calendar, ExternalLink, Shield } from 'lucide-react';
import Button from '../atoms/Button';

interface CertificateCardProps extends ICertificate {
    onClick?: () => void;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ onClick, ...data }) => {
    const imageOverlay = (
        <>
            <Award size={24} className="text-apple-blue absolute top-4 right-4 z-[4]" />
        </>
    );

    return (
        <ImageCard
            cardProps={{ className: 'hover:scale-102 transition-all duration-300 group cursor-pointer', onClick: onClick }}
            imageProps={{ src: data.image, alt: data.name }}
            imageWrapperProps={{ className: 'group-hover:scale-105 transition-all duration-300' }}
            imageOverlay={imageOverlay}
            containerProps={{ className: 'justify-between h-full' }}
        >
            <div className="flex flex-col gap-1.5">
                <div className="text-apple-label-tertiary mb-1 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <p className="text-xs font-medium">{data.startDate}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Shield size={14} />
                        <p className="line-clamp-1 text-xs font-medium">{data.code}</p>
                    </div>
                </div>
                <h4 className="text-apple-label-primary group-hover:text-apple-blue line-clamp-1 text-lg font-semibold transition-colors">{data.name}</h4>
                <p className="text-apple-label-secondary mb-1 text-sm font-semibold">{data.issuer}</p>
                <p className="text-apple-label-secondary line-clamp-3 text-sm">{data.description}</p>
            </div>

            <Button variant="secondary" className="group-hover:text-apple-blue group-hover:border-apple-blue hover:border-apple-blue mt-2 rounded-lg text-sm">
                <div className="flex items-center gap-3">
                    <ExternalLink size={18} />
                    <p>Live Demo</p>
                </div>
            </Button>
        </ImageCard>
    );
};

export default CertificateCard;
