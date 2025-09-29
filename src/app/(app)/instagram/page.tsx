"use client";

// REVIEWED - 23
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */

import { QuoteIcon } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import {
  SectionHeading,
  SectionHeadingBadge,
  SectionTitle,
} from "@/components/globals/typography";

// eslint-disable-next-line import/no-cycle
import {
  Frame,
  FrameContent,
  FrameHighlight,
  FrameImagesGrid,
  FrameParagraph,
  FrameParagraphHighlight,
  FrameSquare,
  FrameTitle,
  ImageFrame,
  ImageFrameRender,
} from "./_components/frame";
// eslint-disable-next-line import/no-cycle
import { PSCLogo } from "./_components/psc-logo";

export type Properties = "bg" | "text" | "fill" | "stroke";
export type ThemeStyles = "fill" | "stroke";
export type ThemeColors =
  | "primary"
  | "primary-foreground"
  | "secondary"
  | "tertiary"
  | "tertiary-2"
  | "transparent";
export type Dimensions =
  | "open-graph"
  | "github"
  | "1:1"
  | "1:1.414"
  | "1.6:1"
  | "4:5"
  | "16:9"
  | "9:16";

export const themeClasses: {
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

export const dimensionsClasses: { [K in Dimensions]: string } = {
  "open-graph": "w-[75rem] h-[39.375rem]",
  "github": "w-[80rem] aspect-[2/1]",
  "1:1": "w-[67.5rem] aspect-square",
  "1:1.414": "w-[67.5rem] aspect-[1/1.414]",
  "1.6:1": "w-[67.5rem] aspect-[1.6/1]",
  "4:5": "w-[67.5rem] aspect-[4/5]",
  "16:9": "w-[67.5rem] aspect-[16/9]",
  "9:16": "w-[67.5rem] aspect-[9/16]",
};

export const ShawqiPlusMahaCalligraphy = function ShawqiPlusMahaCalligraphy() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 710 378"
      width="710"
      height="378"
      fill="none">
      <path
        d="M296.7 172C296.4 172.8 296.1 173.6 295.8 174.4C294.7 177.5 293.7 180.6 293 183.8C292.9 184.2 292.3 188.2 292.8 188C346.1 164.5 405.9 171.7 461.3 180.3C491.5 185 521.7 190.2 552.3 191.4C581.6 192.6 612.6 190.9 641 182.6C655.1 178.5 668.9 172.3 680.1 162.6C707.5 139.1 710.3 105.8 709.2 108.2C702.4 123.6 688.9 136.9 684.3 140.4C673.6 148.4 661.3 153.6 648.5 157.2C621 164.8 591.4 166.5 563.2 165.5C505.3 163.4 449.1 146.9 391.1 146.2C364.7 145.9 338.1 148.8 313.1 157.8C314.9 156.6 316.8 155.4 318.7 154.3C327.6 149.3 337 145.2 346.7 142.3C367.5 135.7 389.3 132.3 409.4 123.4C413.9 121.4 418.4 119.2 422.1 115.9C427.4 111.3 430.3 104.4 432.8 97.9C433.4 96.4 434 94.8 434.5 93.3C435.1 91.6 435.9 89.2 436.5 87C437.8 83.6 438.7 80.1 439.3 76.5C441.7 56.1 436.4 35.6 424.3 19C420.3 13.7 415.1 7.79996 408.5 5.79996C401.1 3.49996 394.8 8.59995 389.8 13.5999C383 20.4999 379 29.2 375.8 38.2C372.8 46.7 368.8 57.6999 373.7 66.1999C377.3 72.4999 384.6 75.9 391 78.5C401.2 82.8 414.8 86.8 422.1 95.8C418.1 97.8 414.1 99.5 409.9 100.9C399.4 104.7 388.6 107.4 377.8 110.2C358.3 115.2 338.2 120.7 321.3 132.3C310.2 140 304 150.5 299.6 163.2C299.4 163.9 297.6 168.4 296.7 172ZM414.3 57.8C407.8 55 400.9 52.8999 394.5 49.5999C389.6 47.0999 384.2 43.6 382.3 38.2C382.8 37.7 383.2 37.3 383.7 36.8C388.7 32.3 394.1 29.4 400.7 32.2C411.2 36.7 418.7 48.9 423.1 58.9C423.8 60.5 424.5 62.2 425.1 63.9C421.7 61.5 418.1 59.4 414.3 57.8Z"
        fill="black"
      />
      <path
        d="M636.8 105.2L614.1 93.2C611.4 91.8 597.9 115.9 599.9 117L624.4 130C626.6 131.2 636 115.3 638.3 108.8C645.5 112.4 652.3 116.7 658.8 121.5C660.3 122.6 666.8 111.6 667.5 110.5C668.3 109.2 674.9 99.1 673.1 97.7C666.1 92.5 658.7 87.9 650.9 84.1C648.9 83.2 643 93.7 642.2 95.1C640.1 98.3 638.3 101.7 636.8 105.2Z"
        fill="black"
      />
      <path
        d="M633 87C635.6 88.4 649.3 64.2999 647.2 63.1999C639.1 58.7999 630.8 54.7 622.3 50.8C620.3 49.9 614.4 60.4 613.6 61.8C613 62.8 606.4 73.8 608 74.6C616.5 78.5 624.8 82.6 633 87Z"
        fill="black"
      />
      <path
        d="M695.8 202.8C693.8 205.4 692 208.1 690.3 210.9C688.6 213.7 687.1 216.6 685.7 219.6C685.2 220.7 684.2 222.6 684.7 223.7C689.1 233.4 691.4 244 691.4 254.7C691.4 259.9 691 265.2 689.9 270.3C689.7 271.1 689.6 271.8 689.4 272.6C669 256.6 655.5 229.3 659.4 203C659.7 201.2 657.5 203.5 657.5 203.5C655.6 205.5 653.9 207.8 652.5 210.2C650.1 213.9 646.8 218.5 645.4 223C644.5 224.6 643.7 226.2 643 227.9C642.5 229.1 641.6 230.7 642 232C645 243.4 646 255.2 645 267C644.7 271.6 644 276.2 643 280.8C642.7 282.1 642.3 283.4 642 284.6C632.7 280.9 625.6 272.4 621.2 263.6C616.2 254 614.5 242.9 616.4 232.2C617.1 230.2 617.5 228.2 617.8 226.2C617.9 225.3 618.2 223.7 617 224.4C611.5 227.2 606.4 230.7 601 233.7C595.6 236.7 590 239.5 584.3 242.2C573 247.7 561.3 252.5 549.4 256.6C526.8 264.3 502.9 269.7 479.1 271C467.8 271.6 456.9 271.3 445.8 268.8C450 254.3 449.1 200.7 414.1 199C409.4 198.8 404.8 200.7 401.7 204.3C395.6 211.3 392.5 221.6 390 230.3C386.8 241.6 385.8 254.2 390.8 265.1C397.9 280.8 412.6 290.5 428.7 295.8L427.7 297.3C419.3 310.3 409 322 397.2 332C374.5 351.1 345.2 363.2 315.4 359C308.2 358 301.3 356 294.7 352.9C327.5 340.1 350.9 306.3 359.8 271.6C362.8 259.8 364.6 247 363.7 234.8C362.4 217 355.7 200.3 339.6 189.3C337.2 187.7 334.2 186 331.2 186.5C328.2 187 326.4 189.6 324.7 191.9C317.3 202.1 312.6 214.2 310 226.5C307.4 238.8 307 251.4 313.7 262.2C320.7 273.5 333.4 281.9 346 286.7C345.3 287.8 344.5 288.9 343.7 289.9C334.2 303.1 322.2 314.2 308.3 322.7C281.3 338.8 247.9 343.4 218.7 330.9C211.2 327.7 204.3 323.5 198 318.4C194.8 315.7 191.9 312.7 189.3 309.4C186.8 306.3 185 302.4 182 299.8C182 299.8 198.3 351 256.1 357.8C268.4 359.3 280.9 357.9 292.6 353.6C305.6 363.3 331.9 379.9 354.7 376.7C386.9 372.3 415.8 349.1 437.5 298.3C441.3 299.1 445.1 299.7 449 300.1C474.3 302.8 500 298 524.4 291C539.2 286.7 553.7 281.2 567.6 274.7C579.2 269.3 591.1 263 601.7 255.5C600.1 265.6 601.5 276 605.8 285.4C610.5 295.6 618.6 305.6 629.6 309.1C631.9 309.8 637.3 299.7 638.3 298.1C638.5 297.7 640.1 295 641.5 292.2C643.5 289.5 645.3 286.7 647 283.9C649.6 279.7 651.8 275.2 653.6 270.6C659.4 281.5 667.6 290.9 677.6 298.2C678.8 299.1 683.3 292.1 685.3 288.8C687.3 286.1 689.2 283.2 690.9 280.2C699.1 266.9 705.1 252.4 705.8 236.7C706.5 224.1 704.1 211.4 698.9 199.9C698.7 199.3 696 202.6 695.8 202.8ZM329 244.9C325 241.2 321.8 236.8 319.4 231.9C318.1 229.1 317.2 226.2 316.8 223.1C317.6 222 318.4 220.9 319.2 219.8C320.7 217.9 322.1 216.3 324.7 216.2C327.3 216.1 329.9 217.6 332 219C339.9 224.3 344.7 231.2 348.8 239.7C351.1 244.5 352.8 249.6 353.8 254.9C354.3 257.3 354.6 259.7 354.7 262.1C354.7 262.3 354.7 262.4 354.7 262.6C354.7 262.5 354.6 262.5 354.5 262.5C345.6 256.3 337.1 252.6 329 244.9ZM416.9 256.7C408 250.5 399.7 241.7 397.8 230.6C397.6 229.4 397.4 228.2 397.4 227C398.5 226.5 399.6 226.2 400.8 226.1C411.1 224.6 422.8 231.7 429.1 239.3C435.4 246.9 437.1 256.8 437.8 266.6C430.3 264.4 423.3 261 416.9 256.7Z"
        fill="black"
      />
      <path
        d="M101.9 245C104.5 245.8 107.1 246.6 109.7 247.2L111 247.5C107.3 262.1 108 277.9 116.2 290.5C117.5 292.2 119 293.8 120.6 295.3C128.6 302.6 139.6 306.8 150.5 305.4C164.1 303.7 176.3 296 186.7 287.4C198 278 207.9 266.9 217.9 256.3C224.1 249.7 230.2 243.1 236 236.2C232.8 250.2 231.8 264.8 237.5 278.2C241.2 286.9 247.2 294.4 254.8 300C256.7 301.4 258.9 303.2 261.2 304C263 304.6 263.6 303.7 265 302.2C269.8 296.8 273.3 290.3 276.2 283.7C281.4 272.3 285.8 259.6 286.3 247C287.1 226.3 272.2 205 256.9 191.9C256.8 191.8 256.7 191.9 256.6 192C256.5 191.8 256.3 191.9 255.9 192.2C238.1 212.5 220.1 232.8 200.5 251.4C185.5 265.7 165.5 280.4 144.6 279.6C141.9 279.5 139.3 279.1 136.7 278.5C121.8 275.6 115 262.8 114.8 248.4C125.3 251 136.9 253.7 147 256.1C149.2 256.6 152.9 245.2 153.4 243.7C154.6 240.4 155.6 237.1 156.4 233.8C159.2 227.7 161.4 219.9 162.9 214.6C165.7 204.7 165.9 195.5 161.2 186.3C157 177.9 149.7 171.6 142.7 165.7C135.2 159.5 127.3 153.7 120.3 146.9C116.3 143.1 111.6 137.4 109.8 131.3C108.4 127.4 108.3 123.2 109.6 119.3C108.8 119 107 122.7 107 122.7C104 128.5 101.8 134.7 100.4 141.1C99.1 146.3 99.1 151.7 100.5 156.9C83.6 166 78.2001 184.1 78.2001 184.1C77.8001 185 77.5001 185.8 77.1001 186.7C74.2001 193.9 71.4 201.8 70.9 209.6C70.3 219.1 74.5 227.7 81.4 234C84.4 236.7 87.8 239 91.4 240.8C77 254.9 62.8 268.5 43.6 275.7C45.6 269.9 46.8 263.8 47.1 257.7C47.7 248.2 46.5001 238.7 44.7001 229.4C40.7001 208.6 34.1 188.4 28.4 168.1C23.1 149.2 17.9001 129.9 16.2001 110.2C14.8001 94.1 15.3001 77.8001 17.7001 61.8001C19.0001 52.7001 21.1 43.7 23.9 35C24.2 34 25.9 29.2 28.6 23.2C31.4 16.9 34.9 10.8 38.9 5.20004C42.1 0.900041 34.8 7.40004 34.3 8.20004C10.9 39.9 0.600038 78.1 0.900038 117C1.20004 157.5 16.1 195.8 26.1 234.5C29.0001 245.6 31.6 256.8 32.4 268.2C32.9 273.8 32.8 279.4 32.1 285C31.6 289.4 30.0001 295.3 28.7001 298C28.3001 298.7 25.5 305 27 304.5C27 304.6 27 304.6 27.1 304.6C58.8001 295 80.9 268.9 101.9 245ZM250.2 217.7C250.2 217.9 250.3 218.2 250.5 218.3C262.6 228.7 272 243.3 275.2 259.1C276 263 276.4 267 276.2 271C276.2 271.5 276.1 272.1 276 272.6C275.7 273.1 275.4 273.5 275.1 274C274.2 275.3 273.2 276.5 272.1 277.6C271.9 277.9 271.7 278.1 271.4 278.3C270.9 278.2 270.5 278 270.1 277.7C268.1 276.7 266.2 275.5 264.4 274.2C257.9 269.5 252.5 263.4 248.7 256.3C246.4 251.7 242.1 234.3 250.2 217.7ZM146.7 204.7C149.6 208.1 151.8 211.9 153.4 216.1C154.1 218.2 154.7 220.3 154.9 222.5C155 224.9 154.7 227.3 154.1 229.6C145 227.5 135.3 225.1 126.3 223C124.2 222.5 121.3 222.1 119.2 221.6C120.8 218.3 122.2 214.9 123.3 211.4C125.5 206.2 126.5 200.5 127.4 194.9C127.8 192.5 128.1 190.1 128.2 187.6C134.7 193 141.4 198.2 146.7 204.7ZM84 199.5C82.6 197 81.6001 194.4 81.1001 191.6C88.0001 183.9 99.7001 175 109.6 183.1C113.9 186.6 115.8 192.1 117 197.3C118 201.6 118.4 206 118.2 210.4C117.3 213 115.2 216.1 112.5 219.4C108.3 218.1 104.1 216.5 100.2 214.5C93.7001 211 87.7 206.1 84 199.5Z"
        fill="black"
      />
      <path
        d="M506.6 210C506.1 210.9 502.6 216.2 501.3 219.8L479.8 203.7C478.3 202.6 471.8 213.6 471.1 214.7C470.3 216 463.7 226.1 465.5 227.5L487.8 244.2C489.3 245.3 495.8 234.3 496.5 233.2C497 232.3 500.5 227 501.8 223.4L523.3 239.5C524.8 240.6 531.3 229.6 532 228.5C532.8 227.2 539.4 217.1 537.6 215.7C530.2 210.1 522.7 204.6 515.3 199C513.8 197.9 507.2 208.9 506.6 210Z"
        fill="black"
      />
      <path
        d="M323.5 62.1C319 68.9 312.9 77 316 85.5C318.7 92.7 325.8 96.4 332.2 99.7C334.3 100.7 340.9 91 341.9 89.6C342.6 88.7 350.2 78.2 348.7 77.4C342.4 74.2 335.5 70.6 332.7 63.7C331.3 60.2 332.8 55.9 334.5 52.8C336.9 48.4 340 44.5 342.3 40.1C344.6 35.7 346.6 31.1 346.8 26.2C346.9 24.9 346.8 23.7 346.6 22.4C345.5 15.3 340.2 10.4 335 6.20001C333.3 4.80001 316.1 26.5 318.5 28.5C323.6 32.7 329.7 37.8 330.2 44.9C330.5 49.2 329.3 53.5 327 57.2C325.8 58.8 324.6 60.4 323.5 62.1Z"
        fill="black"
      />
      <path
        d="M185.5 103.3C177.8 110.5 171.2 118.8 165.9 127.9C165.4 128.8 160.5 136.5 161.8 137.3C166.4 129.9 172.2 123.4 179 117.9C184.5 113.3 190.4 109.3 196.6 105.7C210.2 97.8 224.7 91.5 239 85C246.8 81.4 288.4 61.8 296.1 58.2C296.8 56.9 297.5 55.5 298.2 54.2C300.8 49.7 303.5 45.3 305.9 40.8C290.3 48 240.8 71 225.3 78.4C211.2 85.2 197.2 92.7 185.5 103.3Z"
        fill="black"
      />
      <path
        d="M477.6 110.4C482.2 103 488 96.5 494.8 91C500.3 86.4 506.2 82.4 512.4 78.8C527.1 70.2 622.8 22.9 638.8 17.9C639.5 16.6 640.2 15.2 640.9 13.9C643.5 9.40002 646.2 5 648.6 0.5C632.9 7.7 524.1 55.7 501.3 76.4C493.6 83.6 487 91.9 481.7 101C481.2 101.9 476.3 109.7 477.6 110.4Z"
        fill="black"
      />
      <path
        d="M102.6 94.4C95 101.5 88.4 109.7 83.2 118.7C82.7 119.6 77.9 127.2 79.1 128C83.7 120.7 89.4 114.2 96.1 108.8C101.5 104.3 107.4 100.3 113.5 96.7C126.9 88.9 141.3 82.7 155.4 76.2C163.1 72.7 226.1 44.4 233.8 40.9C234.5 39.6 235.2 38.2 235.9 36.9C238.4 32.5 241.1 28.1 243.5 23.7C228.1 30.8 157.2 62.4 141.9 69.7C127.9 76.5 114.1 84 102.6 94.4Z"
        fill="black"
      />
      <path
        d="M574.9 302.1C567.6 321.2 543 324.9 526.2 330.3C517 333.2 508.4 337 501.1 343.6C496.5 347.9 492.9 353.1 490.6 359C491.2 344.9 487.8 328.6 472.8 324.1C465.8 322 458.4 325.1 454.1 331C451.9 334 448.2 342.2 448.8 349.6C449 348.2 451.8 342.8 452.8 341.6C455.7 338.5 459.7 336.7 464 336.6C470.2 336.4 475.8 340.1 479.7 344.6C482.3 347.6 484.2 351.1 485.3 354.9C487 361 487.4 367.4 486.5 373.7C486.4 374.6 486.6 376.7 487.1 375.4C488.2 372.2 489.6 369.2 491.3 366.4C492.5 364.8 493.8 363.2 495.3 361.8C498.5 358.8 502 356.2 505.9 354.2C514.8 349.5 524.3 346.7 533.8 343.6C551.4 337.9 567.8 328.5 574.2 310.1C575.2 307.5 575.9 304.7 576.1 301.8C576.1 300 575.6 300.3 574.9 302.1Z"
        fill="black"
      />
      <path
        d="M62.7 341.1C64.4 339.3 66.3 337.7 68.4 336.4C73.2 333.4 78.4 331.6 83.7 329.5C93.4 325.7 102.2 319.8 105.2 309.3C105.7 307.8 106 306.2 106 304.6C105.9 303.5 105.7 303.7 105.3 304.8C101.9 315.7 88.2 318.7 79 322.3C74 324.3 69.2 326.7 65.4 330.6C63 333.2 61.1 336.2 60.1 339.6C60 331.7 57.5 322.7 48.9 320.7C48.9 323.4 48.5 326 47.7 328.6C48.9 328.9 50 329.4 51 330C57.2 333.8 58.7 341.3 58.4 348C58.4 348.5 58.2 349.5 58.8 348.9C59.3 348 59.6 347.1 59.7 346.1C59.7 346.3 59.9 345.5 60.1 345.2C60.3 344.7 60.6 344.3 60.9 343.8C61.2 342.8 61.9 341.9 62.7 341.1Z"
        fill="black"
      />
      <path
        d="M471.1 70.4C474.7 67.5 476.8 62.9 478.4 58.7C480.3 54 482.2 48.8 482.5 43.7C482.6 41.8 481 42.6 480.7 43.4C468.3 69.5 462.4 54 461.1 49.1C457.9 37.1 464.3 26.6 468.4 15.9C469.3 13.7 470.1 11.4 470.6 9.1C470.6 9.3 471.1 6.00002 470.4 7.00002C467.4 11.1 464.9 15.5 462.9 20.1C460.7 25.4 458.7 30.8 457.1 36.2C454.6 44.6 453 55 455.2 63.7C457.2 71.2 464.4 75.7 471.1 70.4Z"
        fill="black"
      />
      <path
        d="M544.3 83.5C541.6 87.2 539.3 91.1001 537.5 95.3001C535.5 100.1 533.7 104.9 532.3 109.9C530.1 117.5 528.6 126.9 530.6 134.7C532.3 141.4 538.9 145.4 544.9 140.7C548.2 138.1 550 133.9 551.5 130.2C553.2 126 554.9 121.2 555.2 116.7C555.3 115 553.9 115.7 553.5 116.4C542.3 139.9 537 126 535.8 121.6C532.9 110.8 538.7 101.3 542.4 91.7C543.2 89.7 543.9 87.6 544.4 85.5C544.5 85.5 545 82.6 544.3 83.5Z"
        fill="black"
      />
      <path
        d="M224.3 115.4C222.9 118.3 221.8 121.4 220.6 124.5C217.9 131.8 215.6 139.2 213.9 146.8C212 155.3 208.9 175.8 218.5 179.8C223.4 181.8 232.6 174.1 235.9 155.9C235.9 155.8 235.9 155.7 235.8 155.7C235.7 155.7 235.6 155.7 235.6 155.8C229.2 168.6 220.8 167.2 219.6 159.5C217.9 148.1 220.1 139 227.1 112.1C227.7 109.6 224.8 114.2 224.3 115.4Z"
        fill="black"
      />
      <path
        d="M38.4 48.5C36.9 54 35.7 59.5 34.7 65.1C37.6 67.4 43.6 73.5 45.3 76.8C47.5 80.8 47.9 85.5 47.9 90C47.9 92.3 47.7 94.7 47.5 97C47.4 98.3 46.4 101.2 47.4 102.3C47.5 102.4 48 101.5 48.5 100.3C48.5 100.7 48.6 100.9 48.7 100.7C51.5 97.3 53 92.9 55.6 89.3C58.7 85.3 62.1 81.6 65.9 78.3C73.7 71.5 82.3 65.7 91.5 61C100.9 56 110.7 51.6 120.6 47.6C128 44.6 135.7 42.2 142.4 37.9C162.3 25.4 170.2 9.79999 170 9.79999C151.5 26.2 132.8 30.4 125 33.1C105.3 40 84.8 49.5 69.3 63.9C62.1 70.7 56.3 78.8 52.2 87.9C53.9 78.1 53.7 66.9 49.4 58.4C47.2 54.1 43.8 50.1 38.9 48.8C38.9 48.6 38.6 48.6 38.4 48.5Z"
        fill="black"
      />
      <path
        d="M167.3 312.3C160.9 307.1 155.7 312.1 152.1 317.7L152 317.8L151.6 318.4C143.9 331.3 128.1 340.5 114.2 347.4C97 356 78.5 360.9 60 365.8C58.9 366.1 93.9 365.8 110.3 359C124.2 353.2 136.1 345.2 145.8 333.7C147.3 331.9 148.4 329.8 149.1 327.5V327.4C148.8 328.9 148.7 330.5 148.8 332C148.9 335.6 151.3 338 154.1 339.6C157.3 341.4 161.2 342.9 164.9 342C168.6 341.1 169.8 336.4 170.9 333.3C173.5 326.4 173.5 317.3 167.3 312.3ZM160.2 328.1C158.2 327.2 154.4 325.3 152.8 322.8C155 321.3 157.9 321.1 160.3 322.1C163.4 323.4 165.8 326.5 167 329.9C164.7 329.7 162.4 329.1 160.2 328.1Z"
        fill="black"
      />
    </svg>
  );
};

