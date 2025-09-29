import React, {useState} from 'react';


export default function Form(){
    const[input, setInput] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitted:", input);
        // Call your Amplify service to save this input
      };

      return (
        <form onSubmit={handleSubmit} style={{ padding: 20 }}>
        <label>
          Location:
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
      
}
