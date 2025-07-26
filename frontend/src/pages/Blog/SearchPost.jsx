import React, { useEffect, useState } from 'react'
import BlogLayouts from '../../components/Layouts/BlogLayouts/BlogLayout'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import BlogPostSummaryCard from './components/BlogPostSummaryCard';
import moment from 'moment';

export default function SearchPost() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.POSTS.SEARCH, {
        params: { q: query },
      });
      setSearchResults(response.data || []);
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle post click
  const handleClick = (post) => {
    navigate(`/${post.slug}`);
  };

  useEffect(() => {
    handleSearch();
  }, [query]);

  return (
    <BlogLayouts>
      <div>
        <h3 className='text-lg font-medium'>
          Showing search results matching
          <span className='font-semibold'> "{query}"</span>
        </h3>

        {loading && <p className='mt-4 text-gray-500'>Searching...</p>}

        {!loading && searchResults.length === 0 && (
          <div className="flex items-center justify-center h-[50vh]">
            <p className="text-gray-500 text-lg">No posts found.</p>
          </div>
        )}

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-8'>
          {searchResults.map((item) => (
            <BlogPostSummaryCard
              key={item._id}
              title={item.title}
              coverImageUrl={item.coverImageUrl}
              description={item.content}
              tags={item.tags}
              updatedOn={
                item.updatedAt
                  ? moment(item.updatedAt).format("Do MMM YYYY")
                  : "-"
              }
              authorName={item.author.name}
              authorProfileImg={item.author.profileImageUrl}
              onClick={() => handleClick(item)}
            />
          ))}
        </div>
      </div>
    </BlogLayouts>
  );
}
