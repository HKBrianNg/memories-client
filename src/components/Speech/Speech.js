import React,{useState} from 'react';
import {useSpeechSynthesis} from 'react-speech-kit';

function Speech() {
    const [value,setValue] = useState('');
    const {speak} = useSpeechSynthesis();
    return (
        <div>
            <h3>Text to Speech Converter</h3>
            <div>
                <textarea name='text' rows="10" cols="40" value={value} onChange={(e)=>setValue(e.target.value)}></textarea>
            </div>
            <button onClick={(e)=>speak({text:value})}>Speech</button>
        </div>
    )
}

export default Speech;