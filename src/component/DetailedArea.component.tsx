import React from 'react';

const DetailAreaComponent: React.FC = () => {
    return (
        <div className="detail-area">
            <div className="detail-area-header">
                <div className="msg-profile group">
                    <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1">
                        <path d="M12 2l10 6.5v7L12 22 2 15.5v-7L12 2zM12 22v-6.5" />
                        <path d="M22 8.5l-10 7-10-7" />
                        <path d="M2 15.5l10-7 10 7M12 2v6.5" />
                    </svg>
                </div>
                <div className="detail-title">CodePen Group</div>
                <div className="detail-subtitle">Created by Aysenur, 1 May 2020</div>
                <div className="detail-buttons">
                    <button className="detail-button">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="currentColor" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round" className="feather feather-phone">
                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                        </svg>
                        Call Group
                    </button>
                    <button className="detail-button">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="currentColor" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round" className="feather feather-video">
                            <path d="M23 7l-7 5 7 5V7z" />
                            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                        </svg>
                        Video Chat
                    </button>
                </div>
            </div>
            <div className="detail-changes">
                <input type="text" placeholder="Search in Conversation" />
                <div className="detail-change">
                    Change Color
                    <div className="colors">
                        <div className="color blue selected" data-color="blue"></div>
                        <div className="color purple" data-color="purple"></div>
                        <div className="color green" data-color="green"></div>
                        <div className="color orange" data-color="orange"></div>
                    </div>
                </div>
                <div className="detail-change">
                    Change Emoji
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-thumbs-up">
                        <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
                    </svg>
                </div>
            </div>
            <div className="detail-photos">
                <div className="detail-photo-title">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-image">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M21 15l-5-5L5 21" />
                    </svg>
                    Shared photos
                </div>
                <div className="detail-photo-grid">
                    {/* Images go here */}
                </div>
                <div className="view-more">View More</div>
            </div>
            <a href="https://twitter.com/AysnrTrkk" className="follow-me" target="_blank">
                <span className="follow-text">
                    <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                    Follow me on Twitter
                </span>
                <span className="developer">
                    <img src="https://pbs.twimg.com/profile_images/1253782473953157124/x56UURmt_400x400.jpg" />
                    Aysenur Turk — @AysnrTrkk
                </span>
            </a>
        </div>
    );
}

export default DetailAreaComponent;
