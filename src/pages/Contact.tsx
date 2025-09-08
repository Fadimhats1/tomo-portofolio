import MainContent from '../components/organisms/MainContent';
import CardMail from '../components/molecules/CardMail';
import InfoCard from '../components/molecules/InfoCard';

const Contact = () => {
    return (
        <MainContent title="Contact">
            <div className="grid gap-8 xl:grid-cols-2">
                <div className="flex-1">
                    <div className="flex flex-col gap-6">
                        <h3 className="text-apple-label-primary text-2xl font-semibold">Get in Touch</h3>
                        <div className="flex flex-col gap-4">
                            <InfoCard className="bg-transparent p-0" name="MapPin" title="LOCATION" description="Tangerang - Banten, Indonesia" />
                            <InfoCard className="bg-transparent p-0" name="Phone" title="PHONE" description="+62 851 - 7168 - 6824" />
                            <InfoCard className="bg-transparent p-0" name="Mail" title="EMAIL" description="Fadimhats1@gmail.com" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 justify-center xl:justify-end">
                    <CardMail />
                </div>
            </div>
        </MainContent>
    );
};

export default Contact;
