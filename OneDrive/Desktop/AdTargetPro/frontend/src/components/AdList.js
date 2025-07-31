import { useState, useEffect } from "react";
import { TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import api from '../api';
import AdCard from './AdCard';

const AdList = () => {
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState('createdAt,desc');
  const [totalElements, setTotalElements] = useState(0);

  const fetchAds = async () => {
    try {
      setIsLoading(true);
      const res = await api.get(`/ads?page=${page}&sort=${sort}`);
      setAds(res.data.content);
      setTotalPages(res.data.totalPages);
      setTotalElements(res.data.totalElements);
    } catch (error) {
      console.error('Error fetching ads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, [page, sort]);

  const handlePrevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const handleDelete = async (adId) => {
    try {
      await api.delete(`/ads/${adId}`);
      setAds((prev) => prev.filter((ad) => ad.id !== adId));
    } catch (err) {
      console.error("Error deleting ad:", err);
      alert("Failed to delete ad.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
          <TrendingUp className="text-blue-600" />
          <span>All Advertisements</span>
        </h2>
        <div className="flex items-center space-x-4">
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(0); // Reset to first page when changing sort
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="createdAt,desc">Newest First</option>
            <option value="createdAt,asc">Oldest First</option>
            <option value="likes,desc">Most Liked</option>
            <option value="views,desc">Most Viewed</option>
          </select>
          <div className="text-sm text-gray-500">
            Showing {ads.length} of {totalElements} ads
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
              <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
              <div className="bg-gray-200 h-6 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 rounded mb-4"></div>
              <div className="flex gap-2">
                <div className="bg-gray-200 h-6 w-16 rounded-full"></div>
                <div className="bg-gray-200 h-6 w-20 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ads.map((ad, index) => (
              <AdCard key={ad.id} ad={ad} index={index} onDelete={handleDelete} />
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={handlePrevPage}
                disabled={page === 0}
                className={`flex items-center px-4 py-2 rounded-lg ${page === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}
              >
                <ChevronLeft className="mr-1" />
                Previous
              </button>
              
              <div className="text-gray-600">
                Page {page + 1} of {totalPages}
              </div>
              
              <button
                onClick={handleNextPage}
                disabled={page >= totalPages - 1}
                className={`flex items-center px-4 py-2 rounded-lg ${page >= totalPages - 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}
              >
                Next
                <ChevronRight className="ml-1" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdList;
