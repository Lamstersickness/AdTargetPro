import  { useState } from "react";
import {  Plus, Upload, X } from "lucide-react";
import api from '../api'; 


const AdForm = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    keywords: '',
    image: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      setForm(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setForm(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setForm(prev => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to create ads');
      return;
    }

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('keywords', form.keywords);
    if (form.image) {
      formData.append('image', form.image);
    }

    try {
      await api.post('/ads', formData, {
        headers: { 'Content-Type': 'multipart/form-data' 
          , Authorization: `Bearer ${token}`
        },
      });
      setShowSuccess(true);
      setForm({ title: '', description: '', keywords: '', image: null });
      setImagePreview(null);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error creating ad:', error);
      alert('Error creating ad');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {showSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg animate-pulse">
          ✅ Ad created successfully!
        </div>
      )}
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="relative">
              <input
                name="title"
                placeholder="Ad Title"
                value={form.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 transform hover:scale-[1.02]"
                required
              />
            </div>
            
            <div className="relative">
              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 transform hover:scale-[1.02] resize-none"
                required
              />
            </div>
            
            <div className="relative">
              <input
                name="keywords"
                placeholder="Keywords (comma-separated)"
                value={form.keywords}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 transform hover:scale-[1.02]"
                required
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div
              className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${
                dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              } hover:border-blue-400 hover:bg-gray-50`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full h-32 object-cover rounded-lg mx-auto"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div>
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-gray-600">Drag & drop an image or</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                  >
                    Choose File
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Creating Ad...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <Plus size={20} />
              <span>Create Ad</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};
export default AdForm;
