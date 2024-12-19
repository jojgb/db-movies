import { FunctionComponent } from "react";

interface NavItemProps {
  label: string;
  href?: string;
  className?: string;
}

const NavItem: FunctionComponent<NavItemProps> = ({
  label,
  href,
  className,
}) => {
  return (
    <li>
      <a href={href} className={className ? className : "text-black"}>
        {label}
      </a>
    </li>
  );
};

export default NavItem;
