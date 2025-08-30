import React, { useState } from "react";

function Sidebar({ userdata }) {
  let menuaccess = [];
  if (userdata.role === "guest-user") {
    menuaccess = ['general', 'publikasi', 'layanan', 'survei'];
  } else if (userdata.role === "member-user" || userdata.role === "admin-user") {
    menuaccess = ['general', 'publikasi', 'layanan', 'survei', 'voting', 'informasi'];
  }

  const menu = [
    { name: 'general', title: 'General', icon: 'dashboard' },
    { name: 'publikasi', title: 'Publikasi', icon: 'newspaper' },
    { name: 'layanan', title: 'Layanan', icon: 'tag' },
    { name: 'survei', title: 'Survei', icon: 'clipboard' },
    { name: 'voting', title: 'Voting', icon: 'poll' },
    { name: 'informasi', title: 'Informasi', icon: 'info' },
  ];

  const filteredMenu = menu.filter(item => menuaccess.includes(item.name));

  return (
    <div className="sidebar pb-1 pe-1">
      <div className="bg-amber-50 rounded-br-md shadow overflow-hidden">
        {filteredMenu.map((item) => (
          <div key={item.name} className="menu-item flex items-center gap-2 p-2 transition-colors hover:bg-gray-100 cursor-pointer border-b border-b-gray-100 ps-5">
            <div className="flex justify-center w-4 text-sm">
              <i className={`fas fa-${item.icon}`}></i>
            </div>
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
