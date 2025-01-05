import { PropsWithChildren, useRef, useState } from 'react'

import { motion } from 'framer-motion';

interface MouseEvent {
    clientX: number;
    clientY: number;
}

interface MagneticButtonProps {
    id?: string;
}

export const MagneticButton = ({ children }: PropsWithChildren<MagneticButtonProps>) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (event: MouseEvent) => {
        if (!ref.current) {
            return;
        }

        const { clientX, clientY } = event;
        const { height, width, left, top } = ref.current.getBoundingClientRect();

        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        setPosition({ x: middleX, y: middleY });
    }

    const reset = () => setPosition({ x: 0, y: 0 });

    const { x, y } = position;

    return (
        <motion.div
            ref={ref}
            style={{ position: 'relative' }}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.div>
    )
}
