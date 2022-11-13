import suggestTextColor from "./suggestTextColor";

const cssTheme = bg => {
    const fg = suggestTextColor(bg);
    return `
        --color-bg: ${bg};
        --color-bg-tinted: transparent;
        --color-fg: ${fg};
        --color-fg-subdued: ${fg};
        --color-fg-subdued-non-text: ${fg};
        --color-fg-subdued-decorative: ${fg};
        background: var(--color-bg);
        color: var(--color-fg);
    `;
};
    
export default cssTheme;
