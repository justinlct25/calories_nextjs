"use client";

import React, { useRef } from "react";
import { type Editor } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Underline,
  Quote,
  Undo,
  Redo,
  Code,
  Image,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";

type Props = {
  editor: Editor | null;
  content: string;
};


const Toolbar = ({ editor, content }: Props) => {

    const imageRef = useRef<HTMLInputElement|null>(null);
    const onImageClick = () => {
        imageRef.current!.click();
      };

    
    const handleImageUpload = (file: File) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string || '';
            editor?.chain().focus().setImage({ src: base64String }).run()
        }
        reader.readAsDataURL(file);
    }


    if (!editor) {
        return null;
    }
    return (
        <div
        className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start
        gap-5 w-full flex-wrap border border-gray-700"
        >
        <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap ">
            <button
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleBold().run();
                }}
                className={
                    editor.isActive("bold")
                    ? "bg-sky-700 text-white p-2 rounded-lg"
                    : "text-sky-400"
                }
                >
                <Bold className="w-5 h-5" />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleItalic().run();
                }}
                className={
                    editor.isActive("italic")
                    ? "bg-sky-700 text-white p-2 rounded-lg"
                    : "text-sky-400"
                }
                >
                <Italic className="w-5 h-5" />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleUnderline().run();
                }}
                className={
                    editor.isActive("underline")
                    ? "bg-sky-700 text-white p-2 rounded-lg"
                    : "text-sky-400"
                }
                >
                <Underline className="w-5 h-5" />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleStrike().run();
                }}
                className={
                    editor.isActive("strike")
                    ? "bg-sky-700 text-white p-2 rounded-lg"
                    : "text-sky-400"
                }
                >
                <Strikethrough className="w-5 h-5" />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleHeading({ level: 2 }).run();
                }}
                className={
                    editor.isActive("heading", { level: 2 })
                    ? "bg-sky-700 text-white p-2 rounded-lg"
                    : "text-sky-400"
                }
                >
                <Heading2 className="w-5 h-5" />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleBulletList().run();
                }}
                className={
                    editor.isActive("bulletList")
                    ? "bg-sky-700 text-white p-2 rounded-lg"
                    : "text-sky-400"
                }
                >
                <List className="w-5 h-5" />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleOrderedList().run();
                }}
                className={
                    editor.isActive("orderedList")
                    ? "bg-sky-700 text-white p-2 rounded-lg"
                    : "text-sky-400"
                }
                >
                <ListOrdered className="w-5 h-5" />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().setTextAlign('left').run()
                }}
                className={
                    editor.isActive({textAlign: 'left'})
                    ? "bg-sky-700 text-white p-2 rounded-lg"
                    : "text-sky-400"
                }
                >
                <AlignLeft className="w-5 h-5" />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().setTextAlign('center').run()
                }}
                className={
                    editor.isActive({textAlign: 'center'})
                    ? "bg-sky-700 text-white p-2 rounded-lg"
                    : "text-sky-400"
                }
                >
                <AlignCenter className="w-5 h-5" />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().setTextAlign('right').run()
                }}
                className={
                    editor.isActive({textAlign: 'right'})
                    ? "bg-sky-700 text-white p-2 rounded-lg"
                    : "text-sky-400"
                }
                >
                <AlignRight className="w-5 h-5" />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().setTextAlign('justify').run()
                }}
                className={
                    editor.isActive({textAlign: 'justify'})
                    ? "bg-sky-700 text-white p-2 rounded-lg"
                    : "text-sky-400"
                }
                >
                <AlignJustify className="w-5 h-5" />
            </button>
            {/* <button
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleBlockquote().run();
                }}
                className={
                    editor.isActive("blockquote")
                    ? "bg-sky-700 text-white p-2 rounded-lg"
                    : "text-sky-400"
                }
                >
                <Quote className="w-5 h-5" />
            </button> */}
            {/* <button
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().setCode().run();
                }}
                className={
                    editor.isActive("code")
                    ? "bg-sky-700 text-white p-2 rounded-lg"
                    : "text-sky-400"
                }
                >
                <Code className="w-5 h-5" />
            </button> */}
            <input 
                type='file' 
                id='file' 
                ref={imageRef} 
                style={{display: 'none'}} 
                accept=".jpg, .jpeg, .png" 
                onChange={(event) => { event?.target?.files?.length && handleImageUpload(event.target.files[0]); }} 
            />
            <button
                // onClick={uploadImage}
                onClick={onImageClick}
                className={"text-sky-400"}
            >
                <Image className="w-5 h-5" />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().undo().run();
                }}
                className={
                    editor.isActive("undo")
                    ? "bg-sky-700 text-white p-2 rounded-lg"
                    : "text-sky-400 hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg"
                }
                >
                <Undo className="w-5 h-5" />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().redo().run();
                }}
                className={
                    editor.isActive("redo")
                    ? "bg-sky-700 text-white p-2 rounded-lg"
                    : "text-sky-400 hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg"
                }
                >
                <Redo className="w-5 h-5" />
            </button>
        </div>
        {/* {content && (
            <button
            type="submit"
            className="px-4 bg-sky-700 text-white py-2 rounded-md"
            >
            Add
            </button>
        )} */}
        </div>
    );
    };

export default Toolbar;