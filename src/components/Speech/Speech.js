import { Typography } from '@mui/material';
import React,{useState} from 'react';
import useSpeech from './useSpeech';
import {HK,TW,CN,US,UK } from '../../constants/language';

function Speech() {
    const [selectedText,setSelectedText] = useState('');
    const [selectedVoice, setSelectedVoice] = useState('');
    const {isSupport, speak, stop, pause, resume, getVoices} = useSpeech();
    
    function loadVoices() {
        var voiceSelect = document.getElementById('voice');
        var voices = getVoices();
        voices.forEach(function(voice, i) {
            var option = document.createElement('option');
            option.value = voice.name;
            option.innerHTML = voice.name;
            voiceSelect.appendChild(option);
        });
    }

    const isSupported = isSupport();
    if (isSupported) {
        loadVoices();
    }
    
    
    return (
        <div>
            <h3>Text to Speech Converter</h3>
            {(!isSupported) && (<Typography variant='body2'>'Sorry your browser does not support speech synthesis.'</Typography>)}
            <div>
		        <label for="voice">Voice</label>
		        <select name="voice" id="voice" onChange={(e)=>setSelectedVoice(e.target.value)} ></select>
	        </div>
            <div>
                <textarea name='text' rows="5" cols="40" value={selectedText} onChange={(e)=>setSelectedText(e.target.value)}></textarea>
            </div>
            <button disabled={!isSupported} onClick={()=>speak(UK,selectedText)}>Speak</button>
            <button disabled={!isSupported} onClick= {()=>stop()}>Stop</button>
            <button disabled={!isSupported} onClick={()=>pause()}>Pause</button>
            <button disabled={!isSupported} onClick={()=>resume()}>Resume</button>
        </div>
    )
}

export default Speech;