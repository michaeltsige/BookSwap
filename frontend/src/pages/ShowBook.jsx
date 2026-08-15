import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { PiBookOpenTextLight, PiCalendarLight, PiUserLight, PiClockLight } from 'react-icons/pi';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4] py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <BackButton />
          <h1 className="text-3xl font-bold text-gray-900">Book Details</h1>
          <Link 
            to="/" 
            className="btn btn-outline"
          >
            Back to Home
          </Link>
        </div>

        {/* Book Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Book Cover Section */}
          <div className="lg:col-span-1">
            <div className="card-hover bg-white rounded-2xl p-6 text-center">
              <div className="w-32 h-40 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <PiBookOpenTextLight className="text-4xl text-indigo-400" />
              </div>
              <div className="bg-[#9A3412] text-white px-4 py-2 rounded-lg font-semibold text-lg inline-block">
                {book.publishYear}
              </div>
            </div>
          </div>

          {/* Book Details Section */}
          <div className="lg:col-span-2">
            <div className="card-hover bg-white rounded-2xl p-8">
              {/* Main Info */}
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{book.title}</h2>
                  <div className="w-20 h-1 bg-[#9A3412] rounded-full"></div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Author */}
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <PiUserLight className="text-[#9A3412] text-xl" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Author</p>
                      <p className="text-lg font-semibold text-gray-900">{book.author}</p>
                    </div>
                  </div>

                  {/* Publication Year */}
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <PiCalendarLight className="text-[#9A3412] text-xl" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Published</p>
                      <p className="text-lg font-semibold text-gray-900">{book.publishYear}</p>
                    </div>
                  </div>

                  {/* Owner */}
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <PiUserLight className="text-[#115E59] text-xl" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Current Owner</p>
                      <p className="text-lg font-semibold text-gray-900">{book.ownerUsername}</p>
                    </div>
                  </div>

                  {/* Book ID */}
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <PiBookOpenTextLight className="text-gray-600 text-xl" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Book ID</p>
                      <p className="text-sm font-mono text-gray-900 truncate">{book._id}</p>
                    </div>
                  </div>
                </div>

                {/* Timestamps */}
                <div className="border-t border-[#E8EDE5] pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <PiClockLight className="text-blue-500 text-xl" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">Added to Collection</p>
                        <p className="text-sm text-gray-900">
                          {book.createdAt ? new Date(book.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          }) : 'N/A'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <PiClockLight className="text-green-500 text-xl" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">Last Updated</p>
                        <p className="text-sm text-gray-900">
                          {book.updatedAt ? new Date(book.updatedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          }) : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t border-[#E8EDE5]">
                  <Link
                    to="/"
                    className="flex-1 btn btn-outline py-3 text-center"
                  >
                    Browse More Books
                  </Link>
                  {/* <Link
                    to={`/books/edit/${book._id}`}
                    className="flex-1 btn btn-primary py-3 text-center"
                  >
                    Edit Details
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowBook;