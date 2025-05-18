"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useEffect, useState } from "react";
import Tooltip from "./ui/Tooltip";

function SelectLang({ languages, onSelect, value, className }) {
  const [selected, setSelected] = useState(value);

  function handleSelectChange(langName) {
    setSelected(langName);
    onSelect(langName);
  }

  useEffect(() => {
    if (value) setSelected(value);
  }, [value]);

  return (
    <Tooltip title="Select target language">
      <div className={`w-fit ${className}`}>
        <Select onValueChange={handleSelectChange} value={selected}>
          <SelectTrigger className="no-shadow w-fit gap-1 border-none text-sm font-semibold text-blue-600">
            <SelectValue placeholder="Select a language">
              {selected}
            </SelectValue>
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Languages</SelectLabel>
              {languages.map(({ id, name }) => (
                <SelectItem key={id} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </Tooltip>
  );
}

export default SelectLang;
