import { useMemo } from "react";

const PasswordChecker = ({ password }: { password: string }) => {
    const hasEnoughCharacter = useMemo(() => {
        return password?.length >= 12 && password?.length < 20;
    }, [password]);

    const hasNumber = useMemo(() => {
        const checkNumber = /(?=.*\d)/gm;
        return !!password?.match(checkNumber);
    }, [password]);

    const hasSmallLetter = useMemo(() => {
        const checkSmallLetter = /(?=.*[a-z])/gm;
        return !!password?.match(checkSmallLetter);
    }, [password]);

    const hasCapitalLetter = useMemo(() => {
        const checkCapitalLetter = /(?=.*[A-Z])/gm;
        return !!password?.match(checkCapitalLetter);
    }, [password]);

    const hasSpecialCharacter = useMemo(() => {
        const checkSpecialCharacter = /(?=.*[-+!@#$%^&*.,?_])/gm;
        return !!password?.match(checkSpecialCharacter);
    }, [password]);

    // const noConsecutiveNumber = useMemo(() => {
    //   const checkConsecutiveNumber = /\d{2,}/gm
    //   return password.match(checkConsecutiveNumber) ? false : true
    // }, [password])
    // const notComplexEnough = useMemo(() => {
    //   const fComplex = !/[A-Z]/.test(password)
    //   const sComplex =  !/[a-z]/.test(password)
    //   const tComplex = !/\d/.test(password)
    //   const checkComplexity = {
    //     if(fComplex)
    //   }
    //   return password.match(checkComplexity) ? true : false
    // }, [password])

    const checkAll = useMemo(() => {
        return (
            hasEnoughCharacter &&
            hasNumber &&
            hasSmallLetter &&
            hasCapitalLetter &&
            hasSpecialCharacter
            // &&
            // noConsecutiveNumber
        );
    }, [hasEnoughCharacter, hasNumber, hasSmallLetter, hasCapitalLetter]);

    return (
        <div
            className={`space-y-2 overflow-hidden rounded-md text-xs font-normal transition-all duration-200 ${password && password
                ? checkAll
                    ? "border-[#7cb987] bg-[#283626] text-[#7cb987]"
                    : "border-[#b97c7c] bg-[#362626] text-[#b97c7c]"
                : ""
                } ${password && password.length === 0 ? "max-h-0" : "max-h-96 border p-4"}`}
        >
            <PasswordMatcher
                matcher={hasEnoughCharacter}
                label={"Must have 12 to 20 characters"}
            />
            <PasswordMatcher
                matcher={hasNumber}
                label={"Must contain at least 1 number"}
            />
            <PasswordMatcher
                matcher={hasCapitalLetter}
                label={"Must contain 1 capital letter"}
            />
            <PasswordMatcher
                matcher={hasSmallLetter}
                label={"Must contain 1 small letter"}
            />
            <PasswordMatcher
                matcher={hasSpecialCharacter}
                label={"Must contain 1 special character"}
            />
        </div>
    );
};

export default PasswordChecker;

const PasswordMatcher = ({
    matcher,
    label,
}: {
    matcher: boolean;
    label: string;
}) => {
    return (
        <p
            className={`flex items-center gap-2 ${matcher ? "text-[#7cb987]" : ""}`}
        >
            {matcher ?
                <svg xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height={"12"}
                    fill="#B4FFBC"
                    viewBox="0 0 448 512">
                    <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                </svg> :
                <svg xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height={"12"}
                    fill="#F08288"
                    viewBox="0 0 384 512">
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
            }
            {label}
        </p>
    );
};
