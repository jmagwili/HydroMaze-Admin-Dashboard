import React from 'react';
import { MoreVertical, ChevronLast, ChevronFirst } from 'lucide-react';
import { useContext, useState, ReactNode } from 'react';
import restapi from '../assets/restapi.jpg';
import { Link } from 'react-router-dom';
import SidebarContext from '@/SidebarContext';

interface SidebarProps {
  children: ReactNode;
}

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  to: string;
  onItemClick: (to: string) => void;
}

export default function NewSidebar({ children }: SidebarProps) {
  const {expanded, setExpanded } = useContext(SidebarContext)


  return (
    <aside className="h-screen fixed z-50">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <div
            className={`overflow-hidden transition-all ${
              expanded ? "w-62" : "w-0"
            } text-center`}
          >
            <span className="text-blue-600 font-bold text-3xl">Hydro</span>
            <span className="text-blue-400 font-bold text-3xl">Maze</span>
          </div>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <ul className="flex-1 px-3">
          {React.Children.map(children, (child) =>
            React.cloneElement(child as React.ReactElement)
          )}
        </ul>

        <div className="border-t flex p-3">
          <img src={restapi} alt="" className="w-10 h-10 rounded-md" />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">Jonel Teano</h4>
              <span className="text-xs text-gray-600">
                jonelmantos@gmail.com
              </span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, to, onItemClick }: SidebarItemProps) {
  const { expanded, activeItem } = useContext(SidebarContext);

  return (
    <Link to={to}>
      <li
        onClick={() => onItemClick(to)}
        className={`
          relative flex items-center py-4 px-3 my-4
          font-medium rounded-md cursor-pointer
          transition-colors group mt-6 
          ${
            activeItem === to
              ? "bg-gradient-to-tr from-blue-500 to-blue-500 text-white"
              : "hover:bg-blue-100 text-gray-600"
          }
        `}
      >
          {icon}
          <span
            className={`overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            {text}
          </span>
          {/* {alert && (
            <div
              className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
                expanded ? "" : "top-2"
              }`}
            />
          )} */}
  
          {!expanded && (
            <div
              className={`
                absolute left-full rounded-md px-2 py-1 ml-6
                bg-indigo-100 text-indigo-800 text-sm
                invisible opacity-20 -translate-x-3 transition-all
                group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
              `}
            >
              {text}
            </div>
          )}
        </li>
      </Link>
    );
  }
