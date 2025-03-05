"use client";

import Image from "next/image";
import brazilFlag from "@/public/brazil-flag.png";
import ukFlag from "@/public/uk-flag.png";

import { useLanguage } from "@/context/languages";
import { useState, useRef, useEffect } from "react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [buttonText, setButtonText] = useState("Language");

  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setButtonText(language === "en" ? "Language" : "Idioma");
  }, [language])


  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []) 

  return (
    <div ref={menuRef}>
      <button onClick={toggleMenu} className="bg-white relative text-black cursor-pointer hover:bg-gray-200 px-2 py-1 rounded-md">
        { buttonText }
        { isOpen && (
          <ul className="absolute z-1 text-white cursor-default w-max space-y-1 right-3 top-13 bg-(--bg-color) rounded-lg p-1.5 border-solid border-1 border-(--border-color)">
            <li
              className={`flex gap-2 items-center cursor-pointer rounded-md px-2 py-1 hover:bg-(--menu-item-bg) 
              ${ language  === "en" ? "bg-(--menu-item-bg)" : ""
            }`}
              onClick={() => setLanguage("en")}
            >
              <Image src={ukFlag} width={30} alt="United Kingdom flag"/> English
            </li>
            <li
              className={`flex gap-2 items-center cursor-pointer rounded-md px-2 py-1 hover:bg-(--menu-item-bg) 
              ${ language  === "pt-BR" ? "bg-(--menu-item-bg)" : ""
            }`}
              onClick={() => setLanguage("pt-BR")}
            >
              <Image src={brazilFlag} width={30} alt="Brazil flag"/> Portuguese
            </li>
          </ul>
        )}
      </button>
    </div>
  );
}
