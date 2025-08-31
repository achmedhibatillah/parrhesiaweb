import React, { useState, useEffect } from "react";

function Sidebar({ userdata, pagenow }) {
  let menuaccess = [];
  if (userdata.role === "guest-user") {
    menuaccess = [
      "general",
      "publikasi",
      "publikasi.tambah",
      "publikasi.daftar",
      "publikasi.draft",
      "layanan",
      "layanan.riwayat",
      "layanan.daftar",
      "survei",
      "survei.daftar",
      "survei.terisi",
      "guest_rekrutmen",
      "panduan"
    ];
  } else if (
    userdata.role === "member-user" ||
    userdata.role === "admin-user"
  ) {
    menuaccess = [
      "general",
      "publikasi",
      "publikasi.tambah",
      "publikasi.daftar",
      "publikasi.draft",
      "layanan",
      "layanan.tambah",
      "layanan.daftar",
      "layanan.daftarme",
      "layanan.riwayat",
      "survei",
      "survei.tambah",
      "survei.daftar",
      "survei.terisi",
      "voting",
      "voting.tambah",
      "voting.daftar",
      "voting.terisi",
      "informasi",
      "verified_rekrutmen",
      "panduan"
    ];
  }

  const menu = [
    { name: "general", title: "General", icon: "dashboard", url: "/portal" },
    {
      name: "publikasi", title: "Publikasi", icon: "newspaper",
      children: [
        { name: "publikasi.tambah", title: "Tambah Publikasi", url: "/publikasi/tambah" },
        { name: "publikasi.daftar", title: "Daftar Publikasi Saya", url: "/publikasi/daftar" },
        { name: "publikasi.draft", title: "Draft Publikasi", url: "/publikasi/draft" },
      ],
    },
    { 
      name: "layanan", title: "Layanan", icon: "tag",
      children: [
        { name: "layanan.tambah", title: "Tambah Layanan", url: "/survei/layanan" },
        { name: "layanan.daftar", title: "Daftar Layanan", url: "/layanan/daftar" },
        { name: "layanan.daftarme", title: "Daftar Layanan Saya", url: "/layanan/daftar/me" },
        { name: "layanan.riwayat", title: "Riwayat Penggunaan Layanan", url: "/layanan/riwayat" },
      ]
    },
    { 
      name: "survei", title: "Survei", icon: "clipboard",
      children: [
        { name: "survei.tambah", title: "Tambah Survei", url: "/survei/tambah" },
        { name: "survei.daftar", title: "Daftar Survei", url: "/survei/daftar" },
        { name: "survei.terisi", title: "Survei Terisi", url: "/survei/terisi" },
      ]
    },
    { 
      name: "voting", title: "Voting", icon: "poll",
      children: [
        { name: "voting.tambah", title: "Ajukan Voting", url: "/voting/tambah" },
        { name: "voting.daftar", title: "Daftar Voting Aktif", url: "/voting/daftar" },
        { name: "voting.terisi", title: "Riwayat Voting Saya", url: "/voting/terisi" },
      ]
    },
    { name: "informasi", title: "Informasi", icon: "info-circle", url: "/informasi" },
    { name: "guest_rekrutmen", title: "Rekrutmen", icon: "user-plus", url: "/rekrutmen" },
    { name: "verified_rekrutmen", title: "Daftar Pelamar", icon: "user-plus", url: "/pelamar" },
    { name: "panduan", title: "Panduan Aplikasi", icon: "question-circle", url: "/panduan" },
  ];

  const hasAccess = (name) => menuaccess.includes(name);

  // state untuk track menu yang terbuka
  const [openMenus, setOpenMenus] = useState({});

  // buka menu induk jika ada sub-menu yang aktif
  useEffect(() => {
    const newOpenMenus = {};
    menu.forEach((item) => {
      if (item.children) {
        item.children.forEach((child) => {
          if (child.name === pagenow) {
            newOpenMenus[item.name] = true;
          }
        });
      }
    });
    setOpenMenus(newOpenMenus);
  }, [pagenow]);

  const toggleMenu = (name) => {
    setOpenMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div className="sidebar pb-1 pe-1">
      <div className="bg-amber-50 rounded-br-md shadow overflow-hidden">
        {menu.map((item) => {
          if (!hasAccess(item.name)) return null;

          const isOpen = openMenus[item.name] || false;

          const isActiveMenu =
            item.name === pagenow ||
            (item.children && item.children.some((c) => c.name === pagenow));

          if (item.children) {
            return (
              <div key={item.name}>
                <div
                  className={`menu-item flex items-center justify-between gap-2 p-2 transition-colors border-b border-b-gray-100 ps-5 cursor-pointer
                  ${isActiveMenu ? "bg-amber-200 font-semibold" : "hover:bg-gray-100"}`}
                  onClick={() => toggleMenu(item.name)}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex justify-center w-4 text-sm">
                      <i className={`fas fa-${item.icon}`}></i>
                    </div>
                    <span className={`${!openMenus && 'whitespace-nowrap overflow-hidden'} text-ellipsis`}>{item.title}</span>
                  </div>
                  <i
                    className={`fas fa-chevron-right transition-transform duration-300 text-xs ${
                      isOpen ? "rotate-90" : ""
                    }`}
                  ></i>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300`}
                  style={{
                    maxHeight: isOpen ? `${item.children.length * 40}px` : 0,
                  }}
                >
                  {item.children.map(
                    (child) =>
                      hasAccess(child.name) && (
                        <a
                          href={child.url}
                          key={child.name}
                          className={`menu-item block w-full flex items-center gap-2 p-2 ps-10 border-b border-b-gray-50 transition-colors
                          ${pagenow === child.name ? "bg-amber-100 hover:bg-amber-200" : "hover:bg-gray-50"}`}
                        >
                          <span className={`text-sm ${!openMenus && 'whitespace-nowrap overflow-hidden'} text-ellipsis`}>{child.title}</span>
                        </a>
                      )
                  )}
                </div>
              </div>
            );
          }

          return (
            <a
              key={item.name}
              href={item.url}
              className={`menu-item block w-full flex items-center justify-between gap-2 p-2 transition-colors border-b border-b-gray-100 ps-5
              ${pagenow === item.name ? "bg-amber-100 hover:bg-amber-200" : "hover:bg-gray-100"}`}
            >
              <div className="flex items-center gap-2">
                <div className="flex justify-center w-4 text-sm">
                  <i className={`fas fa-${item.icon}`}></i>
                </div>
                <span className={`${!openMenus && 'whitespace-nowrap overflow-hidden'} text-ellipsis`}>{item.title}</span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
