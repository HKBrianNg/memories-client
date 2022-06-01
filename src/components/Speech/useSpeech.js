import {useState} from 'react';

const useSpeech = () => {
    const [pausing, setPausing] = useState(false);   
    const speak = (selectVoice,selectText)=> {
        
        if (selectVoice) {
            var voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name === selectVoice; })[0];
            // console.log('selected voice',voice);
        }
        var msg = new SpeechSynthesisUtterance();
        msg.voice = voice;
        msg.text = selectText;
        msg.volume = 1.1;
        msg.rate = 1.0;
        msg.pitch = 1.1;
        msg.onend = handleEnd;
        window.speechSynthesis.speak(msg);
    };

    const getVoices = () => {
        return window.speechSynthesis.getVoices();
    };

    const isSupport= () => {
        if ('speechSynthesis' in window) {
            return true 
        } else {
            return false;
        }
    };

    const stop= () => {
        window.speechSynthesis.cancel();
        setPausing(false);
    };
    
    const pause= () => {
        window.speechSynthesis.pause();
        setPausing(true);
    };
    
    const resume= () => {
        window.speechSynthesis.resume();
        setPausing(false);
    };

    const handleEnd= () => {
        setPausing(false);
    };
    return {
        isSupport,
        getVoices,
        speak,
        stop,
        pause,
        resume,
        pausing,
    };
};

export default useSpeech;