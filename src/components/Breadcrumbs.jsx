// src/components/Breadcrumbs.jsx
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <nav className="flex items-center text-sm px-6 py-4 text-gray-600">
      <Link to="/" className="hover:text-primary-600">Home</Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('>')}`;
        const isLast = index === pathnames.length - 1;
        
        return (
          <span key={name} className="flex items-center">
            <span className="mx-2">/</span>
            {isLast ? (
              <span className="text-primary-600 font-medium">{name}</span>
            ) : (
              <Link to={routeTo} className="hover:text-primary-600 capitalize">
                {name}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;