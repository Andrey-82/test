import React from 'react';
import ReactDom from 'react-dom';
import Filters from './filters.js';
import PostList from './post_list.js';
import AddPost from './add_post.js';

export default class App extends React.Component{
    constructor() {
        super();
        this.state = {
            userId: 11,
            userName: 'Ivan Ivanov',
            userEmail: 'Ivanov@mail.ru',
            userList: null,
            postList: null
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => {
                let arUsers = [];
                for (let i in users) {
                    arUsers[users[i].id] = {
                        name: users[i].name,
                        email: users[i].email                
                    };
                }
                this.setState({
                    userList: arUsers
                })
            })
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(posts => {
                this.setState({
                    postList: posts
                })
            })                  
    }

    render() {
        if (this.state.userList && this.state.postList) {
            return (
                <div className="card container" style={{padding: '5px', margin: 'auto'}}>
                    <Filters users={this.state.userList}/>
                    <PostList posts={this.state.postList} users={this.state.userList} />
                    <AddPost />
                </div>
            )
        }
        return (
            <div className="container">Нет ответа от сервера</div>
        )
    }
}