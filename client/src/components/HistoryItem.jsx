import React from 'react';

const HistoryItem = ({ item }) => {
    return (
        <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-gray-600">{item.date}</p>
            <p className="text-gray-800">{item.description}</p>
        </div>
    );
};

export default HistoryItem;