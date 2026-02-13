
"use client"

import { cn } from '@/lib/utils';
import useEditorStore from '@/app/store/use-editor';
import {type ColorResult, CirclePicker, SketchPicker } from 'react-color';
import {type Level} from "@tiptap/extension-heading"

import { LucideIcon, Undo2Icon, Redo2Icon, PrinterIcon, SpellCheckIcon,
  BoldIcon, UnderlineIcon, ItalicIcon, 
  MessageSquare,
  ListTodoIcon,
  RemoveFormattingIcon,
  ChevronDownIcon,
  HighlighterIcon,
  Link2Icon,
  ImageIcon,
  UploadIcon,
  SearchIcon,
  AlignLeftIcon,
  AlignRightIcon,
  AlignCenterIcon,
  AlignJustifyIcon,
  Icon,
  ListIcon,
  ListOrderedIcon,
  MinusIcon,
  PlusIcon,
  ListCollapseIcon} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"
import 
    { Dialog,
      DialogContent, DialogFooter, DialogHeader, DialogTitle
    } from "@/components/ui/dialog";

import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { useRef } from 'react';

const FontSizeButton = () => {
  const { editor } = useEditorStore();
  
  const inputRef = useRef<HTMLInputElement>(null);
  const currentFontSize =
    editor?.getAttributes("textStyle").fontSize?.replace("px", "") || "16";

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(currentFontSize);

//   // CHAT GPT USER SELECTION
//   useEffect(() => {
//   if (!editor) return;

//   const updateFromSelection = () => {
//     const size =
//       editor.getAttributes("textStyle").fontSize?.replace("px", "") || "16";

//     setInputValue(size);
//   };

//   editor.on("selectionUpdate", updateFromSelection);
//   editor.on("transaction", updateFromSelection);

//   return () => {
//     editor.off("selectionUpdate", updateFromSelection);
//     editor.off("transaction", updateFromSelection);
//   };
// }, [editor]);


  const updateFontSize = (value: string) => {
    const size = parseInt(value);
    if (!isNaN(size) && size > 0) {             //! MOVED THE FOCUS FROM updateFontSize AND increment AND decrement 
      editor?.chain().setFontSize(`${size}px`).run();
    }
    setIsEditing(true);
  };

  const increment = () => {
    const size = parseInt(currentFontSize) + 1;
    editor?.chain().setFontSize(`${size}px`).run(); //! MOVED THE FOCUS FROM updateFontSize AND increment AND decrement 
  };

  const decrement = () => {
    const size = parseInt(inputValue) - 1;            //! MOVED THE FOCUS FROM updateFontSize AND increment AND decrement 
    if (size > 0) {
      editor?.chain().setFontSize(`${size}px`).run();
    }
  };

  return (
    <section className="flex items-center gap-x-0.5 bg-white border border-slate-200">

      {/* DECREMENT */}
      <button
        className="flex items-center justify-center w-7 h-7 rounded-sm hover:bg-neutral-200/80"
        onMouseDown={(e) => e.preventDefault()}
        onClick={decrement}
      >
        <MinusIcon className="size-4" />
      </button>

      {/* VISUAL VALUE WHEN USER IS TYPING VS IDLE */}
      {isEditing ? (
        <input
         ref={inputRef}
          type="text"
          autoFocus
          value={inputValue}
          onChange={(e) => {
          const value = e.target.value;
          setInputValue(value);

          const size = parseInt(value);
          if (!isNaN(size) && size > 0) {
            // because I Want the focus to stay in this input field
            editor?.chain().setFontSize(`${size}px`).run();
          }
        }}
          onFocus={(e) => {
            // Highlights the text when the user first clicks in
            e.target.select();
          }}

        onBlur={() => { updateFontSize(inputValue); setIsEditing(false)}}
         onKeyDown={(e) => {
              if (e.key === "Enter") {
                // Finally focus editor when user is DONE typing
                editor?.chain().focus().setFontSize(`${inputValue}px`).run();
                setIsEditing(false);
              }
              if (e.key === "Escape") {
                setIsEditing(false);
                editor?.commands.focus();
                
              }
              // Fixed logic: Arrow keys update input and editor simultaneously
              if (e.key === 'ArrowUp') {
                e.preventDefault();
                setInputValue(inputValue);

                increment();
              }
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setInputValue(inputValue);
                decrement();
              }
          }}
          className="w-10 h-7 border border-neutral-300 text-center text-sm rounded-sm bg-transparent cursor-text focus:outline-none"
        />

      ) : (
        <button
          onMouseDown={(e) => e.preventDefault()}  
          onClick={() => {
            setInputValue(currentFontSize);
            setIsEditing(true);
          }}
          className="w-10 h-7 border border-neutral-300 text-center text-sm rounded-sm bg-transparent"
        >
          {currentFontSize}
        </button>
      )}

      {/* INCREMENT */}
      <button
        className="flex items-center justify-center w-7 h-7 rounded-sm hover:bg-neutral-200/80"
        onClick={increment}
      >
        <PlusIcon className="size-4" />
      </button>
    </section>
  );
};



