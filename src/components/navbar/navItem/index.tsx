import { FunctionComponent } from "react";

interface NavItemProps {
  label: string;
  href?: string;
  className?: string;
  onClick?: () => void;
}

const NavItem: FunctionComponent<NavItemProps> = ({
  label,
  href,
  className,
  onClick,
}) => {
  return (
    <li>
      <a
        href={href}
        className={className ? className : "text-black"}
        onClick={onClick}
      >
        {label}
      </a>
    </li>
  );
};

export default NavItem;
