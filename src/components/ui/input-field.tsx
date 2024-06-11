import cn from '@/utils/cn';
import { Label } from '@radix-ui/react-label';
import { forwardRef, useId } from 'react';
import { Input } from './input';

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({ label, error, ...props }: InputFieldProps, ref) => {
    const id = useId();

    return (
        <div className="w-full flex flex-col">
            <LabelInputContainer>
                <Label htmlFor={id} className="ml-1">
                    {label}
                </Label>
                <Input id={id} ref={ref} {...props} />
            </LabelInputContainer>
            {error ? <span className="block text-xs text-red-400 ml-1 mt-1">{error}</span> : null}
        </div>
    );
});

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <div className={cn('flex flex-col space-y-2 w-full', className)}>{children}</div>;
};

export { InputField };
