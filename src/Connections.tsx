import React, { useState, useEffect, useCallback } from 'react';
import { MapPin, Search, Users, Edit2, ChevronDown, ChevronUp, Move } from 'lucide-react';

import usersMock from './usersMock.json'
import rankMock from './rankMock.json'

const ConnectionItem = ({ id, text, trustLevel, onDragStart }: any) => {
    return (
        <li
            draggable
            onDragStart={(e) => onDragStart(e, id, trustLevel)}
            className="flex justify-between items-center py-2 border-b border-gray-800 cursor-move"
        >
            <span className="flex items-center">
                <Move size={16} className="mr-2 text-green-400" />
                {text}
            </span>
            <button className="text-green-400 hover:text-green-300 transition-colors duration-300">
                <Edit2 size={16} />
            </button>
        </li>
    );
};


const TrustTier = ({ name, connections, onDragStart, onDragOver, onDrop }: any) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, name)}
            className="bg-gray-900 p-6 rounded-lg"
        >
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setExpanded(!expanded)}
            >
                <h3 className="text-xl font-thin text-green-400">{name}</h3>
                {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            {expanded && (
                <ul className="mt-4 space-y-2">
                    {connections.map((connection: any) => (
                        <ConnectionItem
                            key={`${connection.from}-${connection.to}`}
                            id={`${connection.from}-${connection.to}`}
                            text={connection.to}
                            trustLevel={name}
                            onDragStart={onDragStart}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export const Connections = ({ userId }: any) => {
    const userConnections = rankMock.filter((item) => item.from === userId);
    const high = userConnections.filter((item) => item.rank === 1);
    const med = userConnections.filter((item) => item.rank === 2);
    const gen = userConnections.filter((item) => item.rank === 3);

    const [connections, setConnections] = useState({
        'High Trust': high,
        'Medium Trust': med,
        'General Trust': gen,
    });

    const handleDragStart = (e: any, id: any, sourceTrust: any) => {
        e.dataTransfer.setData('text/plain', JSON.stringify({ id, sourceTrust }));
    };

    const handleDragOver = (e: any) => {
        e.preventDefault();
    };

    const handleDrop = useCallback((e: any, targetTrust: any) => {
        e.preventDefault();
        const { id, sourceTrust } = JSON.parse(e.dataTransfer.getData('text/plain'));

        if (sourceTrust === targetTrust) return;

        setConnections((prevConnections: any) => {
            const sourceConnections = [...prevConnections[sourceTrust]];
            const targetConnections = [...prevConnections[targetTrust]];
            const [movedConnection] = sourceConnections.filter((conn) => conn.id === id);

            return {
                ...prevConnections,
                [sourceTrust]: sourceConnections.filter((conn) => conn.id !== id),
                [targetTrust]: [...targetConnections, movedConnection],
            };
        });
    }, []);

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-thin mb-8 text-green-400">Your Connections</h2>
            <div className="space-y-6">
                {Object.entries(connections).map(([tierName, tierConnections]) => (
                    <TrustTier
                        key={tierName}
                        name={tierName}
                        connections={tierConnections}
                        onDragStart={handleDragStart}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    />
                ))}
            </div>
        </div>
    );
};