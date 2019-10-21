import React from 'react';
import ReactDom from 'react-dom';
import TitleBlock from './title_block.js';

const AddPost = ({addedTextPost, clearText, writeTextForPost, addPost}) => (
        <div className="row">
            <TitleBlock tb="Добавить пост"/>
            <div className="input-field col s12">
                <textarea 
                    id="textarea" 
                    className="materialize-textarea" 
                    placeholder="Напишите тут ваш пост"
                    value={addedTextPost}
                    onChange={writeTextForPost()}
                >
                </textarea>
            </div>
            <button className="btn-large right grey lighten-2 blue-text" onClick={clearText}>Отмена</button>
            <button className="btn-large right grey lighten-5 black-text" onClick={addPost}>Добавить пост</button>
        </div>
);
export default AddPost;

