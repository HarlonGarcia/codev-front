import { PropsWithChildren } from 'react';

import { motion } from 'framer-motion';
import { sectionAnimationProps } from 'pages/Home/utils';

interface SectionProps {
    title: string;
    description: string;
}
export const Section = ({
  title,
  description,
  children,
}: PropsWithChildren<SectionProps>) => {
  return (
    <motion.section
      {...sectionAnimationProps}
      className='flex flex-col p-2'
    >
      <h1 className='mb-6 font-semibold text-center'>{title}</h1>
      <p className='mb-8 text-center'>{description}</p>
      {children}
    </motion.section>
  )
}