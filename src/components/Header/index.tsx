import "./styles.css";

interface HeaderProps {
  title?: string;
}
const Header = ({ title = "Overview" }: HeaderProps) => {
  return (
    <div className="header">
      <h2 className="title">{title}</h2>
    </div>
  );
};

export default Header;
