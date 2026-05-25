"use client";

import { useState } from "react";
import { useAppModals } from "./AppModalsContext";
import MobileMenuButton from "./MobileMenuButton";
import PrimaryButton from "./PrimaryButton";

const orders = [
  { id: "#28373", client: "Olamide Akintan", phone: "+234 **** 2039 ****", gender: "Male", outfit: "Wedding gown", status: "Collected", statusType: "collected" as const },
  { id: "#32876", client: "Olamide Akintan", phone: "+234 **** 2039 ****", gender: "Female", outfit: "Suit", status: "Collected", statusType: "collected" as const },
  { id: "#11394", client: "Olamide Akintan", phone: "+234 **** 2039 ****", gender: "Male", outfit: "Wedding gown", status: "Overdue 2 days", statusType: "overdue" as const },
  { id: "#99822", client: "Olamide Akintan", phone: "+234 **** 2039 ****", gender: "Female", outfit: "Senator", status: "Due in 3 days", statusType: "due" as const },
  { id: "#11873", client: "Olamide Akintan", phone: "+234 **** 2039 ****", gender: "Male", outfit: "Senator", status: "Due in 3 days", statusType: "due" as const },
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
      <path opacity="0.4" d="M17.53 7.77C17.46 7.76 17.39 7.76 17.32 7.77C15.77 7.72 14.54 6.45 14.54 4.89C14.54 3.3 15.83 2 17.43 2C19.02 2 20.32 3.29 20.32 4.89C20.31 6.45 19.08 7.72 17.53 7.77Z" fill="#121212" />
      <path opacity="0.4" d="M20.7899 14.6999C19.6699 15.4499 18.0999 15.7299 16.6499 15.5399C17.0299 14.7199 17.2299 13.8099 17.2399 12.8499C17.2399 11.8499 17.0199 10.8999 16.5999 10.0699C18.0799 9.86992 19.6499 10.1499 20.7799 10.8999C22.3599 11.9399 22.3599 13.6499 20.7899 14.6999Z" fill="#121212" />
      <path opacity="0.4" d="M6.44014 7.77C6.51014 7.76 6.58015 7.76 6.65015 7.77C8.20015 7.72 9.43015 6.45 9.43015 4.89C9.43015 3.3 8.14015 2 6.54015 2C4.95015 2 3.65015 3.29 3.65015 4.89C3.66015 6.45 4.89014 7.72 6.44014 7.77Z" fill="#121212" />
      <path opacity="0.4" d="M6.55012 12.8501C6.55012 13.8201 6.76012 14.7401 7.14012 15.5701C5.73012 15.7201 4.26012 15.4201 3.18012 14.7101C1.60012 13.6601 1.60012 11.9501 3.18012 10.9001C4.25012 10.1801 5.76012 9.8901 7.18012 10.0501C6.77012 10.8901 6.55012 11.8401 6.55012 12.8501Z" fill="#121212" />
      <path d="M12.12 15.87C12.04 15.86 11.9501 15.86 11.8601 15.87C10.0201 15.81 8.55005 14.3 8.55005 12.44C8.55005 10.54 10.0801 9 11.9901 9C13.8901 9 15.43 10.54 15.43 12.44C15.43 14.3 13.97 15.81 12.12 15.87Z" fill="#121212" />
      <path d="M8.87005 17.9401C7.36005 18.9501 7.36005 20.6101 8.87005 21.6101C10.59 22.7601 13.4101 22.7601 15.1301 21.6101C16.6401 20.6001 16.6401 18.9401 15.1301 17.9401C13.4201 16.7901 10.6 16.7901 8.87005 17.9401Z" fill="#121212" />
    </svg>
  );
}

function GraphIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.6699 6.9499C21.0299 4.7799 19.2199 2.9699 17.0499 2.3299C15.3999 1.8499 14.2599 1.8899 13.4699 2.4799C12.5199 3.1899 12.4099 4.4699 12.4099 5.3799V7.8699C12.4099 10.3299 13.5299 11.5799 15.7299 11.5799H18.5999C19.4999 11.5799 20.7899 11.4699 21.4999 10.5199C22.1099 9.7399 22.1599 8.5999 21.6699 6.9499Z" fill="#292D32" />
      <path opacity="0.4" d="M18.9101 13.3597C18.6501 13.0597 18.2701 12.8897 17.8801 12.8897H14.3001C12.5401 12.8897 11.1101 11.4597 11.1101 9.69966V6.11966C11.1101 5.72966 10.9401 5.34966 10.6401 5.08966C10.3501 4.82966 9.95014 4.70966 9.57014 4.75966C7.22014 5.05966 5.06014 6.34966 3.65014 8.28966C2.23014 10.2397 1.71014 12.6197 2.16014 14.9997C2.81014 18.4397 5.56014 21.1897 9.01014 21.8397C9.56014 21.9497 10.1101 21.9997 10.6601 21.9997C12.4701 21.9997 14.2201 21.4397 15.7101 20.3497C17.6501 18.9397 18.9401 16.7797 19.2401 14.4297C19.2901 14.0397 19.1701 13.6497 18.9101 13.3597Z" fill="#292D32" />
    </svg>
  );
}

function CoinIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.5 12.6499V16.3499C18.5 19.4699 15.59 21.9999 12 21.9999C8.41 21.9999 5.5 19.4699 5.5 16.3499V12.6499C5.5 15.7699 8.41 17.9999 12 17.9999C15.59 17.9999 18.5 15.7699 18.5 12.6499Z" fill="#121212" />
      <path opacity="0.4" d="M18.5 7.6499V12.6499C18.5 15.7699 15.59 17.9999 12 17.9999C8.41 17.9999 5.5 15.7699 5.5 12.6499V7.6499C5.5 8.5599 5.75 9.3999 6.19 10.1199C7.26 11.8799 9.46 12.9999 12 12.9999C14.54 12.9999 16.74 11.8799 17.81 10.1199C18.25 9.3999 18.5 8.5599 18.5 7.6499Z" fill="#121212" />
      <path d="M18.5 7.65C18.5 8.56 18.25 9.4 17.81 10.12C16.74 11.88 14.54 13 12 13C9.46 13 7.26 11.88 6.19 10.12C5.75 9.4 5.5 8.56 5.5 7.65C5.5 4.53 8.41 2 12 2C13.8 2 15.42 2.63 16.6 3.65C17.77 4.68 18.5 6.09 18.5 7.65Z" fill="#121212" />
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.4" d="M9 2C6.38 2 4.25 4.13 4.25 6.75C4.25 9.32 6.26 11.4 8.88 11.49C8.96 11.48 9.04 11.48 9.1 11.49C9.12 11.49 9.13 11.49 9.15 11.49C9.16 11.49 9.16 11.49 9.17 11.49C11.73 11.4 13.74 9.32 13.75 6.75C13.75 4.13 11.62 2 9 2Z" fill="#121212" />
      <path d="M14.08 14.1504C11.29 12.2904 6.73996 12.2904 3.92996 14.1504C2.65996 15.0004 1.95996 16.1504 1.95996 17.3804C1.95996 18.6104 2.65996 19.7504 3.91996 20.5904C5.31996 21.5304 7.15996 22.0004 8.99996 22.0004C10.84 22.0004 12.68 21.5304 14.08 20.5904C15.34 19.7404 16.04 18.6004 16.04 17.3604C16.03 16.1304 15.34 14.9904 14.08 14.1504Z" fill="#121212" />
      <path opacity="0.4" d="M19.9899 7.3401C20.1499 9.2801 18.7699 10.9801 16.8599 11.2101C16.8499 11.2101 16.8499 11.2101 16.8399 11.2101H16.8099C16.7499 11.2101 16.6899 11.2101 16.6399 11.2301C15.6699 11.2801 14.7799 10.9701 14.1099 10.4001C15.1399 9.4801 15.7299 8.1001 15.6099 6.6001C15.5399 5.7901 15.2599 5.0501 14.8399 4.4201C15.2199 4.2301 15.6599 4.1101 16.1099 4.0701C18.0699 3.9001 19.8199 5.3601 19.9899 7.3401Z" fill="#121212" />
      <path d="M21.9902 16.5904C21.9102 17.5604 21.2902 18.4004 20.2502 18.9704C19.2502 19.5204 17.9902 19.7804 16.7402 19.7504C17.4602 19.1004 17.8802 18.2904 17.9602 17.4304C18.0602 16.1904 17.4702 15.0004 16.2902 14.0504C15.6202 13.5204 14.8402 13.1004 13.9902 12.7904C16.2002 12.1504 18.9802 12.5804 20.6902 13.9604C21.6102 14.7004 22.0802 15.6304 21.9902 16.5904Z" fill="#121212" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.4" d="M22.1 17.6907C21.7967 18.5032 21.1575 19.1207 20.3234 19.4024C19.1534 19.7924 17.9509 20.0849 16.7375 20.2907C16.6184 20.3124 16.4992 20.334 16.38 20.3449C16.185 20.3774 15.99 20.399 15.795 20.4207C15.5567 20.4532 15.3075 20.4749 15.0583 20.4965C14.3758 20.5507 13.7042 20.5832 13.0217 20.5832C12.3284 20.5832 11.635 20.5507 10.9525 20.4857C10.66 20.464 10.3783 20.4315 10.0967 20.3882C9.93418 20.3665 9.77168 20.3449 9.62002 20.3232C9.50085 20.3015 9.38168 20.2907 9.26252 20.269C8.06002 20.074 6.86835 19.7815 5.70918 19.3915C4.84252 19.099 4.18168 18.4815 3.88918 17.6907C3.59668 16.9107 3.70502 16.0007 4.17085 15.2207L5.39502 13.184C5.65502 12.7399 5.89335 11.884 5.89335 11.364V9.34904C5.89335 5.41654 9.08918 2.2207 13.0217 2.2207C16.9434 2.2207 20.1392 5.41654 20.1392 9.34904V11.364C20.1392 11.884 20.3775 12.7399 20.6483 13.184L21.8725 15.2207C22.3167 15.979 22.4033 16.8674 22.1 17.6907Z" fill="#121212" />
      <path d="M13 11.6569C12.545 11.6569 12.1766 11.2885 12.1766 10.8335V7.47519C12.1766 7.02019 12.545 6.65186 13 6.65186C13.455 6.65186 13.8233 7.02019 13.8233 7.47519V10.8335C13.8125 11.2885 13.4441 11.6569 13 11.6569Z" fill="#121212" />
      <path d="M16.0658 21.6773C15.6108 22.934 14.4083 23.8332 12.9999 23.8332C12.1441 23.8332 11.2991 23.4865 10.7033 22.869C10.3566 22.544 10.0966 22.1107 9.94495 21.6665C10.0858 21.6882 10.2266 21.699 10.3783 21.7207C10.6274 21.7532 10.8874 21.7857 11.1474 21.8073C11.7649 21.8615 12.3933 21.894 13.0216 21.894C13.6391 21.894 14.2566 21.8615 14.8633 21.8073C15.0908 21.7857 15.3183 21.7748 15.5349 21.7423C15.7083 21.7207 15.8816 21.699 16.0658 21.6773Z" fill="#121212" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 17L12.3333 12.3333M13.8889 8.44444C13.8889 11.4513 11.4513 13.8889 8.44444 13.8889C5.43756 13.8889 3 11.4513 3 8.44444C3 5.43756 5.43756 3 8.44444 3C11.4513 3 13.8889 5.43756 13.8889 8.44444Z" stroke="#667185" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DotsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="5" r="2" fill="#000" />
      <circle cx="12" cy="12" r="2" fill="#000" />
      <circle cx="12" cy="19" r="2" fill="#000" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.33331 4.99984C3.33331 4.5396 3.70641 4.1665 4.16665 4.1665H15.8333C16.2936 4.1665 16.6666 4.5396 16.6666 4.99984C16.6666 5.46007 16.2936 5.83317 15.8333 5.83317H4.16665C3.70641 5.83317 3.33331 5.46007 3.33331 4.99984Z" fill="#344054" />
      <path d="M4.99998 9.99984C4.99998 9.5396 5.37308 9.1665 5.83331 9.1665H14.1666C14.6269 9.1665 15 9.5396 15 9.99984C15 10.4601 14.6269 10.8332 14.1666 10.8332H5.83331C5.37308 10.8332 4.99998 10.4601 4.99998 9.99984Z" fill="#344054" />
      <path d="M7.49998 14.1665C7.03974 14.1665 6.66665 14.5396 6.66665 14.9998C6.66665 15.4601 7.03974 15.8332 7.49998 15.8332H12.5C12.9602 15.8332 13.3333 15.4601 13.3333 14.9998C13.3333 14.5396 12.9602 14.1665 12.5 14.1665H7.49998Z" fill="#344054" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M6.66663 0.833496C7.12686 0.833496 7.49996 1.20659 7.49996 1.66683V2.50016H12.5V1.66683C12.5 1.20659 12.8731 0.833496 13.3333 0.833496C13.7935 0.833496 14.1666 1.20659 14.1666 1.66683V2.50016H15C16.8409 2.50016 18.3333 3.99255 18.3333 5.8335V15.0002C18.3333 16.8411 16.8409 18.3335 15 18.3335H4.99996C3.15901 18.3335 1.66663 16.8411 1.66663 15.0002V5.8335C1.66663 3.99255 3.15901 2.50016 4.99996 2.50016H5.83329V1.66683C5.83329 1.20659 6.20639 0.833496 6.66663 0.833496ZM12.5 4.16683C12.5 4.62707 12.8731 5.00016 13.3333 5.00016C13.7935 5.00016 14.1666 4.62707 14.1666 4.16683H15C15.9204 4.16683 16.6666 4.91302 16.6666 5.8335V6.25016H3.33329V5.8335C3.33329 4.91302 4.07948 4.16683 4.99996 4.16683H5.83329C5.83329 4.62707 6.20639 5.00016 6.66663 5.00016C7.12686 5.00016 7.49996 4.62707 7.49996 4.16683H12.5ZM16.6666 7.91683H3.33329V15.0002C3.33329 15.9206 4.07948 16.6668 4.99996 16.6668H15C15.9204 16.6668 16.6666 15.9206 16.6666 15.0002V7.91683Z" fill="#344054" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M19.92 8.95L13.4 15.47C12.63 16.24 11.37 16.24 10.6 15.47L4.08 8.95" stroke="#667185" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M15 20L9 12L15 4" stroke="#344054" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M9 4L15 12L9 20" stroke="#344054" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AddIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.4" d="M12.1425 1.5H5.8575C3.1275 1.5 1.5 3.1275 1.5 5.8575V12.135C1.5 14.8725 3.1275 16.5 5.8575 16.5H12.135C14.865 16.5 16.4925 14.8725 16.4925 12.1425V5.8575C16.5 3.1275 14.8725 1.5 12.1425 1.5Z" fill="white" />
      <path d="M13.5 8.4375H9.5625V4.5C9.5625 4.1925 9.3075 3.9375 9 3.9375C8.6925 3.9375 8.4375 4.1925 8.4375 4.5V8.4375H4.5C4.1925 8.4375 3.9375 8.6925 3.9375 9C3.9375 9.3075 4.1925 9.5625 4.5 9.5625H8.4375V13.5C8.4375 13.8075 8.6925 14.0625 9 14.0625C9.3075 14.0625 9.5625 13.8075 9.5625 13.5V9.5625H13.5C13.8075 9.5625 14.0625 9.3075 14.0625 9C14.0625 8.6925 13.8075 8.4375 13.5 8.4375Z" fill="white" />
    </svg>
  );
}

