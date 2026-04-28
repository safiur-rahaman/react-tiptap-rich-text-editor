"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";

import { Toolbar } from "./Toolbar";
import type { RichTextEditorProps, OutputFormat } from "./types";
import "./editor.css";

/* ─── Extensions (defined once, never re-created on render) ─────────────────── */

const EXTENSIONS = [
    StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
    Underline,
    Link.configure({ openOnClick: false }),
    Highlight,
    Subscript,
    Superscript,
    TextAlign.configure({ types: ["heading", "paragraph"] }),
];

/* ─── Serialise editor content to the requested format ─────────────────────── */

function serialize(editor: ReturnType<typeof useEditor>, format: OutputFormat): string {
    if (!editor) return "";
    switch (format) {
        case "json": return JSON.stringify(editor.getJSON());
        case "text": return editor.getText();
        case "html":
        default: return editor.getHTML();
    }
}

/* ─── Deserialise incoming value to TipTap-compatible content ───────────────── */

function deserialize(value: string, format: OutputFormat) {
    if (!value) return "";
    if (format === "json") {
        try { return JSON.parse(value); } catch { return ""; }
    }
    return value; // html and text are passed through as-is
}

/* ─── Component ─────────────────────────────────────────────────────────────── */

export default function RichTextEditor({
    value = "",
    outputFormat = "html",
    onChange,
}: RichTextEditorProps) {
    const editor = useEditor({
        extensions: EXTENSIONS,
        content: deserialize(value, outputFormat),
        immediatelyRender: false,
        editorProps: {
            attributes: { class: "tiptap-body" },
        },
        onUpdate({ editor }) {
            onChange?.(serialize(editor, outputFormat));
        },
    });

    /**
     * Sync external `value` changes into the editor.
     *
     * TipTap editors are uncontrolled after mount — changing the `value` prop
     * has no effect by default. This effect watches `value` and calls
     * `setContent` whenever the parent sets a genuinely different value
     * (e.g. clearing the field with value="").
     *
     * The `false` flag passed to setContent suppresses the `onUpdate` event,
     * which prevents the onChange → setState → value change → setContent
     * infinite loop.
     */
    useEffect(() => {
        if (!editor) return;

        const incoming = deserialize(value, outputFormat);
        const current = serialize(editor, outputFormat);

        // Only update when content actually differs to avoid cursor jumping
        if (value !== current) {
            editor.commands.setContent(incoming, { emitUpdate: false });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    // NOTE: `editor` and `outputFormat` are intentionally omitted.
    // Re-running on editor instance changes is unnecessary (it's stable after mount).
    // Re-running on outputFormat changes would require re-comparing in a different
    // format than the one being set — keep it simple: format changes need a remount.

    if (!editor) return null;

    return (
        <div className="tiptap-root">
            <Toolbar editor={editor} />
            <div className="tiptap-body-wrap">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}
