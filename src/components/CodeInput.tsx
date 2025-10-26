import { useState, useRef } from "react";

const inputClasses =
    "w-12 h-14 text-center text-xl border border-gray-300 font-boldAwqesd rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";

export function CodeInput({
    length = 4,
    error = false,
    onComplete,
}: {
    length?: number;
    error?: boolean;
    onComplete: (code: string) => void;
}) {
    const [values, setValues] = useState(Array(length).fill(""));
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;
        const newValues = [...values];
        newValues[index] = value;
        setValues(newValues);

        if (value && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }

        const code = newValues.join("");
        if (code.length === length) {
            onComplete(code);
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !values[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    return (
        <div className="flex gap-2 justify-between">
            {values.map((val, i) => (
                <input
                    key={i}
                    ref={(el) => {
                        inputsRef.current[i] = el;
                    }}
                    value={val}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    maxLength={1}
                    className={`${inputClasses} ${error ? "border-red-500" : ""}`}
                />
            ))}
        </div>
    );
}
