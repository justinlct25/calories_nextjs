'use client'

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
// import Image from "@tiptap/extension-image"
import ImageResize from 'tiptap-extension-resize-image';
import TextAlign from "@tiptap/extension-text-align"
import './tiptap.scss'


const Tiptap = ({ onChange, content }: any) => {
  const handleChange = (newContent: string) => {
    onChange(newContent);
  };
  const editor = useEditor({
    extensions: [StarterKit, Underline,
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc ml-5'
        }
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'list-decimal ml-5'
        }
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        // alignments: ['left', 'center', 'right', 'justify'],
        // defaultAlignment: 'center'
      }),
      // Image.configure({
      //   inline: true,
      // })
      ImageResize.configure({
        HTMLAttributes: {
          class: 'mx-auto'
        }
      })
  ],
    editorProps: {
      attributes: {
        class:
          // "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-700 text-gray-400 items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none",
          // "flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-700 text-gray-400 items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none h-64",
          "flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-700 text-gray-400 items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none h-64",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  return (
    <div className="w-full px-4">
      <Toolbar editor={editor} content={content}/>
      <div className="h-64">
        <EditorContent className="h-full" style={{ whiteSpace: "pre-line" }} editor={editor} />
      </div>
    </div>
  );
};

export default Tiptap;