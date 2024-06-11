import cn from '@/utils/cn';
import { Label } from '@radix-ui/react-label';
import { forwardRef, useId } from 'react';
import { Input } from './input';

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({ label, ...props }: InputFieldProps, ref) => {
    const id = useId();

    return (
        <LabelInputContainer>
            <Label htmlFor={id} className="ml-1">
                {label}
            </Label>
            <Input id={id} ref={ref} {...props} />
        </LabelInputContainer>
    );
});

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <div className={cn('flex flex-col space-y-2 w-full', className)}>{children}</div>;
};

export { InputField };
