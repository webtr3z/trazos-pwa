interface ArticleCardProps {
  title: string;
  href: string;
  description: string;
}

export function ArticleCard({ title, href, description }: ArticleCardProps) {
  return (
    <div className="z-50 bg-background/50 backdrop-blur-sm border border-border p-4 rounded-lg hover:bg-muted transition-colors hover:border-border/50">
      <article>
        <h2 className="text-lg font-semibold mb-2 text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </article>
    </div>
  );
}
