import { BiChevronRight } from "react-icons/bi";
import "./styles.css";
import { Link } from "react-router-dom";
import { Fragment } from "react";

interface BreadCrumbProps {
  items: {
    label: string;
    path?: string;
    isActive: boolean;
  }[];
}

const BreadCrumb = ({ items }: BreadCrumbProps) => {
  return (
    <div className="breadcrumb">
      {items.map((item, index) => (
        <Fragment key={item.label}>
          {item.isActive ? (
            <span className="last-item">{item.label}</span>
          ) : (
            item.path && (
              <Link to={item.path} className="breadcrumb-item">
                {item.label}
              </Link>
            )
          )}
          {index < items.length - 1 && (
            <BiChevronRight color="#677A90" size="24px" />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default BreadCrumb;

{
  /* <div className="breadcrumb">
  {items.map((item, index) => (
    <React.Fragment key={index}>
      {item.isActive ? (
        // If active, show a span with the active class (non-clickable)
        <span className="last-item">{item.label}</span>
      ) : (
        // If not active, wrap in a Link to enable navigation
        <Link to={item.path} className="breadcrumb-item">
          {item.label}
        </Link>
      )}
      {/* Only show the chevron if it's not the last item */
}
//   {index < items.length - 1 && (
//     <BiChevronRight color="#677A90" size="24px" />
//   )}
// </React.Fragment>
//   ))}
// </div>; */}
