"use client";

import type { ToolbarProps } from "./types";
import { ToolbarBtn, ToolbarSep } from "./ToolbarBtn";
import { icons } from "./icons";

export function Toolbar({ editor }: ToolbarProps) {
    const active = (name: string, attrs?: Record<string, unknown>) =>
        attrs ? editor.isActive(name, attrs) : editor.isActive(name);

    const headingValue = active("heading", { level: 1 })
        ? "h1"
        : active("heading", { level: 2 })
            ? "h2"
            : active("heading", { level: 3 })
                ? "h3"
                : "p";

    return (
        <div className="tiptap-toolbar">

            {/* History */}
            <ToolbarBtn
                title="Undo (Ctrl+Z)"
                disabled={!editor.can().undo()}
                onClick={() => editor.chain().focus().undo().run()}
            >
                {icons.undo}
            </ToolbarBtn>

            <ToolbarBtn
                title="Redo (Ctrl+Y)"
                disabled={!editor.can().redo()}
                onClick={() => editor.chain().focus().redo().run()}
            >
                {icons.redo}
            </ToolbarBtn>

            <ToolbarSep />

            {/* Block type */}
            <select
                className="tiptap-heading-select"
                value={headingValue}
                onChange={(e) => {
                    const val = e.target.value;
                    if (val === "p") {
                        editor.chain().focus().setParagraph().run();
                    } else {
                        editor
                            .chain()
                            .focus()
                            .setHeading({ level: Number(val.replace("h", "")) as 1 | 2 | 3 })
                            .run();
                    }
                }}
            >
                <option value="p">Paragraph</option>
                <option value="h1">Heading 1</option>
                <option value="h2">Heading 2</option>
                <option value="h3">Heading 3</option>
            </select>

            <ToolbarSep />

            {/* Text formatting */}
            <ToolbarBtn title="Bold (Ctrl+B)" isActive={active("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
                {icons.bold}
            </ToolbarBtn>
            <ToolbarBtn title="Italic (Ctrl+I)" isActive={active("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
                {icons.italic}
            </ToolbarBtn>
            <ToolbarBtn title="Underline (Ctrl+U)" isActive={active("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}>
                {icons.underline}
            </ToolbarBtn>
            <ToolbarBtn title="Strikethrough" isActive={active("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}>
                {icons.strike}
            </ToolbarBtn>
            <ToolbarBtn title="Inline code" isActive={active("code")} onClick={() => editor.chain().focus().toggleCode().run()}>
                {icons.code}
            </ToolbarBtn>
            <ToolbarBtn title="Highlight" isActive={active("highlight")} onClick={() => editor.chain().focus().toggleHighlight().run()}>
                {icons.highlight}
            </ToolbarBtn>

            <ToolbarSep />

            {/* Link — toggling off when already active */}
            <ToolbarBtn
                title="Insert / remove link"
                isActive={active("link")}
                onClick={() => {
                    if (active("link")) {
                        editor.chain().focus().unsetLink().run();
                        return;
                    }
                    const url = prompt("Enter URL");
                    if (!url) return;
                    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
                }}
            >
                {icons.link}
            </ToolbarBtn>

            <ToolbarSep />

            {/* Lists & Blockquote */}
            <ToolbarBtn title="Bullet list" isActive={active("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
                {icons.bulletList}
            </ToolbarBtn>
            <ToolbarBtn title="Ordered list" isActive={active("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                {icons.orderedList}
            </ToolbarBtn>
            <ToolbarBtn title="Blockquote" isActive={active("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
                {icons.blockquote}
            </ToolbarBtn>

            <ToolbarSep />

            {/* Super / Subscript */}
            <ToolbarBtn title="Superscript" isActive={active("superscript")} onClick={() => editor.chain().focus().toggleSuperscript().run()}>
                {icons.superscript}
            </ToolbarBtn>
            <ToolbarBtn title="Subscript" isActive={active("subscript")} onClick={() => editor.chain().focus().toggleSubscript().run()}>
                {icons.subscript}
            </ToolbarBtn>

            <ToolbarSep />

            {/* Text alignment */}
            <ToolbarBtn title="Align left" isActive={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}>
                {icons.alignLeft}
            </ToolbarBtn>
            <ToolbarBtn title="Align center" isActive={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()}>
                {icons.alignCenter}
            </ToolbarBtn>
            <ToolbarBtn title="Align right" isActive={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()}>
                {icons.alignRight}
            </ToolbarBtn>
            <ToolbarBtn title="Justify" isActive={editor.isActive({ textAlign: "justify" })} onClick={() => editor.chain().focus().setTextAlign("justify").run()}>
                {icons.alignJustify}
            </ToolbarBtn>

        </div>
    );
}
