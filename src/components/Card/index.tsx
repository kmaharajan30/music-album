import "./styles.css";

export interface CardType {
  data: {
    label: string;
    value: string | number;
  }[];
}
const Card = ({ data }: CardType) => {
  return (
    <div className="card">
      {data.map((item) => (
        <div className="card-items" key={item.label}>
          <p className="label">{item.label}</p>
          <p className="value">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default Card;
