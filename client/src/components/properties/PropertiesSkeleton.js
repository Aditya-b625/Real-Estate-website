import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const PropertiesSkeleton = () => {
  return (
    <div className="container">
      {[...Array(4)].map((_, index) => (
        <div className="card mb-4 rounded-4 border border-info property" key={index}>
          <div className="row g-0">
            {/* Image Skeleton */}
            <div className="col-md-3 text-center p-3">
              <Skeleton variant="rectangular" height={180} width="100%" />
              <Skeleton variant="text" height={20} width="80%" className="mt-2" />
            </div>

            {/* Details Skeleton */}
            <div className="col-md-6 p-3">
              <div className="d-flex justify-content-end">
                <Skeleton variant="circular" width={24} height={24} />
              </div>
              <Skeleton variant="text" width="80%" height={30} className="mb-2" />

              <div className="d-flex justify-content-between bg-light rounded border p-2 mb-3 me-2">
                <div className="text-center w-100 border-end px-2">
                  <Skeleton variant="text" width="60%" height={20} />
                  <Skeleton variant="text" width="50%" height={18} />
                </div>
                <div className="text-center w-100 border-end px-2">
                  <Skeleton variant="text" width="60%" height={20} />
                  <Skeleton variant="text" width="50%" height={18} />
                </div>
                <div className="text-center w-100 px-2">
                  <Skeleton variant="text" width="60%" height={20} />
                  <Skeleton variant="text" width="50%" height={18} />
                </div>
              </div>

              <Skeleton variant="text" width="90%" height={20} />
              <Skeleton variant="text" width="50%" height={20} />
            </div>

            {/* Price & Button Skeleton */}
            <div className="col-md-3 d-flex flex-column justify-content-between align-items-center p-3">
              <div className="text-center w-100">
                <Skeleton variant="text" width="60%" height={30} />
                <Skeleton variant="text" width="70%" height={20} />
              </div>
              <Skeleton variant="rectangular" width="60%" height={36} className="rounded-5 mt-2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertiesSkeleton;