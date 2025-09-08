import avatar from '../../assets/images/apple-emoji.png';
import InfoCard from '../molecules/InfoCard';
import IconBadge from '../atoms/IconBadge';
import Badge from '../atoms/Badge';

const Sidebar = () => {
    return (
        <nav className="bg-apple-gray5 border-e-apple-gray4 fixed top-0 z-20 hidden h-full w-80 border-e lg:block">
            <div className="mx-auto max-w-[1536px]">
                <div className="scrollbar-none flex h-screen w-80 flex-col items-center gap-4 overflow-y-auto p-8">
                    {/* Avatar */}
                    <div className="bg-apple-label-primary rounded-3xl p-1">
                        <img src={avatar} alt="Avatar" className="aspect-square w-30 translate-x-1" />
                    </div>

                    {/* User Info Card */}
                    <div className="mt-2 flex flex-col items-center gap-3">
                        <h1 className="text-apple-text-primary text-xl font-semibold">Fathariq Dimas | Tomo</h1>
                        <Badge variant="secondary" className="rounded-lg">
                            Frontend Developer
                        </Badge>
                    </div>

                    {/* Cards */}
                    <InfoCard className="bg-apple-gray4 mt-2" name="Mail" title="EMAIL" description="Fadimhats1@gmail.com" />
                    <InfoCard className="bg-apple-gray4" name="Phone" title="PHONE" description="+62 851 - 7168 - 6824" />
                    <InfoCard className="bg-apple-gray4" name="Calendar" title="BIRTHDAY" description="October 13, 2000" />
                    <InfoCard className="bg-apple-gray4" name="MapPin" title="LOCATION" description="Tangerang - Banten, Indonesia" />

                    {/* Social Media */}
                    <div className="flex gap-3">
                        <IconBadge name="Facebook" wrapperClassName="bg-apple-gray4" className="text-apple-label-secondary" />
                        <IconBadge name="Twitter" wrapperClassName="bg-apple-gray4" className="text-apple-label-secondary" />
                        <IconBadge name="Instagram" wrapperClassName="bg-apple-gray4" className="text-apple-label-secondary" />
                        <IconBadge name="Linkedin" wrapperClassName="bg-apple-gray4" className="text-apple-label-secondary" />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
