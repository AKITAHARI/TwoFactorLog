export default function FormError({ message }: { message: string }) {
    return <div className="text-left text-red-600 text-sm">{message || "Error"}</div>;
}
