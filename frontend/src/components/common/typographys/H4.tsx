// H4.tsx
import type { HeadingProps } from '~/types/components/common/HeadingProps';

const H4 = ({ children, className = '' }: HeadingProps) => {
    return <h4 className={`text-[13px] font-bold text-darkGray font-helvetica mb-6 mt-0 ${className}`}>{children}</h4>;
};

export default H4;
