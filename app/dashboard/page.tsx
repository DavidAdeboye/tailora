"use client";
import { useState } from "react";

const orders = [
  { id: "#28373", client: "Olamide Akintan", phone: "+234 **** 2039 ****", gender: "Male", outfit: "Wedding gown", status: "Collected", statusType: "collected" },
  { id: "#32876", client: "Olamide Akintan", phone: "+234 **** 2039 ****", gender: "Female", outfit: "Suit", status: "Collected", statusType: "collected" },
  { id: "#11394", client: "Olamide Akintan", phone: "+234 **** 2039 ****", gender: "Male", outfit: "Wedding gown", status: "Overdue 2 days", statusType: "overdue" },
  { id: "#99822", client: "Olamide Akintan", phone: "+234 **** 2039 ****", gender: "Female", outfit: "Senator", status: "Due in 3 days", statusType: "due" },
  { id: "#11873", client: "Olamide Akintan", phone: "+234 **** 2039 ****", gender: "Male", outfit: "Senator", status: "Due in 3 days", statusType: "due" },
];

const stats = [
  { label: "Total Clients", value: "10,000,000", icon: <PeopleIcon /> },
  { label: "Pending Deliveries", value: "10,000,000", icon: <GraphIcon /> },
  { label: "Orders in Progress", value: "10,000,000", icon: <CoinIcon /> },
  { label: "Team Members", value: "10,000,000", icon: <TeamIcon /> },
];

function PeopleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.4" d="M17.53 7.77C17.46 7.76 17.39 7.76 17.32 7.77C15.77 7.72 14.54 6.45 14.54 4.89C14.54 3.3 15.83 2 17.43 2C19.02 2 20.32 3.29 20.32 4.89C20.31 6.45 19.08 7.72 17.53 7.77Z" fill="#121212"/>
<path opacity="0.4" d="M20.7899 14.6999C19.6699 15.4499 18.0999 15.7299 16.6499 15.5399C17.0299 14.7199 17.2299 13.8099 17.2399 12.8499C17.2399 11.8499 17.0199 10.8999 16.5999 10.0699C18.0799 9.86992 19.6499 10.1499 20.7799 10.8999C22.3599 11.9399 22.3599 13.6499 20.7899 14.6999Z" fill="#121212"/>
<path opacity="0.4" d="M6.44014 7.77C6.51014 7.76 6.58015 7.76 6.65015 7.77C8.20015 7.72 9.43015 6.45 9.43015 4.89C9.43015 3.3 8.14015 2 6.54015 2C4.95015 2 3.65015 3.29 3.65015 4.89C3.66015 6.45 4.89014 7.72 6.44014 7.77Z" fill="#121212"/>
<path opacity="0.4" d="M6.55012 12.8501C6.55012 13.8201 6.76012 14.7401 7.14012 15.5701C5.73012 15.7201 4.26012 15.4201 3.18012 14.7101C1.60012 13.6601 1.60012 11.9501 3.18012 10.9001C4.25012 10.1801 5.76012 9.8901 7.18012 10.0501C6.77012 10.8901 6.55012 11.8401 6.55012 12.8501Z" fill="#121212"/>
<path d="M12.12 15.87C12.04 15.86 11.9501 15.86 11.8601 15.87C10.0201 15.81 8.55005 14.3 8.55005 12.44C8.55005 10.54 10.0801 9 11.9901 9C13.8901 9 15.43 10.54 15.43 12.44C15.43 14.3 13.97 15.81 12.12 15.87Z" fill="#121212"/>
<path d="M8.87005 17.9401C7.36005 18.9501 7.36005 20.6101 8.87005 21.6101C10.59 22.7601 13.4101 22.7601 15.1301 21.6101C16.6401 20.6001 16.6401 18.9401 15.1301 17.9401C13.4201 16.7901 10.6 16.7901 8.87005 17.9401Z" fill="#121212"/>
</svg>

  );
}

function GraphIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.6699 6.9499C21.0299 4.7799 19.2199 2.9699 17.0499 2.3299C15.3999 1.8499 14.2599 1.8899 13.4699 2.4799C12.5199 3.1899 12.4099 4.4699 12.4099 5.3799V7.8699C12.4099 10.3299 13.5299 11.5799 15.7299 11.5799H18.5999C19.4999 11.5799 20.7899 11.4699 21.4999 10.5199C22.1099 9.7399 22.1599 8.5999 21.6699 6.9499Z" fill="#292D32"/>
<path opacity="0.4" d="M18.9101 13.3597C18.6501 13.0597 18.2701 12.8897 17.8801 12.8897H14.3001C12.5401 12.8897 11.1101 11.4597 11.1101 9.69966V6.11966C11.1101 5.72966 10.9401 5.34966 10.6401 5.08966C10.3501 4.82966 9.95014 4.70966 9.57014 4.75966C7.22014 5.05966 5.06014 6.34966 3.65014 8.28966C2.23014 10.2397 1.71014 12.6197 2.16014 14.9997C2.81014 18.4397 5.56014 21.1897 9.01014 21.8397C9.56014 21.9497 10.1101 21.9997 10.6601 21.9997C12.4701 21.9997 14.2201 21.4397 15.7101 20.3497C17.6501 18.9397 18.9401 16.7797 19.2401 14.4297C19.2901 14.0397 19.1701 13.6497 18.9101 13.3597Z" fill="#292D32"/>
</svg>

  );
}

function CoinIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.5 12.6499V16.3499C18.5 19.4699 15.59 21.9999 12 21.9999C8.41 21.9999 5.5 19.4699 5.5 16.3499V12.6499C5.5 15.7699 8.41 17.9999 12 17.9999C15.59 17.9999 18.5 15.7699 18.5 12.6499Z" fill="#121212"/>
<path opacity="0.4" d="M18.5 7.6499V12.6499C18.5 15.7699 15.59 17.9999 12 17.9999C8.41 17.9999 5.5 15.7699 5.5 12.6499V7.6499C5.5 8.5599 5.75 9.3999 6.19 10.1199C7.26 11.8799 9.46 12.9999 12 12.9999C14.54 12.9999 16.74 11.8799 17.81 10.1199C18.25 9.3999 18.5 8.5599 18.5 7.6499Z" fill="#121212"/>
<path d="M18.5 7.65C18.5 8.56 18.25 9.4 17.81 10.12C16.74 11.88 14.54 13 12 13C9.46 13 7.26 11.88 6.19 10.12C5.75 9.4 5.5 8.56 5.5 7.65C5.5 4.53 8.41 2 12 2C13.8 2 15.42 2.63 16.6 3.65C17.77 4.68 18.5 6.09 18.5 7.65Z" fill="#121212"/>
</svg>

  );
}

function TeamIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.4" d="M9 2C6.38 2 4.25 4.13 4.25 6.75C4.25 9.32 6.26 11.4 8.88 11.49C8.96 11.48 9.04 11.48 9.1 11.49C9.12 11.49 9.13 11.49 9.15 11.49C9.16 11.49 9.16 11.49 9.17 11.49C11.73 11.4 13.74 9.32 13.75 6.75C13.75 4.13 11.62 2 9 2Z" fill="#121212"/>
<path d="M14.08 14.1504C11.29 12.2904 6.73996 12.2904 3.92996 14.1504C2.65996 15.0004 1.95996 16.1504 1.95996 17.3804C1.95996 18.6104 2.65996 19.7504 3.91996 20.5904C5.31996 21.5304 7.15996 22.0004 8.99996 22.0004C10.84 22.0004 12.68 21.5304 14.08 20.5904C15.34 19.7404 16.04 18.6004 16.04 17.3604C16.03 16.1304 15.34 14.9904 14.08 14.1504Z" fill="#121212"/>
<path opacity="0.4" d="M19.9899 7.3401C20.1499 9.2801 18.7699 10.9801 16.8599 11.2101C16.8499 11.2101 16.8499 11.2101 16.8399 11.2101H16.8099C16.7499 11.2101 16.6899 11.2101 16.6399 11.2301C15.6699 11.2801 14.7799 10.9701 14.1099 10.4001C15.1399 9.4801 15.7299 8.1001 15.6099 6.6001C15.5399 5.7901 15.2599 5.0501 14.8399 4.4201C15.2199 4.2301 15.6599 4.1101 16.1099 4.0701C18.0699 3.9001 19.8199 5.3601 19.9899 7.3401Z" fill="#121212"/>
<path d="M21.9902 16.5904C21.9102 17.5604 21.2902 18.4004 20.2502 18.9704C19.2502 19.5204 17.9902 19.7804 16.7402 19.7504C17.4602 19.1004 17.8802 18.2904 17.9602 17.4304C18.0602 16.1904 17.4702 15.0004 16.2902 14.0504C15.6202 13.5204 14.8402 13.1004 13.9902 12.7904C16.2002 12.1504 18.9802 12.5804 20.6902 13.9604C21.6102 14.7004 22.0802 15.6304 21.9902 16.5904Z" fill="#121212"/>
</svg>

  );
}

function BellIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.4" d="M22.1 17.6907C21.7967 18.5032 21.1575 19.1207 20.3234 19.4024C19.1534 19.7924 17.9509 20.0849 16.7375 20.2907C16.6184 20.3124 16.4992 20.334 16.38 20.3449C16.185 20.3774 15.99 20.399 15.795 20.4207C15.5567 20.4532 15.3075 20.4749 15.0583 20.4965C14.3758 20.5507 13.7042 20.5832 13.0217 20.5832C12.3284 20.5832 11.635 20.5507 10.9525 20.4857C10.66 20.464 10.3783 20.4315 10.0967 20.3882C9.93418 20.3665 9.77168 20.3449 9.62002 20.3232C9.50085 20.3015 9.38168 20.2907 9.26252 20.269C8.06002 20.074 6.86835 19.7815 5.70918 19.3915C4.84252 19.099 4.18168 18.4815 3.88918 17.6907C3.59668 16.9107 3.70502 16.0007 4.17085 15.2207L5.39502 13.184C5.65502 12.7399 5.89335 11.884 5.89335 11.364V9.34904C5.89335 5.41654 9.08918 2.2207 13.0217 2.2207C16.9434 2.2207 20.1392 5.41654 20.1392 9.34904V11.364C20.1392 11.884 20.3775 12.7399 20.6483 13.184L21.8725 15.2207C22.3167 15.979 22.4033 16.8674 22.1 17.6907Z" fill="#121212"/>
<path d="M13 11.6569C12.545 11.6569 12.1766 11.2885 12.1766 10.8335V7.47519C12.1766 7.02019 12.545 6.65186 13 6.65186C13.455 6.65186 13.8233 7.02019 13.8233 7.47519V10.8335C13.8125 11.2885 13.4441 11.6569 13 11.6569Z" fill="#121212"/>
<path d="M16.0658 21.6773C15.6108 22.934 14.4083 23.8332 12.9999 23.8332C12.1441 23.8332 11.2991 23.4865 10.7033 22.869C10.3566 22.544 10.0966 22.1107 9.94495 21.6665C10.0858 21.6882 10.2266 21.699 10.3783 21.7207C10.6274 21.7532 10.8874 21.7857 11.1474 21.8073C11.7649 21.8615 12.3933 21.894 13.0216 21.894C13.6391 21.894 14.2566 21.8615 14.8633 21.8073C15.0908 21.7857 15.3183 21.7748 15.5349 21.7423C15.7083 21.7207 15.8816 21.699 16.0658 21.6773Z" fill="#121212"/>
</svg>

  );
}

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path opacity="0.4" d="M10.07 2.82L3.14 8.37C2.36 8.99 1.86 10.3 2.03 11.28L3.36 19.24C3.6 20.66 4.96 21.81 6.4 21.81H17.6C19.03 21.81 20.4 20.65 20.64 19.24L21.97 11.28C22.13 10.3 21.63 8.99 20.86 8.37L13.93 2.83C12.86 1.97 11.13 1.97 10.07 2.82Z" fill="#28292D"/>
      <path d="M12 15.81V18.81" stroke="#28292D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 17L12.3333 12.3333M13.8889 8.44444C13.8889 11.4513 11.4513 13.8889 8.44444 13.8889C5.43756 13.8889 3 11.4513 3 8.44444C3 5.43756 5.43756 3 8.44444 3C11.4513 3 13.8889 5.43756 13.8889 8.44444Z" stroke="#667185" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

  );
}

function DotsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="5" r="2" fill="#000"/>
      <circle cx="12" cy="12" r="2" fill="#000"/>
      <circle cx="12" cy="19" r="2" fill="#000"/>
    </svg>
  );
}

function FilterIcon() {
  return (
   <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.33331 4.99984C3.33331 4.5396 3.70641 4.1665 4.16665 4.1665H15.8333C16.2936 4.1665 16.6666 4.5396 16.6666 4.99984C16.6666 5.46007 16.2936 5.83317 15.8333 5.83317H4.16665C3.70641 5.83317 3.33331 5.46007 3.33331 4.99984Z" fill="#344054"/>
      <path d="M4.99998 9.99984C4.99998 9.5396 5.37308 9.1665 5.83331 9.1665H14.1666C14.6269 9.1665 15 9.5396 15 9.99984C15 10.4601 14.6269 10.8332 14.1666 10.8332H5.83331C5.37308 10.8332 4.99998 10.4601 4.99998 9.99984Z" fill="#344054"/>
      <path d="M7.49998 14.1665C7.03974 14.1665 6.66665 14.5396 6.66665 14.9998C6.66665 15.4601 7.03974 15.8332 7.49998 15.8332H12.5C12.9602 15.8332 13.3333 15.4601 13.3333 14.9998C13.3333 14.5396 12.9602 14.1665 12.5 14.1665H7.49998Z" fill="#344054"/>
   </svg>

  );
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.66663 0.833496C7.12686 0.833496 7.49996 1.20659 7.49996 1.66683V2.50016H12.5V1.66683C12.5 1.20659 12.8731 0.833496 13.3333 0.833496C13.7935 0.833496 14.1666 1.20659 14.1666 1.66683V2.50016H15C16.8409 2.50016 18.3333 3.99255 18.3333 5.8335V15.0002C18.3333 16.8411 16.8409 18.3335 15 18.3335H4.99996C3.15901 18.3335 1.66663 16.8411 1.66663 15.0002V5.8335C1.66663 3.99255 3.15901 2.50016 4.99996 2.50016H5.83329V1.66683C5.83329 1.20659 6.20639 0.833496 6.66663 0.833496ZM12.5 4.16683C12.5 4.62707 12.8731 5.00016 13.3333 5.00016C13.7935 5.00016 14.1666 4.62707 14.1666 4.16683H15C15.9204 4.16683 16.6666 4.91302 16.6666 5.8335V6.25016H3.33329V5.8335C3.33329 4.91302 4.07948 4.16683 4.99996 4.16683H5.83329C5.83329 4.62707 6.20639 5.00016 6.66663 5.00016C7.12686 5.00016 7.49996 4.62707 7.49996 4.16683H12.5ZM16.6666 7.91683H3.33329V15.0002C3.33329 15.9206 4.07948 16.6668 4.99996 16.6668H15C15.9204 16.6668 16.6666 15.9206 16.6666 15.0002V7.91683Z" fill="#344054"/>
</svg>

  );
}

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M19.92 8.95L13.4 15.47C12.63 16.24 11.37 16.24 10.6 15.47L4.08 8.95" stroke="#667185" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M15 20L9 12L15 4" stroke="#344054" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M9 4L15 12L9 20" stroke="#344054" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function AddIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.4" d="M12.1425 1.5H5.8575C3.1275 1.5 1.5 3.1275 1.5 5.8575V12.135C1.5 14.8725 3.1275 16.5 5.8575 16.5H12.135C14.865 16.5 16.4925 14.8725 16.4925 12.1425V5.8575C16.5 3.1275 14.8725 1.5 12.1425 1.5Z" fill="white"/>
<path d="M13.5 8.4375H9.5625V4.5C9.5625 4.1925 9.3075 3.9375 9 3.9375C8.6925 3.9375 8.4375 4.1925 8.4375 4.5V8.4375H4.5C4.1925 8.4375 3.9375 8.6925 3.9375 9C3.9375 9.3075 4.1925 9.5625 4.5 9.5625H8.4375V13.5C8.4375 13.8075 8.6925 14.0625 9 14.0625C9.3075 14.0625 9.5625 13.8075 9.5625 13.5V9.5625H13.5C13.8075 9.5625 14.0625 9.3075 14.0625 9C14.0625 8.6925 13.8075 8.4375 13.5 8.4375Z" fill="white"/>
</svg>

  );
}

function LogoutIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.4" d="M7.5 5.99984V13.9915C7.5 16.6665 9.16667 18.3332 11.8333 18.3332H13.9917C16.6583 18.3332 18.325 16.6665 18.325 13.9998V5.99984C18.3333 3.33317 16.6667 1.6665 14 1.6665H11.8333C9.16667 1.6665 7.5 3.33317 7.5 5.99984Z" fill="#B6B6B6"/>
<path d="M4.64162 6.7666L1.84995 9.55827C1.60828 9.79994 1.60828 10.1999 1.84995 10.4416L4.64162 13.2333C4.88328 13.4749 5.28328 13.4749 5.52495 13.2333C5.76662 12.9916 5.76662 12.5916 5.52495 12.3499L3.79995 10.6249H12.7083C13.05 10.6249 13.3333 10.3416 13.3333 9.99993C13.3333 9.65827 13.05 9.37493 12.7083 9.37493H3.79995L5.52495 7.64994C5.64995 7.52494 5.70828 7.3666 5.70828 7.20827C5.70828 7.04993 5.64995 6.88327 5.52495 6.7666C5.28328 6.5166 4.89162 6.5166 4.64162 6.7666Z" fill="#B6B6B6"/>
</svg>

  );
}

function SettingsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.4" d="M1.66667 10.7334V9.26669C1.66667 8.40003 2.375 7.68336 3.25 7.68336C4.75833 7.68336 5.375 6.61669 4.61667 5.30836C4.18333 4.55836 4.44167 3.58336 5.2 3.15003L6.64167 2.32503C7.3 1.93336 8.15 2.1667 8.54167 2.82503L8.63333 2.98336C9.38333 4.2917 10.6167 4.2917 11.375 2.98336L11.4667 2.82503C11.8583 2.1667 12.7083 1.93336 13.3667 2.32503L14.8083 3.15003C15.5667 3.58336 15.825 4.55836 15.3917 5.30836C14.6333 6.61669 15.25 7.68336 16.7583 7.68336C17.625 7.68336 18.3417 8.39169 18.3417 9.26669V10.7334C18.3417 11.6 17.6333 12.3167 16.7583 12.3167C15.25 12.3167 14.6333 13.3834 15.3917 14.6917C15.825 15.45 15.5667 16.4167 14.8083 16.85L13.3667 17.675C12.7083 18.0667 11.8583 17.8334 11.4667 17.175L11.375 17.0167C10.625 15.7084 9.39167 15.7084 8.63333 17.0167L8.54167 17.175C8.15 17.8334 7.3 18.0667 6.64167 17.675L5.2 16.85C4.44167 16.4167 4.18333 15.4417 4.61667 14.6917C5.375 13.3834 4.75833 12.3167 3.25 12.3167C2.375 12.3167 1.66667 11.6 1.66667 10.7334Z" fill="#B6B6B6"/>
<path d="M10 12.7082C11.4958 12.7082 12.7083 11.4956 12.7083 9.99984C12.7083 8.50407 11.4958 7.2915 10 7.2915C8.50423 7.2915 7.29167 8.50407 7.29167 9.99984C7.29167 11.4956 8.50423 12.7082 10 12.7082Z" fill="#B6B6B6"/>
</svg>

  );
}

function HelpIcon() {
  return (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.4" d="M14.1666 7.49984C14.1666 10.7248 11.3666 13.3332 7.91663 13.3332L7.14163 14.2665L6.6833 14.8165C6.29163 15.2832 5.54162 15.1832 5.28329 14.6248L4.16663 12.1665C2.64996 11.0998 1.66663 9.40817 1.66663 7.49984C1.66663 4.27484 4.46663 1.6665 7.91663 1.6665C10.4333 1.6665 12.6083 3.05818 13.5833 5.05818C13.9583 5.79984 14.1666 6.62484 14.1666 7.49984Z" fill="#B6B6B6"/>
<path d="M18.3334 10.7169C18.3334 12.6252 17.3501 14.3169 15.8334 15.3836L14.7167 17.8419C14.4584 18.4002 13.7084 18.5086 13.3167 18.0336L12.0834 16.5502C10.0667 16.5502 8.26672 15.6586 7.14172 14.2669L7.91672 13.3336C11.3667 13.3336 14.1667 10.7253 14.1667 7.50025C14.1667 6.62525 13.9584 5.80026 13.5834 5.05859C16.3084 5.68359 18.3334 7.98358 18.3334 10.7169Z" fill="#B6B6B6"/>
<path d="M10 8.125H5.83337C5.49171 8.125 5.20837 7.84167 5.20837 7.5C5.20837 7.15833 5.49171 6.875 5.83337 6.875H10C10.3417 6.875 10.625 7.15833 10.625 7.5C10.625 7.84167 10.3417 8.125 10 8.125Z" fill="#B6B6B6"/>
</svg>

  );
}

