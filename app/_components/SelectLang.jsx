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
import { useShallow } from "zustand/react/shallow";
import useTranslateStore from "../translateStore";
import Tooltip from "./ui/TooltipWrapper";

export default function SelectLang({ languages, className, className2 }) {
  const { isMainSectionVertical, onSelect, value } = useTranslateStore(
    useShallow((state) => ({
      isMainSectionVertical: state.isMainSectionVertical,
      onSelect: state.setOutputLang,
      value: state.outputLang,
    })),
  );

  const [selected, setSelected] = useState(value);
  const [isOpen, setIsOpen] = useState(false);

  function handleSelectChange(langName) {
    setSelected(langName);
    onSelect(langName);
  }

  useEffect(() => {
    if (value) setSelected(value);
  }, [value]);

  return (
    <Tooltip title="Select target language" disabled={isOpen}>
      <div
        className={` ${className} ${isMainSectionVertical ? "w-fit" : "w-44"}`}
      >
        <Select
          onValueChange={handleSelectChange}
          value={selected}
          onOpenChange={setIsOpen} // To disable tooltip when the select is open, Radix handles open/close internally and passes the state (true/false) here.
        >
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
