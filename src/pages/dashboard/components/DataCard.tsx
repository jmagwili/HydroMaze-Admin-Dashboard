import '../styles/DataCard.css';
import { IoCartSharp } from "react-icons/io5";
import { FC, ReactElement } from 'react';

type DataCardProps = {
    title: string;
    content: number;
    color: string;
    icon: ReactElement;
};

export const DataCard: React.FC<DataCardProps> = ({ title, content, color, icon }) => {
    return (
        <div className="datacard" style={{ backgroundColor: color }}>
            <h3 className="datacard-title">{title}</h3>
            <div className="datacard-content">
                <p>{content}</p>
            </div>
            <div className="card-icon">
                {icon}
            </div>
        </div>
    );
};
