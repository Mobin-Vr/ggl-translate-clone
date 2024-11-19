'use client';

import { HiChevronUp } from 'react-icons/hi';
import { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';

function TextExpander({ children, className }) {
   const [isExpanded, setIsExpanded] = useState(false);
   const displayText = isExpanded
      ? children
      : children.split(' ').slice(0, 10).join(' ') + '...';

   return (
      <div className={className}>
         <span>{displayText}</span>
         <button
            className='text-xl text-blue-400 align-text-top ml-1'
            onClick={() => setIsExpanded(!isExpanded)}
         >
            {isExpanded ? <HiChevronUp /> : <HiChevronDown />}
         </button>
      </div>
   );
}

export default TextExpander;
