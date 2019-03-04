import React from 'react';
import './App.less';
import grayPinkImage from './gray_pink.png';
import greenImage from './gray_green.png';
import blueImage from './blue.png';

function AdminTheme(props) {
  return (
    <div className="themeStyle">
      <div className="grayTheme">
        <img src={grayPinkImage} className="gray_pink_image" alt="gray_pink_image" />
        <button type="button" className="defaultBtn" onClick={props.chooseType.bind(this, 'defaultTheme')}>default</button>
      </div>

      <div className="greenTheme">
        <img src={greenImage} className="green_image" alt="green_image" />
        <button type="button" className="secondBtn" onClick={props.chooseType.bind(this, 'greenTheme')}>green</button>
      </div>

      <div className="blueTheme">
        <img src={blueImage} className="blue_image" alt="blue_image" />
        <button type="button" className="thirdBtn" onClick={props.chooseType.bind(this, 'blueTheme')}>blue</button>
      </div>
    </div>
  );
}

export default AdminTheme;
