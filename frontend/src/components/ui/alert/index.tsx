import { useState, useEffect } from 'react';
import type { AlertProps } from '~/types/components/ui/alert.interface';
import './style.css';

function Alert({ type = 'info', message, duration = 30000 }: AlertProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        setIsVisible(true);

        const timer = duration !== 0 ? setTimeout(() => setIsVisible(false), duration) : null;

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [duration, message]);

    if (!isVisible) return null;

    return isVisible ? (
        <div
            className={`Alert ${type}`}
            onClick={() => setIsVisible(false)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    setIsVisible(false);
                }
            }}
        >
            <p>{message}</p>
        </div>
    ) : null;
}

export default Alert;
