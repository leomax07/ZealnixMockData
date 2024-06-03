import React from "react";

function BloodPressure() {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="none"
        viewBox="0 0 32 32"
      >
        <rect width="32" height="32" fill="#FDF4F4" rx="16" />
        <path
          fill="#D14343"
          d="M9.25 14.021c0-2.28 1.514-4.396 3.586-4.396 1.438 0 2.505.949 3.164 2.295.659-1.346 1.726-2.295 3.164-2.295 2.073 0 3.586 2.116 3.586 4.396 0 .398-.044.795-.131 1.184a3.931 3.931 0 00-3.056-1.455 3.938 3.938 0 00-1.721 7.48A17.478 17.478 0 0116 22.375s-6.75-3.261-6.75-8.354z"
        />
        <path
          fill="#D14343"
          d="M20.5 17.875a.75.75 0 11-1.489-.13l-.907-.908.53-.53.862.862a.752.752 0 011.004.706z"
        />
        <path
          fill="#D14343"
          fillRule="evenodd"
          d="M22.75 17.688a3.187 3.187 0 11-6.375 0 3.187 3.187 0 016.375 0zm-.75 0a2.438 2.438 0 11-4.875 0 2.438 2.438 0 014.875 0z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

export default BloodPressure;
