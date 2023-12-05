// Modal.js
import React from 'react';
import './Modal.css'; // 모달 스타일링을 위한 CSS 파일

const Modal = ({ handleClose, show, children, check_in, check_out }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button onClick={check_in}>입실</button>
        <button onClick={check_out}>퇴실</button>
        <button onClick={handleClose}>닫기</button>
      </section>
    </div>
  );
};

export default Modal;
