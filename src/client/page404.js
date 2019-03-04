import React from 'react';
import './App.less';
import errorImage from './error.png';

export default function page404() {
  return (
    <img src={errorImage} className="error" alt="errorImg" />
  );
}
