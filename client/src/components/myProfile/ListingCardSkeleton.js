import { Card, Skeleton, Stack, Box, Grid } from "@mui/material";

export default function ListingCardSkeleton() {
  const skeletonStyle = {
    borderRadius: 2,
    backgroundColor: "#93939333",
  };
  return (
    <Grid container spacing={2}>
      <Grid
        item
        size={{ xs: 12, sm: 6, md: 4 }}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: 2,
            boxShadow: "0px 0px 3px #dbdbdb",
            height: "100%",
            backgroundColor: "#fff",
          }}
        >
          {/* Image Skeleton */}
          <Skeleton animation="wave" variant="rectangular" height={180} width="100%" sx={{ backgroundColor: "#93939333", borderRadius: "8px 8px 0 0" }} />
          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            {/* Content Skeleton */}
            <Box px={2} pt={2}>
              <Skeleton animation="wave" variant="text" height={28} width="80%" sx={skeletonStyle} />
              <Skeleton animation="wave" variant="text" height={16} width="40%" sx={skeletonStyle} />

              {/* Chip Skeletons */}
              <Stack direction="row" spacing={1} mt={1} sx={{ flexWrap: "wrap", height: "60px" }}>
                <Skeleton animation="wave" variant="rounded" width={100} height={30} sx={skeletonStyle} />
                <Skeleton animation="wave" variant="rounded" width={120} height={30} sx={skeletonStyle} />
              </Stack>
            </Box>

            {/* Status + Metrics Skeleton */}
            <Box my={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
              <Skeleton animation="wave" variant="circular" width={35} height={20} sx={skeletonStyle} />
              <Skeleton animation="wave" variant="circular" width={35} height={20} sx={skeletonStyle} />
              <Skeleton animation="wave" variant="rounded" width={80} height={28} sx={skeletonStyle} />
            </Box>

            {/* Buttons Skeleton */}
            <Box px={2} pb={2} display="flex" alignItems="center" gap={1.5}>
              <Skeleton animation="wave" variant="rounded" width="100%" height={36} sx={skeletonStyle} />
              <Skeleton animation="wave" variant="rounded" width="100%" height={36} sx={skeletonStyle} />
            </Box>
          </Box>
        </Card>
      </Grid>
      <Grid
        item
        size={{ xs: 12, sm: 6, md: 4 }}
        // key={i}
        // sx={{ px: { xs: 0.5, sm: 1, md: 1 }, py: 0.5 }} // Added more horizontal padding for each slide
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: 2,
            boxShadow: "0px 0px 3px #dbdbdb",
            height: "100%",
            backgroundColor: "#fff",
          }}
        >
          {/* Image Skeleton */}
          <Skeleton animation="wave" variant="rectangular" height={180} width="100%" sx={{ backgroundColor: "#93939333", borderRadius: "8px 8px 0 0" }} />
          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            {/* Content Skeleton */}
            <Box px={2} pt={2}>
              <Skeleton animation="wave" variant="text" height={28} width="80%" sx={skeletonStyle} />
              <Skeleton animation="wave" variant="text" height={16} width="40%" sx={skeletonStyle} />

              {/* Chip Skeletons */}
              <Stack direction="row" spacing={1} mt={1} sx={{ flexWrap: "wrap", height: "60px" }}>
                <Skeleton animation="wave" variant="rounded" width={100} height={30} sx={skeletonStyle} />
                <Skeleton animation="wave" variant="rounded" width={120} height={30} sx={skeletonStyle} />
              </Stack>
            </Box>

            {/* Status + Metrics Skeleton */}
            <Box my={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
              <Skeleton animation="wave" variant="circular" width={35} height={20} sx={skeletonStyle} />
              <Skeleton animation="wave" variant="circular" width={35} height={20} sx={skeletonStyle} />
              <Skeleton animation="wave" variant="rounded" width={80} height={28} sx={skeletonStyle} />
            </Box>

            {/* Buttons Skeleton */}
            <Box px={2} pb={2} display="flex" alignItems="center" gap={1.5}>
              <Skeleton animation="wave" variant="rounded" width="100%" height={36} sx={skeletonStyle} />
              <Skeleton animation="wave" variant="rounded" width="100%" height={36} sx={skeletonStyle} />
            </Box>
          </Box>
        </Card>
      </Grid>
      <Grid
        item
        size={{ xs: 12, sm: 6, md: 4 }}
        // key={i}
        // sx={{ px: { xs: 0.5, sm: 1, md: 1 }, py: 0.5 }} // Added more horizontal padding for each slide
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: 2,
            boxShadow: "0px 0px 3px #dbdbdb",
            height: "100%",
            backgroundColor: "#fff",
          }}
        >
          {/* Image Skeleton */}
          <Skeleton animation="wave" variant="rectangular" height={180} width="100%" sx={{ backgroundColor: "#93939333", borderRadius: "8px 8px 0 0" }} />
          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            {/* Content Skeleton */}
            <Box px={2} pt={2}>
              <Skeleton animation="wave" variant="text" height={28} width="80%" sx={skeletonStyle} />
              <Skeleton animation="wave" variant="text" height={16} width="40%" sx={skeletonStyle} />

              {/* Chip Skeletons */}
              <Stack direction="row" spacing={1} mt={1} sx={{ flexWrap: "wrap", height: "60px" }}>
                <Skeleton animation="wave" variant="rounded" width={100} height={30} sx={skeletonStyle} />
                <Skeleton animation="wave" variant="rounded" width={120} height={30} sx={skeletonStyle} />
              </Stack>
            </Box>

            {/* Status + Metrics Skeleton */}
            <Box my={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
              <Skeleton animation="wave" variant="circular" width={35} height={20} sx={skeletonStyle} />
              <Skeleton animation="wave" variant="circular" width={35} height={20} sx={skeletonStyle} />
              <Skeleton animation="wave" variant="rounded" width={80} height={28} sx={skeletonStyle} />
            </Box>

            {/* Buttons Skeleton */}
            <Box px={2} pb={2} display="flex" alignItems="center" gap={1.5}>
              <Skeleton animation="wave" variant="rounded" width="100%" height={36} sx={skeletonStyle} />
              <Skeleton animation="wave" variant="rounded" width="100%" height={36} sx={skeletonStyle} />
            </Box>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}