// src/index.ts
import "./editor-Y7WMRV7E.css";

// src/RichTextEditor.tsx
import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";

// src/ToolbarBtn.tsx
import { jsx } from "react/jsx-runtime";
function ToolbarBtn({
  onClick,
  isActive,
  title,
  children,
  disabled
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      title,
      disabled,
      onClick,
      className: ["tiptap-btn", isActive ? "is-active" : ""].join(" ").trim(),
      children
    }
  );
}
function ToolbarSep() {
  return /* @__PURE__ */ jsx("div", { className: "tiptap-toolbar-sep", "aria-hidden": true });
}

// src/icons.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var ICON_PROPS = {
  width: 15,
  height: 15,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function Icon({ children }) {
  return /* @__PURE__ */ jsx2("svg", { ...ICON_PROPS, children });
}
var icons = {
  undo: /* @__PURE__ */ jsxs(Icon, { children: [
    /* @__PURE__ */ jsx2("path", { d: "M3 7v6h6" }),
    /* @__PURE__ */ jsx2("path", { d: "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" })
  ] }),
  redo: /* @__PURE__ */ jsxs(Icon, { children: [
    /* @__PURE__ */ jsx2("path", { d: "M21 7v6h-6" }),
    /* @__PURE__ */ jsx2("path", { d: "M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" })
  ] }),
  bold: /* @__PURE__ */ jsxs("svg", { ...ICON_PROPS, strokeWidth: 2.5, children: [
    /* @__PURE__ */ jsx2("path", { d: "M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" }),
    /* @__PURE__ */ jsx2("path", { d: "M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" })
  ] }),
  italic: /* @__PURE__ */ jsxs(Icon, { children: [
    /* @__PURE__ */ jsx2("line", { x1: "19", y1: "4", x2: "10", y2: "4" }),
    /* @__PURE__ */ jsx2("line", { x1: "14", y1: "20", x2: "5", y2: "20" }),
    /* @__PURE__ */ jsx2("line", { x1: "15", y1: "4", x2: "9", y2: "20" })
  ] }),
  underline: /* @__PURE__ */ jsxs(Icon, { children: [
    /* @__PURE__ */ jsx2("path", { d: "M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" }),
    /* @__PURE__ */ jsx2("line", { x1: "4", y1: "21", x2: "20", y2: "21" })
  ] }),
  strike: /* @__PURE__ */ jsxs(Icon, { children: [
    /* @__PURE__ */ jsx2("line", { x1: "5", y1: "12", x2: "19", y2: "12" }),
    /* @__PURE__ */ jsx2("path", { d: "M16 6C16 6 14.5 4 12 4C9.5 4 7 5.5 7 8C7 10 8.5 11 10 11.5" }),
    /* @__PURE__ */ jsx2("path", { d: "M8 18C8 18 9.5 20 12 20C14.5 20 17 18.5 17 16C17 14 15.5 13 14 12.5" })
  ] }),
  code: /* @__PURE__ */ jsxs(Icon, { children: [
    /* @__PURE__ */ jsx2("polyline", { points: "16 18 22 12 16 6" }),
    /* @__PURE__ */ jsx2("polyline", { points: "8 6 2 12 8 18" })
  ] }),
  highlight: /* @__PURE__ */ jsxs(Icon, { children: [
    /* @__PURE__ */ jsx2("path", { d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }),
    /* @__PURE__ */ jsx2("path", { d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" })
  ] }),
  link: /* @__PURE__ */ jsxs(Icon, { children: [
    /* @__PURE__ */ jsx2("path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }),
    /* @__PURE__ */ jsx2("path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" })
  ] }),
  bulletList: /* @__PURE__ */ jsxs(Icon, { children: [
    /* @__PURE__ */ jsx2("line", { x1: "8", y1: "6", x2: "21", y2: "6" }),
    /* @__PURE__ */ jsx2("line", { x1: "8", y1: "12", x2: "21", y2: "12" }),
    /* @__PURE__ */ jsx2("line", { x1: "8", y1: "18", x2: "21", y2: "18" }),
    /* @__PURE__ */ jsx2("line", { x1: "3", y1: "6", x2: "3.01", y2: "6" }),
    /* @__PURE__ */ jsx2("line", { x1: "3", y1: "12", x2: "3.01", y2: "12" }),
    /* @__PURE__ */ jsx2("line", { x1: "3", y1: "18", x2: "3.01", y2: "18" })
  ] }),
  orderedList: /* @__PURE__ */ jsxs(Icon, { children: [
    /* @__PURE__ */ jsx2("line", { x1: "10", y1: "6", x2: "21", y2: "6" }),
    /* @__PURE__ */ jsx2("line", { x1: "10", y1: "12", x2: "21", y2: "12" }),
    /* @__PURE__ */ jsx2("line", { x1: "10", y1: "18", x2: "21", y2: "18" }),
    /* @__PURE__ */ jsx2("path", { d: "M4 6h1v4" }),
    /* @__PURE__ */ jsx2("path", { d: "M4 10h2" }),
    /* @__PURE__ */ jsx2("path", { d: "M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" })
  ] }),
  blockquote: /* @__PURE__ */ jsxs(Icon, { children: [
    /* @__PURE__ */ jsx2("path", { d: "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" }),
    /* @__PURE__ */ jsx2("path", { d: "M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" })
  ] }),
  superscript: /* @__PURE__ */ jsxs(Icon, { children: [
    /* @__PURE__ */ jsx2("path", { d: "M4 19 19 4" }),
    /* @__PURE__ */ jsx2("path", { d: "m14 19 5-5" }),
    /* @__PURE__ */ jsx2("path", { d: "M20 8V4h-4" })
  ] }),
  subscript: /* @__PURE__ */ jsxs(Icon, { children: [
    /* @__PURE__ */ jsx2("path", { d: "M4 5 19 20" }),
    /* @__PURE__ */ jsx2("path", { d: "m14 5 5 5" }),
    /* @__PURE__ */ jsx2("path", { d: "M20 20v-4h-4" })
  ] }),
  alignLeft: /* @__PURE__ */ jsxs(Icon, { children: [
    /* @__PURE__ */ jsx2("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
    /* @__PURE__ */ jsx2("line", { x1: "3", y1: "12", x2: "15", y2: "12" }),
    /* @__PURE__ */ jsx2("line", { x1: "3", y1: "18", x2: "18", y2: "18" })
  ] }),
  alignCenter: /* @__PURE__ */ jsxs(Icon, { children: [
    /* @__PURE__ */ jsx2("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
    /* @__PURE__ */ jsx2("line", { x1: "6", y1: "12", x2: "18", y2: "12" }),
    /* @__PURE__ */ jsx2("line", { x1: "4", y1: "18", x2: "20", y2: "18" })
  ] }),
  alignRight: /* @__PURE__ */ jsxs(Icon, { children: [
    /* @__PURE__ */ jsx2("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
    /* @__PURE__ */ jsx2("line", { x1: "9", y1: "12", x2: "21", y2: "12" }),
    /* @__PURE__ */ jsx2("line", { x1: "6", y1: "18", x2: "21", y2: "18" })
  ] }),
  alignJustify: /* @__PURE__ */ jsxs(Icon, { children: [
    /* @__PURE__ */ jsx2("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
    /* @__PURE__ */ jsx2("line", { x1: "3", y1: "12", x2: "21", y2: "12" }),
    /* @__PURE__ */ jsx2("line", { x1: "3", y1: "18", x2: "21", y2: "18" })
  ] })
};

// src/Toolbar.tsx
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function Toolbar({ editor }) {
  const active = (name, attrs) => attrs ? editor.isActive(name, attrs) : editor.isActive(name);
  const headingValue = active("heading", { level: 1 }) ? "h1" : active("heading", { level: 2 }) ? "h2" : active("heading", { level: 3 }) ? "h3" : "p";
  return /* @__PURE__ */ jsxs2("div", { className: "tiptap-toolbar", children: [
    /* @__PURE__ */ jsx3(
      ToolbarBtn,
      {
        title: "Undo (Ctrl+Z)",
        disabled: !editor.can().undo(),
        onClick: () => editor.chain().focus().undo().run(),
        children: icons.undo
      }
    ),
    /* @__PURE__ */ jsx3(
      ToolbarBtn,
      {
        title: "Redo (Ctrl+Y)",
        disabled: !editor.can().redo(),
        onClick: () => editor.chain().focus().redo().run(),
        children: icons.redo
      }
    ),
    /* @__PURE__ */ jsx3(ToolbarSep, {}),
    /* @__PURE__ */ jsxs2(
      "select",
      {
        className: "tiptap-heading-select",
        value: headingValue,
        onChange: (e) => {
          const val = e.target.value;
          if (val === "p") {
            editor.chain().focus().setParagraph().run();
          } else {
            editor.chain().focus().setHeading({ level: Number(val.replace("h", "")) }).run();
          }
        },
        children: [
          /* @__PURE__ */ jsx3("option", { value: "p", children: "Paragraph" }),
          /* @__PURE__ */ jsx3("option", { value: "h1", children: "Heading 1" }),
          /* @__PURE__ */ jsx3("option", { value: "h2", children: "Heading 2" }),
          /* @__PURE__ */ jsx3("option", { value: "h3", children: "Heading 3" })
        ]
      }
    ),
    /* @__PURE__ */ jsx3(ToolbarSep, {}),
    /* @__PURE__ */ jsx3(ToolbarBtn, { title: "Bold (Ctrl+B)", isActive: active("bold"), onClick: () => editor.chain().focus().toggleBold().run(), children: icons.bold }),
    /* @__PURE__ */ jsx3(ToolbarBtn, { title: "Italic (Ctrl+I)", isActive: active("italic"), onClick: () => editor.chain().focus().toggleItalic().run(), children: icons.italic }),
    /* @__PURE__ */ jsx3(ToolbarBtn, { title: "Underline (Ctrl+U)", isActive: active("underline"), onClick: () => editor.chain().focus().toggleUnderline().run(), children: icons.underline }),
    /* @__PURE__ */ jsx3(ToolbarBtn, { title: "Strikethrough", isActive: active("strike"), onClick: () => editor.chain().focus().toggleStrike().run(), children: icons.strike }),
    /* @__PURE__ */ jsx3(ToolbarBtn, { title: "Inline code", isActive: active("code"), onClick: () => editor.chain().focus().toggleCode().run(), children: icons.code }),
    /* @__PURE__ */ jsx3(ToolbarBtn, { title: "Highlight", isActive: active("highlight"), onClick: () => editor.chain().focus().toggleHighlight().run(), children: icons.highlight }),
    /* @__PURE__ */ jsx3(ToolbarSep, {}),
    /* @__PURE__ */ jsx3(
      ToolbarBtn,
      {
        title: "Insert / remove link",
        isActive: active("link"),
        onClick: () => {
          if (active("link")) {
            editor.chain().focus().unsetLink().run();
            return;
          }
          const url = prompt("Enter URL");
          if (!url) return;
          editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        },
        children: icons.link
      }
    ),
    /* @__PURE__ */ jsx3(ToolbarSep, {}),
    /* @__PURE__ */ jsx3(ToolbarBtn, { title: "Bullet list", isActive: active("bulletList"), onClick: () => editor.chain().focus().toggleBulletList().run(), children: icons.bulletList }),
    /* @__PURE__ */ jsx3(ToolbarBtn, { title: "Ordered list", isActive: active("orderedList"), onClick: () => editor.chain().focus().toggleOrderedList().run(), children: icons.orderedList }),
    /* @__PURE__ */ jsx3(ToolbarBtn, { title: "Blockquote", isActive: active("blockquote"), onClick: () => editor.chain().focus().toggleBlockquote().run(), children: icons.blockquote }),
    /* @__PURE__ */ jsx3(ToolbarSep, {}),
    /* @__PURE__ */ jsx3(ToolbarBtn, { title: "Superscript", isActive: active("superscript"), onClick: () => editor.chain().focus().toggleSuperscript().run(), children: icons.superscript }),
    /* @__PURE__ */ jsx3(ToolbarBtn, { title: "Subscript", isActive: active("subscript"), onClick: () => editor.chain().focus().toggleSubscript().run(), children: icons.subscript }),
    /* @__PURE__ */ jsx3(ToolbarSep, {}),
    /* @__PURE__ */ jsx3(ToolbarBtn, { title: "Align left", isActive: editor.isActive({ textAlign: "left" }), onClick: () => editor.chain().focus().setTextAlign("left").run(), children: icons.alignLeft }),
    /* @__PURE__ */ jsx3(ToolbarBtn, { title: "Align center", isActive: editor.isActive({ textAlign: "center" }), onClick: () => editor.chain().focus().setTextAlign("center").run(), children: icons.alignCenter }),
    /* @__PURE__ */ jsx3(ToolbarBtn, { title: "Align right", isActive: editor.isActive({ textAlign: "right" }), onClick: () => editor.chain().focus().setTextAlign("right").run(), children: icons.alignRight }),
    /* @__PURE__ */ jsx3(ToolbarBtn, { title: "Justify", isActive: editor.isActive({ textAlign: "justify" }), onClick: () => editor.chain().focus().setTextAlign("justify").run(), children: icons.alignJustify })
  ] });
}

// src/RichTextEditor.tsx
import "./editor-Y7WMRV7E.css";
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var EXTENSIONS = [
  StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
  Underline,
  Link.configure({ openOnClick: false }),
  Highlight,
  Subscript,
  Superscript,
  TextAlign.configure({ types: ["heading", "paragraph"] })
];
function serialize(editor, format) {
  if (!editor) return "";
  switch (format) {
    case "json":
      return JSON.stringify(editor.getJSON());
    case "text":
      return editor.getText();
    case "html":
    default:
      return editor.getHTML();
  }
}
function deserialize(value, format) {
  if (!value) return "";
  if (format === "json") {
    try {
      return JSON.parse(value);
    } catch (e) {
      return "";
    }
  }
  return value;
}
function RichTextEditor({
  value = "",
  outputFormat = "html",
  onChange
}) {
  const editor = useEditor({
    extensions: EXTENSIONS,
    content: deserialize(value, outputFormat),
    immediatelyRender: false,
    editorProps: {
      attributes: { class: "tiptap-body" }
    },
    onUpdate({ editor: editor2 }) {
      onChange == null ? void 0 : onChange(serialize(editor2, outputFormat));
    }
  });
  useEffect(() => {
    if (!editor) return;
    const incoming = deserialize(value, outputFormat);
    const current = serialize(editor, outputFormat);
    if (value !== current) {
      editor.commands.setContent(incoming, { emitUpdate: false });
    }
  }, [value]);
  if (!editor) return null;
  return /* @__PURE__ */ jsxs3("div", { className: "tiptap-root", children: [
    /* @__PURE__ */ jsx4(Toolbar, { editor }),
    /* @__PURE__ */ jsx4("div", { className: "tiptap-body-wrap", children: /* @__PURE__ */ jsx4(EditorContent, { editor }) })
  ] });
}
export {
  RichTextEditor
};
