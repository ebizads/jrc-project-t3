import { useState, FormEvent } from "react";

const ChangePasswordInput = () => {
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        const hasUpperCase = /[A-Z]/.test(newPassword);
        const hasLowerCase = /[a-z]/.test(newPassword);
        const hasNumbers = /\d/.test(newPassword);
        const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
            newPassword
        );

        if (newPassword.length < 8) {
            setError("Password must be at least 8 characters long");
        } else if (
            !hasUpperCase ||
            !hasLowerCase ||
            !hasNumbers ||
            !hasSymbols
        ) {
            setError(
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol"
            );
        } else {
            setError("");
        }
    };

    return (
        <div>
            <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={handleChange}
                className="mb-2 rounded border px-4 py-2"
                autoComplete="false"
            />
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default ChangePasswordInput;
