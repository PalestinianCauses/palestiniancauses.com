// REVIEWED - 01
// eslint-disable-next-line import/no-cycle
import { Properties, ThemeColors, ThemeStyles } from "../page";

type PSCLogoProps = {
  style?: ThemeStyles;
  color?: ThemeColors;
  elements?: {
    tashkeal?: ThemeColors;
    dots?: ThemeColors;
    g?: ThemeColors;
    z?: ThemeColors;
    a?: ThemeColors;
  };
};

export const themeClasses: {
  // eslint-disable-next-line no-unused-vars, no-shadow
  [K in ThemeColors]: { [K in Properties]: string };
} = {
  "primary": {
    bg: "bg-primary",
    text: "text-primary-foreground",
    fill: "fill-primary",
    stroke: "stroke-primary",
  },
  "primary-foreground": {
    bg: "bg-primary-foreground",
    text: "text-primary",
    fill: "fill-primary-foreground",
    stroke: "stroke-primary-foreground",
  },
  "secondary": {
    bg: "bg-secondary",
    text: "text-secondary-foreground",
    fill: "fill-secondary",
    stroke: "stroke-secondary",
  },
  "tertiary": {
    bg: "bg-tertiary",
    text: "text-tertiary-foreground",
    fill: "fill-tertiary",
    stroke: "stroke-tertiary",
  },
  "tertiary-2": {
    bg: "bg-tertiary-2",
    text: "text-tertiary-2-foreground",
    fill: "fill-tertiary-2",
    stroke: "stroke-tertiary-2",
  },
  "transparent": {
    bg: "bg-transparent",
    text: "text-transparent",
    fill: "fill-transparent",
    stroke: "stroke-transparent",
  },
};

export const PSCLogo = function PSCLogo({
  style = "fill",
  color = "primary",
  elements = {},
}: PSCLogoProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 570 531">
      <path
        d="M376.712 0C376.712 7.4 371.112 12.3 363.212 12.3L193.012 12C192.712 4.9 198.212 0.0999994 206.212 0.0999994L376.712 0Z"
        className={themeClasses[elements.tashkeal || color][style]}
      />
      <path
        d="M330 34.2483C327.3 31.3483 324.3 29.1483 320.6 27.7483C314.9 25.4483 309.4 28.8483 309.4 32.5483V39.4483C318.8 39.4483 324.8 46.3483 324.8 52.9483H303.1C298.7 52.9483 293.9 50.9483 291.4 46.8483C290.1 44.8483 288.1 36.3484 284.4 36.3486C280.1 36.3489 278 42.4483 275.7 46.5483C273.7 50.3483 269.7 53.1483 264 53.1483H243.9C243.9 46.5483 249.9 39.6483 259.3 39.6483V32.7483C259.3 29.1483 253.8 25.6483 248.1 27.9483C244.4 29.2483 241.4 31.3483 238.7 34.4483C234.4 39.4483 232 46.1483 232 53.2483V66.9483H264.3C265.2 66.9483 266.1 66.9483 267 66.8483C274.1 66.2483 280.2 63.4483 284.5 58.5483L286.2 60.2483C291.2 64.6483 297.8 66.9483 304.8 66.9483H337.1V53.2483C336.9 45.8483 334.3 39.1483 330 34.2483Z"
        className={themeClasses[elements.tashkeal || color][style]}
      />
      <path
        d="M259.6 274.6C259.6 246.1 279.7 226.1 308.1 226.1H308.7V436.7C308.7 462.1 299.8 485.8 284.4 503.5C273.7 515.3 260.8 523.6 245.9 528.9C226.3 535.4 210.4 518.9 210.4 498.8V485.2C244.1 485.2 259.6 460.4 259.6 436.7V274.6Z"
        className={themeClasses[elements.z || color][style]}
      />
      <path
        d="M569.2 175.451C568.9 163.351 565.5 150.751 559.9 138.851L553.5 146.051L399.6 300.951C397.3 298.651 395.3 296.251 393.4 293.551C393.3 293.451 393.3 293.251 393.1 293.251C379.4 272.251 384.7 248.351 397.4 233.651C397.9 233.151 398.4 232.551 399.1 231.951C399.1 231.951 408.1 222.951 408.3 222.751C428.8 202.251 452 182.551 472.5 160.951C495.4 136.851 515 110.351 524 77.4505C528.3 61.5505 528.7 43.8505 523.2 28.2505C518.5 14.9505 503.2 -6.94945 486.2 2.15055C483.9 2.95055 481.9 4.15055 480 6.05055L462.5 23.5505C464.2 21.8505 473.8 46.4505 474.4 48.9505C477.7 62.4505 474.3 76.6505 467.4 88.4505C456.2 107.751 437.2 122.851 421.6 138.651C403.9 156.551 386.4 174.451 368.6 192.251C347.2 213.651 336.8 239.151 338.5 265.951C339.4 290.051 349.9 313.051 368.2 331.551L324 375.951V445.351L334 436.651L403.9 366.751L438.6 401.451L447.8 392.251C460.4 379.651 460.4 362.151 447.8 349.551L434.5 336.251L484.2 285.251L546.2 224.251C550.1 220.351 553.4 216.251 556.4 212.051C565.7 201.751 569.4 188.951 569.2 175.451Z"
        className={themeClasses[elements.g || color][style]}
      />
      <path
        d="M230.344 265.943C232.044 239.143 221.544 213.543 200.244 192.243L148.144 140.143C148.244 140.143 148.244 140.043 148.444 140.043L114.744 106.243C91.344 82.9432 84.244 42.8432 105.544 23.4432L88.044 5.84324C70.144 -12.0568 48.944 15.4432 44.344 31.0432C37.844 52.6432 42.544 78.5432 53.644 99.9432C42.444 103.743 31.844 110.243 22.744 119.243C9.34399 132.543 1.04399 150.243 0.143994 167.743C-1.15601 187.443 6.34399 206.643 22.744 223.043L151.444 351.743L244.844 445.143V375.743L200.444 331.343C218.544 312.843 229.144 289.743 230.344 265.943ZM57.144 153.943C66.544 144.543 78.344 143.043 88.544 150.643L103.144 165.243C103.244 165.143 103.244 165.143 103.444 164.943L169.744 231.243C193.144 254.643 186.044 283.443 169.344 300.243L57.344 188.243C45.444 176.443 49.244 161.843 57.144 153.943Z"
        className={themeClasses[elements.a || color][style]}
      />
      <path
        d="M220 177C233.807 177 245 165.807 245 152C245 138.193 233.807 127 220 127C206.193 127 195 138.193 195 152C195 165.807 206.193 177 220 177Z"
        className={themeClasses[elements.dots || color][style]}
      />
      <path
        d="M399 129C412.807 129 424 117.807 424 104C424 90.1929 412.807 79 399 79C385.193 79 374 90.1929 374 104C374 117.807 385.193 129 399 129Z"
        className={themeClasses[elements.dots || color][style]}
      />
      <path
        d="M349 177C362.807 177 374 165.807 374 152C374 138.193 362.807 127 349 127C335.193 127 324 138.193 324 152C324 165.807 335.193 177 349 177Z"
        className={themeClasses[elements.dots || color][style]}
      />
      <path
        d="M170 129C183.807 129 195 117.807 195 104C195 90.1929 183.807 79 170 79C156.193 79 145 90.1929 145 104C145 117.807 156.193 129 170 129Z"
        className={themeClasses[elements.dots || color][style]}
      />
    </svg>
  );
};
