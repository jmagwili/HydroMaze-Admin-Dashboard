import '../styles/DataCard.css'

type DataCardProps = {
    title: string
    content: number
    color: string
}

export const DataCard: React.FC<DataCardProps> = ({title,content,color}) => {
    return(
        <div className="datacard" style={{backgroundColor:`${color}`}}>          
            <h3 className="datacard-title">{title}</h3>
            <div className="datacard-content">
                <p>{content}</p>
            </div>
        </div>
    )
}
