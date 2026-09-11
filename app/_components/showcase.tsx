"use client";

import { cloneElement, useId, type ReactElement, type ReactNode } from "react";
import { Card, Field, FieldError, FieldLabel, Typography } from "@mivama/ui";

export function PageIntro({ eyebrow, title, description, count }: {
  eyebrow: string;
  title: string;
  description: string;
  count: string;
}) {
  return (
    <header className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-8 items-end p-6 md:p-12 border-b border-border">
      <div>
        <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">{eyebrow}</span>
        <Typography variant="h1" className="mt-2">{title}</Typography>
        <Typography variant="lead" className="mt-2 max-w-2xl">{description}</Typography>
      </div>
      <strong className="text-xs font-medium tracking-wider text-muted-foreground uppercase">{count}</strong>
    </header>
  );
}

export function Section({ index, title, description, children }: {
  index: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[minmax(150px,0.27fr)_1fr] gap-6 md:gap-12 py-10 md:py-16 border-b border-border scroll-mt-16">
      <div className="space-y-1">
        <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">{index}</span>
        <Typography variant="h2" className="mt-1">{title}</Typography>
        <Typography variant="small" className="text-muted-foreground leading-normal">{description}</Typography>
      </div>
      {children}
    </section>
  );
}

export function Panel({ name, note, children, wide = false }: {
  name: string;
  note?: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <Card className={`min-w-0 p-4 md:p-6 border-border rounded-lg shadow-xs${wide ? " col-span-full" : ""}`}>
      <div className="flex items-center justify-between gap-4 mb-4 text-xs text-muted-foreground">
        <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">{name}</span>
        {note ? <span>{note}</span> : null}
      </div>
      {children}
    </Card>
  );
}

export function Fixture({ label, children, error }: {
  label: string;
  children: ReactElement<{ id?: string; "aria-describedby"?: string }>;
  error?: string;
}) {
  const generatedId = useId();
  const controlId = children.props.id ?? generatedId;
  const errorId = error ? `${controlId}-error` : undefined;

  return (
    <Field className="grid gap-1.5 min-w-0">
      <FieldLabel className="text-xs font-semibold text-foreground" htmlFor={controlId}>{label}</FieldLabel>
      {cloneElement(children, {
        id: controlId,
        "aria-describedby": errorId ?? children.props["aria-describedby"],
      })}
      {error ? <FieldError className="text-xs" id={errorId}>{error}</FieldError> : null}
    </Field>
  );
}
