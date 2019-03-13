import React from 'react';
import axios from 'axios';

const Modal = ({ handleClose, show }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <form>
      <div className={showHideClassName}>
        <div className="modal-main">
          <button type="button" onClick={handleClose}>close</button>
          <input
            type="text"
            name="nickNameForm"
            className="nickNameForm"
            //닉네임 받아오기
          />
          <input
            type="text"
            name="memoForm"
            className="memoForm"
          />
          <button
            type="submit"
            value="Submit"
            className="saveBtn"
            onClick={createPaper}
          >
            save
          </button>
        </div>
      </div>
    </form>
  );
};


export default Modal;
