import * as React from "react";
import type { Content, Editor } from "@tiptap/react";
import type { UseMinimalTiptapEditorProps } from "@/hooks/use-minimal-tiptap";
import { EditorContent } from "@tiptap/react";
import { cn } from "@/lib/utils";
import { LinkBubbleMenu } from "./bubble-menu";
import SectionTwo from './section/two';
import useMinimalTiptapEditor from '../hooks/use-minimal-tiptap';
import { MeasuredContainer } from './measured-container';

export interface MinimalTiptapProps
  extends Omit<UseMinimalTiptapEditorProps, "onUpdate"> {
  value?: Content;
  onChange?: (value: Content) => void;
  className?: string;
  editorContentClassName?: string;
}

const Toolbar = ({ editor }: { editor: Editor }) => (
  <div className="shrink-0 overflow-x-auto border-t border-border p-2">
    <div className="flex w-max items-center gap-px">
      <SectionTwo
        editor={editor}
        activeActions={["bold", "italic", "underline", "strikethrough", "code"]}
        mainActionCount={5}
      />
    </div>
  </div>
);

export const MinimalTiptapOne = React.forwardRef<
  HTMLDivElement,
  MinimalTiptapProps
>(({ value, onChange, className, editorContentClassName, ...props }, ref) => {
  const editor = useMinimalTiptapEditor({
    value,
    onUpdate: onChange,
    ...props,
  });

  if (!editor) {
    return null;
  }

  return (
    <MeasuredContainer
      as="div"
      name="editor"
      ref={ref}
      className={cn(
        "flex h-auto min-h-72 w-full flex-col rounded-md border border-input shadow-sm focus-within:border-primary",
        className
      )}
    >
      <EditorContent
        editor={editor}
        className={cn("minimal-tiptap-editor", editorContentClassName)}
      />
      <Toolbar editor={editor} />
      <LinkBubbleMenu editor={editor} />
    </MeasuredContainer>
  );
});

MinimalTiptapOne.displayName = "MinimalTiptapOne";

export default MinimalTiptapOne;