const InstagramStudioPage = function InstagramStudioPage() {
  // Followers from my GitHub profile, please ignore this :)

  const frames: ImageFrame[] = [
    {
      id: "open-graph-01",
      ref: useRef<HTMLDivElement>(null),
      as: "jpeg",
    },
    {
      id: "open-graph-02",
      ref: useRef<HTMLDivElement>(null),
      as: "jpeg",
    },
    {
      id: "open-graph-03",
      ref: useRef<HTMLDivElement>(null),
      as: "jpeg",
    },
    {
      id: "open-graph-04",
      ref: useRef<HTMLDivElement>(null),
      as: "jpeg",
    },
    {
      id: "i-g-story-template-01",
      ref: useRef<HTMLDivElement>(null),
      as: "jpeg",
    },
    {
      id: "i-g-story-template-02",
      ref: useRef<HTMLDivElement>(null),
      as: "jpeg",
    },
    {
      id: "github-01",
      ref: useRef<HTMLDivElement>(null),
      as: "jpeg",
    },
  ];

  const profileImagesFrames: ImageFrame[] = [
    {
      id: "profile-primary",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
    {
      id: "profile-primary-foreground",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
    {
      id: "logo-primary",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
    {
      id: "logo-primary-foreground",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
  ];

  const hoodiesFrames: ImageFrame[] = [
    {
      id: "black-hoodie-back",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
    {
      id: "white-hoodie-back",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
    {
      id: "red-hoodie-back",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
  ];

  const instagramFrames: ImageFrame[] = [
    {
      id: "ig-01",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
    {
      id: "ig-02",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
    {
      id: "ig-03",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
    {
      id: "ig-04",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
    {
      id: "ig-05",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
  ];

  const nArtWorkFrames: ImageFrame[] = [
    {
      id: "n-art-work-01",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
    {
      id: "n-art-work-02",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
    {
      id: "n-art-work-03",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
    {
      id: "n-art-work-04",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
    {
      id: "n-art-work-05",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
  ];

  const qrCodeFrames: ImageFrame[] = [
    {
      id: "qr-code-01",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
    {
      id: "qr-code-02",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
    {
      id: "qr-code-03",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
    {
      id: "qr-code-04",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
  ];

  return (
    <main className="section-padding-start-lg">
      {/* Open Graph */}
      <ImageFrameRender frames={profileImagesFrames} />
      <ImageFrameRender frames={hoodiesFrames} />
      <ImageFrameRender frames={instagramFrames} />
      <ImageFrameRender frames={nArtWorkFrames} />
      <ImageFrameRender frames={qrCodeFrames} />
      {/* QR Code */}
      <Frame ref={qrCodeFrames[0].ref} dimensions="1:1.414" color="primary">
        <FrameContent className="h-[80rem] w-[60rem] justify-center">
          <SectionTitle className="mx-auto text-center font-bold !leading-[0.9] text-primary-foreground">
            {" "}
            <FrameHighlight className="text-primary before:-inset-x-2.5 before:bg-primary-foreground before:ring-primary-foreground">
              Stories
            </FrameHighlight>{" "}
            that <br />
            must be{" "}
            <FrameHighlight className="text-primary before:-inset-x-2.5 before:bg-primary-foreground before:ring-primary-foreground">
              told.
            </FrameHighlight>
          </SectionTitle>
          <FrameParagraph className="text-center">
            An intimate collection of diaries and art from the heart of{" "}
            <FrameParagraphHighlight className="bg-primary-foreground text-primary">
              Gaza.
            </FrameParagraphHighlight>{" "}
            In a library of{" "}
            <FrameParagraphHighlight className="bg-primary-foreground text-primary">
              millions
            </FrameParagraphHighlight>{" "}
            of stories, this one is waiting for{" "}
            <FrameParagraphHighlight className="bg-primary-foreground text-primary">
              you
            </FrameParagraphHighlight>{" "}
            — raw, un-
            <span className="-mr-px tracking-wide">fi</span>ltered, and deeply
            human.
          </FrameParagraph>
          <Image
            src="/qr-code-palestiniancauses.png"
            alt="QR Code"
            fill
            className="!static mx-auto my-12 !h-auto !w-full max-w-md object-cover object-center ring-4 ring-primary-foreground"
          />
          <FrameSquare className="mx-auto bg-primary-foreground text-primary ring-primary-foreground">
            <Image
              src="/logo-primary.png"
              alt="Primary Logo"
              fill
              className="!static !h-24 !w-24"
            />
          </FrameSquare>
        </FrameContent>
      </Frame>
      <Frame
        ref={qrCodeFrames[1].ref}
        dimensions="1.6:1"
        color="primary-foreground">
        <FrameImagesGrid>
          <div className="relative col-start-2 col-end-7 row-start-3 row-end-11">
            <FrameSquare className="mx-auto h-full w-full bg-primary-foreground ring-primary-foreground">
              <Image
                src="/logo-primary.png"
                alt="Primary Logo"
                fill
                className="!static !h-auto !max-w-xs"
              />
            </FrameSquare>
          </div>
          <div className="relative col-start-7 col-end-12 row-start-3 row-end-11 ring-2 ring-primary ring-offset-8 ring-offset-primary-foreground">
            <Image
              src="/qr-code-palestiniancauses.png"
              alt="QR Code"
              fill
              className="!static mx-auto max-w-md object-cover object-center"
            />
          </div>
        </FrameImagesGrid>
      </Frame>
      <Frame
        ref={qrCodeFrames[2].ref}
        dimensions="1.6:1"
        color="primary"
        className="flex-col">
        <SectionTitle className="mx-auto mb-6 text-center font-bold !leading-[0.9] text-primary-foreground">
          {" "}
          <FrameHighlight className="text-primary before:-inset-x-2.5 before:bg-primary-foreground before:ring-primary-foreground">
            Stories
          </FrameHighlight>{" "}
          that <br />
          must be{" "}
          <FrameHighlight className="text-primary before:-inset-x-2.5 before:bg-primary-foreground before:ring-primary-foreground">
            told.
          </FrameHighlight>
        </SectionTitle>
        <FrameParagraph className="mb-12 max-w-4xl text-center">
          Discover authentic diaries and art from the heart of Gaza. A
          perspective beyond the headlines.
        </FrameParagraph>
        <SectionHeadingBadge className="text-primary-foreground">
          Scan to Order Your Copy
        </SectionHeadingBadge>
      </Frame>
      {/* <Frame
        ref={qrCodeFrames[3].ref}
        dimensions="9:16"
        color="primary-foreground">
        <FrameContent></FrameContent>
      </Frame> */}
      {/* N's Art-Work */}
      <Frame
        ref={nArtWorkFrames[0].ref}
        dimensions="4:5"
        color="primary-foreground">
        <FrameContent>
          <FrameSquare className="mb-auto bg-primary-foreground text-primary ring-primary-foreground">
            <Image
              src="/logo-primary.png"
              alt="Primary Logo"
              fill
              className="!static !h-24 !w-24"
            />
          </FrameSquare>
          <FrameTitle className="grid w-full grid-cols-1 grid-rows-3 items-start">
            <FrameHighlight className="w-max before:-inset-x-2.5 before:top-1/4 before:bg-primary-foreground before:ring-primary-foreground">
              The Unknown
            </FrameHighlight>
            <FrameHighlight className="w-max before:-inset-x-2.5 before:top-1/4 before:bg-primary-foreground before:ring-primary-foreground">
              Is Lurking
            </FrameHighlight>
            <FrameHighlight className="w-max before:-inset-x-2.5 before:top-1/4 before:bg-primary-foreground before:ring-primary-foreground">
              For Gazans.
            </FrameHighlight>
          </FrameTitle>
          <SectionHeadingBadge className="bg-primary text-lg text-primary-foreground ring-primary">
            Artwork by N. — Digitally Enhanced for a Re
            <span className="-mr-px tracking-wide">fi</span>ned Experience
          </SectionHeadingBadge>
        </FrameContent>
        <FrameImagesGrid>
          <div className="relative col-start-1 col-end-13 row-start-1 row-end-13">
            <Image
              src="/the-unknown-is-lurking-for-gazans-refined.png"
              alt="N's Art-Work no. 03"
              fill
              className="!static object-cover object-center"
            />
          </div>
        </FrameImagesGrid>
      </Frame>
      <Frame
        ref={nArtWorkFrames[1].ref}
        dimensions="4:5"
        color="primary-foreground">
        <FrameContent>
          <FrameSquare className="shrink-0 bg-primary text-primary-foreground ring-primary">
            <QuoteIcon className="h-20 w-20 stroke-[1.5]" />
          </FrameSquare>
          <FrameParagraph>
            Nothing can describe the feeling of a traveler spat by war at that
            moment, filled with confusion, fear, and{" "}
            <FrameParagraphHighlight className="bg-primary text-primary-foreground">
              false security in front of Rafah crossing.
            </FrameParagraphHighlight>{" "}
            My friend told me that he had waited for his name on the list of
            travelers for several weeks, but as soon as he saw it later, he
            cried. S. was about to cross the intersection, but he looked toward
            his father and brother,{" "}
            <FrameParagraphHighlight className="bg-primary text-primary-foreground">
              his eyes begging them to answer a
            </FrameParagraphHighlight>{" "}
            <FrameParagraphHighlight className="bg-primary text-primary-foreground">
              straightforward question:
            </FrameParagraphHighlight>{" "}
            Is what I am doing right or wrong? Rescue me from traveling if it is
            a bad decision.
          </FrameParagraph>
          <FrameParagraph>
            S. says ruefully: &ldquo;One does not feel proud to be Palestinian
            except in his \ her homeland, but outside its borders, he \ she...
          </FrameParagraph>
        </FrameContent>
      </Frame>
      <Frame ref={nArtWorkFrames[2].ref} dimensions="4:5" color="primary">
        <FrameContent className="justify-center">
          <FrameTitle>
            ...understands very well the{" "}
            <FrameHighlight className="mx-2.5 text-primary before:-inset-x-2.5 before:bg-primary-foreground before:ring-primary-foreground">
              curse
            </FrameHighlight>{" "}
            of the{" "}
            <FrameHighlight className="mx-2.5 text-primary before:-inset-x-2.5 before:bg-primary-foreground before:ring-primary-foreground">
              Palestinian...
            </FrameHighlight>
          </FrameTitle>
          <SectionHeadingBadge className="text-primary-foreground">
            Composed by L. featured in The Volume &quot;A Human But From
            Gaza&quot;
          </SectionHeadingBadge>
        </FrameContent>
      </Frame>
      <Frame
        ref={nArtWorkFrames[3].ref}
        dimensions="4:5"
        color="primary-foreground">
        <FrameContent>
          <FrameTitle>
            Discover the complete diary and{" "}
            <FrameHighlight className="text-primary-foreground before:-inset-x-2.5 before:bg-primary before:ring-primary">
              further
            </FrameHighlight>{" "}
            compelling{" "}
            <FrameHighlight className="z-20 -mx-2.5 text-primary-foreground before:-inset-x-2.5 before:bg-primary before:ring-primary">
              narratives
            </FrameHighlight>{" "}
            within:
          </FrameTitle>
        </FrameContent>
      </Frame>
      <Frame ref={nArtWorkFrames[4].ref} dimensions="4:5" color="primary">
        <FrameContent>
          <FrameTitle>
            Link in{" "}
            <FrameHighlight className="text-primary before:-inset-x-2.5 before:bg-primary-foreground before:ring-primary-foreground">
              bio.
            </FrameHighlight>{" "}
          </FrameTitle>
          <FrameSquare className="mt-auto bg-primary-foreground text-primary ring-primary-foreground">
            <Image
              src="/logo-primary.png"
              alt="Primary Logo"
              fill
              className="!static !h-24 !w-24"
            />
          </FrameSquare>
        </FrameContent>
        <FrameImagesGrid className="scale-1">
          <div className="col-start-6 col-end-13 row-start-4 row-end-13 -translate-y-10 ring ring-primary-foreground ring-offset-8 ring-offset-primary">
            <Image
              src="https://nwdtauhmkupvkywh.public.blob.vercel-storage.com/book-cover/book-cover-new.png"
              alt="A Human But From Gaza Book Cover"
              fill
              className="!static object-cover object-[top_left]"
            />
          </div>
        </FrameImagesGrid>
      </Frame>
      {/* Diary Entry */}
      <Frame
        ref={instagramFrames[0].ref}
        dimensions="4:5"
        color="primary-foreground">
        <FrameContent>
          <SectionHeadingBadge className="text-lg">
            The Truth Museum: Humans But From Gaza
          </SectionHeadingBadge>
          <FrameTitle>
            Literature in the Form of{" "}
            <span className="relative z-20">Haunting</span>
            <FrameHighlight className="relative z-10 text-primary before:-inset-x-2.5 before:bg-background before:ring-input">
              Nightmares.
            </FrameHighlight>{" "}
          </FrameTitle>
          <FrameSquare className="mt-auto bg-background text-primary ring-input">
            <Image
              src="/logo-primary.png"
              alt="Primary Logo"
              fill
              className="!static !h-24 !w-24"
            />
          </FrameSquare>
        </FrameContent>
      </Frame>
      <Frame ref={instagramFrames[1].ref} dimensions="4:5" color="primary">
        <FrameContent>
          <FrameSquare className="shrink-0 bg-primary-foreground text-primary ring-primary-foreground">
            <QuoteIcon className="h-20 w-20 stroke-[1.5]" />
          </FrameSquare>
          <FrameParagraph>
            I find myself reading a{" "}
            <FrameParagraphHighlight className="bg-primary-foreground text-primary">
              Nakba novel
            </FrameParagraphHighlight>{" "}
            while living through a{" "}
            <FrameParagraphHighlight className="bg-primary-foreground text-primary">
              present one.
            </FrameParagraphHighlight>{" "}
            I read in the book about the sound of an explosion, and then I heard
            it exploding in my neighborhood, so I don&apos;t get bored with the
            reality. I go to read war diaries, and I discuss with other readers
            about our written reality between the lines at dedicated gatherings,
            and I find them like me, deeply immersed.
          </FrameParagraph>
          <FrameParagraph>
            I don&apos;t have the time to read{" "}
            <FrameParagraphHighlight className="bg-primary-foreground text-primary">
              Western literature,
            </FrameParagraphHighlight>{" "}
            because sometimes I feel it&apos;s{" "}
            <FrameParagraphHighlight className="bg-primary-foreground text-primary">
              a betrayal.
            </FrameParagraphHighlight>{" "}
            As if there is no trace of reassurance; fear has become the
            companion, the maze is the compass, the homelessness is the shelter,
            and the inhalation here has...
          </FrameParagraph>
        </FrameContent>
      </Frame>
      <Frame
        ref={instagramFrames[2].ref}
        dimensions="4:5"
        color="primary-foreground">
        <FrameContent className="justify-center">
          <FrameTitle>
            has <br />
            <FrameHighlight className="mx-2.5 text-primary-foreground before:-inset-x-2.5 before:bg-primary before:ring-primary">
              become
            </FrameHighlight>{" "}
            without <br />
            <FrameHighlight className="mx-2.5 text-primary-foreground before:-inset-x-2.5 before:bg-primary before:ring-primary">
              exhalation!
            </FrameHighlight>{" "}
          </FrameTitle>
          <SectionHeadingBadge className="text-current ring-primary">
            Composed by Basmala featured in The Truth Museum
          </SectionHeadingBadge>
        </FrameContent>
      </Frame>
      <Frame ref={instagramFrames[3].ref} dimensions="4:5" color="primary">
        <FrameContent>
          <FrameTitle>
            Discover the complete diary and{" "}
            <FrameHighlight className="text-primary before:-inset-x-2.5 before:bg-primary-foreground before:ring-primary-foreground">
              further
            </FrameHighlight>{" "}
            compelling{" "}
            <FrameHighlight className="z-20 -mx-2.5 text-primary before:-inset-x-2.5 before:bg-primary-foreground before:ring-primary-foreground">
              narratives
            </FrameHighlight>{" "}
            within:
          </FrameTitle>
        </FrameContent>
      </Frame>
      <Frame
        ref={instagramFrames[4].ref}
        dimensions="4:5"
        color="primary-foreground">
        <FrameContent>
          <FrameTitle>
            The{" "}
            <FrameHighlight className="text-primary-foreground before:-inset-x-2.5 before:bg-primary before:ring-primary">
              Truth
            </FrameHighlight>{" "}
            Museum. Link in{" "}
            <FrameHighlight className="text-primary-foreground before:-inset-x-2.5 before:bg-primary before:ring-primary">
              bio.
            </FrameHighlight>{" "}
          </FrameTitle>
          <FrameSquare className="mt-auto bg-background text-primary-foreground ring-input">
            <Image
              src="/logo-primary.png"
              alt="Primary Logo"
              fill
              className="!static !h-24 !w-24"
            />
          </FrameSquare>
        </FrameContent>
        <FrameImagesGrid className="scale-1">
          <div className="col-start-6 col-end-13 row-start-6 row-end-13 ring ring-primary ring-offset-8 ring-offset-primary-foreground">
            <Image
              src="/The-Truth-Museum.png"
              alt="The Truth Museum"
              fill
              className="!static object-cover object-[top_left]"
            />
          </div>
        </FrameImagesGrid>
      </Frame>
      {/* Logo */}
      <Frame
        ref={profileImagesFrames[2].ref}
        dimensions="1:1"
        color="primary-foreground"
        className="bg-transparent">
        <div className="-mb-16 w-[56.625rem]">
          <PSCLogo />
        </div>
      </Frame>
      <Frame
        ref={profileImagesFrames[3].ref}
        dimensions="1:1"
        color="primary"
        className="bg-transparent">
        <div className="-mb-16 w-[56.625rem]">
          <PSCLogo color="primary-foreground" />
        </div>
      </Frame>
      {/* Social Media Avatars */}
      <Frame
        ref={profileImagesFrames[0].ref}
        dimensions="1:1"
        color="primary-foreground">
        <div className="-mb-16 w-[47.5rem]">
          <PSCLogo />
        </div>
      </Frame>
      <Frame ref={profileImagesFrames[1].ref} dimensions="1:1" color="primary">
        <div className="-mb-16 w-[47.5rem]">
          <PSCLogo color="primary-foreground" />
        </div>
      </Frame>
      {/* Social Media Templates */}
      <Frame ref={frames[6].ref} dimensions="9:16" color="primary-foreground">
        <div className="mb-52 mt-auto w-[10rem]">
          <PSCLogo />
        </div>
      </Frame>
      <Frame ref={frames[5].ref} dimensions="9:16" color="primary">
        <div className="mb-52 mt-auto w-[10rem]">
          <PSCLogo color="primary-foreground" />
        </div>
      </Frame>
      {/* GitHub */}
      <Frame ref={frames[6].ref} dimensions="github" color="primary">
        <FrameContent className="h-[32rem] w-[70rem]">
          <SectionHeading className="!max-w-none !text-7xl font-bold text-primary-foreground lg:!leading-none xl:!leading-none">
            Join our open-source <br />
            <span className="relative z-10 mr-2 inline-block font-semibold text-primary before:absolute before:-right-2 before:left-0 before:top-1/2 before:z-[-1] before:block before:h-16 before:-translate-y-1/2 before:bg-primary-foreground">
              mission.
            </span>{" "}
            Contribute to strengthen PalestinianCauses{" "}
            <span className="relative z-10 inline-block pl-1 font-semibold text-primary before:absolute before:-right-2 before:left-0 before:top-1/2 before:z-[-1] before:block before:h-16 before:-translate-y-1/2 before:bg-primary-foreground">
              identity.
            </span>{" "}
          </SectionHeading>
          <SectionHeadingBadge className="text-lg text-primary-foreground">
            Maintained By Shawqi Hatem (@shawqicauses)
          </SectionHeadingBadge>
        </FrameContent>
        <FrameImagesGrid>
          <div className="relative col-start-7 col-end-13 row-start-6 row-end-13 translate-y-2.5 p-2.5 ring-2 ring-primary">
            <Image
              src="/i-g-01.png"
              alt="Screen Shot UI 07"
              fill
              sizes="42rem"
              className="!relative bg-primary-foreground object-cover object-center"
            />
          </div>
        </FrameImagesGrid>
      </Frame>
      {/* Hoodies */}
      <Frame
        ref={hoodiesFrames[0].ref}
        dimensions="4:5"
        color="primary-foreground"
        className="bg-transparent">
        <SectionHeading className="!text-9xl">
          CODE <br />
          <span className="relative z-10 inline-block pl-2 font-[900] text-primary-foreground before:absolute before:-right-2 before:left-0 before:top-1/2 before:z-[-1] before:block before:h-28 before:-translate-y-1/2 before:bg-primary">
            WRITTEN
          </span>{" "}
          <br />
          WITH
          <br />
          THE{" "}
          <span className="relative z-10 inline-block pl-2 font-[900] text-primary-foreground before:absolute before:-right-2 before:left-0 before:top-1/2 before:z-[-1] before:block before:h-28 before:-translate-y-1/2 before:bg-primary">
            SOUND
          </span>{" "}
          <br /> OF <br />
          <span className="relative z-10 inline-block pl-2 font-[900] text-primary-foreground before:absolute before:-right-2 before:left-0 before:top-1/2 before:z-[-1] before:block before:h-28 before:-translate-y-1/2 before:bg-primary">
            BOMBS.
          </span>{" "}
          <br />{" "}
          <span className="text-7xl font-medium italic tracking-normal text-primary/20">
            (Still Transmitting Truth).
          </span>
        </SectionHeading>
      </Frame>
      <Frame
        ref={hoodiesFrames[1].ref}
        dimensions="4:5"
        color="primary"
        className="bg-transparent">
        <SectionHeading className="!text-9xl text-primary-foreground">
          <span className="relative z-10 inline-block pl-2 font-extrabold text-primary before:absolute before:-right-2 before:left-0 before:top-1/2 before:z-[-1] before:block before:h-28 before:-translate-y-1/2 before:bg-primary-foreground">
            RUINS
          </span>{" "}
          <br />
          AT
          <br />
          <span className="relative z-10 inline-block pl-2 font-extrabold text-primary before:absolute before:-right-2 before:left-0 before:top-1/2 before:z-[-1] before:block before:h-28 before:-translate-y-1/2 before:bg-primary-foreground">
            DUSK
          </span>{" "}
          <br />
          REBUILDING
          <br />
          AT{" "}
          <span className="relative z-10 inline-block pl-2 font-extrabold text-primary before:absolute before:-right-2 before:left-0 before:top-1/2 before:z-[-1] before:block before:h-28 before:-translate-y-1/2 before:bg-primary-foreground">
            DAWN.
          </span>{" "}
          <br />{" "}
          <span className="text-7xl font-semibold italic tracking-normal text-primary-foreground/20">
            (Gaza Strip).
          </span>
        </SectionHeading>
      </Frame>
      <Frame
        ref={hoodiesFrames[2].ref}
        dimensions="4:5"
        color="primary-foreground"
        className="bg-transparent">
        <SectionHeading className="!text-9xl">
          UNDER <br />
          <span className="relative z-10 ml-40 inline-block pl-2 font-[900] text-primary-foreground before:absolute before:-right-2 before:left-0 before:top-1/2 before:z-[-1] before:block before:h-28 before:-translate-y-1/2 before:bg-primary">
            ASHES.
          </span>{" "}
          <br />
          BUILDING{" "}
          <span className="relative z-10 inline-block pl-2 font-[900] text-primary-foreground before:absolute before:-right-2 before:left-0 before:top-1/2 before:z-[-1] before:block before:h-28 before:-translate-y-1/2 before:bg-primary">
            THE
          </span>{" "}
          <br /> NEXT
          <span className="relative z-10 ml-40 inline-block pl-2 font-[900] text-primary-foreground before:absolute before:-right-2 before:left-0 before:top-1/2 before:z-[-1] before:block before:h-28 before:-translate-y-1/2 before:bg-primary">
            SUN.
          </span>{" "}
          <br />{" "}
          <span className="text-7xl font-medium italic tracking-normal text-primary/20">
            (GAZA&apos;S LIGHT).
          </span>
        </SectionHeading>
      </Frame>
    </main>
  );
};

export default InstagramStudioPage;
