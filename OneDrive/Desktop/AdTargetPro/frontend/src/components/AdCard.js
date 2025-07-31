import { useState } from "react";
import { Eye, Heart, Share2, Calendar, Trash } from "lucide-react";
import api from "../api";

const AdCard = ({ ad, index, onDelete }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(ad.likes || 0);

  const handleLike = async () => {
    try {
      const response = await api.post(`/ads/${ad.id}/like`);
      setLikes(response.data.likes);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error liking ad:", error);
    }
  };

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this ad?")) {
      onDelete(ad.id);
    }
  };

  return (
    <div
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden">
        {ad.imageUrl && (
          <img
            src={ad.imageUrl}
            alt={ad.title}
            className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
            {ad.title}
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={handleLike}
              className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                isLiked
                  ? "text-red-500 bg-red-50"
                  : "text-gray-400 hover:text-red-500"
              }`}
            >
              <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
            </button>

            <button
              onClick={handleDeleteClick}
              className="p-2 rounded-full text-gray-400 hover:text-red-600 transition-all duration-300 transform hover:scale-110"
              title="Delete Ad"
            >
              <Trash size={18} />
            </button>

            <button className="p-2 rounded-full text-gray-400 hover:text-blue-500 transition-all duration-300 transform hover:scale-110">
              <Share2 size={18} />
            </button>
          </div>
        </div>

        <p className="text-gray-600 mb-4 leading-relaxed">{ad.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {ad.keywords &&
            ad.keywords.map((keyword, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors duration-200"
              >
                #{keyword}
              </span>
            ))}
        </div>

        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Eye size={16} />
              <span>{ad.views || 0}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart size={16} />
              <span>{likes}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar size={16} />
            <span>{ad.createdAt || "Recent"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdCard;
