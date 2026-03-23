import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const VideoPlayer = ({ videoSrc, subtitles, languages }) => {
    const [currentLanguage, setCurrentLanguage] = useState(languages[0]);
    const [currentTime, setCurrentTime] = useState(0);
    const videoRef = React.createRef();

    useEffect(() => {
        const handleTimeUpdate = () => {
            setCurrentTime(videoRef.current.currentTime);
        };

        const video = videoRef.current;
        video.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, []);

    return (
        <div className="video-player">
            <video ref={videoRef} controls>
                <source src={videoSrc} type="video/mp4" />
                {subtitles.map((subtitle, index) => (
                    <track key={index} src={subtitle.src} kind="subtitles" srclang={subtitle.language} label={subtitle.label} default={subtitle.language === currentLanguage} />
                ))}
                Your browser does not support the video tag.
            </video>
            <div className="controls">
                <label htmlFor="language-select">Select Language:</label>
                <select
                    id="language-select"
                    onChange={(e) => setCurrentLanguage(e.target.value)}
                    value={currentLanguage}
                >
                    {languages.map((lang, index) => (
                        <option key={index} value={lang}>{lang}</option>
                    ))}
                </select>
                <div>Current Time: {currentTime.toFixed(2)} seconds</div>
            </div>
        </div>
    );
};

VideoPlayer.propTypes = {
    videoSrc: PropTypes.string.isRequired,
    subtitles: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string.isRequired,
        language: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
    })).isRequired,
    languages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default VideoPlayer;
