import React, { useState, useEffect } from 'react';

const NotificationCard = (props) => {
  const [isClosed, setIsClosed] = useState(false);

  const handleClose = () => {
    setIsClosed(true);
  };

  return (
    !isClosed && (
      <div className="max-w-sm mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <div className="card-body">
          <button
            className="close-button"
            onClick={handleClose}
            aria-label="Close"
          >
            X
          </button>
          <h5 className="text-xl font-semibold mb-2">{props.title}</h5>
          <p className="text-sm text-gray-700 mb-4">{props.content}</p>
        </div>
      </div>
    )
  );
};

// const TimedCard = () => {
//   const [cards, setCards] = useState([
//     { rid: 1, title: 'Water reminder', content: 'Have Water', timeout: 5000, isVisible: false }, 
//     { rid: 2, title: 'Rest reminder', content: 'Take some rest', timeout: 5000, isVisible: false }, 
//     { rid: 3, title: 'Sleep reminder', content: 'Please sleep now', timeout: 5000, isVisible: false }, 
//   ]);

//   useEffect(() => {
//     const cardTimeouts = cards.map((card) =>
//       setTimeout(() => {
//         // Update the cards state to make the specific card visible
//         setCards((prevCards) =>
//           prevCards.map((prevCard) =>
//             prevCard.rid === card.rid ? { ...prevCard, isVisible: true } : prevCard
//           )
//         );
//       }, card.timeout)
//     );

//     // Clear timeouts if the component unmounts
//     return () => cardTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
//   }, [cards]);

//   return (
//     <div>
//       {cards.map((card) => (
//         card.isVisible && (
//           <NotificationCard
//             key={card.rid} // Use rid as the key
//             title={card.title}
//             content={card.content}
//           />
//         )
//       ))}
//     </div>
//   );
// };

export default TimedCard;
