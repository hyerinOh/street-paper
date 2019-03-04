import React, { Component } from 'react';
import './App.less';
import ShowPosts from './ShowPosts.js'
import mainImage from './blog.png';

export default class Articles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      isSearch: false,
      page: 0,
      sortStyle: 'asc',
      tagList: [],
      allPostLists: null,
      filteredByTags: []
    };
  }

  componentDidMount() {
    this.getPostLists();
    this.getTagLists();
  }

  onScrollNewPosts(ev) {
    const { page, isSearch } = this.state;

    if (ev.currentTarget.scrollHeight - (ev.currentTarget.offsetHeight + ev.currentTarget.scrollTop) < 200 && !isSearch) {
      this.setState({
        page: page + 1
      }, this.getPostLists);
    }
  }

  getPostLists() {
    const { sortStyle, page, posts } = this.state;

    this.setState({
      isSearch: true
    }, () => {
      fetch(`/api/v1/articles?limit=10&sort=${sortStyle}&pageIndex=${page}`)
        .then(res => res.json())
        .then(result => this.setState({
          posts: posts.concat(result.posts),
          isSearch: false
        }));
    });
  }

  getTagLists() {
    fetch('/api/v1/articles?limit=90')
      .then(res => res.json())
      .then((result) => {
        const tagArr = [];

        for (let i = 0; i < result.posts.length; i++) {
          for (let j = 0; j < result.posts[i].tags.length; j++) {
            if (!tagArr.includes(result.posts[i].tags[j])) {
              tagArr.push(result.posts[i].tags[j]);
            }
          }
        }

        const resolvedTags = tagArr.map((tag) => {
          return fetch(`/api/v1/tags/${tag}`).then(res => res.json());
        });

        const tagNameArr = [];
        Promise.all(resolvedTags).then((tagName) => {
          tagName.forEach((tagEl) => {
            tagNameArr[tagEl.id] = tagEl.name;
          });
          this.setState({
            tagList: tagNameArr,
            allPostLists: result.posts
          });
        });
      });
  }

  getTaggedPosts(target) {
    const { tagList, allPostLists } = this.state;

    const filteredLists = allPostLists.filter((currentPost) => {
      for (let i = 0; i < currentPost.tags.length; i++) {
        if (tagList[currentPost.tags[i]] === target) {
          return currentPost;
        }
      }
    });

    this.setState({
      filteredByTags: filteredLists
    });
  }

  getAllpostsAgain() {
    this.setState({
      posts: [],
      filteredByTags: [],
      isSearch: true,
    }, this.getPostLists);
  }

  clickAsc() {
    const { sortStyle, filteredByTags } = this.state;

    if (sortStyle !== 'asc') {
      if (filteredByTags.length) {
        const reversedTag = [...filteredByTags].reverse();

        this.setState({
          sortStyle: 'asc',
          filteredByTags: reversedTag
        });
      } else {
        this.setState({
          sortStyle: 'asc',
          page: 0,
          posts: []
        }, this.getPostLists);
      }
    }
  }

  clickDsc() {
    const { sortStyle, filteredByTags } = this.state;

    if (sortStyle !== 'dsc') {
      if (filteredByTags.length) {
        const reversedTag = [...filteredByTags].reverse();

        this.setState({
          sortStyle: 'dsc',
          filteredByTags: reversedTag
        });
      } else {
        this.setState({
          sortStyle: 'dsc',
          page: 0,
          posts: []
        }, this.getPostLists);
      }
    }
  }

  render() {
    const { tagList, filteredByTags, posts } = this.state;

    return (
      <div className="wrapper" onScroll={this.onScrollNewPosts.bind(this)}>
        <div className="sortingBtn">
          <i onClick={this.clickAsc.bind(this)} className="fas fa-sort-amount-up" />
          <i onClick={this.clickDsc.bind(this)} className="fas fa-sort-amount-down"></i>
        </div>
        <div className="tagList">
          <div onClick={this.getAllpostsAgain.bind(this)}>All</div>
          {
            tagList !== []
              ? tagList.map((tagName) => {
                return <p onClick={this.getTaggedPosts.bind(this ,tagName)} className="clickedTag"># {tagName}</p>;
              })
              : 'loading'
          }
        </div>
        <div>
          <img src={mainImage} className="mainImage" alt="mainImage" />
        </div>
        <ul className="listWrap">
          <ShowPosts
            post={
            filteredByTags.length
              ? filteredByTags
              : posts
          }
            tag={tagList}
          />
        </ul>
      </div>
    );
  }
}
