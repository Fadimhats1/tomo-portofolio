import { useState } from 'react';
import CardContainer from '../atoms/CardContainer';
import InputText from '../atoms/InputText';
import InputTextArea from '../atoms/InputTextArea';
import Button from '../atoms/Button';
import { Send } from 'lucide-react';

export interface InputMailProps {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const CardMail = () => {
    const [inputMail, setInputMail] = useState<InputMailProps>({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    return (
        <CardContainer className="w-full p-6 xl:w-fit">
            <form action="" className="w-full">
                <div className="flex flex-col gap-6">
                    <h4 className="text-apple-label-primary text-lg font-semibold">Send Message</h4>
                    <div className="flex flex-wrap gap-4 sm:flex-nowrap">
                        <InputText
                            id="input-name"
                            placeholder="Your Name"
                            wrapperClassName="bg-apple-gray6 px-4 py-3 flex-1"
                            className="placeholder-apple-label-tertiary text-sm"
                            value={inputMail.name}
                            onChange={e => {
                                setInputMail({
                                    ...inputMail,
                                    name: e.target.value,
                                });
                            }}
                        />
                        <InputText
                            id="input-email"
                            placeholder="Your Email"
                            wrapperClassName="bg-apple-gray6 px-4 py-3 flex-1"
                            className="placeholder-apple-label-tertiary text-sm"
                            value={inputMail.email}
                            onChange={e => {
                                setInputMail({
                                    ...inputMail,
                                    email: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <InputText
                        id="input-subject"
                        placeholder="Subject"
                        wrapperClassName="bg-apple-gray6 px-4 py-3"
                        className="placeholder-apple-label-tertiary text-sm"
                        value={inputMail.subject}
                        onChange={e => {
                            setInputMail({
                                ...inputMail,
                                subject: e.target.value,
                            });
                        }}
                    />
                    <InputTextArea
                        id="input-message"
                        placeholder="Your Message"
                        wrapperClassName="bg-apple-gray6 px-4 py-3"
                        className="placeholder-apple-label-tertiary text-sm"
                        value={inputMail.message}
                        onChange={e => {
                            setInputMail({
                                ...inputMail,
                                message: e.target.value,
                            });
                        }}
                    />
                    <Button className="rounded-lg">
                        <div className="flex items-center gap-2">
                            <Send size={16} />
                            <p className="text-sm">Send Message</p>
                        </div>
                    </Button>
                </div>
            </form>
        </CardContainer>
    );
};

export default CardMail;
