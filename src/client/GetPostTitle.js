import React, { Component } from 'react';
import './App.less';
import Page404 from './page404.js';

export default class GetPostTitle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postContent: null,
      commentlist: null
    };
  }

  componentDidMount() {
    this.switchIdToTitle();
  }

  switchIdToTitle() {
    fetch(`/api/v1/articles/${this.props.location.listId}`)
      .then(res => res.json())
      .then((result) => {
        fetch(`/api/v1/articles/${this.props.location.listId}/comments`)
          .then(res => res.json())
          .then((comment) => {
            this.setState({
              postContent: result,
              commentlist: comment
            });
          });
      });
  }

  render() {
    const { postContent, commentlist } = this.state;
    return (
      <div>
        {
          postContent !== null && !postContent.message
            ? (
              <div>
                <img src={postContent.thumbnail_image_url ? postContent.thumbnail_image_url : 'https://dubsism.files.wordpress.com/2017/12/image-not-found.png'} className="linkedImage" alt="linkedImage" />
                <p className="linkedTitle">{postContent.title}</p>
                <p className="linkedBy">{postContent.by}</p>
                <p className="linkedAt">{postContent.created_at}</p>
                <p>{postContent.body}</p>
                <div className="tagDiv">
                  {
                    postContent.tags.map((tag) => {
                      return <p className="linkedTag"># {this.props.location.tagList[tag]}</p>
                    })
                  }
                </div>
                {
                  commentlist.map((comment) => {
                    return (
                      <div className="commentDiv">
                        <p>{comment.by}</p>
                        <p>{comment.created_at}</p>
                        <p>{comment.text}</p>
                      </div>
                    );
                  })
                  }
              </div>
            )
            : <Page404 />
        }
      </div>
    );
  }
}
