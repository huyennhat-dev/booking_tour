import React from "react";
import { styles } from "../../styles/styles";
import NavLink from "../global/NavLink";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";
import { SiFiverr } from "react-icons/si";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  const comapny = [
    {
      path: "/about-us",
      title: "About Us",
    },
    {
      path: "/tourz-reviews",
      title: "Tourz Reviews",
    },
    {
      path: "/contact-us",
      title: "Contact Us",
    },
    {
      path: "/travel-guides",
      title: "Travel Guides",
    },
    {
      path: "/data-policy",
      title: "Data Policy",
    },
    {
      path: "/cookie-policy",
      title: "Cookie Policy",
    },
    {
      path: "/legal",
      title: "Legal",
    },
    {
      path: "/site-map",
      title: "Sitemap",
    },
  ];

  const support = [
    {
      path: "/get-in-touch",
      title: "Get in Touch",
    },
    {
      path: "/help-center",
      title: "Help Center",
    },
    {
      path: "/Live Chat",
      title: "Live Chat",
    },
    {
      path: "/How-it-works",
      title: "How it works",
    },
  ];
  return (
    <div
      className={`pt-16 pb-6 ${styles.horizontalPadding} flex flex-col gap-y-6 relative min-h-96`}
    >
      <div className="w-full bg-pink-200 h-full min-h-96 py-12 rounded-xl flex flex-col gap-y-8 px-4 md:px-8 lg:px-16">
        <div className="w-full flex flex-col gap-y-4 md:gap-y-0 md:flex-row my-3 md:my-0 justify-between items-center">
          <p className="text-lg font-medium text-[05073C]">
            Speak to our expert at{" "}
            <span className="text-[#EB662B]">1-800-453-6744</span>
          </p>
          <div className="w-full md:w-1/5 text-start gap-y-4 md:text-end flex flex-col">
            <p className="text-base text-start md:text-center text-[05073C] font-medium">
              Follow Us
            </p>
            <div className="flex items-center justify-start md:justify-center gap-x-5">
              <FaFacebookF className="w-4 h-4 cursor-pointer" />
              <FaLinkedinIn className="w-4 h-4 cursor-pointer" />
              <FaInstagram className="w-4 h-4 cursor-pointer" />
              <FaTwitter className="w-4 h-4 cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="w-full border border-slate-200"></div>

        {/* links */}
        <div className="w-full grid grid-cols-1 md:grid-cols-10 lg:grid-cols-10 xl:grid-cols-10 gap-y-10 md:gap-y-0">
          <div className="col-span-3 px-1 md:px-3 flex flex-col items-start gap-y-3 md:gap-y-4">
            <h6 className={`text-xl ${styles.blueText} font-medium`}>
              Contact
            </h6>
            <p className={`${styles.blueText} text-sm`}>
              328 Queensberry Street, North Melbourne VIC3051, Australia.
            </p>
            <NavLink path={"/"} title={"hi@viatours.com"} />
          </div>
          <div className="col-span-2 px-1 md:px-3 flex flex-col items-start gap-y-3 md:gap-y-4">
            <h6 className={`text-xl ${styles.blueText} font-medium`}>
              Company
            </h6>
            {comapny.map((c) => {
              return <NavLink key={c.path} title={c.title} />;
            })}
          </div>
          <div className="col-span-2 px-1 md:px-3 flex flex-col items-start gap-y-3 md:gap-y-4">
            <h6 className={`text-xl ${styles.blueText} font-medium`}>
              Support
            </h6>
            {support.map((s) => {
              return <NavLink key={s.path} title={s.title} />;
            })}
          </div>
          <div className="col-span-3 px-1 md:px-3 flex flex-col items-start gap-y-3 md:gap-y-4">
            <h6 className={`text-xl ${styles.blueText} font-medium`}>
              Newsletter
            </h6>
            <p className={`text-sm ${styles.blueText}`}>
              Subscribe to the free newsletter and stay up to date
            </p>
            <div className="w-full h-[48px] flex items-center">
              <input
                type="email"
                className={`w-11/12 h-full rounded-l-xl outline-none text-sm ${styles.blueText} px-3`}
                placeholder="Enter your email"
              />
              <button className="bg-white h-full pr-3 rounded-r-xl text-sm">
                Send
              </button>
            </div>
            <h6 className={`text-xl ${styles.blueText} font-medium`}>
              Mobile Apps
            </h6>
            <NavLink path={"/"} title={"iOS App"} />
            <NavLink path={"/"} title={"Android App"} />
          </div>
        </div>
      </div>
      <p className={`text-xs ${styles.blueText}`}>© Copyright Viatours 2024</p>
    </div>
  );
};

export default Footer;
