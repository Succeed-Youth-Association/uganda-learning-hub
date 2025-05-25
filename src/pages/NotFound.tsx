import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-800 to-amber-900 text-white">
      <div className="max-w-2xl mx-4 text-center">
        <h1 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-500">
          404 ERROR!
        </h1>

        {/* Caveman GIF */}
        <div className="mb-8 flex justify-center">
          <img
            src="https://cdn.svgator.com/images/2024/04/electrocuted-caveman-animation-404-error-page.gif"
            alt="Caveman discovering electricity the hard way"
            className="w-64 h-64 object-contain"
          />
        </div>

        <h2 className="text-3xl font-semibold mb-4">Ouch! Page not found</h2>

        <p className="text-xl text-amber-100 mb-8">
          The page at <span className="font-mono bg-stone-700 px-2 py-1 rounded">{location.pathname}</span><br />
          went extinct like the dinosaurs.
        </p>

        <div className="space-y-4">
          <a
            href="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-amber-600 to-red-700 rounded-full font-medium hover:opacity-90 transition-all transform hover:scale-105 shadow-lg hover:shadow-amber-900/50"
          >
            Back to Cave 🏡
          </a>

          <p className="text-amber-300 text-sm mt-6">
            Maybe try tasting salty rocks. This one shocks!
          </p>
        </div>

        <div className="mt-12 text-amber-800 text-xs">
          <p>Error code: 404_CAVEMAN_SHOCKED</p>
          <p className="mt-1">Discovery date: {new Date().toLocaleDateString()} BC</p>
        </div>

        <div className="mt-6 text-stone-500 text-sm">
          <p>Warning: Modern technology is dangerous to early man</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;