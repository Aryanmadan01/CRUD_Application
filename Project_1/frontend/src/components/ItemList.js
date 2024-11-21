import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ItemList.css';

const ItemList = ({ items, refreshItems }) => {
    const [editing, setEditing] = useState(null);
    const [updatedName, setUpdatedName] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');

    const startEditing = (item) => {
        setEditing(item._id);
        setUpdatedName(item.name);
        setUpdatedDescription(item.description);
    };

    const handleUpdate = async (id) => {
        if (!updatedName.trim() || !updatedDescription.trim()) {
            alert('Both name and description are required.');
            return;
        }

        try {
            await axios.put(`http://localhost:5000/api/items/${id}`, {
                name: updatedName,
                description: updatedDescription,
            });
            setEditing(null);
            refreshItems();
        } catch (error) {
            console.error('Error updating item:', error);
            alert('Failed to update the item. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await axios.delete(`http://localhost:5000/api/items/${id}`);
                refreshItems();
            } catch (error) {
                console.error('Error deleting item:', error);
                alert('Failed to delete the item. Please try again.');
            }
        }
    };

    return (
        <ul className="list">
            {items.map((item) => (
                <li key={item._id} className="list-item">
                    {editing === item._id ? (
                        <>
                            <input
                                type="text"
                                value={updatedName}
                                onChange={(e) => setUpdatedName(e.target.value)}
                                placeholder="Updated Name"
                                className="input-field"
                            />
                            <input
                                type="text"
                                value={updatedDescription}
                                onChange={(e) => setUpdatedDescription(e.target.value)}
                                placeholder="Updated Description"
                                className="input-field"
                            />
                            <button
                                onClick={() => handleUpdate(item._id)}
                                className="save-button"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setEditing(null)}
                                className="cancel-button"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="text">
                                <strong>{item.name}</strong> - {item.description}
                            </div>
                            <div className="actions">
                                <button
                                    onClick={() => startEditing(item)}
                                    className="edit-button"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </div>
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default ItemList;
