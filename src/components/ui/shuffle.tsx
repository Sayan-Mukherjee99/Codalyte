"use client";

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './shuffle.css';

// We don't use SplitText to keep it open-source/free
gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ShuffleProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  shuffleDirection?: 'left' | 'right' | 'up' | 'down';
  duration?: number;
  maxDelay?: number;
  ease?: string;
  threshold?: number;
  tag?: keyof JSX.IntrinsicElements;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  onShuffleComplete?: () => void;
  shuffleTimes?: number;
  animationMode?: 'evenodd' | 'random';
  loop?: boolean;
  loopDelay?: number;
  stagger?: number;
  scrambleCharset?: string;
  colorFrom?: string;
  colorTo?: string;
  triggerOnce?: boolean;
  triggerOnHover?: boolean;
}

const Shuffle: React.FC<ShuffleProps> = ({
  text,
  className = '',
  style = {},
  shuffleDirection = 'right',
  duration = 0.35,
  maxDelay = 0,
  ease = 'power3.out',
  threshold = 0.1,
  tag = 'p',
  textAlign = 'center',
  onShuffleComplete,
  shuffleTimes = 1,
  animationMode = 'evenodd',
  loop = false,
  loopDelay = 0,
  stagger = 0.03,
  scrambleCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  colorFrom,
  colorTo,
  triggerOnce = true,
  triggerOnHover = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [ready, setReady] = useState(false);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const playingRef = useRef(false);

  useEffect(() => {
    console.log("Shuffle Component Mounted", { text });
    if ('fonts' in document) {
      if (document.fonts.status === 'loaded') {
        setFontsLoaded(true);
      } else {
        document.fonts.ready.then(() => setFontsLoaded(true));
      }
    } else {
      setFontsLoaded(true);
    }
  }, [text]);

  useEffect(() => {
    if (fontsLoaded && ready) {
      console.log("Shuffle Component Ready", { text, fontsLoaded, ready });
    }
  }, [fontsLoaded, ready, text]);

  // Manual splitting of text into characters
  const characters = useMemo(() => text.split(''), [text]);

  const runAnimation = () => {
    if (playingRef.current || !ready) return;
    playingRef.current = true;

    if (tlRef.current) tlRef.current.kill();
    tlRef.current = gsap.timeline({
      onComplete: () => {
        playingRef.current = false;
        onShuffleComplete?.();
        if (loop) {
          gsap.delayedCall(loopDelay, runAnimation);
        }
      },
    });

    charsRef.current.forEach((char, i) => {
      if (!char) return;
      const inner = char.querySelector('.shuffle-inner') as HTMLElement;
      if (!inner) return;

      const rollCount = Math.max(1, Math.floor(shuffleTimes));
      const dist = (shuffleDirection === 'up' || shuffleDirection === 'down') 
        ? char.getBoundingClientRect().height 
        : char.getBoundingClientRect().width;

      if (dist === 0) return;

      let delay = 0;
      if (animationMode === 'evenodd') {
        delay = (i % 2 === 0 ? 0 : stagger) + Math.random() * maxDelay;
      } else {
        delay = i * stagger + Math.random() * maxDelay;
      }

      const move = (shuffleDirection === 'up' || shuffleDirection === 'left') ? -dist : dist;
      const axis = (shuffleDirection === 'up' || shuffleDirection === 'down') ? 'y' : 'x';

      tlRef.current!.to(
        inner,
        {
          [axis]: move,
          duration,
          ease,
          repeat: rollCount,
          yoyo: true,
        },
        delay
      );

      if (colorFrom && colorTo) {
        tlRef.current!.fromTo(
          char,
          { color: colorFrom },
          { color: colorTo, duration: duration * 0.5, ease: 'none' },
          delay
        );
      }
    });
  };

  useGSAP(() => {
    if (!fontsLoaded) return;
    
    // Small delay to ensure measurements are correct
    const timer = setTimeout(() => {
      setReady(true);
    }, 50);

    return () => clearTimeout(timer);
  }, { scope: containerRef, dependencies: [fontsLoaded] });

  useEffect(() => {
    if (ready && !triggerOnHover) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: `top ${100 - threshold * 100}%`,
        once: triggerOnce,
        onEnter: runAnimation,
      });
    }
  }, [ready, triggerOnHover, threshold, triggerOnce]);

  const handleMouseEnter = () => {
    if (triggerOnHover) runAnimation();
  };

  // Fallback if not ready
  if (!fontsLoaded || !ready) {
    return React.createElement(
      tag,
      {
        ref: containerRef,
        className: `shuffle-parent ${className}`,
        style: { ...style, textAlign },
      },
      text
    );
  }

  return React.createElement(
    tag,
    {
      ref: containerRef,
      className: `shuffle-parent is-ready ${className}`,
      style: { ...style, textAlign },
      onMouseEnter: handleMouseEnter,
    },
    characters.map((char, i) => {
      if (char === ' ') return <span key={i}>&nbsp;</span>;
      
      return (
        <span
          key={i}
          ref={(el) => { charsRef.current[i] = el; }}
          className="shuffle-char-wrapper"
        >
          <span className="shuffle-inner">
            {/* Original char */}
            <span className="shuffle-orig">{char}</span>
            {/* Scramble char */}
            <span className="shuffle-scramble">
              {scrambleCharset.charAt(Math.floor(Math.random() * scrambleCharset.length))}
            </span>
          </span>
        </span>
      );
    })
  );
};

export default Shuffle;
