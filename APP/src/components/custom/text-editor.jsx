import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import {
  convertToRaw,
  EditorState,
  ContentState,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TextEditor = ({
  value = "",
  setValue,
  title,
  placeholder,
  height = 400,
  error,
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (
      value &&
      draftToHtml(convertToRaw(editorState.getCurrentContent())) !== value
    ) {
      const blocksFromHTML = convertFromHTML(value);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [value]);

  const onEditorStateChange = (state) => {
    setEditorState(state);
    const content = convertToRaw(state.getCurrentContent());
    const html = draftToHtml(content);
    if (setValue) setValue(html);
  };

  return (
    <div
      className="border p-4 rounded-lg overflow-auto"
      style={{ height: `${height}px` }}
    >
      <div className="flex flex-col">
        <Label className="mb-4">{title}</Label>
        <Editor
          className="dark:text-white dark:bg-slate-800"
          placeholder={placeholder}
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          toolbar={{
            inline: { options: ["bold", "italic", "underline"] },
            list: { options: ["unordered", "ordered"] },
            indent: { options: ["indent", "outdent"] },
          }}
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default TextEditor;
