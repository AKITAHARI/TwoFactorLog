import { useState } from "react";
import { StepLogin } from "./StepLogin";
import { StepCode } from "./StepCode";
import Logo from "./Logo";
import arrowBack from "../assets/arrow-back.svg";

type AuthData = {
    email?: string;
    password?: string;
    userId?: string;
};

export function MultiStepAuth() {
    const [step, setStep] = useState(1);
    const [data, setData] = useState<AuthData>({});
    const [finished, setFinished] = useState(false);

    const prevStep = () => setStep((prev) => prev - 1);

    const nextStep = (newData: Partial<AuthData>) => {
        setData((prev) => ({ ...prev, ...newData }));
        setStep((prev) => prev + 1);
    };

    if (finished) return <div className="text-center text-2xl p-6">Спасибо! Вы вошли</div>;

    return (
        <div className="max-w-md mx-auto p-4 h-screen flex justify-center items-center">
            <div className="text-center p-8 pt-12 rounded-lg bg-white relative">
                {step === 2 && (
                    <button type="button" className="arrowBack absolute top-10 left-8 cursor-pointer">
                        <img src={arrowBack} className="w-3 h-3" />
                    </button>
                )}
                <Logo></Logo>
                <div className="mb-6 mt-6">
                    {step === 1 && <h3 className="text-2xl  font-medium">Sign in to your account to continue</h3>}
                    {step === 2 && (
                        <>
                            <h3 className="text-2xl font-medium">Two-Factor Authentication</h3>{" "}
                            <p className="font-normal">Enter the 6-digit code from the Google Authenticator app</p>
                        </>
                    )}
                </div>

                {step === 1 && <StepLogin onNext={nextStep} />}
                {step === 2 && (
                    <StepCode onNext={() => setFinished(true)} userId={data.userId!} onBack={() => prevStep()} />
                )}
            </div>
        </div>
    );
}
