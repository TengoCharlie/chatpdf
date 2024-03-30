import React from 'react';

const ChatAreaComponent: React.FC = () => {
    return (
        <div className="chat-area">
            <div className="chat-area-header">
                <div className="chat-area-title">CodePen Group</div>
                <div className="chat-area-group">
                    <img
                        className="chat-area-profile"
                        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png"
                        alt=""
                    />
                    <img
                        className="chat-area-profile"
                        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%282%29.png"
                        alt=""
                    />
                    <img
                        className="chat-area-profile"
                        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%2812%29.png"
                        alt=""
                    />
                    <span>+4</span>
                </div>
            </div>
            <div className="chat-area-main">
                <div className="chat-msg">
                    <div className="chat-msg-profile">
                        <img
                            className="chat-msg-img"
                            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png"
                            alt=""
                        />
                        <div className="chat-msg-date">Message seen 1.22pm</div>
                    </div>
                    <div className="chat-msg-content">
                        <div className="chat-msg-text">
                            Luctus et ultrices posuere cubilia curae.
                        </div>
                        <div className="chat-msg-text">
                            <img src="https://media0.giphy.com/media/yYSSBtDgbbRzq/giphy.gif?cid=ecf05e47344fb5d835f832a976d1007c241548cc4eea4e7e&rid=giphy.gif" />
                        </div>
                        <div className="chat-msg-text">
                            Neque gravida in fermentum et sollicitudin ac orci phasellus egestas.
                            Pretium lectus quam id leo.
                        </div>
                    </div>
                </div>
                <div className="chat-msg owner">
                    <div className="chat-msg-profile">
                        <img
                            className="chat-msg-img"
                            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png"
                            alt=""
                        />
                        <div className="chat-msg-date">Message seen 1.22pm</div>
                    </div>
                    <div className="chat-msg-content">
                        <div className="chat-msg-text">
                            Sit amet risus nullam eget felis eget. Dolor sed viverra ipsum😂😂😂
                        </div>
                        <div className="chat-msg-text">
                            Cras mollis nec arcu malesuada tincidunt.
                        </div>
                    </div>
                </div>
                {/* Other messages go here */}
            </div>
            <div className="chat-area-footer">
                <input type="text" placeholder="Type something here..." />
                <button type="button" className="detail-button">
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatAreaComponent;
