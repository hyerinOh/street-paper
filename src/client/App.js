import React, { Component } from 'react';
import {
  BrowserRouter as
  Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import './App.less';
import Articles from './Articles.js';
import GetPostTitle from './GetPostTitle.js';
import AdminPosts from './AdminPosts.js';
import page404 from './page404.js';
import AdminTheme from './AdminTheme.js';
import LinkingButton from './LinkingButton.js';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      themeType: 'defaultTheme'
    };

    this.chooseType = this.chooseType.bind(this);
  }

  chooseType(type) {
    this.setState({
      themeType: type
    });
  }

  render() {
    const { themeType } = this.state;

    return (
      <Router>
        <div className={themeType}>
          <LinkingButton />
          <Switch>
            <Route
              exact
              path="/"
              component={Articles}
            />
            <Route
              exact
              path="/articles"
              component={Articles}
            />
            <Route
              exact
              path="/articles/:postId"
              component={GetPostTitle}
            />
            <Route
              exact
              path="/admin"
              render={() => <Redirect to="admin/posts" />}
            />
            <Route
              exact
              path="/admin/posts"
              component={AdminPosts}
            />
            <Route
              exact
              path="/admin/theme"
              render={() => <AdminTheme chooseType={this.chooseType} />}
            />
            <Route component={page404} />
          </Switch>
        </div>
      </Router>
    );
  }
}
