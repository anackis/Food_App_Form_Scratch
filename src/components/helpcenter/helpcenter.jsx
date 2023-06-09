
import React, { useState } from 'react';
import './helpcenter.scss';

const HelpCenter = () => {
  const [message, setMessage] = useState('');
  const [isMessageSent, setIsMessageSent] = useState(false);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    setIsMessageSent(false);
  };

  const handleSendMessage = () => {
    console.log('Message:', message);
    setIsMessageSent(true);
    setMessage('');
  };

  return (
    <section className='helpcenter'>
      <div className="helpcenter__wrapper">

        <span>Contact us if you have any questions or problems</span>
        <textarea
          className='helpcenter__textarea'
          value={message}
          onChange={handleMessageChange}
          placeholder="Type your message"
        ></textarea> 

        <button onClick={handleSendMessage}>Send a message</button>

        {isMessageSent && (
          <div className='helpcenter__message'>
            We will contact you soon!
          </div>
        )}

      </div>
    </section>
  );
};

export default HelpCenter;