import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";

interface ILinkButton {
  link: string;
  label: string;
}

const TButtons: ILinkButton[] = [
  { link: "/Page01", label: "Rewarded video" },
  { link: "/Page02", label: "Billboard and sticky" },
  { link: "/Page03", label: "Video player" },
];

const Navigation: FC<{}> = () => {
  const { pathname } = useLocation();

  return (
    <nav className="site-nav" aria-label="Demo pages">
      <div className="shell site-nav__list">
        {TButtons.map((item, i) => (
          <NavLink
            key={item.link}
            to={item.link}
            className={({ isActive }) =>
              // "/" renders Page01, so treat it as the first tab
              isActive || (pathname === "/" && i === 0)
                ? "site-nav__link is-active"
                : "site-nav__link"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
