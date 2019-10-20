import React from 'react';
import ReactDom from 'react-dom';
import TitleBlock from './title_block.js';
import Post from './post.js';

const PostList = ({posts, users}) => {
        let arPosts = Object.keys(posts).
            map( i => <Post id={posts[i].id} 
                            userName={users[posts[i].userId].name}
                            userEmail={users[posts[i].userId].email}
                            text={posts[i].title}
                            key={posts[i].id}
                        />);
        return (
            <div className="row">
                <TitleBlock tb="Список сообщений"/>
                {arPosts}
                <button className="btn right blue darken-4">Удалить отмеченные</button>
            </div>
        );
};
export default PostList;

