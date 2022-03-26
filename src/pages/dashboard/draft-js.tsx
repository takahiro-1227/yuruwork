import { Editor, EditorState, RichUtils, DraftEditorCommand, Modifier, SelectionState, ContentState, convertToRaw, ContentBlock } from 'draft-js';
import { useState, useEffect, FunctionComponent } from 'react';
import 'draft-js/dist/Draft.css';
import { Button } from '@mui/material';
import { makeStyles } from '@material-ui/styles'
import { ClassNames } from '@emotion/react';

// const useStyles = makeStyles(() => ({
//   bold: {
//     backgroundColor: "#000"
//   }
// }));

const DraftJs = () => {
  // const classes = useStyles();
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [editorEnable, setEditorEnable] = useState(false);

  useEffect(() => {
    setEditorEnable(true);
  }, []);

  useEffect(() => {
    const currentContent = editorState.getCurrentContent();
    console.log(convertToRaw(currentContent))
    // const currentStateWithText = currentContent.set(
    //   'Text',
    //   ContentState.createFromText
    // )
  }, [editorState]);


  const handleKeyCommand = (command: DraftEditorCommand, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  }

  const BLOCK_TYPES = [
    {label: 'H1', style: 'h1'},
    {label: 'H2', style: 'h2'},
    {label: 'H3', style: 'h3'},
    {label: 'UL', style: 'ul'},
    {label: 'OL', style: 'ol'},
    {label: 'Blockquote', style: 'blockquote'},
  ];

  const blockStyleFn = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType();

    for(const typeItem of BLOCK_TYPES) {
      if (typeItem.label === type) {
        return `editor-${typeItem.style}`;
      }
    }

    return '';
  }

  const toggleBlockType = (typeLabel: string) => setEditorState(RichUtils.toggleBlockType(editorState, typeLabel));

  interface BlockTypes {
    blockTypes: {
      label: string, style: string
    }[];
    toggleBlockType: (type: string) => void;
  }

  const BlockStyleControls: FunctionComponent<BlockTypes> = ({ blockTypes, toggleBlockType }) => {

    return (
      <div className="buttons">
        {blockTypes.map((type) => {
          return (
            <Button key={type.label} onClick={() => toggleBlockType(type.label)}>
              {type.label}
            </Button>
          )
        })}
      </div>
    )
  };

  const onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  }
  const onItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'))
  }

  // const selectionState = new SelectionState();

  // const contentState = editorState.getCurrentContent();
  // const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', {
  //   url: 'http://www.zombo.com',
  // });
  // const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  // const contentStateWithLink = Modifier.applyEntity(
  //   contentStateWithEntity,
  //   selectionState,
  //   entityKey,
  // );
  // const newEditorState = EditorState.set(editorState, {
  //   currentContent: contentStateWithLink,
  // });

  return (
    <>
      {editorEnable && (
        <div>
          <div className="buttons">
            <Button onClick={() => onBoldClick()}>Bold</Button>
            <Button onClick={() => onItalicClick()}>Italic</Button>
          </div>
          <BlockStyleControls blockTypes={BLOCK_TYPES} toggleBlockType={toggleBlockType}/>
          <div className="editorBox">
            <Editor 
            editorState={editorState}
            handleKeyCommand={handleKeyCommand} 
            onChange={setEditorState}
            blockStyleFn={blockStyleFn} />
          </div>
          <style jsx>{`
            .buttons {
              display: flex;
              gap: 10px;
            }
            .editorBox {
              border: 1px solid #000;
              padding: 10px;
            }
            .editorBox .h2 {
              font-size: 1.4em;
              font-weight: bold;
            }
          `}
          </style>
        </div>
      )}
    </>
  )
}

export default DraftJs;
