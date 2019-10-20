import React from 'react';
import ReactDom from 'react-dom';
import TitleBlock from './title_block.js';

const Filters = ({users}) => {
    let options = users.map((user, id) => <option value={id} key={id}>{user.name}</option>);        
    return (
    <div className="row">
        <TitleBlock tb="Фильтры"/>

    <div className="col s12 m6">
            <div className="row">
                <div className="input-field col s12">
                    <select style={{display: 'block'}}>
                        <option value="" disabled selected>Выберите пользователя</option>
                        {options}
                    </select>
                </div>
            </div>
        </div>
        
        <div className="col s12 m6">
            <div className="input-field col s12">
                <input placeholder="Поиск по тексту" type="text" className="validate" />
            </div>
        </div>
    </div>
);};
export default Filters;

