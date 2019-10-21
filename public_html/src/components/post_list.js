import React from 'react';
import ReactDom from 'react-dom';
import TitleBlock from './title_block.js';
import Post from './post.js';

const PostList = ({posts, users, toggleToDel, deletePosts}) => {
        let arPosts = posts.
            map((post) => { if (post) { return <Post id={post.id} 
                            userName={users[post.userId].name}
                            userEmail={users[post.userId].email}
                            text={post.title}
                            toggleToDel={toggleToDel}
                            key={post.id}
                        />;}});
        return (
            <div className="row">
                <TitleBlock tb="Список сообщений"/>
                {arPosts}
                <button className="btn right blue darken-4" onClick={deletePosts}>Удалить отмеченные</button>
            </div>
        );
};
export default PostList;

