import "./styles.css";

interface EmptyContentProps {
  imgSrc: string;
  label: string;
}
const EmptyContent = ({ imgSrc, label }: EmptyContentProps) => {
  return (
    <div className="empty-content">
      <img src={imgSrc} alt="Empty-Content" className="empty-img" />
      <p className="empty-label">{label}</p>
    </div>
  );
};

export default EmptyContent;
