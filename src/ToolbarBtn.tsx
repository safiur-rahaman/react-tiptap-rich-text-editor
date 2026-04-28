import type { ToolbarBtnProps } from "./types";

export function ToolbarBtn({
    onClick,
    isActive,
    title,
    children,
    disabled,
}: ToolbarBtnProps) {
    return (
        <button
            type="button"
            title={title}
            disabled={disabled}
            onClick={onClick}
            className={["tiptap-btn", isActive ? "is-active" : ""].join(" ").trim()}
        >
            {children}
        </button>
    );
}

export function ToolbarSep() {
    return <div className="tiptap-toolbar-sep" aria-hidden />;
}
