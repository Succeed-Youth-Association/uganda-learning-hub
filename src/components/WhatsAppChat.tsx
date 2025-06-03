import React, { useState, useEffect, useRef } from 'react';

const WhatsAppChat: React.FC = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [message, setMessage] = useState('');
  const chatElementRef = useRef<HTMLDivElement>(null);
  
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return "Hello, good morning! ☀️";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Hello, good afternoon! 🌤️";
    }
    return "Hello, good evening! 🌙";
  };

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    
    const phoneNumber = "+256750687790";
    const whatsappUrl = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      ? `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, "_blank");
    setMessage("");
  };

  const handleCloseChat = () => {
    setIsChatVisible(false);
  };

  const handleToggleChat = () => {
    setIsChatVisible(!isChatVisible);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          #africavotes-chat {
            box-sizing: border-box !important;
            outline: none !important;
            position: fixed;
            width: 350px;
            border-radius: 10px;
            box-shadow: 0 1px 15px rgba(32, 33, 36, .28);
            bottom: 90px;
            right: 30px;
            overflow: hidden;
            z-index: 99;
            animation-name: showchat;
            animation-duration: 1s;
            transform: scale(1);
          }

          a.africaVotesChat {
            background: #fff;
            color: #404040;
            position: fixed;
            display: flex;
            font-weight: 400;
            justify-content: space-between;
            z-index: 98;
            bottom: 25px;
            right: 30px;
            font-size: 15px;
            padding: 10px 20px;
            border-radius: 30px;
            box-shadow: 0 1px 15px rgba(32, 33, 36, .28);
            cursor: pointer;
            text-decoration: none;
          }

          a.africaVotesChat svg {
            transform: scale(1.2);
            margin: 0 10px 0 0;
          }

          .header-chat {
            background: #009688;
            background: #095e54;
            color: #fff;
            padding: 20px;
            text-align: left;
          }

          .header-chat h3 {
            margin: 0 0 10px;
          }

          .header-chat p {
            font-size: 14px;
            line-height: 1.7;
            margin: 0;
          }

          .info-avatar {
            position: relative;
          }

          .info-avatar img {
            border-radius: 100%;
            width: 50px;
            float: left;
            margin: 0 10px 0 0;
          }

          .blanter-msg {
            color: #444;
            padding: 20px;
            font-size: 12.5px;
            text-align: center;
            background: #eee;
            border-top: 1px solid #ddd;
          }

          textarea#chat-input {
            border: none;
            font-family: "Arial", sans-serif;
            width: 100%;
            height: 42px;
            outline: none;
            resize: none;
            padding: 10px;
            font-size: 14px;
          }

          a#send-it {
            width: 30px;
            font-weight: 700;
            padding: 7px 7px 0;
            background: #eee;
            cursor: pointer;
            text-decoration: none;
          }

          a#send-it svg {
            fill: #a6a6a6;
            height: 24px;
            width: 24px;
          }

          .start-chat .blanter-msg {
            display: flex;
          }

          a.close-chat {
            position: absolute;
            top: 5px;
            right: 15px;
            color: #fff;
            font-size: 30px;
            cursor: pointer;
            text-decoration: none;
          }

          .africavotes-chat-body {
            padding: 20px 20px 20px 10px;
            background-color: #e6ddd4;
            position: relative;
          }

          .africavotes-chat-body::before {
            display: block;
            position: absolute;
            content: "";
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            z-index: 0;
            opacity: .08;
            background-image: url(https://africavotes.com/public/img/social/whatsapp.webp);
          }

          .dAbFpq {
            display: flex;
            z-index: 1;
          }

          .eJJEeC {
            background-color: #fff;
            width: 52.5px;
            height: 32px;
            border-radius: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 10px;
            opacity: 0;
            transition: all 0.1s ease 0s;
            z-index: 1;
            box-shadow: rgba(0, 0, 0, .13) 0 1px .5px;
          }

          .hFENyl {
            position: relative;
            display: flex;
          }

          .ixsrax {
            height: 5px;
            width: 5px;
            margin: 0 2px;
            border-radius: 50%;
            display: inline-block;
            position: relative;
            animation-duration: 1.2s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
            top: 0;
            background-color: #9e9da2;
            animation-name: ZpjSY;
          }

          .dRvxoz {
            height: 5px;
            width: 5px;
            margin: 0 2px;
            background-color: #b6b5ba;
            border-radius: 50%;
            display: inline-block;
            position: relative;
            animation-duration: 1.2s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
            top: 0;
            animation-name: hPhMsj;
          }

          .kXBtNt {
            height: 5px;
            width: 5px;
            margin: 0 2px;
            background-color: #b6b5ba;
            border-radius: 50%;
            display: inline-block;
            position: relative;
            animation-duration: 1.2s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
            top: 0;
            animation-name: iUMejp;
          }

          .kAZgZq {
            padding: 7px 14px 6px;
            background-color: #fff;
            border-radius: 0 8px 8px;
            position: relative;
            transition: all 0.3s ease 0s;
            opacity: 1;
            transform-origin: center top 0;
            z-index: 2;
            box-shadow: rgba(0, 0, 0, .13) 0 1px .5px;
            margin-top: 4px;
            margin-left: -54px;
            max-width: calc(100% - 66px);
          }

          .kAZgZq::before {
            position: absolute;
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAmCAMAAADp2asXAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAACQUExURUxpccPDw9ra2m9vbwAAAAAAADExMf///wAAABoaGk9PT7q6uqurqwsLCycnJz4+PtDQ0JycnIyMjPf3915eXvz8/E9PT/39/RMTE4CAgAAAAJqamv////////r6+u/v7yUlJeXl5f///5ycnOXl5XNzc/Hx8f///xUVFf///+zs7P///+bm5gAAAM7Ozv///2fVensAAAAvdFJOUwCow1cBCCnqAhNAnY0WIDW2f2/hSeo99g1lBYT87vDXG8/6d8oL4sgM5szrkgl660OiZwAAAHRJREFUKM/ty7cSggAABNFVUQFzwizmjPz/39k4YuFWtm55bw7eHR6ny63+alnswT3/rIDzUSC7CrAziPYCJCsB+gbVkgDtVIDh+DsE9OTBpCtAbSBAZSEQNgWIygJ0RgJMDWYNAdYbAeKtAHODlkHIv997AkLqIVOXVU84AAAAAElFTkSuQmCC);
            background-position: 50% 50%;
            background-repeat: no-repeat;
            background-size: contain;
            content: "";
            top: 0;
            left: -12px;
            width: 12px;
            height: 19px;
          }

          .iSpIQi {
            font-size: 14px;
            line-height: 19px;
            margin-top: 4px;
            color: #111;
            text-align: left;
          }

          @keyframes ZpjSY {
            0% { background-color: #b6b5ba; }
            15% { background-color: #111; }
            25% { background-color: #b6b5ba; }
          }

          @keyframes hPhMsj {
            15% { background-color: #b6b5ba; }
            25% { background-color: #111; }
            35% { background-color: #b6b5ba; }
          }

          @keyframes iUMejp {
            25% { background-color: #b6b5ba; }
            35% { background-color: #111; }
            45% { background-color: #b6b5ba; }
          }

          @keyframes showchat {
            from {
              transform: scale(0);
              opacity: 0;
            }
          }

          @media screen and (max-width:480px) {
            #africavotes-chat {
              width: auto;
              left: 5%;
              right: 5%;
              font-size: 80%;
            }
          }

          .hide {
            display: none;
            opacity: 1;
          }

          .show {
            display: block;
            opacity: 1;
          }
        `
      }} />

      <div 
        ref={chatElementRef}
        className={isChatVisible ? 'show' : 'hide'} 
        id='africavotes-chat'
      >
        <div className='header-chat'>
          <div className='head-home'>
            <div className='info-avatar'>
              <img src='https://fresh-teacher.github.io/dp.jpeg' alt="Fresh Teacher" />
            </div>
            <p>
              <span className="africavotes-name">Fresh Teacher</span>
              <br /> 
              <small>online </small>
            </p>
          </div>
          <div className='get-new hide'>
            <div id='get-label'></div>
            <div id='get-nama'></div>
          </div>
          <button 
            className='close-chat' 
            onClick={handleCloseChat}
            style={{
              position: 'absolute',
              top: '5px',
              right: '15px',
              color: '#fff',
              fontSize: '30px',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: 0
            }}
          >
            ×
          </button>
        </div>
        <div className='home-chat'></div>
        <div className='start-chat'>
          <div className="africavotes-chat-body">
            <div className="dAbFpq">
              <div className="eJJEeC" style={{opacity: 0}}>
                <div className="hFENyl">
                  <div className="ixsrax"></div>
                  <div className="dRvxoz"></div>
                  <div className="kXBtNt"></div>
                </div>
              </div>
              <div className="kAZgZq" style={{opacity: 1}}>
                <div className="iSpIQi">{getGreeting()}</div>
              </div>
            </div>
          </div>
          <div className='blanter-msg'>
            <textarea 
              id='chat-input' 
              maxLength={120} 
              placeholder='Message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            ></textarea>
            <button 
              id='send-it'
              onClick={handleSendMessage}
              style={{
                width: '30px',
                fontWeight: '700',
                padding: '7px 7px 0',
                background: '#eee',
                cursor: 'pointer',
                border: 'none'
              }}
            >
              <svg viewBox="0 0 448 448" width="24" height="24">
                <path d="M.213 32L0 181.333 320 224 0 266.667.213 416 448 224z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div id='get-number'></div>
      </div>
      
      <button 
        className='africaVotesChat' 
        onClick={handleToggleChat}
        title='Show Chat'
        style={{
          background: '#fff',
          color: '#404040',
          position: 'fixed',
          display: 'flex',
          fontWeight: '400',
          justifyContent: 'space-between',
          zIndex: '98',
          bottom: '25px',
          right: '30px',
          fontSize: '15px',
          padding: '10px 20px',
          borderRadius: '30px',
          boxShadow: '0 1px 15px rgba(32, 33, 36, .28)',
          cursor: 'pointer',
          border: 'none'
        }}
      >
        <svg width="20" viewBox="0 0 24 24">
          <defs />
          <path fill="#eceff1" d="M20.5 3.4A12.1 12.1 0 0012 0 12 12 0 001.7 17.8L0 24l6.3-1.7c2.8 1.5 5 1.4 5.8 1.5a12 12 0 008.4-20.3z" />
          <path fill="#4caf50" d="M12 21.8c-3.1 0-5.2-1.6-5.4-1.6l-3.7 1 1-3.7-.3-.4A9.9 9.9 0 012.1 12a10 10 0 0117-7 9.9 9.9 0 01-7 16.9z" />
          <path fill="#fafafa" d="M17.5 14.3c-.3 0-1.8-.8-2-.9-.7-.2-.5 0-1.7 1.3-.1.2-.3.2-.6.1s-1.3-.5-2.4-1.5a9 9 0 01-1.7-2c-.3-.6.4-.6 1-1.7l-.1-.5-1-2.2c-.2-.6-.4-.5-.6-.5-.6 0-1 0-1.4.3-1.6 1.8-1.2 3.6.2 5.6 2.7 3.5 4.2 4.2 6.8 5 .7.3 1.4.3 1.9.2.6 0 1.7-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4z" />
        </svg> 
        Chat
      </button>
    </>
  );
};

export default WhatsAppChat;