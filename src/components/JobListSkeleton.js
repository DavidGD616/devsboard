export default function JobListSkeleton() {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 md:p-6 flex flex-col md:flex-row gap-4 items-start md:items-center shadow-sm animate-pulse mb-4"
          >
            {/* Left - Company Image Skeleton */}
            <div className="w-16 h-16 bg-gray-200 rounded-lg" />
            
            {/* Middle - Main Content Skeleton */}
            <div className="flex-grow space-y-2">
              {/* Title Skeleton */}
              <div className="h-6 w-1/2 bg-gray-200 rounded" />
              {/* Subtitle Skeleton (Company, City, Remote) */}
              <div className="flex space-x-2">
                <div className="h-4 w-20 bg-gray-200 rounded" />
                <div className="h-4 w-16 bg-gray-200 rounded" />
                <div className="h-4 w-12 bg-gray-200 rounded" />
              </div>
              {/* Tags Skeleton */}
              <div className="flex space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-4 w-10 bg-gray-200 rounded" />
                ))}
              </div>
              {/* Bottom Info Skeleton */}
              <div className="flex space-x-2">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="h-4 w-16 bg-gray-200 rounded" />
              </div>
            </div>
            
            {/* Right - Action Button Skeleton */}
            <div className="w-full md:w-auto">
              <div className="h-10 w-24 bg-gray-200 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }