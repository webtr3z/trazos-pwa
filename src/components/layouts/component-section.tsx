interface ComponentSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function ComponentSection({
  title,
  description,
  children,
}: ComponentSectionProps) {
  return (
    <div className="border border-border rounded-lg p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2 text-foreground">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}
