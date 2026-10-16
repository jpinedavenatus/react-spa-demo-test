import { FC, ReactNode } from "react";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: ReactNode;
  placements: string[];
};

export const PageHeader: FC<PageHeaderProps> = ({
  eyebrow,
  title,
  description,
  placements,
}) => (
  <section className="page-header">
    <div className="shell">
      <p className="page-header__eyebrow">{eyebrow}</p>
      <h1 className="page-header__title">{title}</h1>
      <p className="page-header__description">{description}</p>
      <ul className="tag-list" aria-label="Placements on this page">
        {placements.map((p) => (
          <li key={p} className="tag">
            {p}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

// Grey skeleton card standing in for real article content
export const ContentCard: FC<{ lines?: number; media?: boolean }> = ({
  lines = 4,
  media = false,
}) => (
  <article className="content-card" aria-hidden="true">
    {media && <div className="content-card__media" />}
    <div className="skeleton skeleton--title" />
    {Array.from({ length: lines }, (_, i) => (
      <div
        key={i}
        className="skeleton skeleton--line"
        style={{ width: i === lines - 1 ? "60%" : "100%" }}
      />
    ))}
  </article>
);

type PageBodyProps = {
  main: ReactNode;
  sidebar?: ReactNode;
};

export const PageBody: FC<PageBodyProps> = ({ main, sidebar }) => (
  <div id="content-container" className={`shell page-body${sidebar ? "" : " page-body--full"}`}>
    <div className="page-body__main">{main}</div>
    {sidebar && (
      <aside className="page-body__sidebar">
        <div className="page-body__sticky">{sidebar}</div>
      </aside>
    )}
  </div>
);
