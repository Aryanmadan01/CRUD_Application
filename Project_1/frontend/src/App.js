import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from './components/Form';
import ItemList from './components/ItemList';
import '../src/App.css';



const App = () => {
    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const response = await axios.get('http://localhost:5000/api/items');
        setItems(response.data);
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div>
            <h1>CRUD Application</h1>
            <Form refreshItems={fetchItems} />
            <ItemList items={items} refreshItems={fetchItems} />
        </div>
    );
};

export default App;
