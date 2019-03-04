import React, { Component } from 'react';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import './App.less';

export default class ShowPosts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      this.props.post.length > 0
        ? this.props.post.map((post) => {
          return (
            <li className="postLists">
              <Link
                to={{
                  pathname: `/articles/${post.title.split(' ').join('-')}`,
                  listId: post.id,
                  tagList: this.props.tag
                }}
                className="listStyle"
              >
                <img src={post.thumbnail_image_url ? post.thumbnail_image_url : 'https://dubsism.files.wordpress.com/2017/12/image-not-found.png'} className="postImage" alt="postImage" />
                <div className="content">
                  <p className="contentTitle">{post.title}</p>
                  <p className="contentBy">{post.by}</p>
                  <p className="contentCreatedAt">{post.created_at}</p>
                  <div className="tagWrap">
                    {
                      this.props.tag !== null
                        ? post.tags.map((tagId) => {
                          return <p className="ContentTag">#{this.props.tag[tagId]}</p>;
                        })
                        : 'loading'
                    }
                  </div>
                  <p className="contentComments">comments : {post.comments_count}</p>
                </div>
              </Link>
            </li>
          );
        })
        : 'load'
    );
  }
}
