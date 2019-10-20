import React from 'react';
import ReactDom from 'react-dom';

const Post = ({id, userName, userEmail, text}) => (
    <div className="col s12 valign-wrapper" style={{border: 'solid #ccc 1px'}}>
        <div className="col s9">
            <h6 className="left-align blue-text text-darken-2">{userName}</h6>
            <p className="left-align">email: {userEmail}</p>
            <p className="left-align">{text}</p>
        </div>
        <div className="col s3">
            <p>
                <label>
                    <input type="checkbox" data-id={id} className="filled-in" />
                    <span></span>
                </label>
            </p>
        </div>
    </div>
);
export default Post;