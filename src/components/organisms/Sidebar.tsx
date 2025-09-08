import avatar from '../../assets/images/apple-emoji.png';
import InfoCard from '../molecules/InfoCard';
import IconBadge from '../atoms/IconBadge';
import Badge from '../atoms/Badge';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../App';

const Sidebar = () => {
    const appContext = useContext(AppContext);

    const handleCopy = async (text: string) => {
        if (!appContext) return;

        try {
            await navigator.clipboard.writeText(text);

            appContext.setGlobalValue(prev => ({
                ...prev,
                copyState: 'onShow',
            }));

            setTimeout(() => {
                appContext.setGlobalValue(prev => ({
                    ...prev,
                    copyState: 'onHide',
                }));
            }, 1500);
        } catch (err) {
            console.error('Failed to copy!', err);
        }
    };

    useEffect(() => {
        let timer: number;
        if (appContext?.copyState === 'onShow') {
            timer = setTimeout(() => {
                appContext.setGlobalValue(prev => ({
                    ...prev,
                    copyState: 'show',
                }));
            }, 10);
        } else if (appContext?.copyState === 'onHide') {
            timer = setTimeout(() => {
                appContext.setGlobalValue(prev => ({
                    ...prev,
                    copyState: 'hide',
                }));
            }, 300);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [appContext?.copyState]);

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
                    <InfoCard
                        onClickDescription={() => handleCopy('Fadimhats1@gmail.com')}
                        className="bg-apple-gray4 mt-2"
                        name="Mail"
                        title="EMAIL"
                        descriptionClassName="cursor-pointer"
                        description="Fadimhats1@gmail.com"
                    />
                    <InfoCard
                        onClickDescription={() => handleCopy('+6285171686824')}
                        className="bg-apple-gray4"
                        name="Phone"
                        title="PHONE"
                        descriptionClassName="cursor-pointer"
                        description="+62 851 - 7168 - 6824"
                    />
                    <InfoCard className="bg-apple-gray4" name="Calendar" title="BIRTHDAY" description="October 13, 2000" />
                    <InfoCard className="bg-apple-gray4" name="MapPin" title="LOCATION" description="Tangerang - Banten, Indonesia" />

                    {/* Social Media */}
                    <div className="flex gap-3">
                        <IconBadge
                            to="https://www.facebook.com/share/19cuNTE4gU/?mibextid=wwXIfr"
                            external
                            name="Facebook"
                            wrapperClassName="group bg-apple-gray4 hover:border-apple-blue hover:bg-apple-blue/25 border border-transparent transition-all duration-300 hover:border"
                            className="text-apple-label-secondary group-hover:text-apple-blue transition-all duration-300"
                        />
                        <IconBadge
                            to="https://www.instagram.com/fadimhats?igsh=MWZtcHM0MHJxbzVkMg%3D%3D&utm_source=qr"
                            external
                            name="Instagram"
                            wrapperClassName="group bg-apple-gray4 hover:border-apple-blue hover:bg-apple-blue/25 border border-transparent transition-all duration-300 hover:border"
                            className="text-apple-label-secondary group-hover:text-apple-blue transition-all duration-300"
                        />
                        <IconBadge
                            to="https://www.linkedin.com/in/fathariq-dimas-ab81bb1b5"
                            external
                            name="Linkedin"
                            wrapperClassName="group bg-apple-gray4 hover:border-apple-blue hover:bg-apple-blue/25 border border-transparent transition-all duration-300 hover:border"
                            className="text-apple-label-secondary group-hover:text-apple-blue transition-all duration-300"
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
