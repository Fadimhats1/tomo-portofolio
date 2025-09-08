import React from 'react';
import type { IProject } from '../../utils/data/projects';
import ImageCard from '../atoms/ImageCard';
import Badge from '../atoms/Badge';
import IconBadge from '../atoms/IconBadge';

interface CertificateCardProps extends IProject {
    onClick?: () => void;
}

const ProjectCard: React.FC<CertificateCardProps> = ({ onClick, ...data }) => {
    const techLen = data.technologies.length;

    const imageOverlay = (
        <div className="absolute inset-0 z-[4] flex items-center justify-center gap-4 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <IconBadge
                name="ExternalLink"
                wrapperClassName="bg-apple-blue rounded-full hover:bg-apple-blue/70 transition-all"
                className="text-apple-label-primary font-medium"
            />

            <IconBadge
                name="Github"
                wrapperClassName="bg-apple-blue rounded-full hover:bg-apple-blue/70 transition-all"
                className="text-apple-label-primary font-medium"
            />
        </div>
    );

    return (
        <ImageCard
            cardClassName="hover:scale-102 transition-all duration-300 group cursor-pointer"
            image={data.galeries[0]}
            imgWrapperClassName="group-hover:scale-105 transition-all duration-300"
            alt={data.name}
            imageOverlay={imageOverlay}
            onClick={onClick}
        >
            <h4 className="text-apple-label-primary group-hover:text-apple-blue line-clamp-1 text-lg font-semibold transition-colors">{data.name}</h4>
            <p className="text-apple-blue text-sm font-medium">{data.category}</p>
            <p className="text-apple-label-secondary mb-1.5 line-clamp-3 text-sm">{data.overview}</p>
            <div className="flex flex-wrap gap-2">
                {data.technologies.slice(0, 3).map(value => (
                    <Badge key={value} className="px-3 py-1 text-xs font-medium">
                        {value}
                    </Badge>
                ))}
                {techLen > 3 && (
                    <Badge key="plus" className="px-3 py-1 text-xs font-medium">
                        +{techLen - 3}
                    </Badge>
                )}
            </div>
        </ImageCard>
    );
};

export default ProjectCard;
