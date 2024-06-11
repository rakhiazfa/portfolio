import cn from '@/utils/cn';
import { Label } from '@radix-ui/react-label';
import { forwardRef, useId } from 'react';
import { Textarea } from './textarea';

export interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
}

const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(({ label, ...props }: TextareaFieldProps, ref) => {
    const id = useId();

    return (
        <LabelInputContainer>
            <Label htmlFor={id} className="ml-1">
                {label}
            </Label>
            <Textarea id={id} ref={ref} {...props} />
        </LabelInputContainer>
    );
});

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <div className={cn('flex flex-col space-y-2 w-full', className)}>{children}</div>;
};

export { TextareaField };
