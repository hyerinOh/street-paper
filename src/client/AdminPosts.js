import React, { Component } from 'react';
import './App.less';

export default class AdminPosts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      posts: [],
      totalCount: null
    };
  }

  componentDidMount() {
    this.getPostsInAdminMode();
  }

  getPostsInAdminMode() {
    const { page } = this.state;

    fetch(`/api/v1/articles?limit=10&pageIndex=${page}`)
      .then(res => res.json())
      .then(result => this.setState({
        posts: result.posts,
        totalCount: result.total_post_count
      }));
  }

  deletePosts(articleId) {
    fetch(`/api/v1/articles/${articleId}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(() => this.getPostsInAdminMode());
  }

  clickPrevBtn() {
    const { page } = this.state;
    this.setState({
      page: page - 1
    }, this.getPostsInAdminMode);
  }

  clickNextBtn() {
    const { page } = this.state;
    this.setState({
      page: page + 1
    }, this.getPostsInAdminMode);
  }

  render() {
    const { totalCount, posts, page } = this.state;
    let totalPage;

    if (totalCount % 10 === 0) {
      totalPage = (totalCount / 10) - 1;
    } else {
      totalPage = parseInt(totalCount / 10);
    }
    return (
      <div>
        <ul>
          {
            posts.length > 0
              ? posts.map((post) => {
                return (
                  <li className="adminPostList">
                    <p>{post.title}</p>
                    <p>{post.created_at}</p>
                    <button type="button" className="deleteBtn" onClick={this.deletePosts.bind(this, post.id)}>delete</button>
                  </li>
                );
              })
              : 'wait'
          }
        </ul>
        <div className="pageBtn">
          <button type="button" className="prev" disabled={page === 0} onClick={this.clickPrevBtn.bind(this)}>prev</button>
          <p>{page}</p>
          <button type="button" className="next" disabled={page === totalPage - 1} onClick={this.clickNextBtn.bind(this)}>next</button>
        </div>
      </div>
    );
  }
}