const statusStyles = {
  collected: { bg: "#E7F6EC", color: "#036B26" },
  overdue: { bg: "#FBEAE9", color: "#9E0A05" },
  due: { bg: "#FEF6E7", color: "#865503" },
};

export default function TailoraDashboard() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [currentPage, setCurrentPage] = useState(3);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const totalPages = 30;

  const sidebarMainItems = [
    { label: "Dashboard", icon: <HomeIcon /> },
    {
      label: "Client Management",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.4" d="M14.6083 6.47484C14.55 6.46651 14.4917 6.46651 14.4333 6.47484C13.1417 6.43317 12.1167 5.37484 12.1167 4.07484C12.1167 2.74984 13.1917 1.6665 14.525 1.6665C15.85 1.6665 16.9333 2.7415 16.9333 4.07484C16.925 5.37484 15.9 6.43317 14.6083 6.47484Z" fill="#B6B6B6"/>
<path opacity="0.4" d="M17.325 12.2498C16.3917 12.8748 15.0833 13.1082 13.875 12.9498C14.1917 12.2665 14.3583 11.5082 14.3667 10.7082C14.3667 9.87485 14.1833 9.08318 13.8333 8.39152C15.0667 8.22485 16.375 8.45817 17.3167 9.08317C18.6333 9.94984 18.6333 11.3748 17.325 12.2498Z" fill="#B6B6B6"/>
<path opacity="0.4" d="M5.36667 6.47484C5.425 6.46651 5.48333 6.46651 5.54167 6.47484C6.83333 6.43317 7.85833 5.37484 7.85833 4.07484C7.85833 2.74984 6.78333 1.6665 5.45 1.6665C4.125 1.6665 3.04167 2.7415 3.04167 4.07484C3.05 5.37484 4.075 6.43317 5.36667 6.47484Z" fill="#B6B6B6"/>
<path opacity="0.4" d="M5.45833 10.7083C5.45833 11.5167 5.63333 12.2833 5.95 12.975C4.775 13.1 3.55 12.85 2.65 12.2583C1.33333 11.3833 1.33333 9.95833 2.65 9.08333C3.54167 8.48333 4.8 8.24167 5.98333 8.37501C5.64166 9.07501 5.45833 9.86668 5.45833 10.7083Z" fill="#B6B6B6"/>
<path d="M10.1 13.225C10.0333 13.2167 9.95833 13.2167 9.88333 13.225C8.35 13.175 7.125 11.9167 7.125 10.3667C7.125 8.78334 8.4 7.5 9.99167 7.5C11.575 7.5 12.8583 8.78334 12.8583 10.3667C12.8583 11.9167 11.6417 13.175 10.1 13.225Z" fill="#B6B6B6"/>
<path d="M7.39166 14.9502C6.13333 15.7919 6.13333 17.1752 7.39166 18.0085C8.825 18.9669 11.175 18.9669 12.6083 18.0085C13.8667 17.1669 13.8667 15.7835 12.6083 14.9502C11.1833 13.9919 8.83333 13.9919 7.39166 14.9502Z" fill="#B6B6B6"/>
</svg>

      ),
    },
    {
      label: "Team Collaboration",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.4" d="M7.5 1.6665C5.31667 1.6665 3.54167 3.4415 3.54167 5.62484C3.54167 7.7665 5.21667 9.49984 7.4 9.57484C7.46667 9.5665 7.53333 9.5665 7.58333 9.57484C7.6 9.57484 7.60833 9.57484 7.625 9.57484C7.63333 9.57484 7.63333 9.57484 7.64167 9.57484C9.775 9.49984 11.45 7.7665 11.4583 5.62484C11.4583 3.4415 9.68333 1.6665 7.5 1.6665Z" fill="#B6B6B6"/>
<path d="M11.7333 11.7919C9.40834 10.2419 5.61667 10.2419 3.275 11.7919C2.21667 12.5002 1.63334 13.4586 1.63334 14.4836C1.63334 15.5086 2.21667 16.4586 3.26667 17.1586C4.43334 17.9419 5.96667 18.3336 7.5 18.3336C9.03334 18.3336 10.5667 17.9419 11.7333 17.1586C12.7833 16.4502 13.3667 15.5002 13.3667 14.4669C13.3583 13.4419 12.7833 12.4919 11.7333 11.7919Z" fill="#B6B6B6"/>
<path opacity="0.4" d="M16.6583 6.11659C16.7917 7.73325 15.6417 9.14992 14.05 9.34159C14.0417 9.34159 14.0417 9.34159 14.0333 9.34159H14.0083C13.9583 9.34159 13.9083 9.34159 13.8667 9.35825C13.0583 9.39992 12.3167 9.14159 11.7583 8.66659C12.6167 7.89992 13.1083 6.74992 13.0083 5.49992C12.95 4.82492 12.7167 4.20825 12.3667 3.68325C12.6833 3.52492 13.05 3.42492 13.425 3.39159C15.0583 3.24992 16.5167 4.46659 16.6583 6.11659Z" fill="#B6B6B6"/>
<path d="M18.325 13.8252C18.2583 14.6335 17.7417 15.3335 16.875 15.8085C16.0417 16.2668 14.9917 16.4835 13.95 16.4585C14.55 15.9168 14.9 15.2418 14.9667 14.5252C15.05 13.4918 14.5583 12.5002 13.575 11.7085C13.0167 11.2668 12.3667 10.9168 11.6583 10.6585C13.5 10.1252 15.8167 10.4835 17.2417 11.6335C18.0083 12.2502 18.4 13.0252 18.325 13.8252Z" fill="#B6B6B6"/>
</svg>

      ),
    },
  ];

  const sidebarActionItems = [
    {
      label: "Add Client",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.4" d="M13.4917 1.6665H6.50833C3.475 1.6665 1.66667 3.47484 1.66667 6.50817V13.4832C1.66667 16.5248 3.475 18.3332 6.50833 18.3332H13.4833C16.5167 18.3332 18.325 16.5248 18.325 13.4915V6.50817C18.3333 3.47484 16.525 1.6665 13.4917 1.6665Z" fill="#B6B6B6"/>
<path d="M13.3333 9.37484H10.625V6.6665C10.625 6.32484 10.3417 6.0415 10 6.0415C9.65833 6.0415 9.375 6.32484 9.375 6.6665V9.37484H6.66667C6.325 9.37484 6.04167 9.65817 6.04167 9.99984C6.04167 10.3415 6.325 10.6248 6.66667 10.6248H9.375V13.3332C9.375 13.6748 9.65833 13.9582 10 13.9582C10.3417 13.9582 10.625 13.6748 10.625 13.3332V10.6248H13.3333C13.675 10.6248 13.9583 10.3415 13.9583 9.99984C13.9583 9.65817 13.675 9.37484 13.3333 9.37484Z" fill="#B6B6B6"/>
</svg>

      ),
    },
    {
      label: "Invite Co-worker",
      icon: (
       <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.4" d="M14 7.5H6C3.33333 7.5 1.66667 9.16667 1.66667 11.8333V13.9917C1.66667 16.6667 3.33333 18.3333 6 18.3333H13.9917C16.6583 18.3333 18.325 16.6667 18.325 14V11.8333C18.3333 9.16667 16.6667 7.5 14 7.5Z" fill="#B6B6B6"/>
<path d="M13.2333 10.3582L10.4417 13.1498C10.2 13.3915 9.8 13.3915 9.55833 13.1498L6.76666 10.3582C6.525 10.1165 6.525 9.7165 6.76666 9.47484C7.00833 9.23317 7.40833 9.23317 7.65 9.47484L9.375 11.1998V2.2915C9.375 1.94984 9.65833 1.6665 10 1.6665C10.3417 1.6665 10.625 1.94984 10.625 2.2915V11.1998L12.35 9.47484C12.475 9.34984 12.6333 9.2915 12.7917 9.2915C12.95 9.2915 13.1083 9.34984 13.2333 9.47484C13.4833 9.7165 13.4833 10.1082 13.2333 10.3582Z" fill="#B6B6B6"/>
</svg>

      ),
    },
  ];

  const bottomItems = [
    { label: "Settings", icon: <SettingsIcon /> },
    { label: "Help & Support", icon: <HelpIcon /> },
  ];

  const pageNumbers = [1, 2, 3, 4, 10, 11, 12];

  return (
    <div style={{ display: "flex", height: "100vh", background: "#FDFDFD", fontFamily: "'Satoshi', 'Inter', sans-serif", overflow: "hidden" }}>
      {/* Sidebar */}
      <aside style={{ width: 272, minWidth: 272, background: "#121212", display: "flex", flexDirection: "column", height: "100vh", position: "relative" }}>
        {/* Logo */}
        <div style={{ padding: "24px 24px 0", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img src="/logo.png" alt="Tailora logo" />
            <span style={{ color: "#E7E7E7", fontWeight: 700, fontSize: 20, fontFamily: "Sora, sans-serif" }}>Tailora</span>
          </div>
          <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: "#B6B6B6" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.4" d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2Z" fill="#B6B6B6"/>
<path d="M13.26 16.2802C13.07 16.2802 12.88 16.2102 12.73 16.0602L9.2 12.5302C8.91 12.2402 8.91 11.7602 9.2 11.4702L12.73 7.94016C13.02 7.65016 13.5 7.65016 13.79 7.94016C14.08 8.23016 14.08 8.71016 13.79 9.00016L10.79 12.0002L13.79 15.0002C14.08 15.2902 14.08 15.7702 13.79 16.0602C13.65 16.2102 13.46 16.2802 13.26 16.2802Z" fill="#B6B6B6"/>
</svg>

          </button>
        </div>

        {/* Main Nav */}
        <div style={{ padding: "0 8px", marginBottom: 8 }}>
          <div style={{ padding: "0 12px 8px", color: "#98A2B3", fontSize: 14, fontWeight: 500 }}>Main Menu</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {sidebarMainItems.map((item) => {
              const isActive = activeMenu === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => setActiveMenu(item.label)}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "12px 16px", borderRadius: 4,
                    background: isActive ? "#FDF6EC" : "transparent",
                    border: "none", cursor: "pointer", width: "100%", textAlign: "left",
                    color: isActive ? "#28292D" : "#B6B6B6",
                    fontSize: 14, fontWeight: isActive ? 500 : 400,
                    transition: "background 0.15s",
                  }}
                >
                  <span style={{ flexShrink: 0 }}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div style={{ margin: "0 8px 8px", height: 1, background: "#33353A" }} />

        {/* Actions */}
        <div style={{ padding: "0 8px", marginBottom: "auto" }}>
          <div style={{ padding: "0 12px 8px", color: "#98A2B3", fontSize: 14, fontWeight: 500 }}>Actions</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {sidebarActionItems.map((item) => (
              <button
                key={item.label}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "12px 16px", borderRadius: 4,
                  background: "transparent", border: "none", cursor: "pointer",
                  width: "100%", textAlign: "left",
                  color: "#B6B6B6", fontSize: 14, fontWeight: 400,
                }}
              >
                <span style={{ flexShrink: 0 }}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div style={{ padding: "0 8px 12px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {bottomItems.map((item) => (
              <button
                key={item.label}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "12px 16px", borderRadius: 4,
                  background: "transparent", border: "none", cursor: "pointer",
                  width: "100%", textAlign: "left",
                  color: "#B6B6B6", fontSize: 14, fontWeight: 400,
                }}
              >
                <span style={{ flexShrink: 0 }}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* User Profile */}
        <div style={{ padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src="/Ellipse2481.png" alt="" style={{ width: 40, height: 40, borderRadius: "50%" }} />
            <div>
              <div style={{ color: "#E7E7E7", fontSize: 14, fontWeight: 600, fontFamily: "Inter, sans-serif" }}>Joshua's Couture</div>
              <div style={{ color: "#B6B6B6", fontSize: 14, fontWeight: 400 }}>Atelier</div>
            </div>
            
          </div>
          <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <LogoutIcon />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Header */}
        <header style={{ background: "#FFFFFF", borderBottom: "1px solid #F0F2F5", padding: "0 36px", height: 83, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 18, color: "#28292D" }}>Dashboard</span>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Bell */}
            <button style={{ width: 40, height: 40, borderRadius: "50%", background: "#FEFCF9", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0px 0px 1px rgba(78,78,78,0.16)" }}>
              <BellIcon />
            </button>
            {/* Avatar + dropdown */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "1px solid #F1F1F2", borderRadius: 100, padding: "8px 12px", cursor: "pointer" }}
              >
                <img src="/Ellipse2481.png" alt="" style={{ width: 24, height: 24, borderRadius: "50%" }} />
                <div>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.4" d="M15.48 13.2302L11.69 8.18018H6.07999C5.11999 8.18018 4.63999 9.34018 5.31999 10.0202L10.5 15.2002C11.33 16.0302 12.68 16.0302 13.51 15.2002L15.48 13.2302Z" fill="#121212"/>
<path d="M17.9199 8.18018H11.6899L15.4799 13.2302L18.6899 10.0202C19.3599 9.34018 18.8799 8.18018 17.9199 8.18018Z" fill="#121212"/>
</svg>

                </div>
              </button>
              {showUserMenu && (
                <div style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", background: "#FFFFFF", borderRadius: 10, boxShadow: "0px 0px 4px rgba(0,0,0,0.08)", padding: 10, width: 184, zIndex: 100 }}>
                  <button style={{ width: "100%", padding: "8px 12px", borderRadius: 10, background: "#FDF6EC", border: "none", cursor: "pointer", textAlign: "left", fontSize: 14, fontWeight: 500, color: "#28292D", marginBottom: 8 }}>
                    Profile
                  </button>
                  <button style={{ width: "100%", padding: "8px 12px", borderRadius: 10, background: "transparent", border: "none", cursor: "pointer", textAlign: "left", fontSize: 14, fontWeight: 500, color: "#FF4D6D" }}>
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Body */}
        <div style={{ flex: 1, overflowY: "auto", background: "#FDFDFD" }}>
          {/* Warm gradient background strip */}
          <div style={{ background: "linear-gradient(180deg, #FDF6EC 0%, rgba(253,246,236,0) 100%)", height: 144, position: "absolute", left: 272, right: 0, top: 83, pointerEvents: "none" }} />

          <div style={{ padding: "40px 36px 40px", position: "relative" }}>
            {/* Welcome + Add Client */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <h1 style={{ margin: 0, fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 24, color: "#121212" }}>
                    Welcome Joshua's Couture
                  </h1>
                  <img src="/sewingmachine.svg" alt="" />
                </div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 300, color: "#696969", fontFamily: "Satoshi, sans-serif" }}>
                  Your all-in-one tailoring business management hub
                </p>
              </div>
              <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "12px 16px", background: "#121212", border: "none", borderRadius: 100, cursor: "pointer", color: "white", fontSize: 14, fontWeight: 400, whiteSpace: "nowrap" }}>
                <AddIcon />
                Add Client
              </button>
            </div>

            {/* Stats Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, marginBottom: 40 }}>
              {stats.map((s, i) => (
                <div key={i} style={{ background: "#FFFFFF", border: "1px solid #F1F1F2", borderRadius: 16, padding: "24px 21px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                    {s.icon}
                    <span style={{ fontSize: 14, color: "#696969" }}>{s.label}</span>
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#121212" }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 15 }}>
                <h2 style={{ margin: 0, fontFamily: "Sora, sans-serif", fontWeight: 400, fontSize: 18, color: "#121212" }}>Recent Orders</h2>
                <a href="#" style={{ fontSize: 14, color: "#121212", textDecoration: "underline" }}>See all</a>
              </div>

              <div style={{ background: "#FFFFFF", border: "1px solid #E4E7EC", borderRadius: 10, boxShadow: "0px 4px 4px -2px rgba(0,0,0,0.04)", overflow: "hidden" }}>
                {/* Table Toolbar */}
                <div style={{ padding: "16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #E4E7EC" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    {/* Search */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid #D0D5DD", borderRadius: 6, padding: "8px 12px", width: 291, boxShadow: "0px 2px 4px -2px rgba(0,0,0,0.04)" }}>
                      <SearchIcon />
                      <span style={{ color: "#667185", fontSize: 14 }}>Search here...</span>
                    </div>
                    {/* Filter */}
                    <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#FFFFFF", border: "1px solid #D0D5DD", borderRadius: 8, cursor: "pointer", boxShadow: "0px 3px 2px -2px rgba(0,0,0,0.06)", fontSize: 14, fontWeight: 700, color: "#344054" }}>
                      <FilterIcon />
                      Filter
                    </button>
                  </div>
                  {/* Date */}
                  <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#FFFFFF", border: "1px solid #D0D5DD", borderRadius: 6, cursor: "pointer", boxShadow: "0px 3px 2px -2px rgba(0,0,0,0.06)", fontSize: 14, fontWeight: 700, color: "#344054" }}>
                    <CalendarIcon />
                    Select dates
                    <ChevronDownIcon />
                  </button>
                </div>

                {/* Table */}
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#F8F8F8" }}>
                      {["ID", "Client Name", "Phone Number", "Gender", "Outfit Type", "Status", ""].map((h, i) => (
                        <th key={i} style={{ padding: "12px 24px", textAlign: i === 6 ? "center" : "left", fontSize: 12, fontWeight: 500, color: "#344054", borderBottom: "1px solid #E4E7EC", whiteSpace: "nowrap" }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, idx) => {
                      const st = statusStyles[order.statusType];
                      return (
                        <tr key={idx} style={{ borderBottom: "1px solid #E5E7EB" }}>
                          <td style={{ padding: "16px 24px", fontSize: 14, color: "#344054" }}>{order.id}</td>
                          <td style={{ padding: "16px 24px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                              <span style={{ fontSize: 14, fontWeight: 500, color: "#101928" }}>{order.client}</span>
                            </div>
                          </td>
                          <td style={{ padding: "16px 24px", fontSize: 14, color: "#344054" }}>{order.phone}</td>
                          <td style={{ padding: "16px 24px", fontSize: 14, color: "#344054" }}>{order.gender}</td>
                          <td style={{ padding: "16px 24px", fontSize: 14, color: "#344054" }}>{order.outfit}</td>
                          <td style={{ padding: "16px 24px" }}>
                            <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 12, fontSize: 12, fontWeight: 500, background: st.bg, color: st.color }}>
                              {order.status}
                            </span>
                          </td>
                          <td style={{ padding: "16px 24px", textAlign: "center" }}>
                            <button style={{ width: 32, height: 32, borderRadius: 8, background: "#FFFFFF", border: "1px solid #E4E7EC", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
                              <DotsIcon />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Pagination */}
                <div style={{ padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68, background: "#FFFFFF" }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#667185", fontFamily: "Inter, sans-serif" }}>
                    Page 1 of {totalPages}
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    {pageNumbers.map((p, i) => {
                      if (p === 4 && pageNumbers[i - 1] !== 3) return null;
                      const isEllipsis = i === 3;
                      if (isEllipsis) return <span key="ellipsis" style={{ width: 24, textAlign: "center", color: "#98A2B3", fontSize: 14 }}>...</span>;
                      return (
                        <button
                          key={p}
                          onClick={() => setCurrentPage(p)}
                          style={{
                            width: 24, height: 24, borderRadius: 6, border: "none", cursor: "pointer", fontSize: 14,
                            background: currentPage === p ? "#FFECE5" : "#FFFFFF",
                            color: currentPage === p ? "#EB5017" : "#98A2B3",
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          {p}
                        </button>
                      );
                    })}

                  </div>
                  <div style={{ display: "flex", gap: 16 }}>
                    <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#FFFFFF", border: "1px solid #D0D5DD", borderRadius: 8, cursor: "pointer", boxShadow: "0px 4px 8px -2px rgba(0,0,0,0.08)", fontSize: 14, fontWeight: 600, color: "#344054", fontFamily: "Inter, sans-serif" }}>
                      <ChevronLeftIcon />
                      Previous
                    </button>
                    <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#FFFFFF", border: "1px solid #D0D5DD", borderRadius: 8, cursor: "pointer", boxShadow: "0px 4px 8px -2px rgba(0,0,0,0.08)", fontSize: 14, fontWeight: 600, color: "#344054", fontFamily: "Inter, sans-serif" }}>
                      Next
                      <ChevronRightIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}