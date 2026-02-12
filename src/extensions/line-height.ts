import { Extension } from "@tiptap/core"

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    lineHeight: {
      setLineHeight: (lineHeight: string) => ReturnType
      unsetlineHeight: () => ReturnType
    }
  }
}

export const LineHeightExtension = Extension.create({
  name: "lineHeight",

  addOptions() {
    return {
      types: ["paragraph", "heading"],
      defaultHeight: 'normal',
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: this.options.defaultHeight,
            parseHTML: element => element.style.lineHeight || this.options.defaultHeight,
            renderHTML: attributes => {
              if (!attributes.lineHeight) {
                return {}
              }

              return {
                style: `line-height: ${attributes.lineHeight}`,
              }
            },
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setLineHeight:
        (lineHeight: string) =>  ({ tr, state, dispatch }) => {
         const { selection } = state;
         tr = tr.setSelection(selection);

         const {from, to } = selection;
         state.doc.nodesBetween(from, to, (node, pos) => {
            if(this.options.types.includes(node.type.name)){
                tr = tr.setNodeMarkup(pos, undefined, {
                    ...node.attrs,
                    lineHeight,
                })
            }
         })

            if (dispatch) dispatch(tr)
                return true;
        },

    unsetlineHeight: () => ({ tr, state, dispatch }) => {
       const { selection } = state;
       tr = tr.setSelection(selection);

       const { from, to } = selection;
       state.doc.nodesBetween(from, to , (node, pos) => {
            if (this.options.types.includes(node.type.name)) {
                tr = tr.setNodeMarkup(pos, undefined, {
                    ...node.attrs,
                    LineHeigh: this.options.defaultHeight
                })
            }
       })
        if (dispatch) dispatch(tr)
            return true;
     },
    }
  },
})
