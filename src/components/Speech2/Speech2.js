import React,{useState} from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
// import { GlobalStyles, Row, GitLink, Title } from './shared';
import SpeechSynthesisExample from './useSpeechSynthesis';

function Speech2() {
    const [value, setValue] = useState('');
    const { speak, cancel } = useSpeechSynthesis();
    return (
        <div>
       
          {'react-speech-kit '}
          <span role="img" aria-label="microphone">🎤</span>
          <div>
            <textarea value={value} onChange={(event) => setValue(event.target.value)}  />
            <button onClick={() => speak({ text: value })}>Speak</button>
            <button onClick={() => cancel()}>Cancel</button>  
          </div>
          {/* <SpeechSynthesisExample /> */}
         </div>
    );
}

export default Speech2;