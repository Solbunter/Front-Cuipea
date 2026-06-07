import React from 'react';
import { motion } from 'framer-motion';

export type CuiState = 'idle' | 'thinking' | 'talking';

interface Props {
  size?: number;
  state?: CuiState;
}

export default function CuiCharacter({ size = 80, state = 'idle' }: Props) {
  const isThinking = state === 'thinking';
  const isTalking  = state === 'talking';

  return (
    <motion.div
      style={{ width: size, height: size * 1.2, display:'flex', alignItems:'center', justifyContent:'center' }}
      animate={
        isTalking  ? { y:[0,-4,0,-4,0] } :
        isThinking ? { rotate:[-4,4,-4] } :
        { y:[0,-6,0] }
      }
      transition={
        isTalking  ? { duration:0.4, repeat:Infinity } :
        isThinking ? { duration:1.2, repeat:Infinity, ease:'easeInOut' } :
        { duration:3.2, repeat:Infinity, ease:'easeInOut' }
      }
    >
      <svg
        width={size}
        height={size * 1.2}
        viewBox="0 0 80 100"
        fill="none"
        style={{ overflow:'visible' }}
      >
        {/* C body */}
        <path
          d="M62,14 C62,14 18,14 14,50 C14,50 18,86 62,86"
          stroke="#28325A"
          strokeWidth="18"
          strokeLinecap="round"
          fill="none"
        />

        {/* Upper eye — pinkSoft block */}
        <motion.rect
          x="18" y="29" width="19" height="13" rx="4"
          fill="#EEC5DD"
          style={{ transformOrigin:'27px 35px' }}
          animate={
            isThinking
              ? { rotate:[-14,-8,-14], x:[0,4,0] }
              : { rotate:[-14,-10,-14], scaleY:[1,1,0.1,1,1] }
          }
          transition={
            isThinking
              ? { duration:1.2, repeat:Infinity, ease:'easeInOut' }
              : {
                  rotate:  { duration:4,  repeat:Infinity, ease:'easeInOut' },
                  scaleY:  { duration:0.1, repeat:Infinity, repeatDelay:3.8 },
                }
          }
        />

        {/* Lower eye — mustard block */}
        <motion.rect
          x="20" y="57" width="19" height="13" rx="4"
          fill="#F6C95A"
          style={{ transformOrigin:'29px 63px' }}
          animate={
            isThinking
              ? { rotate:[10,16,10], x:[0,4,0] }
              : { rotate:[10,14,10], scaleY:[1,1,0.1,1,1] }
          }
          transition={
            isThinking
              ? { duration:1.4, repeat:Infinity, ease:'easeInOut' }
              : {
                  rotate:  { duration:4.5, repeat:Infinity, ease:'easeInOut' },
                  scaleY:  { duration:0.1, repeat:Infinity, repeatDelay:3.8, delay:0.06 },
                }
          }
        />
      </svg>
    </motion.div>
  );
}
