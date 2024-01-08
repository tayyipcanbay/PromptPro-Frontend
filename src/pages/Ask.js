import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import './css/Ask.css';

const Ask = () => {
    const location = useLocation();

    const [token, ] = useState(location.state.token);
    const [email, ] = useState(location.state.email);
    const [input, setInput] = useState('');
    const [file, setFile] = useState(null);
    const [messages, setMessages] = useState([
        { text: 'Hello, how can I help you?', type: 'received' }
    ]);
    const [isDragging, setIsDragging] = useState(false);
    
    const handleDragOver = (e) => {
        console.log("dragging")
        e.preventDefault();
        setIsDragging(true);
    }

    const handleDragLeave = (e) => {
        console.log("drag leave")
        e.preventDefault();
        setIsDragging(false);
    }
    
    const handleDrop = (e) => {
        e.preventDefault();
        console.log("dropped")
        console.log(e.dataTransfer.files);
        file = e.dataTransfer.files[0];
        setIsDragging(false);
        let droppedFileMessage = { text: `Uploaded file: ${file.name}`, type: 'received', file: file }
        if (e.dataTransfer.items) {
            for (var i = 0; i < e.dataTransfer.items.length; i++) {
                if (e.dataTransfer.items[i].kind === 'file') {
                    var file = e.dataTransfer.items[i].getAsFile();
                    setFile(file);
                    setMessages([...messages, droppedFileMessage]);
                }
            }
        }
    };

    const handleSend = async () => {
        try {
            let message;
            const loadingMessage = { text: 'Let me think...', type: 'received' };
            setMessages([...messages, loadingMessage]);
    
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('email', email);
                formData.append('token', token);
                formData.append('text', input);
                const response = await axios.post('http://localhost:3131/ask-image', formData,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                message = typeof response.data === 'object' ? response.data.text : response.data;
                console.log(typeof(message))
                console.log(message)
                setMessages(prevMessages => prevMessages.filter(msg => msg !== loadingMessage).concat([{ text: input, type: 'sent', file: file }, { text: message, type: 'received' }]));
            } else {
                const response = await axios.post('http://localhost:3131/ask-text', { text: input, email, token });
                message = typeof response.data === 'object' ? response.data.text : response.data;
                console.log(typeof(message))
                console.log(message)
                setMessages(prevMessages => prevMessages.filter(msg => msg !== loadingMessage).concat([{ text: input, type: 'sent' }, { text: message, type: 'received' }]));
            }
            setInput('');
            setFile(null);
        } catch (error) {
            console.error(error);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={`ask-body ${isDragging ? 'dragging' : ''}`} onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={handleDragLeave}>
            <div className={`${isDragging ? 'dragging-alert' : 'non-dragging-alert'}`}>
                <h1>Drop file here</h1>
            </div>
            <div id="messages">
                {messages.map((message, index) => (
                    <div key={index} className='message'>
                        <div className={message.type}>
                            {message.file && <div className='asd'><img src={URL.createObjectURL(message.file)} alt={message.file.name} style={{ maxWidth: '100%', height: 'auto' }} /></div> }
                            {message.text}
                        </div>
                    </div>
                ))}
            </div>
            <div id="chat-input">
                {/* <div id="file-input">
                    <label htmlFor="file-inp">Upload file
                        <input id='file-inp' type="file" onChange={(e) => setFile(e.target.files[0])} />
                    </label>
                </div> */}
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={handleKeyPress} />
                <button id='send-btn' onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default Ask;