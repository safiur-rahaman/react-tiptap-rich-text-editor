# react-tiptap-rich-text-editor

A fully-featured rich text editor built on [TipTap](https://tiptap.dev/) and React. Provides a clean, Notion-style toolbar with working controls for formatting, lists, links, alignment and more.

## Install

npm install react-tiptap-rich-text-editor

## Usage

```tsx
import { ERichTextEditor } from "react-tiptap-rich-text-editor";
```

<!-- ## File Structure

```
rich-text-editor/
├── index.ts            ← public barrel export
├── RichTextEditor.tsx  ← root component (editor init + layout)
├── Toolbar.tsx         ← all toolbar controls
├── ToolbarBtn.tsx      ← reusable button & separator primitives
├── icons.tsx           ← all SVG icons
├── types.ts            ← shared TypeScript interfaces
├── editor.css          ← all component styles
└── README.md           ← you are here
```

---

## Packages Used

| Package | Version | Purpose |
|---|---|---|
| `@tiptap/react` | `^3` | Core React bindings — `useEditor`, `EditorContent` |
| `@tiptap/starter-kit` | `^3` | Bundles common extensions: Bold, Italic, Strike, Code, Heading, Lists, Blockquote, History, etc. |
| `@tiptap/extension-underline` | `^3` | Underline mark |
| `@tiptap/extension-link` | `^3` | Inline hyperlink mark with `setLink` / `unsetLink` commands |
| `@tiptap/extension-highlight` | `^3` | Text highlight mark (`<mark>`) |
| `@tiptap/extension-text-align` | `^3` | Paragraph / heading text alignment |
| `@tiptap/extension-subscript` | `^3` | Subscript mark |
| `@tiptap/extension-superscript` | `^3` | Superscript mark |
| `@tiptap/pm` | `^3` | Peer dependency — ProseMirror core |

> `@tiptap/extension-underline` must be installed separately; it is **not** included in `starter-kit`.

---

## Setting Up in a New Project

### 1 — Install dependencies

```bash
# npm
npm install @tiptap/react @tiptap/pm @tiptap/starter-kit \
  @tiptap/extension-underline @tiptap/extension-link \
  @tiptap/extension-highlight @tiptap/extension-text-align \
  @tiptap/extension-subscript @tiptap/extension-superscript

# yarn
yarn add @tiptap/react @tiptap/pm @tiptap/starter-kit \
  @tiptap/extension-underline @tiptap/extension-link \
  @tiptap/extension-highlight @tiptap/extension-text-align \
  @tiptap/extension-subscript @tiptap/extension-superscript
```

### 2 — Copy the component folder

Copy the entire `rich-text-editor/` directory into your project's components folder.

```
your-project/
└── app/
    └── components/
        └── rich-text-editor/   ← drop it here
``` -->

### Framework requirements

| Requirement | Notes |
|---|---|
| React 18+ | `useEditor` uses React hooks |
| Next.js (App Router) | The component uses `"use client"` — works out of the box |
| CSS support | `editor.css` is a plain CSS file; no preprocessor needed |
| TypeScript | Optional but fully typed |

### No additional configuration needed

Extensions are pre-configured inside `RichTextEditor.tsx` in the `EXTENSIONS` constant. No wrapping Provider or context is required.

---

<!-- ## How It Works

```
useEditor (TipTap)
    │
    ├─ extensions[]   ←  StarterKit + 6 extra extensions registered here
    │
    ├─ editorProps    ←  adds class="tiptap-body" to the ProseMirror node
    │
    └─ onUpdate       ←  serialises content to the requested format
                         and fires onChange(value) on every keystroke
```

### Data flow

```
Parent component
    │  value (initial content string)
    │  outputFormat ("html" | "json" | "text")
    ▼
RichTextEditor
    │  deserialize(value, format) → TipTap content
    │
    │  editor instance
    ├──────────────────────► Toolbar
    │                            └─ calls editor.chain().focus().<command>().run()
    │                               on every button click
    │  editor instance
    └──────────────────────► EditorContent (renders the ProseMirror DOM)
           │
           └─ onUpdate → serialize(editor, format) → onChange(value) → Parent
``` -->

### Active-state detection

`editor.isActive(markOrNodeName)` is called on every render (TipTap triggers re-renders on selection/content change) to apply the `.is-active` CSS class to the relevant toolbar button.

---

## Output Formats

TipTap can serialize content in three formats, controlled by the `outputFormat` prop.

| Format | `outputFormat` value | `onChange` receives | Good for |
|---|---|---|---|
| **HTML** *(default)* | `"html"` | `"<p>Hello <strong>world</strong></p>"` | Rendering in the browser, storing in a CMS |
| **JSON** | `"json"` | `"{\"type\":\"doc\", ...}"` (JSON string) | Lossless round-trips, structured databases |
| **Plain text** | `"text"` | `"Hello world"` | Search indexes, previews, word counts |

### How serialization works internally

```ts
// RichTextEditor.tsx
function serialize(editor, format) {
    switch (format) {
        case "json": return JSON.stringify(editor.getJSON());
        case "text": return editor.getText();
        case "html":
        default:     return editor.getHTML();
    }
}
```

The `value` prop is also **deserialized** before being passed to TipTap as initial content:

```ts
function deserialize(value, format) {
    if (format === "json") return JSON.parse(value); // object → TipTap accepts it
    return value;                                     // html and text pass through
}
```

> **Important:** `value` and `outputFormat` must be consistent — if you set `outputFormat="json"` then `value` must be a valid JSON string (or empty string `""`).

---

## Resetting Content from the Parent

By default TipTap editors are **uncontrolled** after mount — changing the `value` prop has no effect because the editor manages its own internal state.

This component adds a `useEffect` that watches `value` and syncs it back into the editor whenever it changes:

```ts
useEffect(() => {
    if (!editor) return;
    const incoming = deserialize(value, outputFormat);
    const current  = serialize(editor, outputFormat);

    if (value !== current) {
        // `false` suppresses onUpdate, preventing an infinite loop:
        // onChange → setState → value → setContent → onUpdate → onChange → …
        editor.commands.setContent(incoming, false);
    }
}, [value]);
```

This means **passing `value=""` from the parent will clear the editor**:

```tsx
const [content, setContent] = useState("<p>Initial text</p>");

// Reset the editor to empty
<button onClick={() => setContent("")}>Clear</button>

<RichTextEditor value={content} onChange={setContent} />
```

> **Note on `outputFormat` changes at runtime:** Changing `outputFormat` after the initial mount is not supported. The sync effect compares incoming and current values in potentially different formats, which would cause false mismatches. If you need to switch formats, remount the component with a `key` prop change.

---

## Usage

### HTML output (default)

```tsx
"use client";

import { useState } from "react";
import { RichTextEditor } from "@/components/rich-text-editor";

export default function MyPage() {
    const [html, setHtml] = useState("");

    return (
        <>
            <RichTextEditor value={html} onChange={setHtml} />
            <button onClick={() => setHtml("")}>Reset</button>
        </>
    );
}
```

### JSON output

```tsx
import { RichTextEditor } from "@/components/rich-text-editor";

const [json, setJson] = useState("");

<RichTextEditor
    value={json}
    outputFormat="json"
    onChange={setJson}
/>
```

### Plain text output

```tsx
<RichTextEditor
    value={text}
    outputFormat="text"
    onChange={setText}
/>
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | `""` | Initial content (and reset trigger). Format must match `outputFormat`. |
| `outputFormat` | `"html" \| "json" \| "text"` | `"html"` | Format serialised and delivered to `onChange`. |
| `onChange` | `(value: string) => void` | — | Called on every content change with the serialized value. |

---

## Toolbar Controls Reference

| Group | Controls |
|---|---|
| History | Undo, Redo |
| Block type | Paragraph, Heading 1, Heading 2, Heading 3 |
| Formatting | Bold, Italic, Underline, Strikethrough, Inline code, Highlight |
| Link | Insert / remove hyperlink |
| Lists | Bullet list, Ordered list, Blockquote |
| Script | Superscript, Subscript |
| Alignment | Left, Center, Right, Justify |

---

<!-- ## Customisation Tips

- **Add an icon** → edit `icons.tsx`, export a new key.
- **Add a toolbar button** → import the icon in `Toolbar.tsx` and add a `<ToolbarBtn>`.
- **Change button/toolbar styles** → edit `editor.css` (`.tiptap-btn`, `.tiptap-toolbar`).
- **Change editor typography** → edit `editor.css` under `/* Typography */`.
- **Add a new TipTap extension** → install the package, import it and add it to the `EXTENSIONS` array in `RichTextEditor.tsx`.
- **Add a new output format** → add a case to the `serialize` / `deserialize` functions in `RichTextEditor.tsx` and extend the `OutputFormat` union in `types.ts`. -->
