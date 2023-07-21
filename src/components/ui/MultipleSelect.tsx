import { Badge, MenuItem, OutlinedInput, Select } from '@mui/material';
import React from 'react';

type Props = {
  value?:string[],
  values?:string[]
  onChange:(val:string[]) => void
}

function MultipleSelect({value,onChange,values}:Props) {
  return (
    <Select
      labelId="demo-multiple-chip-label"
      id="demo-multiple-chip"
      multiple
      className='w-full rounded-md p-0'
      value={value}
      onChange={(e)=>onChange(e.target.value as string[])}
      input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
      renderValue={(selected) => (
        <div className='flex flex-wrap gap-2'>
          {selected.map((value) => (
            <Badge key={value} className='bg-slate-100 text-gray-700 rounded-lg px-2'>{value}</Badge>
          ))}
        </div>
      )}
      MenuProps={{
        PaperProps: {
          style: {
            maxHeight: 230,
          },
        },
      }}
    >
      {values?.map((name) => (
        <MenuItem
          key={name}
          value={name}
        // style={getStyles(name, personName, theme)}
        >
          {name}
        </MenuItem>
      ))}
    </Select>
  );
}

export default MultipleSelect;
