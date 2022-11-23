import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
        &::selection {
            background: rgba(255, 255, 255, 0.25);
        }
    }
    html {
        font-size: 100%;
    }

    body {
        --color-bg: #121212;
        --color-bg-tinted: rgba(255, 255, 255, 0.08);
        --color-fg: white;
        --color-fg-subdued: rgba(255, 255, 255, 0.75);
        --color-fg-subdued-non-text: rgba(255, 255, 255, 0.5);
        --color-fg-subdued-decorative: rgba(255, 255, 255, 0.04);

        --font-size-00: 0.75rem;
        --line-height-00: 1.5;
        
        --font-size-0: 1rem;
        --line-height-0: 1.5;
        
        --font-size-1: 1.25rem;
        --line-height-1: 1.4;
        
        --font-size-2: 1.5rem;
        --line-height-2: 1.3;
        
        --font-size-3: 1.75rem;
        --line-height-3: 1.2;
        
        --font-size-4: 2rem;
        --line-height-4: 1.1;

        --font-size-5: 3rem;
        --line-height-5: 1.0;
        
        background: var(--color-bg);
        color: var(--color-fg);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: var(--font-size-0);
        line-height: var(--line-height-0);
        padding: 0;
        margin: 0 auto;

        @media (min-width: 768px) {
            --font-size-4: 3rem;
            --line-height-4: 1.0;

            --font-size-5: 5rem;
            --line-height-5: 1.0;
        }
    }

    .type-size-00 {
        font-size: var(--font-size-00);
        line-height: var(--line-height-00);
    }

    .type-size-0 {
        font-size: var(--font-size-0);
        line-height: var(--line-height-00);
    }

    .type-size-1 {
        font-size: var(--font-size-1);
        line-height: var(--line-height-1);
    }

    .type-size-2 {
        font-size: var(--font-size-2);
        line-height: var(--line-height-2);
    }

    .type-size-3 {
        font-size: var(--font-size-3);
        line-height: var(--line-height-3);
    }

    .type-size-4 {
        font-size: var(--font-size-4);
        line-height: var(--line-height-4);
    }

    .type-size-5 {
        font-size: var(--font-size-5);
        line-height: var(--line-height-5);
    }

    .type-size-6 {
        font-size: var(--font-size-6);
        line-height: var(--line-height-6);
    }

    .color-fg-subdued {
        color: var(--color-fg-subdued);
    }

    .font-weight-bold {
        font-weight: bold;
    }

    .font-variant-tabular {
        font-variant-numeric: tabular-nums;
    }
    .stack-000 > * + * {
        margin-block-start: 0.5rem;
    }
    .stack-00 > * + * {
        margin-block-start: 0.75rem;
    }
    .stack-0 > * + * {
        margin-block-start: 1rem;
    }
    .stack-1 > * + * {
        margin-block-start: 1.25rem;
    }
    .stack-2 > * + * {
        margin-block-start: 1.5rem;
    }
    .stack-3 > * + * {
        margin-block-start: 1.75rem;
    }
    .stack-4 > * + * {
        margin-block-start: 2rem;
    }
    .stack-5 > * + * {
        margin-block-start: 3rem;
    }
    .stack-6 > * + * {
        margin-block-start: 4rem;
    }

    .flex-row {
        display: flex;
        flex-direction: row;
    }

    .flex-column {
        display: flex;
        flex-direction: column;
    }

    .flex-align-stretch {
        align-items: stretch;
    }

    .flex-align-center {
        align-items: center;
    }

    .flex-justify-center {
        justify-content: center;
    }

    .gap-000    { gap: 0.5rem; }
    .gap-00     { gap: 0.75rem; }
    .gap-0      { gap: 1rem; }
    .gap-1      { gap: 1.25rem; }
    .gap-2      { gap: 1.5rem; }
    .gap-3      { gap: 1.75rem; }
    .gap-4      { gap: 2rem; }
    .gap-5      { gap: 3rem; }
    .gap-6      { gap: 4rem; }

    .h-000  { height: 0.5rem; }
    .h-00   { height: 0.75rem; }
    .h-0    { height: 1rem; }
    .h-1    { height: 1.25rem; }
    .h-2    { height: 1.5rem; }
    .h-3    { height: 1.75rem; }
    .h-4    { height: 2rem; }
    .h-5    { height: 3rem; }
    .h-6    { height: 4rem; }

    .w-000  { width: 0.5rem; }
    .w-00   { width: 0.75rem; }
    .w-0    { width: 1rem; }
    .w-1    { width: 1.25rem; }
    .w-2    { width: 1.5rem; }
    .w-3    { width: 1.75rem; }
    .w-4    { width: 2rem; }
    .w-5    { width: 3rem; }
    .w-6    { width: 4rem; }

    .flex-shrink { flex-shrink: 1; }
    .flex-no-shrink { flex-shrink: 0; }
    .flex-grow { flex-grow: 1; }
    .flex-no-grow { flex-grow: 0; }
    .flex-basis-min-content { flex-basis: min-content; }

    .flex-fit-y {
        height: auto;
        flex: 1 0 auto;
    }
    .flex-fit-x {
        width: auto;
        flex: 1 0 auto;
    }
    .flex-shrink-x {
        width: auto;
        flex: 0 1 auto;
    }
    .flex-fill-x {
        flex: 1 1 100%;
    }
    .flex-fill-y {
        flex: 1 1 100%;
    }

    .grid-column {
        display: grid;
        grid-auto-flow: row;
        grid-auto-rows: minmax(min-content, 1fr);
    }
    .grid-row {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: minmax(min-content, 1fr);
    }

    button, 
    input,
    legend,
    fieldset, 
    a,
    p, h1, h2, h3, h4, h5, h6, ul, ol {
        all: unset;
        box-sizing: border-box;
    }

    a {
        text-decoration: underline;
        transition: box-shadow 0.075s ease-out;
        border-radius: 3px;
        cursor: pointer;
        &:focus {
            outline: none; 
            box-shadow: 0 0 0 2px var(--color-fg);
            transition: box-shadow 0.1s ease-out; 
        }
    }

    .list-bulleted {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        list-style: disc outline none;
        padding-inline-start: 1rem;
    }
    
    fieldset {
        width: 100%;
    }

    @keyframes scaleIn {
        from {
          opacity: 0;
          transform: scale(0);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
    }
    @keyframes slideUpAndFade {
        from {
            opacity: 0;
            transform: translateY(2px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    @keyframes slideRightAndFade {
        from {
            opacity: 0;
            transform: translateX(-2px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    @keyframes slideDownAndFade {
        from {
            opacity: 0;
            transform: translateY(-2px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    @keyframes slideLeftAndFade {
        from {
            opacity: 0;
            transform: translateX(2px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    @keyframes contentShow {
        from {
            opacity: 0;
            transform: translate(-50%, -48%) scale(0.96);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
`

export default GlobalStyles;