import type { Editor } from "@tiptap/react";
import type { ReactNode } from "react";

/**
 * Controls the format that `onChange` delivers to the parent.
 *
 * - "html"  → a full HTML string  (default)
 * - "json"  → a JSON-stringified ProseMirror document
 * - "text"  → plain text (no markup)
 */
export type OutputFormat = "html" | "json" | "text";

export interface RichTextEditorProps {
    /** Initial content. Must match the chosen `outputFormat` (HTML string, JSON string, or plain text). */
    value?: string;
    /** Preferred output format delivered to `onChange`. Defaults to "html". */
    outputFormat?: OutputFormat;
    /** Called on every content change with the serialized value in the chosen format. */
    onChange?: (value: string) => void;
}

export interface ToolbarProps {
    editor: Editor;
}

export interface ToolbarBtnProps {
    onClick: () => void;
    isActive?: boolean;
    title: string;
    children: ReactNode;
    disabled?: boolean;
}
