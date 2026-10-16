import { FC } from "react";

const Footer: FC<{}> = () => {
  return (
    <footer id="footer" className="site-footer">
      <div className="shell site-footer__grid">
        <div>
          <h2 className="site-footer__heading">Contact</h2>
          <ul className="site-footer__list">
            <li>
              <a href="tel:+442074048899">+44 20 7404 8899</a>
            </li>
            <li>Watchmaker Court, 31-35 St John's Lane, EC1M 4BJ</li>
            <li>
              <a href="mailto:londonsales@venatus.com">londonsales@venatus.com</a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="site-footer__heading">Social</h2>
          <ul className="site-footer__list">
            <li>
              <a href="https://www.linkedin.com/company/venatus-media/">LinkedIn</a>
            </li>
            <li>
              <a href="https://twitter.com/venatusmedia">Twitter</a>
            </li>
            <li>
              <a href="https://www.instagram.com/venatusmedia/">Instagram</a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="site-footer__heading">Showcase</h2>
          <ul className="site-footer__list">
            <li>
              <a href="https://showcase.venatusmedia.com/publisher.html">Publishers</a>
            </li>
            <li>
              <a href="https://showcase.venatusmedia.com/advertiser.html">Advertisers</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="shell">
          Copyright © {new Date().getFullYear()}{" "}
          <a href="https://venatus.com/">Venatus</a>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
export default Footer;
