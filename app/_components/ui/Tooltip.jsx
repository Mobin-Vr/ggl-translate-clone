import Tippy from "@tippyjs/react";

export default function Tooltip({ children, title }) {
  return (
    <Tippy
      content={title}
      arrow={false}
      placement="bottom"
      animation="fade"
      duration={[500, 0]}
      className="pt-1"
    >
      {children}
    </Tippy>
  );
}
