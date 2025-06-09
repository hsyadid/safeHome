"use client"
import React from 'react';
import { MdEdit, MdDelete, MdAdd } from 'react-icons/md';

interface AdminActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onAdd?: () => void;
  itemType?: string;
  showDelete?: boolean;
  showEdit?: boolean;
  showAdd?: boolean;
  className?: string;
}

const AdminActions: React.FC<AdminActionsProps> = ({
  onEdit,
  onDelete,
  onAdd,
  itemType = "item",
  showDelete = true,
  showEdit = true,
  showAdd = false,
  className = ""
}) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent parent click events
    if (window.confirm(`Apakah Anda yakin ingin menghapus ${itemType} ini?`)) {
      onDelete?.();
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent parent click events
    onEdit?.();
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent parent click events
    onAdd?.();
  };

  if (showAdd) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <button
          onClick={handleAdd}
          className="group bg-gradient-to-r from-[#4F1718] to-[#6B2425] text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
        >
          <MdAdd className="text-lg transition-transform group-hover:rotate-90 duration-300" />
          <span className="hidden md:inline">Tambah {itemType}</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {showEdit && (
        <button
          onClick={handleEdit}
          className="group bg-[#3d517b] hover:bg-[#263452] text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
          title="Edit"
        >
          <MdEdit className="text-lg" />
        </button>
      )}
      
      {showDelete && (
        <button
          onClick={handleDelete}
          className="group bg-[#822b2b] hover:bg-[#4f1818] text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
          title="Hapus"
        >
          <MdDelete className="text-lg" />
        </button>
      )}
    </div>
  );
};

// Standalone Add Button Component
export const AdminAddButton: React.FC<{
  onClick: () => void;
  label: string;
  className?: string;
}> = ({ onClick, label, className = "" }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent parent click events
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`group bg-gradient-to-r from-[#4F1718] to-[#6B2425] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2 ${className}`}
    >
      <MdAdd className="text-lg transition-transform group-hover:rotate-90 duration-300" />
      <span>{label}</span>
    </button>
  );
};

export default AdminActions; 