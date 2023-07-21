"use client"
import { FileImage, XCircle } from "lucide-react";
import React, { useRef, useState } from "react";


const FileInput = ({files,onChange}:{
  files:File[],
  onChange:(files:File[])=>void
}) => {
  const ref = useRef<HTMLInputElement>(null);

  const [error,setError] = useState<string | undefined>()

  const removeFile = (name:string)=>{
    const removedFile = files.filter(file=>file.name !== name)
    onChange(removedFile)
  }

  const handleClick = () => {
    ref.current?.click();
  }
  // 3. convert FileList to File[]
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files){
      /*Maximum allowed size in bytes
        5MB Example */
      const maxAllowedSize = 5 * 1024 * 1024;

      Array.from(e.currentTarget.files!).forEach(file => {
        if (file.size > maxAllowedSize) {
          return setError("Файл бүрийн хамгийн их хэмжээ 1ГБ")
        }
        setError(undefined)
        const selectedfile = file;
        onChange([...files,selectedfile])
      });
      
    }
    
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className="p-4 flex flex-col items-center gap-2 bg-blue-50 text-blue-500 rounded-md hover:bg-blue-100 cursor-pointer"
      >
        <FileImage />
        {
          Boolean(error) ? (
            <span>{error}</span>
          ): <span>файл оруулах</span>
        }
        
        <input
          type="file"
          accept="image/*, .docx, .doc,.pdf"
          ref={ref}
          className="hidden"
          onChange={handleChange}
        />
      </div>
      {/* 6. display selected files */}
      {!!files?.length && (
        <div className="p-4 mt-4 rounded-md bg-blue-50 overflow-hidden text-ellipsis">
          {files.map((file:any, i:any) => {
            return (
              <div key={i} className="text-blue-500 whitespace-nowrap mb-2 flex justify-between">
                <div className="overflow-x-hidden mr-4">
                  {file.name}
                </div>
                <div onClick={()=>removeFile(file.name)}  className="cursor-pointer">
                  <XCircle />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FileInput;
