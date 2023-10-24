import Link from "next/link";
import React from "react";
import style from "./List.module.scss";
import classNames from "classnames";

interface IList {
  name: string;
  icon: React.ReactNode;
  isActive?: boolean;
  to: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

function List({ name, icon, isActive, to, onClick }: IList) {
  const linkContainerClasses = classNames(style.linkContainer, {
    [style.unactiveList]: !isActive,
    [style.activeList]: isActive,
  });
  return (
    <Link
      onClick={onClick && onClick}
      className={`${linkContainerClasses} dark:text-prim-dktext dark:hover:bg-prim-dark/10 dark:hover:text-prim-dark`}
      href={to}
    >
      <div className="text-xl ">{icon}</div>
      <p className="">{name}</p>
    </Link>
  );
}

export default List;
