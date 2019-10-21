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
            postList: null,
            tnpPostList: null,
            deletedPosts: [],
            addedTextPost: '',
            maxPostId: 100
        }
    }
    
/*
 * Получаем посты и пользователей с сервера, ответ преобразуем в массив
 */
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
                arUsers[this.state.userId] = {
                    name: this.state.userName,
                    email: this.state.userEmail
                };
                this.setState({
                    userList: arUsers
                })
            })
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(posts => {
                let arPosts = [];
                for (let i in posts) {
                    arPosts[posts[i].id] = {
                        id: posts[i].id,
                        userId: posts[i].userId,
                        title: posts[i].title                
                    };
                };
                this.setState({
                    postList: arPosts,
                    tnpPostList: arPosts
                })
            })                  
    }
    
    /*
     * Реакция на выбор чекбокса у поста
     */
    toggleToDel() {
        return postId => () => {
            let delPosts = this.state.deletedPosts;
            let toDel = delPosts.includes(postId) ? delPosts.filter(i => i !== postId) : [...delPosts, postId];
            this.setState({
                deletedPosts: toDel
            })
        }
    }
    
    /*
     * Отправляем запросы на удаление выбранных постов, при отрицательном ответе,
     *  выводим сообщение пользователю
     */
    deletePosts() {
        return () => {
            this.state.deletedPosts.forEach(postId => {
                fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
                      method: 'DELETE'
                }).then(response => {
                    if (response.ok) {
                        let toDel = this.state.deletedPosts.filter(i => i !== postId);
                        let posts = this.state.postList.filter((post) => post.id !== postId);
                        this.setState({
                            deletedPosts: toDel,
                            postList: posts,
                            tnpPostList: posts
                        });
                    } else {
                        alert(`Ошибка при удалении ${postId} поста, код ответа: `, response.status)
                    }
                })
            })
        
        }
    }
    
    /*
     * Выбираем пользователя в фильтре, фильтруем посты в соответствии с выбранным пользователем
     */
    selectUser() {
        return () => e => {
            if (e.target.value == this.state.userId) {
                let arPosts = this.state.postList.filter(post => {
                    if (post) return (post.userId == e.target.value)
                })
                this.setState({
                    postList: arPosts,
                    tnpPostList: arPosts
                })
            } else {
                let userId = (e.target.value == 'all') ? '': `?userId=${e.target.value}`;
                fetch(`https://jsonplaceholder.typicode.com/posts${userId}`)
                    .then(response => response.json())
                    .then(posts => {
                        let arPosts = [];
                        for (let i in posts) {
                            arPosts[posts[i].id] = {
                                id: posts[i].id,
                                userId: posts[i].userId,
                                title: posts[i].title                
                            };
                        };
                        this.setState({
                            postList: arPosts,
                            tnpPostList: arPosts
                        })
                    })        
            }
        }
    }
    
    /*
     * Фильтруем по тексту поста, здесь это поле title
     */
    textFilter() {
        return () => e => {
            let filter = e.target.value;
            if (filter) {
                let posts = this.state.tnpPostList.filter(post => post.title.includes(filter))
                this.setState({
                    postList: posts
                })
            } else {
                this.setState({
                    postList: this.state.tnpPostList
                })
            }
        }
    }
    
    /*
     * Записываем текущее состояние textarea.
     */
    writeTextForPost() {
        return () => e =>{
            this.setState({
                addedTextPost:e.target.value
            })
        }
    }
    
    /*
     * Отправляем запрос на добавление поста, при отрицательном ответе, выводим
     * сообщение пользователю
     */
    addPost() {
        return () => {
            if (this.state.addedTextPost != '') {
                fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    body: JSON.stringify({
                        title: this.state.addedTextPost,
                        body: '',
                        userId: this.state.userId
                    }),
                    headers: {
                      "Content-type": "application/json; charset=UTF-8"
                    }
                })
                   .then(response => {
                        if (response.ok) {
                            let maxPostId = this.state.maxPostId + 1;
                            let newPost = {
                                id: maxPostId,
                                userId: this.state.userId,
                                title: this.state.addedTextPost                
                            }
                            let posts = [...this.state.postList, newPost];
                            this.setState({
                                maxPostId: maxPostId,
                                postList: posts,
                                tmpPostList: posts
                            })
                        } else {
                            alert('Не удалось добавить пост');
                        }
                    }
                )
            }
        }
    }
    
    /*
     * Очищаем текщее значение textareA
     */
    clearText() {
        return () => {
            this.setState({
                addedTextPost: ''
            })
        }
    }

    render() {
        if (this.state.userList && this.state.postList) {
            return (
                <div className="card container" style={{padding: '5px', margin: 'auto'}}>
                    <Filters 
                        users={this.state.userList}
                        selectUser={this.selectUser()}
                        textFilter={this.textFilter()}
                    />
                    <PostList 
                        posts={this.state.postList} 
                        users={this.state.userList} 
                        deletedPosts={this.state.deletedPosts}
                        toggleToDel={this.toggleToDel()}
                        deletePosts={this.deletePosts()} 
                    />
                    <AddPost 
                        addedTextPost={this.state.addedTextPost}
                        addPost={this.addPost()}
                        writeTextForPost={this.writeTextForPost()}
                        clearText={this.clearText()}
                    />
                </div>
            )
        }
        return (
            <div className="container">Нет ответа от сервера</div>
        )
    }
}