import { useState, useMemo, useCallback } from "react";
import { Slate, Editable, withReact, ReactEditor, useSlate } from "slate-react";
import { createEditor, Descendant, Editor, Transforms, Element as SlateElement, BaseEditor, Range, Path, Text } from "slate";
import { withHistory, HistoryEditor } from "slate-history";
import slugify from "slugify";

import RenderSlateElement from "./special/render-slate-element";
import Button from "./button";
import InputDropdown from "./input-dropdown";
import ModalPostUploadImage from "./special/modal-post-upload-image";

type CustomText = { text: string; bold?: boolean; italic?: boolean; underline?: boolean };
type CustomElement =
    | { type: "paragraph"; children: CustomText[] }
    | { type: "image"; url: string; children: CustomText[] }
    | { type: "code"; children: CustomText[]; language?: string }
    | { type: "quote"; children: CustomText[] }
    | { type: "heading"; slug?: string; children: CustomText[] }

declare module "slate" {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor;
        Element: CustomElement;
        Text: CustomText;
    }
}

type InputTextExtraProps = {
  name?: string;
  inputValue?: Descendant[];
  defaultValue?: Descendant[];
  onChange?: (value: Descendant[]) => void; 
  height?: number;
  userdata: any;
  disabled?: boolean
};

export default function InputTextExtra({
  name,
  inputValue,
  defaultValue = [{ type: "paragraph", children: [{ text: "" }] }],
  onChange,
  height = 200,
  userdata,
  disabled = false
}: InputTextExtraProps) {      

  const [internalValue, setInternalValue] = useState<Descendant[]>(defaultValue);
  const currentValue = inputValue ?? internalValue;

  const handleChange = (newValue: Descendant[]) => {
    if (onChange) {
      onChange(newValue);
    }
    if (value === undefined) {
      setInternalValue(newValue);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const editor = useMemo(() => {
        let e: BaseEditor & ReactEditor = withReact(createEditor());
        e = withHistory(e) as BaseEditor & ReactEditor & HistoryEditor;
      
        e.isVoid = element => element.type === "image";
        e.isInline = element => element.type === "image";
      
        const { insertBreak } = e;
        e.insertBreak = () => {
          const [match] = Editor.nodes(e, { match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "code" });
          if (match) Editor.insertText(e, "\n");
          else insertBreak();
        };
      
        return e;
  }, []);           

    const [value, setValue] = useState<Descendant[]>([{ type: "paragraph", children: [{ text: "" }] }]);
    const [activeImagePath, setActiveImagePath] = useState<number[] | null>(null);
    const [codeLanguage, setCodeLanguage] = useState("");

    const toggleMark = useCallback((format: string) => {
        const marks = Editor.marks(editor);
        if (marks?.[format]) Editor.removeMark(editor, format);
        else Editor.addMark(editor, format, true);
    }, [editor]);

    const insertImage = useCallback((url: string) => {
        const image: CustomElement = { type: "image", url, children: [{ text: "" }] };
        Transforms.insertNodes(editor, image);

        const lastNode = editor.children[editor.children.length - 1];
        if (lastNode.type !== "paragraph") {
        Transforms.insertNodes(editor, { type: "paragraph", children: [{ text: "" }] }, { at: [editor.children.length] });
        }
    }, [editor]);

    const insertCodeBlock = useCallback((language = "javascript") => {
        // pastikan node pertama selalu paragraf
        if (editor.children.length === 0 || editor.children[0].type === "code") {
        Transforms.insertNodes(editor, { type: "paragraph", children: [{ text: "" }] }, { at: [0] });
        }

        const codeBlock: CustomElement = { type: "code", language, children: [{ text: "" }] };
        Transforms.insertNodes(editor, codeBlock);

        ensureLastParagraph(editor);
    }, [editor]);

    const insertQuote = useCallback(() => {
        const quoteBlock: CustomElement = { type: "quote", children: [{ text: "" }] };

        // pastikan selalu ada paragraf pertama sebelum quote jika editor kosong atau quote pertama
        if (editor.children.length === 0 || editor.children[0].type === "quote") {
        Transforms.insertNodes(editor, { type: "paragraph", children: [{ text: "" }] }, { at: [0] });
        }

        Transforms.insertNodes(editor, quoteBlock);
        ensureLastParagraph(editor);
    }, [editor]);  

    const insertHeadingBlock = useCallback(() => {
      // pastikan ada paragraf pertama jika editor kosong atau heading pertama
      const firstNode = editor.children[0];
      if (!firstNode || firstNode.type === "heading") {
        Transforms.insertNodes(editor, { type: "paragraph", children: [{ text: "" }] }, { at: [0] });
      }
    
      const headingBlock: CustomElement = { 
          type: "heading", 
          slug: "", // sementara kosong
          children: [{ text: "" }] 
      };
      Transforms.insertNodes(editor, headingBlock);
    
      // pastikan selalu ada paragraf terakhir
      const lastNode = editor.children[editor.children.length - 1];
      if (!lastNode || lastNode.type !== "paragraph") {
        Transforms.insertNodes(editor, { type: "paragraph", children: [{ text: "" }] }, { at: [editor.children.length] });
      }
    }, [editor]);

    const deleteImageBackend = async (imageUrl: string) => {
      try {
        // misal backend bisa menerima path relative storage
        const imagePath = imageUrl.replace(`${window.location.origin}/storage/`, '');
    
        const res = await fetch("/api/destroyimage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageupload_path: imagePath }),
        });
    
        const data = await res.json();
        if (!res.ok || data.status !== "success") {
          console.error("Gagal hapus image di backend:", data);
        }
      } catch (err) {
        console.error("Error hapus image di backend:", err);
      }
    };    

    const renderLeaf = useCallback(({ attributes, children, leaf }) => {
        if (leaf.bold) children = <strong>{children}</strong>;
        if (leaf.italic) children = <em>{children}</em>;
        if (leaf.underline) children = <u>{children}</u>;
        return <span {...attributes}>{children}</span>;
    }, []);

    const ensureFirstParagraph = useCallback(() => {
        const firstNode = editor.children[0];
        if (!firstNode || firstNode.type === "code" || firstNode.type === "image" || firstNode.type === "quote") {
        Transforms.insertNodes(editor, { type: "paragraph", children: [{ text: "" }] }, { at: [0] });
        }
    }, [editor]);  

    const ensureLastParagraph = useCallback((editor: Editor) => {
        const lastNode = editor.children[editor.children.length - 1];
        if (!SlateElement.isElement(lastNode) || lastNode.type !== "paragraph") {
        Editor.withoutNormalizing(editor, () => Transforms.insertNodes(editor, { type: "paragraph", children: [{ text: "" }] }, { at: [editor.children.length] }));
        }
    }, []);

    const updateHeadingSlugs = useCallback(() => {
        editor.children.forEach((node, index) => {
          if (!SlateElement.isElement(node) || node.type !== "heading") return;
      
          // gabungkan semua text di heading
          const text = node.children.map(c => Text.isText(c) ? c.text : "").join("");
      
          // buat slug
          const slug = slugify(text || `heading-${index}`, { lower: true, strict: true });
      
          // update node hanya jika slug berbeda
          if (node.slug !== slug) {
            Transforms.setNodes(editor, { slug }, { at: [index] });
          }
        });
    }, [editor]);                

    const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
      const { selection } = editor;
      if (!selection) return;

      // ----- Detect Backspace/Delete near image -----
      if (event.key === "Backspace" || event.key === "Delete") {
        const { selection } = editor;
        if (!selection) return;
      
        if (Range.isCollapsed(selection)) {
          // === CASE 1: caret ===
          if (event.key === "Backspace") {
            const before = Editor.before(editor, selection);
            if (before) {
              const [nodeEntry] = Editor.nodes(editor, {
                at: before,
                match: n => SlateElement.isElement(n) && n.type === "image"
              });
              if (nodeEntry) {
                event.preventDefault();
                const [node, path] = nodeEntry;
                Transforms.removeNodes(editor, { at: path });
                if ("url" in node && node.url) deleteImageBackend(node.url);
                return;
              }
            }
          } else if (event.key === "Delete") {
            const after = Editor.after(editor, selection);
            if (after) {
              const [nodeEntry] = Editor.nodes(editor, {
                at: after,
                match: n => SlateElement.isElement(n) && n.type === "image"
              });
              if (nodeEntry) {
                event.preventDefault();
                const [node, path] = nodeEntry;
                Transforms.removeNodes(editor, { at: path });
                if ("url" in node && node.url) deleteImageBackend(node.url);
                return;
              }
            }
          }
        } else {
          // === CASE 2: selection range (Ctrl+A, drag select, dsb) ===
          const imageNodes = Array.from(
            Editor.nodes(editor, {
              at: selection,
              match: n => SlateElement.isElement(n) && n.type === "image"
            })
          );
      
          if (imageNodes.length > 0) {
            event.preventDefault();
            for (const [node, path] of imageNodes) {
              Transforms.removeNodes(editor, { at: path });
              if ("url" in node && node.url) deleteImageBackend(node.url);
            }
            return;
          }
        }
      }      

        const [currentTextNode, textPath] = Editor.node(editor, selection.anchor.path);
        const [currentElementNode, elementPath] = Editor.parent(editor, textPath);
      
        // cari block terdekat
        const [block] = Editor.above(editor, {
          at: selection,
          match: n => SlateElement.isElement(n),
        }) || [];
      
        // ----- TAB di code block -----
        if (event.key === "Tab" && block && SlateElement.isElement(block) && block.type === "code") {
          event.preventDefault(); // stop browser tabbing
          Transforms.insertText(editor, "    "); // 4 spasi
          return;
        }
        
        if (SlateElement.isElement(currentElementNode) && currentElementNode.type === "heading") {
          if (event.key === "Enter") {
            event.preventDefault();
        
            const newParagraph: CustomElement = {
              type: "paragraph",
              children: [{ text: "" }],
            };
        
            // insert paragraph setelah heading
            Transforms.insertNodes(editor, newParagraph, { at: Path.next(elementPath) });
        
            // pindahkan cursor ke paragraph baru
            Transforms.select(editor, Editor.start(editor, Path.next(elementPath)));
            return;
          }
        }                     
      
        // ----- Ctrl/Cmd shortcuts -----
        if ((event.ctrlKey || event.metaKey) && Range.isCollapsed(selection)) {
          switch (event.key.toLowerCase()) {
            case "b":
              event.preventDefault();
              toggleMark("bold");
              return;
            case "i":
              event.preventDefault();
              toggleMark("italic");
              return;
            case "u":
              event.preventDefault();
              toggleMark("underline");
              return;
            case "z":
              event.preventDefault();
              HistoryEditor.undo(editor);
              return;
            case "y":
              event.preventDefault();
              HistoryEditor.redo(editor);
              return;
          }
        }
      
        // ----- ENTER di code block -----
        if (block && SlateElement.isElement(block) && block.type === "code") {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            Editor.insertText(editor, "\n");
            return;
          }
          if (event.key === "Enter" && event.shiftKey) {
            event.preventDefault();
            Transforms.insertNodes(editor, { type: "paragraph", children: [{ text: "" }] });
            return;
          }
        }

        // ----- Navigasi image -----
        let handled = false;
        if (event.key === "ArrowLeft") {
          const prev = Editor.previous(editor, { at: selection.anchor.path });
          if (prev && SlateElement.isElement(prev[0]) && prev[0].type === "image") {
            setActiveImagePath(prev[1]);
            handled = true;
          }
        } else if (event.key === "ArrowRight") {
          const next = Editor.next(editor, { at: selection.anchor.path });
          if (next && SlateElement.isElement(next[0]) && next[0].type === "image") {
            setActiveImagePath(next[1]);
            handled = true;
          }
        } else {
          setActiveImagePath(null);
        }
      
        if (handled) event.preventDefault();
    }, [editor, toggleMark]);      

    const languages = [
        ".env", "1c-enterprise","abap","abnf","actionscript","ada","agda","ags-script","alloy","alpine-abuild",
        "ampl","ant-build-system","antlr","apacheconf","apex","api-blueprint","apl","apollo-guidance-computer",
        "applescript","arc","arduino","asciidoc","asn.1","asp","aspectj","assembly","ats","augeas","autohotkey",
        "autoit","awk", "bash", "batchfile","befunge","bison","bitbake","blade","blitzbasic","blitzmax","bluespec","boo",
        "brainfuck","brightscript","bro","c","c#","c++","c-objdump","c2hs-haskell","cap'n-proto","cartocss","ceylon",
        "chapel","charity","chuck","cirru","clarion","clean","click","clips","clojure","cmake","cobol","coffeescript",
        "coldfusion","coldfusion-cfc","collada", "command", "common-lisp","component-pascal","cool","coq","cpp-objdump","creole",
        "crystal","cson","csound","csound-document","csound-score","css","csv","cuda","cycript","cython","d",
        "d-objdump","darcs-patch","dart","desktop","diff","digital-command-language","dm","dns-zone","dockerfile",
        "dogescript","dtrace","dylan","e","eagle","ebnf","ec","ecere-projects","ecl","eclipse","edn","eiffel","ejs",
        "elixir","elm","emacs-lisp","emberscript","eq","erlang","f#","factor","fancy","fantom","filebench-wml",
        "filterscript","fish","flux","formatted","forth","fortran","freemarker","frege","g-code","game-maker-language",
        "gams","gap","gcc-machine-description","gdb","gdscript","genie","genshi","gentoo-ebuild","gentoo-eclass",
        "gettext-catalog","gherkin","glsl","glyph","gn","gnuplot","go","golo","gosu","grace","gradle",
        "grammatical-framework","graph-modeling-language","graphql","graphviz-(dot)","groovy","groovy-server-pages",
        "hack","haml","handlebars","harbour","haskell","haxe","hcl","hlsl","html","html+django","html+ecr","html+eex",
        "html+erb","html+php","http","hy","hyphy","idl","idris","igor-pro","inform-7","ini","inno-setup","io","ioke",
        "irc-log","isabelle","isabelle-root","j","jasmin","java","java-server-pages","javascript","jflex","json","json5",
        "jsoniq","jsonld","jsx","julia","jupyter-notebook","kicad","kit","kotlin","krl","labview","lasso","latte",
        "lean","less","lex","lfe","lilypond","limbo","linker-script","linux-kernel-module","liquid","literate-agda",
        "literate-coffeescript","literate-haskell","livescript","llvm","logos","logtalk","lolcode","lookml","loomscript",
        "lsl","lua","m","m4","m4sugar","makefile","mako","markdown","mask","mathematica","matlab","maven-pom","max",
        "maxscript","mediawiki","mercury","meson","metal","minid","mirah","modelica","modula-2","module-management-system",
        "monkey","moocode","moonscript","mql4","mql5","mtml","muf","mupad","myghty","ncl","nemerle","nesc","netlinx",
        "netlinx+erb","netlogo","newlisp","nginx","nim","ninja","nit","nix","nl","nsis","nu","numpy","objdump",
        "objective-c","objective-c++","objective-j","ocaml","omgrofl","ooc","opa","opal","opencl","openedge-abl",
        "openrc-runscript","openscad","opentype-feature-file","org","ox","oxygene","oz","p4","pan","papyrus","parrot",
        "parrot-assembly","parrot-internal-representation","pascal","pawn","perl","perl6","php","pic","pickle","picolisp",
        "piglatin","pike","plpgsql","plsql","pod","pogoscript","pony","postscript","pov-ray-sdl","powerbuilder","powershell",
        "processing","prolog","propeller-spin","protocol-buffer","public-key","pug","puppet","pure-data","purebasic",
        "purescript","python","python-console","python-traceback","qmake","qml","r","racket","ragel","raml","rascal",
        "raw-token-data","rdoc","realbasic","reason","rebol","red","redcode","ren'py","renderscript","restructuredtext",
        "rexx","rhtml","rmarkdown","robotframework","roff","rouge","rpm-spec","ruby","runoff","rust","sage","saltstack",
        "sas","sass","scala","scaml","scheme","scilab","scss","self","shell","shellsession","shen","slash","slim","smali",
        "smalltalk","smarty","smt","sourcepawn","sparql","spline-font-database","sqf","sql","sqlpl","squirrel",
        "srecode-template","stan","standard-ml","stata","ston","stylus","sublime-text-config","subrip-text","supercollider",
        "svg","swift","systemverilog","tcl","tcsh","tea","terra","tex","text","textile","thrift","ti-program","tla","toml",
        "turing","turtle","twig","txl","typescript","unified-parallel-c","unity3d-asset","unix-assembly","uno","unrealscript",
        "urweb","vala","vcl","verilog","vhdl","vim-script","visual-basic","volt","vue","wavefront-material","wavefront-object",
        "web-ontology-language","webidl","wisp","world-of-warcraft-addon-data","x10","xbase","xc","xcompose","xml","xojo",
        "xpages","xproc","xquery","xs","xslt","xtend","yacc","yaml","yang","zephir","zimpl"
    ]; 

    const isMarkActive = (format: string) => {
        const marks = Editor.marks(editor);
        return marks ? marks[format] === true : false;
    };

    return (
        <div className={`bg-white rounded-lg shadow-sm/30 p-4 ${disabled ? "brightness-95 pointer-events-none" : ""}`}>
          <div className="mb-3">
              <div className="mb-3 flex gap-2">
              <Button type="button" onMouseDown={e => { e.preventDefault(); setIsModalOpen(true); }} className="w-40 bg-amber-100 hover:bg-amber-200 leading-3">Upload gambar<i className="fas fa-image ms-1"></i></Button>

              <Button type="button" onMouseDown={e => { e.preventDefault(); insertQuote(); }} className="w-40 bg-green-100 hover:bg-green-200 leading-3">Tambah kutipan<i className="fas fa-comment-alt ms-1"></i></Button>
              <InputDropdown options={languages.map(lang => ({ label: lang, value: lang }))} value={{ label: codeLanguage, value: codeLanguage }} onChange={selected => selected.value ? (setCodeLanguage(selected.value), insertCodeBlock(selected.value)) : setCodeLanguage("")} placeholder="Tambah kode..." className="w-40 text-sm" />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                  <Button type="button" onMouseDown={e => { e.preventDefault(); HistoryEditor.undo(editor); }} className="bg-gray-200 hover:bg-gray-300 px-2 rounded"><i className="fas fa-undo"></i></Button>
                  <Button type="button" onMouseDown={e => { e.preventDefault(); HistoryEditor.redo(editor); }} className="bg-gray-200 hover:bg-gray-300 px-2 rounded"><i className="fas fa-redo"></i></Button>
                  <div className="mx-3">|</div>
                  <Button type="button" onMouseDown={e => { e.preventDefault(); toggleMark("bold"); }} className={`w-10 font-bold ${isMarkActive("bold") ? 'bg-blue-200' : 'bg-gray-100'} hover:bg-gray-200`}>B</Button>
                  <Button type="button" onMouseDown={e => { e.preventDefault(); toggleMark("italic"); }} className={`w-10 italic ${isMarkActive("italic") ? 'bg-blue-200' : 'bg-gray-100'} hover:bg-gray-200`}>I</Button>
                  <Button type="button" onMouseDown={e => { e.preventDefault(); toggleMark("underline"); }} className={`w-10 underline ${isMarkActive("underline") ? 'bg-blue-200' : 'bg-gray-100'} hover:bg-gray-200`}>U</Button>
                  <div className="mx-3 hidden md:block">|</div>
                  <Button type="button" onMouseDown={e => { e.preventDefault(); insertHeadingBlock(); }} className="w-40 bg-purple-100 hover:bg-purple-200">Tambah Bab</Button>
              </div>
          </div>

          <Slate 
            editor={editor} initialValue={value} 
            onChange={newValue => { 
              handleChange(newValue);
              setValue(newValue); ensureLastParagraph(editor); ensureFirstParagraph(); updateHeadingSlugs(); 
              console.log(JSON.stringify(editor.children, null, 2));
            }}
          >
            <Editable
            placeholder="Tulis konten di sini..."
            style={{ direction: "ltr", textAlign: "left", height: height + "px", overflowY: "auto", outline: "none", lineHeight: 1.5 }}
            renderLeaf={renderLeaf}
            renderElement={props => (
                <RenderSlateElement {...props} editor={editor} activeImagePath={activeImagePath} viewMode="editor" />
            )}
            onKeyDown={handleKeyDown}
            onPaste={event => {
                const { selection } = editor;
                if (!selection) return;              
                const [match] = Editor.nodes(editor, {
                  match: n => SlateElement.isElement(n) && n.type === "code",
                });
                if (match) {
                  event.preventDefault();
                  const text = event.clipboardData.getData("text/plain");
                  Editor.insertText(editor, text);
                }
            }}              
            />
          </Slate>

          { name && (
            <input type="hidden" name={name} value={JSON.stringify(value)} />
          )}

          <ModalPostUploadImage
            cropMode="flex"
            isModalOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            insertImage={insertImage}
            userId={userdata.user_id} 
          />
        </div>
    );
}
