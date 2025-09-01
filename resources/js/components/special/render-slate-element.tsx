// File: RenderSlateElement.tsx
import React from "react";
import { ReactEditor } from "slate-react";
import { Path, Text, Editor, Element as SlateElement } from "slate";

import Button from "../button";

export default function RenderSlateElement({
  attributes,
  children,
  element,
  editor,
  activeImagePath,
  viewMode = "user"
}: {
  attributes: any;
  children: any;
  element: any;
  editor: ReactEditor;
  activeImagePath: number[] | null;
  viewMode?: "editor" | "user";
}) {
  const isEditor = viewMode === "editor";
  
  const isActive =
    element.type === "image" &&
    activeImagePath &&
    Path.equals(ReactEditor.findPath(editor, element), activeImagePath);

  if (element.type === "image") {
    return (
      <div
        {...attributes}
        contentEditable={false}
        className="block w-1/2 my-2 cursor-pointer rounded border p-1"
        style={{
          border: isActive ? "2px solid #3b82f6" : "2px solid transparent",
        }}
      >
        <img src={element.url} className="w-full block" />
      </div>
    );
  }

  if (element.type === "code") {
    return (
      <div {...attributes} className="my-2">
        {element.language && (
          <div
            contentEditable={false}
            className="text-[10px] font-bold bg-gray-200 px-1.5 py-0.5 rounded-t select-none mb-1"
          >
            {element.language}
          </div>
        )}
        <pre className="bg-gray-100 font-mono p-2 rounded whitespace-pre-wrap text-[12px]">
          <code>{children}</code>
        </pre>
      </div>
    );
  }

  if (element.type === "quote") {
    return (
      <blockquote
        {...attributes}
        className="font-cursive text-2xl font-extrabold border-l-4 border-blue-500 pl-2 my-2 text-gray-900"
      >
        {children}
      </blockquote>
    );
  }

  if (element.type === "heading") {
    return (
      <div className="relative my-2">
        <div className="absolute text-gray-400">*</div>
        <h2 {...attributes} className="text-blue-900 text-xl font-extrabold ms-2 mt-3 mb-1">
          {children}
        </h2>
      </div>
    );
  }

  return <div {...attributes}>{children}</div>;
}
