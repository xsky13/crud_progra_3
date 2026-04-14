import type React from "react";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

type SubmitButtonType = Omit<
    React.ComponentProps<typeof Button>,
    "children" | "disabled"
> & {
    isSubmitting: boolean;
    children: React.ReactNode;
};
export default function SubmitButton({
    isSubmitting,
    children,
    ...props
}: SubmitButtonType) {
    return (
        <Button disabled={isSubmitting} {...props}>
            {isSubmitting && <Spinner />}
            {children}
        </Button>
    );
}
