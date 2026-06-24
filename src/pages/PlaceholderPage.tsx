import { useLocation } from 'react-router-dom';
export function PlaceholderPage() {
  const location = useLocation();
  const pageName =
  location.pathname.
  substring(1).
  split('-').
  map((word) => word.charAt(0).toUpperCase() + word.slice(1)).
  join(' ') || 'Page';
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mb-6">
        <div className="w-10 h-10 bg-gray-200 rounded-xl"></div>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{pageName}</h1>
      <p className="text-gray-500 max-w-md">
        This section is currently under construction. Check back soon for
        updates to the {pageName} features.
      </p>
    </div>);

}