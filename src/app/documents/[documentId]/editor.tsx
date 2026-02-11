 'use client'

 import {useEditor, EditorContent} from '@tiptap/react'
 import StarterKit from '@tiptap/starter-kit'
// Task lists
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
// Tables
import {Table} from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'

//IMAGES
import Image from '@tiptap/extension-image'
import ImageResize from '@tiptap/extension-image'
import Dropcursor from '@tiptap/extension-dropcursor'

import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
 export const Editor = () => {
  const editor = useEditor({
      editorProps: {
        attributes:{
          style: "padding-left: 56px; padding-right: 56px; min-height: 400px;",
          class: "flex flex-col w-[816px] min-h-[1054px] pt-10 pb-10 px-14 border border-[#C7C7C7] cursor-text focus:outline-none print:border-0 "
        }
      },
      extensions: [
          StarterKit,
          TaskList,
          TaskItem.configure({ nested: true }),
          Table.configure({
            resizable: true,
          }),
            TableRow,
            TableHeader,
            TableCell,
            Dropcursor,

            Image,
            ImageResize,
        ],

       content: `
      `,
      immediatelyRender: false,
  })

    if (!editor) {
    return null
  }

   return (
     <main className=' relative size-full min-h-screen px-16 left-[50%] bg-slate-100 overflow-x-auto 
                      print:p-0 print:bg-white print:overflow-visible'>
      <div className=' flex justify-center max-w-min w-[816px] py-4 mx-auto print:y-0 print:min-w-0'></div>
      <EditorContent  className="min-h-[300px] bg-white border" editor={editor}/>
     </main>
   )
 }
 
