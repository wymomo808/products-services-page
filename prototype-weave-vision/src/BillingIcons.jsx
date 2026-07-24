import { Box } from "@weave-mui/material";

/** Figma utility/cta-arrow-right — node 6:93206 (Billing VisD). */
export function FigmaCtaArrowRight({ size = 20, sx }) {
  return (
    <Box
      component="svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17.9667 17.9667"
      width={size}
      height={size}
      fill="none"
      aria-hidden
      sx={{ display: "block", flexShrink: 0, ...sx }}
    >
      <path
        d="M9.03368 12.3167L12.3629 8.98333L9.03368 5.65M12.3629 8.98333H4.81667M17.3167 8.98333C17.3167 13.5857 13.5857 17.3167 8.98333 17.3167C4.38096 17.3167 0.65 13.5857 0.65 8.98333C0.65 4.38096 4.38096 0.65 8.98333 0.65C13.5857 0.65 17.3167 4.38096 17.3167 8.98333Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Box>
  );
}

/** Figma actions/cart-full — node 874:98413 (Billing VisD). */
export function FigmaCartFull({ size = 20, sx }) {
  const height = (size * 16.1942) / 17.1333;
  return (
    <Box
      component="svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17.1333 16.1942"
      width={size}
      height={height}
      fill="none"
      aria-hidden
      sx={{ display: "block", flexShrink: 0, ...sx }}
    >
      <path
        d="M0.65 0.65H1.1226C2.0629 0.65 2.87623 1.30502 3.07664 2.22373L4.83459 10.2822H15.2333L16.4833 2.99426H3.24473M8.15 13.8742C8.15 14.7947 7.40381 15.5408 6.48333 15.5408C5.56286 15.5408 4.81667 14.7947 4.81667 13.8742C4.81667 12.9537 5.56286 12.2075 6.48333 12.2075C7.40381 12.2075 8.15 12.9537 8.15 13.8742ZM15.65 13.8775C15.65 14.798 14.9038 15.5442 13.9833 15.5442C13.0629 15.5442 12.3167 14.798 12.3167 13.8775C12.3167 12.957 13.0629 12.2108 13.9833 12.2108C14.9038 12.2108 15.65 12.957 15.65 13.8775Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Box>
  );
}
