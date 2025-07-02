import React from 'react';
import { Card, Skeleton, Stack, Box, Grid } from "@mui/material";

export default function ViewMoreSkeleton() {
  const skeletonStyle = {
    borderRadius: 2,
    backgroundColor: "#93939333",
  };

  return (
    <div className="container my-5 pt-5">
      <div className="border rounded shadow-sm p-4 bg-white mt-4">
        {/* Price and Title Skeleton */}
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <Skeleton animation="wave" variant="text" height={40} width="60%" sx={skeletonStyle} />
            <Skeleton animation="wave" variant="text" height={28} width="40%" sx={skeletonStyle} />
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="row">
          {/* Left: Main Image */}
          <div className="col-md-6 mb-4 mb-md-0">
            <Skeleton animation="wave" variant="rectangular" height={350} width="100%" sx={{ backgroundColor: "#93939333", borderRadius: "8px" }} />
            <div className="d-flex gap-3 mt-5 ms-2">
              <Skeleton animation="wave" variant="rounded" width={150} height={36} sx={skeletonStyle} />
              <Skeleton animation="wave" variant="rounded" width={150} height={36} sx={skeletonStyle} />
            </div>
          </div>

          {/* Right: Details Skeleton */}
          <div className="col-md">
            <div className="bg-light border rounded mb-4 p-3">
              <div className="row text-center">
                <div className="col-6 col-md-4 mb-2">
                  <Skeleton animation="wave" variant="text" height={20} width="80%" sx={skeletonStyle} />
                  <Skeleton animation="wave" variant="text" height={16} width="60%" sx={skeletonStyle} />
                </div>
                <div className="col-6 col-md-4 mb-1">
                  <Skeleton animation="wave" variant="text" height={20} width="80%" sx={skeletonStyle} />
                  <Skeleton animation="wave" variant="text" height={16} width="60%" sx={skeletonStyle} />
                </div>
                <div className="col-6 col-md-4 mb-1">
                  <Skeleton animation="wave" variant="text" height={20} width="80%" sx={skeletonStyle} />
                  <Skeleton animation="wave" variant="text" height={16} width="60%" sx={skeletonStyle} />
                </div>
              </div>
            </div>

            {/* Info Grid Skeleton */}
            <div className="row text-start mb-3">
              {Array(4).fill().map((_, i) => (
                <div className="col-4 mb-3 ms-5" key={i}>
                  <Skeleton animation="wave" variant="text" height={20} width="80%" sx={skeletonStyle} />
                  <Skeleton animation="wave" variant="text" height={16} width="60%" sx={skeletonStyle} />
                </div>
              ))}
            </div>

            {/* Owner Info Skeleton */}
            <div className="d-flex align-items-center mb-3">
              <Skeleton animation="wave" variant="circular" width={40} height={40} sx={skeletonStyle} />
              <Skeleton animation="wave" variant="text" height={20} width="40%" sx={skeletonStyle} />
            </div>
          </div>
        </div>

        {/* Footer Skeleton */}
        <div className="d-flex justify-content-end mt-4 text-muted small">
          <Skeleton animation="wave" variant="text" height={20} width="30%" sx={skeletonStyle} />
        </div>
      </div>

      {/* More Details Section Skeleton */}
      <div className="border rounded mt-5 p-4 bg-white">
        <h4 className="fw-bold mb-4">
          <Skeleton animation="wave" variant="text" height={28} width="50%" sx={skeletonStyle} />
        </h4>

        {Array(4).fill().map((_, i) => (
          <div className="row mb-4" key={i}>
            <div className="col-2 text-muted fs-5">
              <Skeleton animation="wave" variant="text" height={20} width="60%" sx={skeletonStyle} />
            </div>
            <div className="col-2 fw-semibold text-dark fs-5">
              <Skeleton animation="wave" variant="text" height={20} width="60%" sx={skeletonStyle} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