const statusStyles = {
  collected: { bg: "#E7F6EC", color: "#036B26" },
  overdue: { bg: "#FBEAE9", color: "#9E0A05" },
  due: { bg: "#FEF6E7", color: "#865503" },
};

export default function TailoraDashboard() {
  const { openAddClient } = useAppModals();
  const [currentPage, setCurrentPage] = useState(3);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const totalPages = 30;

  const pageNumbers = [1, 2, 3, 4, 10, 11, 12];

  return (
    <div className="tailora-dashboard" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0, width: "100%" }}>
        <header className="tailora-dashboard-header" style={{ background: "#FFFFFF", borderBottom: "1px solid #F0F2F5", padding: "0 36px", height: 83, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
            <MobileMenuButton />
            <span className="tailora-header-title" style={{ fontFamily: "var(--font-sora)", fontWeight: 700, fontSize: 18, color: "#28292D" }}>Dashboard</span>
          </div>
          <div className="tailora-header-actions" style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <button type="button" className="tailora-header-bell-btn" style={{ width: 40, height: 40, borderRadius: "50%", background: "#FEFCF9", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0px 0px 1px rgba(78,78,78,0.16)" }}>
              <BellIcon />
            </button>
            <div style={{ position: "relative" }}>
              <button
                type="button"
                className="tailora-header-avatar-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "1px solid #F1F1F2", borderRadius: 100, padding: "8px 12px", cursor: "pointer" }}
              >
                <img src="/Ellipse2481.png" alt="" style={{ width: 24, height: 24, borderRadius: "50%" }} />
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.4" d="M15.48 13.2302L11.69 8.18018H6.07999C5.11999 8.18018 4.63999 9.34018 5.31999 10.0202L10.5 15.2002C11.33 16.0302 12.68 16.0302 13.51 15.2002L15.48 13.2302Z" fill="#121212" />
                  <path d="M17.9199 8.18018H11.6899L15.4799 13.2302L18.6899 10.0202C19.3599 9.34018 18.8799 8.18018 17.9199 8.18018Z" fill="#121212" />
                </svg>
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

        <div className="tailora-dashboard-scroll" style={{ flex: 1, overflowY: "auto", overflowX: "hidden", background: "#FDFDFD", position: "relative", WebkitOverflowScrolling: "touch" }}>
          <div className="tailora-page-gradient tailora-dashboard-gradient" />

          <div className="tailora-page-content tailora-dashboard-content">
            <div className="tailora-page-header-row tailora-dashboard-hero">
              <div className="tailora-dashboard-hero-text">
                <div className="tailora-welcome-title tailora-dashboard-welcome-title">
                  <h1 className="tailora-dashboard-welcome-heading">Welcome Joshua&apos;s Couture</h1>
                  <img src="/sewingmachine.svg" alt="" className="tailora-dashboard-welcome-icon" width={32} height={32} />
                </div>
                <p className="tailora-dashboard-welcome-subtitle">
                  Your all-in-one tailoring business management hub
                </p>
              </div>
              <PrimaryButton className="tailora-dashboard-add-btn" onClick={() => openAddClient()}>
                <AddIcon />
                Add Client
              </PrimaryButton>
            </div>

            <div className="tailora-stats-grid tailora-dashboard-stats">
              {stats.map((s, i) => (
                <div key={i} className="tailora-stat-card">
                  <div className="tailora-stat-card-top">
                    <div className="tailora-stat-card-icon">{s.icon}</div>
                    <span className="tailora-stat-card-label">{s.label}</span>
                  </div>
                  <div className="tailora-stat-value">{s.value}</div>
                </div>
              ))}
            </div>

            <div className="tailora-orders-section">
              <div className="tailora-recent-orders-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 15, gap: 12 }}>
                <h2 style={{ margin: 0, fontFamily: "Sora, sans-serif", fontWeight: 400, fontSize: 18, color: "#121212" }}>Recent Orders</h2>
                <a href="#" style={{ fontSize: 14, color: "#121212", textDecoration: "underline", flexShrink: 0 }}>See all</a>
              </div>

              <div className="tailora-data-panel tailora-orders-card" style={{ background: "#FFFFFF", border: "1px solid #E4E7EC", borderRadius: 10, boxShadow: "0px 4px 4px -2px rgba(0,0,0,0.04)", overflow: "hidden", maxWidth: "100%" }}>
                <div className="tailora-table-toolbar" style={{ padding: 16, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #E4E7EC" }}>
                  <div className="tailora-table-toolbar-left" style={{ display: "flex", gap: 8 }}>
                    <div className="tailora-table-search" style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid #D0D5DD", borderRadius: 6, padding: "8px 12px", width: 291, boxShadow: "0px 2px 4px -2px rgba(0,0,0,0.04)" }}>
                      <SearchIcon />
                      <span style={{ color: "#667185", fontSize: 14 }}>Search here...</span>
                    </div>
                    <button type="button" className="tailora-table-filter-btn" style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#FFFFFF", border: "1px solid #D0D5DD", borderRadius: 8, cursor: "pointer", boxShadow: "0px 3px 2px -2px rgba(0,0,0,0.06)", fontSize: 14, fontWeight: 700, color: "#344054" }}>
                      <FilterIcon />
                      Filter
                    </button>
                  </div>
                  <div className="tailora-table-toolbar-right">
                    <button type="button" style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#FFFFFF", border: "1px solid #D0D5DD", borderRadius: 6, cursor: "pointer", boxShadow: "0px 3px 2px -2px rgba(0,0,0,0.06)", fontSize: 14, fontWeight: 700, color: "#344054" }}>
                      <CalendarIcon />
                      Select dates
                      <ChevronDownIcon />
                    </button>
                  </div>
                </div>

                <div className="tailora-m-cards tailora-orders-cards-mobile">
                  {orders.map((order, idx) => {
                    const st = statusStyles[order.statusType];
                    return (
                      <div key={idx} className="tailora-m-card">
                        <div className="tailora-m-card-top">
                          <span className="tailora-m-card-id">{order.id}</span>
                          <span className="tailora-m-card-pill" style={{ background: st.bg, color: st.color }}>
                            {order.status}
                          </span>
                        </div>
                        <div className="tailora-m-card-title">{order.client}</div>
                        <div className="tailora-m-card-meta">
                          <span>{order.phone}</span>
                          <span>{order.gender} · {order.outfit}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="tailora-data-table-desktop tailora-table-scroll tailora-orders-table-desktop">
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
                            <span style={{ fontSize: 14, fontWeight: 500, color: "#101928" }}>{order.client}</span>
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
                </div>

                <div className="tailora-pagination" style={{ padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68, background: "#FFFFFF" }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#667185", fontFamily: "Inter, sans-serif" }}>
                    Page 1 of {totalPages}
                  </span>
                  <div className="tailora-pagination-pages" style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    {pageNumbers.map((p, i) => {
                      if (p === 4 && pageNumbers[i - 1] !== 3) return null;
                      const isEllipsis = i === 3;
                      if (isEllipsis) return <span key="ellipsis" style={{ width: 24, textAlign: "center", color: "#98A2B3", fontSize: 14 }}>...</span>;
                      return (
                        <button
                          key={p}
                          onClick={() => setCurrentPage(p)}
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: 6,
                            border: "none",
                            cursor: "pointer",
                            fontSize: 14,
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
                  <div className="tailora-pagination-nav" style={{ display: "flex", gap: 16 }}>
                    <button type="button" style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#FFFFFF", border: "1px solid #D0D5DD", borderRadius: 8, cursor: "pointer", boxShadow: "0px 4px 8px -2px rgba(0,0,0,0.08)", fontSize: 14, fontWeight: 600, color: "#344054", fontFamily: "Inter, sans-serif" }}>
                      <ChevronLeftIcon />
                      Previous
                    </button>
                    <button type="button" style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#FFFFFF", border: "1px solid #D0D5DD", borderRadius: 8, cursor: "pointer", boxShadow: "0px 4px 8px -2px rgba(0,0,0,0.08)", fontSize: 14, fontWeight: 600, color: "#344054", fontFamily: "Inter, sans-serif" }}>
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
  );
}
