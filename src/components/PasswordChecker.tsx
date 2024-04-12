import { useMemo } from "react";

const PasswordChecker = ({ password }: { password: string }) => {
    const hasEnoughCharacter = useMemo(() => {
        return password && password.length >= 12 && password.length < 20
            ? true
            : false;
    }, [password]);
    const hasNumber = useMemo(() => {
        const checkNumber = /(?=.*\d)/gm;
        return password && password.match(checkNumber) ? true : false;
    }, [password]);
    const hasSmallLetter = useMemo(() => {
        const checkSmallLetter = /(?=.*[a-z])/gm;
        return password && password.match(checkSmallLetter) ? true : false;
    }, [password]);
    const hasCapitalLetter = useMemo(() => {
        const checkCapitalLetter = /(?=.*[A-Z])/gm;
        return password && password.match(checkCapitalLetter) ? true : false;
    }, [password]);
    const hasSpecialCharacter = useMemo(() => {
        const checkSpecialCharacter = /(?=.*[-+!@#$%^&*.,?_])/gm;
        return password && password.match(checkSpecialCharacter) ? true : false;
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
            className={`space-y-2 overflow-hidden rounded-md text-xs font-normal transition-all duration-200 ${
                password && password
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
            <i className={`fa-solid ${matcher ? "fa-check" : "fa-xmark"}`} />
            {label}
        </p>
    );
};