const ListButton = () => {
  
  const {editor} = useEditorStore();
  const lists = [
    {
      label: 'Bullet List',
      icon: ListIcon,
      isActive: () => editor?.isActive('bulletList'),
      onClick: () => editor?.chain().focus().toggleBulletList().run()
    },
      {
      label: 'Ordered List',
      icon: ListOrderedIcon,
      isActive: () => editor?.isActive('orderedList'),
      onClick: () => editor?.chain().focus().toggleOrderedList().run()

    }, 
  ]
    return(
    <section>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex flex-col items-center justify-center 
           w-7 h-7 px-4 rounded-sm shrink-0 hover:bg-neutral-200/80">
             <ListIcon className='size-4'/>
          </button>
        </DropdownMenuTrigger>
          <DropdownMenuContent className='p-3 bg-[#b8d3ff] border-t-2 '>
            {lists.map(({label, icon: Icon, onClick, isActive}) => (
              <button
              key={label}
              className={cn(
                'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
                isActive() && "bg-neutral-200/80"
              )}
              onClick={onClick}>
                <Icon className='size-4'/>
                <span className='text-sm'>{label}</span>
              </button>

            ))}
          </DropdownMenuContent>
      </DropdownMenu>
    </section>
    );
  }
const LineHeightButton = () => {
  
  const {editor} = useEditorStore();

  const lineHeights = [
    {
      label: 'Default',
      value: 'normal',
    },
      {
      label: 'Single',
      value: '1',
    },  
    {
      label: '1.15',
      value: '1.15',
    },
      {
      label: '1.5',
      value: '1.5',
    },
  ]
    return(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex flex-col items-center justify-center 
          min-w-7 w-7 h-7 px-4 rounded-sm shrink-0 hover:bg-neutral-200/80">
             <ListCollapseIcon className='size-4'/>
          </button>
        </DropdownMenuTrigger>

          <DropdownMenuContent className='p-3 bg-[#b8d3ff] border-t-2 '>
            {lineHeights.map(({label, value,}) => (
              <button
              key={value}
              onClick={() => editor?.chain().focus().setLineHeight(value).run()}
              className={cn(
                'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
                editor?.getAttributes("paragraph").lineHeight === value && "bg-neutral-200/80"
              )}
>
                <span className='text-sm'>{label}</span>
              </button>

            ))}
          </DropdownMenuContent>
      </DropdownMenu>
    );
  }

