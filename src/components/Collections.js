import React, { useState, useEffect } from 'react';
const Collections = () => {
    const [collections, setCollections] = useState([]);
    const [newCollectionName, setNewCollectionName] = useState('');
    const [selectedCollection, setSelectedCollection] = useState(null);

    useEffect(() => {
        const storedCollections = localStorage.getItem('collections');
        if (storedCollections) {
            setCollections(JSON.parse(storedCollections));
        }
    }, []);

    const createCollection = () => {
        if (newCollectionName) {
            const newCollection = {
                id: Date.now(),
                name: newCollectionName,
                videos: [],
                createdAt: new Date().toISOString()
            };
            const updatedCollections = [...collections, newCollection];
            setCollections(updatedCollections);
            localStorage.setItem('collections', JSON.stringify(updatedCollections));
            setNewCollectionName('');
        }
    };

    const deleteCollection = (id) => {
        const updatedCollections = collections.filter(col => col.id !== id);
        setCollections(updatedCollections);
        localStorage.setItem('collections', JSON.stringify(updatedCollections));
    };

    return (
        <div className="collections-container">
            <h2>My Collections</h2>
            <div className="create-collection">
                <input type="text" placeholder="New collection name" value={newCollectionName} onChange={(e) => setNewCollectionName(e.target.value)} />
                <button onClick={createCollection}>Create Collection</button>
            </div>
            <div className="collections-list">
                {collections.map(collection => (
                    <div key={collection.id} className="collection-item">
                        <h3>{collection.name}</h3>
                        <p>Videos: {collection.videos.length}</p>
                        <button onClick={() => deleteCollection(collection.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Collections;