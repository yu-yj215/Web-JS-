import React, { useState } from 'react';
import Modal from './Modal'; // Modal 컴포넌트 추가
import './SeatClient.css'; // 좌석 스타일링을 위한 CSS 파일
import axios from 'axios';

const SeatClient = ({onLogout}) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [seat_Number, setSeatNumber] = useState(0);
  axios.defaults.withCredentials = true;
  const remaintime=300;

  const handleSeatClick = (seatNumber) => {
    // 선택된 좌석 배열을 업데이트
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
    // 넘버 업데이트
    setSeatNumber(seatNumber);
    console.log(seatNumber);

    // 모달 표시
    setShowModal(true);
  };

  const handleCloseModal = () => {
    // 모달 닫기
    setShowModal(false);
  };
  
  const check_in = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/check-in', {remaintime, seat_Number});
      
      console.log(response.data.message);
    } catch (error) {
      console.error('입실 실패:', error); 
    }
  };

  const check_out = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/check-out', {remaintime, seat_Number});
      console.log(response.data.message);
    } catch (error) {
      console.error('퇴실 실패:', error); 
    }
  };

  return (
    <div>
      <h2>Seat Client</h2>
      <div className="seat-container">
        {Array.from({ length: 52 }, (_, index) => (
          <button
            key={index + 1}
            className={`seat ${selectedSeats.includes(index + 1) ? 'selected' : ''}`}
            onClick={() => handleSeatClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <p>Selected Seats: {selectedSeats.join(', ')}</p>
      <button onClick={onLogout}>로그아웃</button>
      {/* 모달 컴포넌트*/}
      {showModal && (
      <Modal show={showModal} handleClose={handleCloseModal} check_in={check_in} check_out={check_out}>
        <h2>입실 퇴실 선택</h2>
        {/* 여기에 입실 퇴실 선택에 대한 내용을 추가하세요 */}
      </Modal>
      )}

      
    </div>
  );
};

export default SeatClient;
