import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import InputDropdown from "./input-dropdown";
import PpCircle from "./pp-circle";

export default function UserSearchDropdown({
  onSelect,
  placeholder = "Cari pengguna...",
  className,
  disabled=false
}) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch user
  const fetchUsers = async (keyword) => {
    if (!keyword) return setOptions([]);
    setLoading(true);
    try {
      const { data } = await axios.post("/user/search", { keyword });
      setOptions(
        data.users.map((u) => ({
          value: u.user_id,
          label: u.user_username,
          detail: u, // simpan semua data user di detail
        }))
      );
    } catch (err) {
      console.error("Gagal fetch users", err);
      setOptions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = useMemo(() => debounce(fetchUsers, 300), []);

  useEffect(() => {
    return () => handleSearch.cancel();
  }, [handleSearch]);

  const handleSelect = (selected) => {
    if (onSelect) onSelect(selected);
    setOptions([]);
  };

  const renderOption = (item) => (
    <div className="flex items-center gap-2">
      <PpCircle pp={item.detail.detail?.userdt_pp} size="sm" />
      <div className="flex flex-col">
        <span className="text-xs text-red-900 flex items-center">
          {item.label}
          {item.detail.role_id === "verified-user" && (
            <i className="fas fa-check-circle text-green-500 text-[10px] ms-0.5"></i>
          )}
        </span>
        <span className="text-xs text-gray-500">{item.detail.user_fullname}</span>
      </div>
    </div>
  );

  return (
    <InputDropdown
      options={options}
      placeholder={loading ? "Mencari..." : placeholder}
      value={null}
      onChange={handleSelect}
      onSearchChange={handleSearch}
      renderOption={renderOption}
      className={className}
      disabled={disabled}
    />
  );
}
