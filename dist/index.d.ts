import * as react_jsx_runtime from 'react/jsx-runtime';
import { Editor } from '@tiptap/react';
import { ReactNode } from 'react';

/**
 * Controls the format that `onChange` delivers to the parent.
 *
 * - "html"  → a full HTML string  (default)
 * - "json"  → a JSON-stringified ProseMirror document
 * - "text"  → plain text (no markup)
 */
type OutputFormat = "html" | "json" | "text";
interface RichTextEditorProps {
    /** Initial content. Must match the chosen `outputFormat` (HTML string, JSON string, or plain text). */
    value?: string;
    /** Preferred output format delivered to `onChange`. Defaults to "html". */
    outputFormat?: OutputFormat;
    /** Called on every content change with the serialized value in the chosen format. */
    onChange?: (value: string) => void;
}
interface ToolbarProps {
    editor: Editor;
}
interface ToolbarBtnProps {
    onClick: () => void;
    isActive?: boolean;
    title: string;
    children: ReactNode;
    disabled?: boolean;
}

declare function RichTextEditor({ value, outputFormat, onChange, }: RichTextEditorProps): react_jsx_runtime.JSX.Element | null;

export { type OutputFormat, RichTextEditor, type RichTextEditorProps, type ToolbarBtnProps, type ToolbarProps };
