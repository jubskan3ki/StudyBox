// H2.tsx
import type { HeadingProps } from '~/types/components/common/HeadingProps';
const H2 = ({ children, className = '' }: HeadingProps) => {
    return (
        <h2
            className={`text-xl md:text-2xl lg:text-2xl  font-bold text-darkGray  font-helvetica mb-6 mt-0 ${className}`}
        >
            {children}
        </h2>
    );
};

export default H2;