const AlignButton = () => {
  
  const {editor} = useEditorStore();
  const alignments = [
    {
      label: 'Align Left',
      value: 'left',
      icon: AlignLeftIcon
    },
      {
      label: 'Align Center',
      value: 'center',
      icon: AlignCenterIcon,
    },  {
      label: 'Align Right',
      value: 'right',
      icon: AlignRightIcon
    },
      {
      label: 'Align Justify',
      value: 'justify',
      icon: AlignJustifyIcon
    },
  ]
    return(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex flex-col items-center justify-center 
          min-w-7 w-7 h-7 px-4 rounded-sm shrink-0 hover:bg-neutral-200/80">
             <AlignLeftIcon className='size-4'/>
          </button>
        </DropdownMenuTrigger>
          <DropdownMenuContent className='p-3 bg-[#b8d3ff] border-t-2 '>
            {alignments.map(({label, value, icon: Icon}) => (
              <button
              key={value}
              className={cn(
                'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
                editor?.isActive({ textAlign: value }) && "bg-neutral-200/80"
              )}
              onClick={() => editor?.chain().focus().setTextAlign(value).run()}>
                <Icon  className='size-4'/>
                <span className='text-sm'>{label}</span>
              </button>

            ))}
          </DropdownMenuContent>
      </DropdownMenu>
    );
  }

const ImageButton = () => {
  const {editor} = useEditorStore();
  const [imageUrl, setImageUrl] = useState ("")
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({src}).run();
  };

  const onUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
  
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        onChange(imageUrl) 
      }
    }
    input.click()
  }

  const handleImageUrlSubmit = () => {
    if (imageUrl){
      onChange(imageUrl);
      setImageUrl("");
      setIsDialogOpen(false);
    }
  }
  return (
    <section>
      <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <button className="flex flex-col items-center justify-center 
          min-w-7 w-7 h-7 px-4 rounded-sm shrink-0 hover:bg-neutral-200/80">
              <ImageIcon className='size-4'/>
          </button>
        </DropdownMenuTrigger>
          <DropdownMenuContent className='p-3 flex flex-col gap-x-2 bg-slate-200 border-t-2 hover:cursor-pointer'>
           <DropdownMenuItem className="flex items-center hover:cursor-pointer" onClick={() => onUpload()}>
                <UploadIcon className='size-4 mr-2'/>
                Upload
           </DropdownMenuItem>
           <DropdownMenuItem className="flex items-center hover:cursor-pointer" onClick={() => setIsDialogOpen(true)}>
            <SearchIcon className='size-4 mr-2'/>
              Paste image url
           </DropdownMenuItem>
          </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Insert image url
            </DialogTitle>
          </DialogHeader>
          <Input 
          placeholder='Insert image'
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          onKeyDown={(e) => {
            if(e.key === 'Enter'){
              handleImageUrlSubmit();
            }
          }}
          />
           <DialogFooter>
          <button onClick={handleImageUrlSubmit}>
            Insert
          </button>
        </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}


const LinkButton = () => {
  const {editor} = useEditorStore();
  const [value, setValue] = useState ("")
  
  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({href}).run();
    editor?.chain().focus().toggleUnderline().run();
    setValue("")
  }
  return (
    <DropdownMenu onOpenChange={(open) =>{
      if(open) {
        setValue(editor?.getAttributes("link").href || '');
      }
    }}>
        <DropdownMenuTrigger asChild>
          <button className="flex flex-col items-center justify-center 
           w-7 h-7 rounded-sm shrink-0 hover:bg-neutral-200/80">
              <Link2Icon className='size-4'/>
          </button>
        </DropdownMenuTrigger>
          <DropdownMenuContent className='p-3 flex itemx-center gap-x-2 bg-slate-200 border-t-2 '>
            <Input 
            placeholder='https://example.com+'
            value={value}
            className='bg-white'
            onChange={(e) => setValue(e.target.value)}/>

            <button onClick={() => onChange(value)}>
              Apply
            </button>
          </DropdownMenuContent>
      </DropdownMenu>
  );
}

