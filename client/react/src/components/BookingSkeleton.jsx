// components/BookingSkeleton.jsx
const BookingSkeleton = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow animate-pulse border space-y-4">
      <div className="h-4 bg-gray-300 rounded w-1/2" />
      <div className="h-4 bg-gray-300 rounded w-1/3" />
      <div className="h-4 bg-gray-300 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-1/4" />
    </div>
  );
};

export default BookingSkeleton;
