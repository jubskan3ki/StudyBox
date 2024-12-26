// src/components/UI/Typography/TextBody.tsx
import type { TextBodyProps } from '~/types/components/common/TextBodyProps';

const TextBody = function ({ children, className = '' }: TextBodyProps) {
    return (
        <p
            className={`font-sans text-sm leading-normal text-darkGray font-helvetica mb-0 mt-0 ${className}`}
            style={{ fontFamily: 'Helvetica Neue, sans-serif' }}
        >
            {children}
        </p>
    );
};

export default TextBody;
