'use client'

import Image from 'next/image'
import Link from 'next/link'
import DocumentInput from './document-input'

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
import { BoldIcon, FileIcon, FileJson, FileJsonIcon, FilePenIcon, FilePlusIcon, GlobeIcon, ItalicIcon, Redo2Icon, StrikethroughIcon, TextIcon, UnderlineIcon, Undo2Icon } from 'lucide-react';
import { BsFilePdf } from 'react-icons/bs';


const Navbar = () => {
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
                              onSelect={(e) => e.preventDefault()}
                            >
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
                </MenubarMenu>

                {/* INSERT MENU  ENDS   INSERT MENU  ENDS   INSERT MENU  ENDS   INSERT MENU  ENDS   INSERT MENU  ENDS  */}
                <MenubarMenu>
                    <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted'>
                      Format
                  </MenubarTrigger>
                  <MenubarContent>
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
                        <StrikethroughIcon className='size-4 mr-2'> 
                        Strikethrough <MenubarShortcut>⌘S</MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
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