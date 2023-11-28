import React, { useState } from 'react';
import './SeatClient.css'; // 좌석 스타일링을 위한 CSS 파일

const SeatClient = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatNumber) => {
    // 선택된 좌석 배열을 업데이트
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  return (
    <div>
      <h2>Seat Client</h2>
      <div className="seat-container">
        {Array.from({ length: 50 }, (_, index) => (
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
    </div>
  );
};

export default SeatClient;
