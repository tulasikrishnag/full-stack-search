import { Link } from "react-router-dom";
interface SearchResultsProps {
  title: string;
  path: string;
  results: string[];
}
export const SearchResults: React.FC<SearchResultsProps> = ({
  title,
  path,
  results,
}) => {
  return (
    <>
      <h2>{title}</h2>
      {results.map((item, index) => (
        <li key={index}>
          <Link
            to={`/${path}`}
            className="dropdown-item"
            state={{ name: item }}
          >
            <i className="fa fa-building mr-2"></i>
            {item}
          </Link>
          <hr className="divider" />
        </li>
      ))}
    </>
  );
};
