import { EditorContent } from "@tiptap/react";

import Image from "next/image";

const Tiptap = ({ editor }) => {
  return (
    <>
      <section className="rounded-md border ">
        <div className="rounded-t-md bg-rose-600 flex gap-1 py-2">
          <button
            type="button"
            className="h-[30px] rounded bg-white border border-slate-100 flex justify-center items-center mx-1"
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Image
              src="/images/editor/bold-text.svg"
              width={12}
              height={12}
              layout="fixed"
              alt="Bold Text"
              priority={true}
            />
          </button>
          <button
            type="button"
            className="h-[30px] rounded bg-white border border-slate-100 flex justify-center items-center mx-1"
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Image
              src="/images/editor/italic-text.svg"
              width={12}
              height={12}
              layout="fixed"
              alt="Italic Text"
              priority={true}
            />
          </button>
          <button
            type="button"
            className="h-[30px] rounded bg-white border border-slate-100 flex justify-center items-center mx-1"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            Titre
          </button>
        </div>
        <div className="p-1 border-slate-400 border rounded-b-md bg-slate-200">
          <EditorContent editor={editor} />
        </div>
      </section>
    </>
  );
};

export default Tiptap;
