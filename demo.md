# Codalyte Name Animation

## Integrate the <Shuffle /> component from React Bits

You are helping integrate an open-source React component into an existing application.

### Component: Shuffle
### Variant: JavaScript + CSS
### Dependencies: gsap @gsap/react

---

### Usage Example
```jsx
import Shuffle from './Shuffle';

<Shuffle
  text="Hello World"
  shuffleDirection="right"
  duration={0.35}
  animationMode="evenodd"
  shuffleTimes={1}
  ease="power3.out"
  stagger={0.03}
  threshold={0.1}
  triggerOnce={true}
  triggerOnHover={true}
  respectReducedMotion={true}
/>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| text | string | "" | The text content to shuffle. |
| className | string | "" | Optional CSS class for the wrapper element. |
| style | object | {} | Inline styles applied to the wrapper element. |
| shuffleDirection | "left" | "right" | "up" | "down" | "right" | Direction the per-letter strip slides to reveal the final character. |
| duration | number | 0.35 | Duration (s) of the strip slide per letter. |
| maxDelay | number | 0 | Max random delay per strip when animationMode = "random". |
| ease | string | Function | "power3.out" | GSAP ease for sliding and color tween. |
| threshold | number | 0.1 | Portion of the element that must enter view before starting. |
| rootMargin | string | "-100px" | ScrollTrigger start offset (px, %, etc.). |
| tag | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "p" | HTML tag to render for the text container. |
| textAlign | CSS text-align | "center" | Text alignment applied via inline style. |
| onShuffleComplete | () => void | undefined | Called after a full run completes (and on each loop repeat). |
| shuffleTimes | number | 1 | How many interim scrambled glyphs to scroll past before the final char. |
| animationMode | "evenodd" | "random" | "evenodd" | Odd/even staggered strips or random per-strip delays. |
| loop | boolean | false | Repeat the shuffle indefinitely. |
| loopDelay | number | 0 | Delay (s) between loop repeats. |
| stagger | number | 0.03 | Stagger (s) for strips in "evenodd" mode. |
| scrambleCharset | string | "" | Characters to use for interim scrambles; empty keeps original copies. |
| colorFrom | string | undefined | Optional starting text color while shuffling. |
| colorTo | string | undefined | Optional final text color to tween to. |
| triggerOnce | boolean | true | Auto-run only on first scroll into view. |
| respectReducedMotion | boolean | true | Skip animation if user prefers reduced motion. |
| triggerOnHover | boolean | true | Allow re-playing the animation on hover after it completes. |

### Full Component Source
```jsx
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import './Shuffle.css';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

const Shuffle = ({
  text,
  className = '',
  style = {},
  shuffleDirection = 'right',
  duration = 0.35,
  maxDelay = 0,
  ease = 'power3.out',
  threshold = 0.1,
  rootMargin = '-100px',
  tag = 'p',
  textAlign = 'center',
  onShuffleComplete,
  shuffleTimes = 1,
  animationMode = 'evenodd',
  loop = false,
  loopDelay = 0,
  stagger = 0.03,
  scrambleCharset = '',
  colorFrom,
  colorTo,
  triggerOnce = true,
  respectReducedMotion = true,
  triggerOnHover = true
}) => {
  const ref = useRef(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [ready, setReady] = useState(false);

  const splitRef = useRef(null);
  const wrappersRef = useRef([]);
  const tlRef = useRef(null);
  const playingRef = useRef(false);
  const hoverHandlerRef = useRef(null);

  useEffect(() => {
    if ('fonts' in document) {
      if (document.fonts.status === 'loaded') setFontsLoaded(true);
      else document.fonts.ready.then(() => setFontsLoaded(true));
    } else s
noe-zyxq-fwe



# Target Cursor
## Integrate the <TargetCursor /> component from React Bits

You are helping integrate an open-source React component into an existing application.

### Component: TargetCursor
### Variant: JavaScript + CSS
### Dependencies: gsap

---

### Usage Example
```jsx
import TargetCursor from './TargetCursor';

export default function App() {
  return (
    <div>
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
      />
      
      <h1>Hover over the elements below</h1>
      <button className="cursor-target">Click me!</button>
      <div className="cursor-target">Hover target</div>
    </div>
  );
}
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| targetSelector | string | ".cursor-target" | CSS selector for elements that should trigger the cursor targeting effect |
| spinDuration | number | 2 | Duration in seconds for the cursor's spinning animation when not targeting |
| hideDefaultCursor | boolean | true | Whether to hide the default browser cursor when the component is active |
| hoverDuration | number | 0.2 | Duration in seconds for the transition when the cursor locks onto a target |
| parallaxOn | boolean | true | Enables a subtle parallax effect on the corners when moving over a target |

### Full Component Source
```jsx
import { useEffect, useRef, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import './TargetCursor.css';

const TargetCursor = ({
  targetSelector = '.cursor-target',
  spinDuration = 2,
  hideDefaultCursor = true,
  hoverDuration = 0.2,
  parallaxOn = true
}) => {
  const cursorRef = useRef(null);
  const cornersRef = useRef(null);
  const spinTl = useRef(null);
  const dotRef = useRef(null);

  const isActiveRef = useRef(false);
  const targetCornerPositionsRef = useRef(null);
  const tickerFnRef = useRef(null);
  const activeStrengthRef = useRef(0);

  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    const isMobileUserAgent = mobileRegex.test(userAgent.toLowerCase());
    return (hasTouchScreen && isSmallScreen) || isMobileUserAgent;
  }, []);

  const constants = useMemo(
    () => ({
      borderWidth: 3,
      cornerSize: 12
    }),
    []
  );

  const moveCursor = useCallback((x, y) => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      x,
      y,
      duration: 0.1,
      ease: 'power3.out'
    });
  }, []);

  useEffect(() => {
    if (isMobile || !cursorRef.current) return;

    const originalCursor = document.body.style.cursor;
    if (hideDefaultCursor) {
      document.body.style.cursor = 'none';
    }

    const cursor = cursorRef.current;
    cornersRef.current = cursor.querySelectorAll('.target-cursor-corner');

    let activeTarget = null;
    let currentLeaveHandler = null;
    let resumeTimeout = null;

    const cleanupTarget = target => {
      if (currentLeaveHandler) {
        target.removeEventListener('mouseleave', currentLeaveHandler);
      }
      currentLeaveHandler = null;
    };

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    });

    const createSpinTimeline = () => {
      if (spinTl.current) {
        spinTl.current.kill();
      }
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursor, { rotation: '+=360', duration: spinDuration, ease: 'none' });
    };

    createSpinTimeline();

    const tickerFn = () => {
      if (!targetCornerPositionsRef.current || !cursorRef.current || !cornersRef.current) {
        return;
      }

      const strength = activeStrengthRef.current;
noe-zyxq-fwe