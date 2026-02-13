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
import { ResizableImage } from './ResizableImage'
import Image from '@tiptap/extension-image'
import Link from "@tiptap/extension-link"

// STYLES
import Underline from '@tiptap/extension-underline'
import FontFamily from "@tiptap/extension-font-family"
import TextStyle from '@tiptap/extension-text-style'
import TextAlign from '@tiptap/extension-text-align'
import Color from "@tiptap/extension-color"
import Highlight from "@tiptap/extension-highlight"

import { FontSizeExtension } from '@/extensions/font-size'
import { Separator } from '@/components/ui/separator';
import Paragraph from '@tiptap/extension-paragraph'
import { LineHeightExtension } from '@/extensions/line-height'

  // ZUSTAND
import useEditorStore from '@/app/store/use-editor'
import Ruler from './ruler'

 export const Editor = () => {
  const { setEditor } = useEditorStore()

  const editor = useEditor({

    onCreate({editor}){
      setEditor (editor)
    },
    onDestroy(props){
      setEditor(null)
    },
    onUpdate({editor}){
      setEditor(editor)
    },
    onSelectionUpdate({editor}){
      setEditor(editor)
    },
      onTransaction({editor}){
      setEditor(editor)
    },
      onFocus({editor}){
      setEditor(editor)
    },
      onBlur({editor}){
      setEditor(editor)
    },
      onContentError({editor}){
      setEditor(editor)
    },
      editorProps: {
        attributes:{
          style: "padding-left:30px; padding-right:30px; padding-top: 25px; \
                  padding-down:25px; min-height: 400px;",
          class: " "
        }
      },
      extensions: [
          StarterKit,
          FontSizeExtension,
          LineHeightExtension.configure({
            types: ["heading", "paragraph"],
            defaultHeight: "normal"
          }),

          FontFamily,
          Color,
          Highlight.configure({
            multicolor: true
          }),
          
          Link.configure({
            openOnClick: false,
            autolink: true,
            defaultProtocol: 'https'
          }),

          Paragraph,
          TextStyle,
          TextAlign.configure({
            types: ['heading', 'paragraph'],
            alignments: ['left', 'center', 'right', 'justify'],
          }),
       
          Underline,
          TaskList,
          TaskItem.configure({ nested: true }),

          Table.configure({
            resizable: true,
          }),
            TableRow,
            TableHeader,
            TableCell,
            Image,
            ResizableImage, 
        ],

       content: `
          <table>
            <tr>
              <th>Company</th>
              <th>Contact</th>
              <th>Country</th>
            </tr>
              <tr>
              <td>Alfreds Futterkiste</td>
              <td>Maria Anders</td>
              <td>Germany</td>
            </tr>
          </table>
      `,
      immediatelyRender: false,
  })

    if (!editor) {
    return null
  }

   return (
     <main className='px-48 mx-auto bg-white shadow-sm print:shadow-none'>
      <Ruler />
      <Separator orientation='horizontal' className='w-full bg-neutral-300' />
      <EditorContent 
        className="ProseMirror w-full min-h-[1056px] border-2 border-neutral-300 cursor-text focus:outline-none" 
        editor={editor}
    />
  </main>
   )
 }
 
