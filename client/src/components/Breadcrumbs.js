import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs({ product }) {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="text-sm text-gray-600 mb-4">
      <ol className="flex flex-wrap items-center gap-1">
        {/* Home */}
        <li>
          <Link to="/customer/home" className="hover:underline text-blue-600">
            Home
          </Link>
          <span className="mx-1">›</span>
        </li>

        {pathnames.map((name, index) => {
          const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
          const isLast = index === pathnames.length - 1;

          // Hide technical segments
          if (["customer", "product"].includes(name)) return null;

          return (
            <li key={routeTo} className="flex items-center">
              {isLast ? (
                <span className="font-medium text-gray-900">
                  {product?.title || decodeURIComponent(name)}
                </span>
              ) : (
                <>
                  <Link
                    to={routeTo}
                    className="hover:underline text-blue-600"
                  >
                    {decodeURIComponent(name)}
                  </Link>
                  <span className="mx-1">›</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
