'use client';

import cn from '@/utils/cn';
import { Label } from '@radix-ui/react-label';
import { forwardRef, useId } from 'react';
import { Textarea } from './textarea';

export interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string;
}

const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
    ({ label, error, ...props }: TextareaFieldProps, ref) => {
        const id = useId();

        return (
            <div className="w-full flex flex-col">
                <LabelInputContainer>
                    <Label htmlFor={id} className="ml-1">
                        {label}
                    </Label>
                    <Textarea id={id} ref={ref} {...props} />
                </LabelInputContainer>
                {error ? <span className="block text-xs text-red-400 ml-1 mt-1">{error}</span> : null}
            </div>
        );
    }
);
TextareaField.displayName = 'TextareaField';

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <div className={cn('flex flex-col space-y-2 w-full', className)}>{children}</div>;
};

export { TextareaField };