const HighligtherButton = () => {
  
  const {editor} = useEditorStore();
  const value = editor?.getAttributes("highlight").color || "#FFFFFF";

  const onChange = (color : ColorResult) => {
    editor?.chain().focus().setHighlight({color: color.hex}).run();
  }
    return(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex flex-col items-center justify-center 
          min-w-7 w-7 h-7 px-4 rounded-sm shrink-0 hover:bg-neutral-200/80">
              <HighlighterIcon className='size-4'/>
          </button>
        </DropdownMenuTrigger>
          <DropdownMenuContent className='p-3 bg-[#b8d3ff] border-t-2'>
              <CirclePicker 
                color= {value}
                onChange={onChange}
              />
          </DropdownMenuContent>
      </DropdownMenu>
    );
  }


const TextColorButton = () => {
  const {editor} = useEditorStore();
  const value = editor?.getAttributes('textStyle').color || "#000000";

  const onChange = (color : ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  }
    return(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex flex-col items-center justify-center px-3 rounded-sm 
          shrink-0 hover:bg-neutral-200/80">
              <span className=''>Color</span>
              <span className='h-1 w-full' style={{backgroundColor: value}}></span>
          </button>
        </DropdownMenuTrigger>
          <DropdownMenuContent className=' bg-[#b8d3ff] border-t-2 '>
              <SketchPicker 
                color= {value}
                onChange={onChange}
              />
          </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  
const HeadingLevelButton = () => {
  const {editor} = useEditorStore();

  const headings = [
    { label:'Normal text', value: 0, fontSize: "16px" },
    { label:'Heading 1', value: 1, fontSize: "40px" },
    { label:'Heading 2', value: 2, fontSize: "28px" },
    { label:'Heading 3', value: 3, fontSize: "20px" },
    { label:'Heading 4', value: 4, fontSize: "16px" },
    { label:'Heading 4', value: 5, fontSize: "12px" },
  ];

  const getCurrentHeading = () => {
    for (let level = 1; level <=5; level++){
      if (editor?.isActive("heading", {level})){
        return `Heading ${level}`
      }
    }
    return "Normal text";
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
          <button
          className= "flex items-center justify-center h-7 px-2 rounded-sm shrink-0 hover:bg-neutral-200/80"
          >
            <span className='truncate'>
              {getCurrentHeading()}               
              </span> 
              <ChevronDownIcon className='ml-2 size-4 shrink-0'/>
          </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-y-2 p-3 border-t-2 bg-[#b8d3ff] ">
        {headings.map(({label, value, fontSize}) => (
          <button key={value}
          onClick={() =>{
            if (value === 0){
              editor?.chain().focus().setParagraph().run()
            }
            else{
              editor?.chain().focus().toggleHeading({level: value as Level}).run()
            }
          }}
            style={{ fontSize }}
            className={cn(
              "flex items-center gap-x-2 py-1 rounded-sm hover:bg-neutral-300/80",
              (value === 0 && !editor?.isActive('heading')) || editor?.isActive('heading', {level: value}) && 'bg-neutral-200/80'
            )}
            >
              {label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const FontFamilyButton = () => {
  const {editor} = useEditorStore();

  const fonts = [
    {label : "Arial", value: 'Arial'},
    {label : "Times New Roman", value: 'Times New Roman'},
    {label : "Courier New", value: 'Courier New'},
    {label : "Georgia", value: 'Georgia'},   
  ]

  return(
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
          <button
          className={cn(
            "flex items-center justify-center h-7 px-2 rounded-sm shrink-0 hver:bg-red-200/80"
          )}
          >
            <span className='truncate'>
              {/* //! Doesn't Work ("textStyle").FontFamily */}
              {editor?.getAttributes('textStyle').fontFamily || 'Arial'}               
              </span> 
              <ChevronDownIcon className='ml-2 size-4 shrink-0'/>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='flex flex-col gap-y-1 p-3 border-t-2 bg-[#b8d3ff] '>
          {fonts.map(({label, value}) => (
              <button key={value}
                onClick={() => editor?.chain().focus().setFontFamily(value).run()}
                className={cn(
                  "flex items-center gap-x-2 px-2 py-1 border-t-2 rounded-sm hover:bg-neutral-200/80",
                  editor?.getAttributes('textStyle').fontFamily === value && 'bg-neutral-200/80'
                )}
                style={{fontFamily: value}}
            >
                <span className='text-sm'>{label}</span>
                </button>
          ))}
        </DropdownMenuContent>
    </DropdownMenu>
    
  )
}

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

  const ToolbarButton = ({
    onClick,
    isActive,
    icon: Icon,
  }: ToolbarButtonProps) =>{

  return (
      <button onClick={onClick}
      className={cn( 
          "text-sm h-7 w-7 flex items-center justify-center rounded-sm hover:bg-red-200/80",
            isActive && "bg-neutral-400/80"
          )}> 
      <Icon className='size-4'/>
      </button>
    )
  }

const Toolbar = () => {

  const { editor } = useEditorStore();
  
  const sections : {

    label: string; 
    icon: LucideIcon; isActive?: boolean; 
    onClick: () => void;
      } [] [] = [
        [
      {
        label: 'Undo',
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: 'Redo',
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: 'Print',
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
       {
        label: 'Spell Check',
        icon: SpellCheckIcon,
        onClick: () => {
          // NATIVE BROWSER SPELLCHECKER !
          const current = editor?.view.dom.getAttribute('spellcheck');
          editor?.view.dom.setAttribute('spellcheck', current === "false" ? "true" : "false")
        },
      },       
    ],
    [
      {
        label: 'Bold',
        icon: BoldIcon,
        isActive: editor?.isActive("bold"),
        onClick: () => editor?.chain().focus().toggleBold().run()
      },
        {
        label: 'Italic',
        icon: ItalicIcon,
        isActive: editor?.isActive("italic"),
        onClick: () => editor?.chain().focus().toggleItalic().run()
      },
        {
        label: 'Underline',
        icon: UnderlineIcon,
        isActive: editor?.isActive("underline"),
        onClick: () => editor?.chain().focus().toggleUnderline().run()
      },

       {
        label: 'Comment',
        icon: MessageSquare,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: 'List Todo',
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleBlockquote().run(),
        isActive: editor?.isActive("blockquote"),
      },
       {
        label: 'Remove Format',
        icon: RemoveFormattingIcon,
        isActive: editor?.isActive("remove"),
        onClick: () => editor?.chain().focus().unsetAllMarks().run()
      },
    ]
  ]

  return (
    <div className='bottom-0 flex items-center justify-center max-w-screen mt-auto px-4 py-2 gap-x-1
    bg-[#b8d3ff] text-black z-10'>
      
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item}/>
      ))}
      <Separator orientation='vertical' className='h-6 w-[2px] bg-neutral-500'/>

      <FontFamilyButton />
      <Separator orientation='vertical' className='h-6 w-[0.9px] bg-neutral-500'/>

      
      <HeadingLevelButton />
      <Separator orientation='vertical' className='h-6 w-[0.9px] bg-neutral-500'/>

       <TextColorButton />
      <Separator orientation='vertical' className='h-6 w-[0.9px] bg-neutral-500'/>

      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item}/>
      ))}

       {/* {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item}/>
      ))} 
   */}
   
      <AlignButton />

      <FontSizeButton />
      
      <HighligtherButton />
      <Separator orientation='vertical' className='h-6 w-[0.9px] bg-neutral-500'/>
      
       <LinkButton />
      <Separator orientation='vertical' className='h-6 w-[0.9px] bg-neutral-500'/>

      <ImageButton />
      <Separator orientation='vertical' className='h-6 w-[0.9px] bg-neutral-500'/>
    
      <ListButton />
      <Separator orientation='vertical' className='h-6 w-[0.9px] bg-neutral-600'/>

      <LineHeightButton />

  
    </div>

  );
}

export default Toolbar