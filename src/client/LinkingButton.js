import React from 'react';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import './App.less';

function LinkingButton() {
  return (
    <div className="linkingbtn">
      <Link to='/articles' className="homeBtn">Vanilla Blog</Link>
      <div>
        <Link to='/admin/posts' className="postBtn">post</Link>
        <Link to='/admin/theme' className="themeBtn">theme</Link>
      </div>
    </div>
  );
}

export default LinkingButton;
