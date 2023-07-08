"use client"
import { FileImage } from "lucide-react";
import React, { useRef } from "react";


const FileInput = ({files,onChange}:any) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    ref.current?.click();
  };

  // 3. convert FileList to File[]
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.currentTarget.files ?? []);
    onChange(files)
    console.log("selected photo: ",files)
  };
  return (
    <div>
      <div
        onClick={handleClick}
        className="p-4 flex flex-col items-center gap-2 bg-blue-50 text-blue-500 rounded-md hover:bg-blue-100 cursor-pointer"
      >
        <FileImage />
        <span>Зураг сонгох</span>
        <input
          type="file"
          ref={ref}
          className="hidden"
          onChange={handleChange}
        />
      </div>
      {/* 6. display selected files */}
      {!!files?.length && (
        <div className="p-4 mt-4 rounded-md bg-blue-50 overflow-hidden text-ellipsis">
          <p>Сонгосон зургууд</p>
          {files.map((file:any, i:any) => {
            return (
              <span key={i} className="text-blue-500 whitespace-nowrap">
                {file.name}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FileInput;
