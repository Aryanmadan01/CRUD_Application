import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Form.css';


const Form = ({ refreshItems }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/items', { name, description });
        refreshItems();
        setName('');
        setDescription('');
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter item name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter item description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Add Item</button>
        </form>
    );
    
};

export default Form;
