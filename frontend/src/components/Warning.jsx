import React from "react";

const Warning = ({error}) => {
  return (
    <div>
      <></>
      <div
        class="flex items-start max-sm:flex-col bg-yellow-100 text-yellow-800 p-4 rounded-lg relative"
        role="alert"
      >
        <div class="flex items-center max-sm:mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-[18px] fill-yellow-500 inline mr-3"
            viewBox="0 0 128 128"
          >
            <path
              d="M56.463 14.337 6.9 106.644C4.1 111.861 8.173 118 14.437 118h99.126c6.264 0 10.338-6.139 7.537-11.356L71.537 14.337c-3.106-5.783-11.968-5.783-15.074 0z"
              data-original="#fad271"
            />
            <g fill="#fff">
              <path
                d="M64 31.726a5.418 5.418 0 0 0-5.5 5.45l1.017 44.289A4.422 4.422 0 0 0 64 85.726a4.422 4.422 0 0 0 4.482-4.261L69.5 37.176a5.418 5.418 0 0 0-5.5-5.45z"
                data-original="#fff"
              />
              <circle cx="64" cy="100.222" r="6" data-original="#fff" />
            </g>
          </svg>
          <strong class="font-bold text-sm">Warning!</strong>
        </div>

        <span class="block sm:inline text-sm ml-4 mr-8 max-sm:ml-0 max-sm:mt-2">
          {error}
        </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-7 hover:bg-yellow-200 rounded-lg transition-all p-2 cursor-pointer fill-yellow-500 absolute right-4 top-1/2 -translate-y-1/2"
          viewBox="0 0 320.591 320.591"
        >
          <path
            d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
            data-original="#000000"
          />
          <path
            d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
            data-original="#000000"
          />
        </svg>
      </div>
    </div>
  );
};

export default Error;
