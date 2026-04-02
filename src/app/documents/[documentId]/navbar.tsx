'use client'

import Link from 'next/link'
import Image from "next/image"
import { BsFilePdf } from "react-icons/bs";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger
} from "@/components/ui/menubar";
import { BoldIcon, FileIcon, FileJson, FileJsonIcon, FilePenIcon, FilePlusIcon, GlobeIcon, ItalicIcon, PrinterIcon, Redo2Icon, StrikethroughIcon, TextIcon, TrashIcon, UnderlineIcon, Undo2Icon } from 'lucide-react';

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

import useEditorStore from '@/app/store/use-editor';
import DocumentInput from './document-input'
import { RenameDialog } from '@/components/rename-dialog';
import { RemoveDialog } from '@/components/remove-dialogue';

interface NavbarProps {
  documentId: string;
};

const Navbar = ({ documentId }: NavbarProps) => {

  const { editor } = useEditorStore();
  const data = useQuery(api.documents.getDocument, { id: documentId as Id<"documents"> });

  const insertTable = ({rows, cols} : { rows: number, cols: number }) => {
    editor?.chain().focus().insertTable({ rows, cols, withHeaderRow: false }).run()
  }
    // ALL FUNCTION WILL BUILD FROM HERE
    const onDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
  };


    const onSaveHTML = () => {}
    const onSaveText = () => {}
    const onNewDocument = () => {}
    
    const onSaveJSON = () => {
    if (!editor) return;

    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content)], {
      type: "application/json",
    });
    onDownload(blob, `${data?.title}.json`)
  };

    // ✅ Handle loading state (undefined)
    if (data === undefined) {
      return (
        <div className="flex items-center justify-between px-8">
          <div className="h-8 w-48 bg-gray-200 animate-pulse rounded" />
        </div>
      );
    }
    // ✅ Handle not found state (null)
    if (data === null) {
      return (
        <div className="flex items-center justify-between px-8">
          <div className="text-red-500">Document not found</div>
        </div>
      );
    }

  return (
    <nav className='flex items-center justify-between px-8'>
         <div className='flex gap-2 items-center'>
          <Link href='/'>
            <Image src='/next.svg' alt='Logo' width={36} height={36}/>
          </Link>
          <div className='flex flex-col'> 
            <DocumentInput />
            <section className="flex">
              <Menubar className='border-none bg-transparent shadow-none h-auto p-0'>
                  <MenubarMenu>
                    <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px]
                          rounded-sm hover:bg-muted'>
                        File
                    </MenubarTrigger>
                    <MenubarContent className="print:hidden">
                      <MenubarSub> 
                          <MenubarSubTrigger>
                            Save 
                          </MenubarSubTrigger>
                          <MenubarSubContent>
                            <MenubarItem onClick={onSaveJSON}>
                              <FileJsonIcon className='size-4 mr-2'/>
                              JSON
                            </MenubarItem>
                              <MenubarItem onClick={onSaveHTML}>
                              <GlobeIcon className='size-4 mr-2'/>
                              HTML
                            </MenubarItem>
                            <MenubarItem onClick={() => window.print()}>
                                <BsFilePdf className="size-4 mr-2" />
                                  PDF
                              </MenubarItem>
                              <MenubarItem onClick={onSaveText}>
                              <FileJsonIcon className='size-4 mr-2'/>
                                Text
                            </MenubarItem>
                          </MenubarSubContent>
                        </MenubarSub>
                        
                        <MenubarItem onClick={onNewDocument}>
                          <FilePlusIcon className='size-4 mr-2'/>
                           New Document
                        </MenubarItem>
                        <MenubarSeparator />
                        <RenameDialog documentId={data._id} initialTitle={data.title}>
                        <MenubarItem
                          onClick={(e) => e.stopPropagation()}
                          onSelect={(e) => e.preventDefault()}>
                          <FilePenIcon className="size-4 mr-2" />
                            Rename
                        </MenubarItem>
                          </RenameDialog>
                           <RemoveDialog documentId={data._id}>
                          <MenubarItem
                            onClick={(e) => e.stopPropagation()}
                            onSelect={(e) => e.preventDefault()}
                          >
                            <TrashIcon className="size-4 mr-2" />
                            Remove
                          </MenubarItem>
                        </RemoveDialog>
                            <MenubarItem onClick={() => window.print()}>
                            <PrinterIcon className="size-4 mr-2" />
                            Print <MenubarShortcut>⌘P</MenubarShortcut>
                        </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>


                 {/* FILE MENU ENDS FILE MENU ENDS FILE MENU ENDS FILE MENU ENDS FILE MENU ENDS */}
                <MenubarMenu>
                  <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted'>
                      Edit
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                      <Undo2Icon className='size-4 mr-2'/>
                      Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                      <Redo2Icon className='size-4 mr-2'/>
                      Redo <MenubarShortcut>⌘Y</MenubarShortcut>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>


                {/* EDIT MENU ENDS  EDIT MENU ENDS  EDIT MENU ENDS  EDIT MENU ENDS  EDIT MENU ENDS */}
                <MenubarMenu>
                      <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted'>
                        Insert
                    </MenubarTrigger>
                    <MenubarContent>
                      <MenubarSub>
                      <MenubarSubTrigger>Table</MenubarSubTrigger>
                      <MenubarSubContent>
                        <MenubarItem onClick={() => insertTable({ rows: 1 , cols: 1 })}>
                          1 x 1
                        </MenubarItem>
                        <MenubarItem onClick={() => insertTable({ rows: 2 , cols: 2 })}>
                          2 x 2
                        </MenubarItem>
                        <MenubarItem onClick={() => insertTable({ rows: 3 , cols: 3 })}>
                          3 x 3
                        </MenubarItem>
                        <MenubarItem onClick={() => insertTable({ rows: 4 , cols: 4 })}>
                          4 x 4
                        </MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                  </MenubarContent>
                </MenubarMenu>


                {/* INSERT MENU  ENDS   INSERT MENU  ENDS   INSERT MENU  ENDS   INSERT MENU  ENDS   INSERT MENU  ENDS  */}
                <MenubarMenu>
                    <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted'>
                        Format
                    </MenubarTrigger>
                    <MenubarContent>
                    <MenubarSub> 

                      <MenubarSubTrigger>
                        <TextIcon className="size-4 mr-2"/>
                        Text
                      </MenubarSubTrigger>
                          <MenubarSubContent>
                              <MenubarItem>
                                <BoldIcon className='size-4 mr-2'/>
                                    Bold       <MenubarShortcut>⌘B</MenubarShortcut>
                                </MenubarItem> 
                                <MenubarItem>
                                  <ItalicIcon className='size-4 mr-2'/>
                                    Italic      <MenubarShortcut>I</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem>
                                  <UnderlineIcon className='size-4 mr-2'/>
                                    Underline     <MenubarShortcut>⌘U</MenubarShortcut>
                                </MenubarItem>  
                                <MenubarItem>
                                  <UnderlineIcon className='size-4 mr-2'/>
                                  <StrikethroughIcon className='size-4 mr-2'/> 
                                    Strikethrough <MenubarShortcut>⌘S</MenubarShortcut>
                                </MenubarItem>
                        </MenubarSubContent>
                        
                    </MenubarSub>
                  </MenubarContent>
                </MenubarMenu>
            </Menubar>
          </section>
          </div>
        </div> 
    </nav>
  )
}

export default Navbar