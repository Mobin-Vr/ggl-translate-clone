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
import useMostFrequentOutLang from "../_lib/hooks/useMostFrequentOutLang";

export default function SelectLang({
  languages,
  onSelect,
  value,
  recentHistory,
  className,
  className2,
  isMainSectionVertical,
}) {
  const [selected, setSelected] = useState(value);

  const mostFrequentOutLang = useMostFrequentOutLang(recentHistory);

  function handleSelectChange(langName) {
    setSelected(langName);
    onSelect(langName);
  }

  useEffect(() => {
    if (value) setSelected(value);
    else setSelected(mostFrequentOutLang);
  }, [value, mostFrequentOutLang]);

  return (
    <Tooltip title="Select target language">
      <div
        className={` ${className} ${isMainSectionVertical ? "w-fit" : "w-44"}`}
      >
        <Select onValueChange={handleSelectChange} value={selected}>
          <SelectTrigger
            className={`no-shadow gap-1 border-none text-sm font-semibold text-blue-600 ${isMainSectionVertical ? "w-fit" : "w-full"} ${className2}`}
          >
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
