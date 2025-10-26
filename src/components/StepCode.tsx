import { useForm } from "react-hook-form";
import { useVerifyCode } from "../hooks/useAuth";
import { useState, useEffect } from "react";
import { CodeInput } from "./CodeInput";
import FormError from "./FormError";

type StepCodeProps = { userId: string; onNext: () => void; onBack?: () => void };
type FormValues = { code: string };

export function StepCode({ userId, onNext }: StepCodeProps) {
    const { register, handleSubmit, setValue, reset, watch } = useForm<FormValues>();
    const { mutate, isPending, error } = useVerifyCode();
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);

    const code = watch("code");

    useEffect(() => {
        if (timer === 0) {
            setCanResend(true);
            return;
        }
        const id = setInterval(() => setTimer((prev) => prev - 1), 1000);
        return () => clearInterval(id);
    }, [timer]);

    const onSubmit = (values: FormValues) => {
        mutate({ userId, code: values.code }, { onSuccess: () => onNext() });
    };

    const resend = () => {
        setTimer(60);
        setCanResend(false);
        reset({ code: "" });
        // здесь можно вызвать повторную отправку кода через API
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* скрытое поле для react-hook-form */}
            <input type="hidden" {...register("code")} />

            {/* красивый ввод кода */}
            <div className="mb-2">
                <CodeInput
                    length={6}
                    error={error?.message !== undefined}
                    onComplete={(code) => {
                        setValue("code", code); // кладём код в форму
                    }}
                />

                {error && <FormError message={error.message} />}
            </div>

            {code?.length !== 6 ? (
                <div className="flex justify-center items-center text-center">
                    {!canResend && <span className="text-gray-600 text-sm">{`Get a new code in ${timer} сек`}</span>}
                    {canResend && (
                        <button type="button" onClick={resend} className="bg-blue-600 text-white p-2 rounded-lg w-full">
                            Get new
                        </button>
                    )}
                </div>
            ) : (
                <button type="submit" disabled={isPending} className="bg-blue-600 text-white p-2 rounded-lg w-full">
                    Continue
                </button>
            )}
        </form>
    );
}
