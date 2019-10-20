import React from 'react';
import ReactDom from 'react-dom';
import TitleBlock from './title_block.js';

const AddPost = () => (
        <div className="row">
            <TitleBlock tb="Добавить пост"/>
            <div class="input-field col s12">
                <textarea id="textarea1" className="materialize-textarea"></textarea>
                <label for="textarea1">Ваш текст</label>
            </div>
            <button className="btn right btn-flat">Отмена</button>
            <button className="btn right blue darken-4">Добавить пост</button>
        </div>
);
export default AddPost;

