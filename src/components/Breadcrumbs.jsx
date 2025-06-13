// src/components/Breadcrumbs.jsx
import { useLocation } from 'react-router-dom';
import Navigator from './Navigator';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <nav className="flex items-center text-xs md:text-sm px-6 py-4">
      <Navigator 
        url={"/"}
        variants={"hover:text-accent-700"}
      >Home</Navigator>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        
        return (
          <span key={name} className="flex items-center">
            <span className="mx-2">/</span>
            {isLast ? (
              <span className="text-accent-700 font-medium">{name}</span>
            ) : (
              <Navigator 
                url={routeTo}
                variants={"hover:text-accent-700 capitalize"}
              >{name}</Navigator>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;