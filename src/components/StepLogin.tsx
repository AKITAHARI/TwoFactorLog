import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useAuth";
import lock from "../assets/lock.svg";
import user from "../assets/user.svg";
import FormError from "./FormError";

type StepLoginProps = {
    onNext: (data: { email: string; password: string; userId: string }) => void;
};

type FormValues = {
    email: string;
    password: string;
};

const btnClasses = {
    disabled: "bg-gray-200 text-gray-400 border border-gray-300 cursor-not-allowed",
    enabled: "bg-blue-500 text-white hover:bg-blue-600",
};

export function StepLogin({ onNext }: StepLoginProps) {
    const { register, handleSubmit, watch } = useForm<FormValues>();
    const { mutate, isPending, error } = useLogin();

    const onSubmit = (values: FormValues) => {
        mutate(values, {
            onSuccess: (res) => {
                onNext({ ...values, userId: res.userId });
            },
        });
    };

    // следим за значениями
    const email = watch("email");
    const password = watch("password");

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-2 mb-2">
                <div className="inputWithIcon relative flex items-center">
                    <img src={user} className="absolute left-2 w-4 h-4" />
                    <input
                        {...register("email")}
                        placeholder="Email"
                        className="w-full p-2 border border-gray-300 rounded-lg pl-8 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="inputWithIcon relative flex items-center">
                    <img src={lock} className="absolute left-2 w-4 h-4" />
                    <input
                        {...register("password")}
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 border border-gray-300 rounded-lg pl-8 focus:outline-none focus:border-blue-500 "
                    />
                </div>
                {error && <FormError message={error.message} />}
            </div>
            <button
                type="submit"
                disabled={isPending || !email || !password}
                className={`${
                    isPending || !email || !password ? btnClasses.disabled : btnClasses.enabled
                } p-2 rounded-lg w-full`}
            >
                Log In
            </button>
        </form>
    );
}
