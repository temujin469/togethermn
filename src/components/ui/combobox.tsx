"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


type Props = {
  className?: string,
  placeholder?:string
  value?:string
  values:{
    value:string,
    label:string
  }[],
  onSelect: (value: string) => void,
}

export function Combobox({className,values,placeholder,onSelect,value}:Props) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen} >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          placeholder="hahah"
          className={cn("justify-between",className)}
        >
          {value
            ? values?.find((val) => val.value === value)?.label
            : <p className="text-gray-400">{placeholder}</p> }
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-full">
        <Command >
          <CommandInput placeholder="Хайх" />
          <CommandEmpty>Үр дүн олдсонгүй</CommandEmpty>
          <CommandGroup >
            {values?.map((val) => (
              <CommandItem
                key={val.value}
                
                onSelect={(currentValue) => {
                  // setValue(val.value === value ? "" : val.value)
                  setOpen(false)
                  onSelect(val.value)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === val.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {val.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
