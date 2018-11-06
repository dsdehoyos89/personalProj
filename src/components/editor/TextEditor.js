import React, { Component } from 'react';
import { EditorState, RichUtils, SelectionState, convertToRaw, convertFromRaw } from 'draft-js';
import editor from '../editor/editor.css';
import Editor from 'draft-js-plugins-editor';
import HlPlugin from '../plugins/HlPlugin';
import axios from 'axios';

class TextEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editorState: EditorState.createEmpty()
        };

        const highlightPlugin = HlPlugin();

        this.plugins = [
            highlightPlugin,
        ];




    }




    onChange = (editorState) => {
        this.setState({
            editorState
        })
    }

    handleKeyCommand = (command) => {
        const newState =
            RichUtils.handleKeyCommand(this.state.editorState, command)

        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    onItalicClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
    }

    onUnderlineClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'))
    }

    onBoldClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
    }

    onHighlight = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'HIGHLIGHT'))
    }

    getEditorState() {
        const { reply: { channel, userAccount } } = this.props
        const content = this.getEditorContent({ channel, userAccount })
        const decorators = this.getEditorDecorators(channel)
        const state = EditorState.createWithContent(content, decorators)
        return EditorState.moveSelectionToEnd(state)
    }

    submitDream = () => {
        let contentState = this.state.editorState.getCurrentContent();
        console.log(contentState);
        let dream = { content: convertToRaw(contentState) };
        console.log(dream.content.blocks[0].text);
        console.log(dream.content)
        axios.post('http://localhost:4000/api/dreams', {
            dream: dream.content.blocks[0].text,
            category: 'private',
            user_id: 3
        });

    };







    render() {
        console.log(this.state.editorState)
        return (
            <div className="bigContainer">
                <div className="editorContainer">
                    <button onClick={this.onItalicClick}>I</button>
                    <button onClick={this.onUnderlineClick}>U</button>
                    <button onClick={this.onBoldClick}>B</button>
                    <button className='highlight' onClick={this.onHighlight}>
                        <span style={{ background: 'yellow' }}>H</span>
                    </button>
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        handleKeyCommand={this.handleKeyCommand}
                        plugins={this.plugins}
                        placeholder="Click Right Under Here to Enter dream..."
                    />

                </div>
                <button className="btn" onClick={this.submitDream}>Submit Dream</button>
            </div>
        )
    }
}

export default TextEditor;