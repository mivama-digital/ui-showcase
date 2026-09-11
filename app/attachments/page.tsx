"use client";

import { AspectRatio, Attachment, Button } from "@mivama/ui";
import { Download, FileText, Image as ImageIcon } from "lucide-react";

import { PageIntro, Panel, Section } from "../_components/showcase";

export default function AttachmentsPage() {
  return (
    <main>
      <PageIntro eyebrow="Components / 08" title="Attachments" count="2 families" description="File attachment containers, status cards, and aspect-ratio media wrappers." />
      <div className="px-4 md:px-12 py-4 pb-16">
        <Section index="08.1" title="Attachment" description="Flexible attachment containers with metadata and download triggers.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Panel name="Attachment / document card">
              <Attachment className="items-center justify-between p-4 max-w-md">
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-muted p-2.5 text-foreground">
                    <FileText className="size-5" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">brand-guidelines-2026.pdf</p>
                    <p className="text-xs text-muted-foreground">4.8 MB · Complete PDF</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" aria-label="Download brand guidelines">
                  <Download className="size-4" />
                </Button>
              </Attachment>
            </Panel>
            <Panel name="Attachment / compact preview">
              <Attachment className="items-center justify-between p-3 max-w-md">
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-muted p-2 text-foreground">
                    <ImageIcon className="size-4" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">hero-banner.webp</p>
                    <p className="text-xs text-muted-foreground">1.2 MB · WebP image</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">View</Button>
              </Attachment>
            </Panel>
          </div>
        </Section>

        <Section index="08.2" title="Aspect Ratio" description="Responsive containers maintaining strict proportion ratios.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Panel name="AspectRatio / 16:9 widescreen">
              <div className="w-full max-w-md overflow-hidden rounded-md border border-border">
                <AspectRatio ratio={9 / 16} className="bg-muted grid place-content-center text-sm text-muted-foreground">
                  16:9 Widescreen container
                </AspectRatio>
              </div>
            </Panel>
            <Panel name="AspectRatio / 4:3 standard">
              <div className="w-full max-w-md overflow-hidden rounded-md border border-border">
                <AspectRatio ratio={3 / 4} className="bg-muted grid place-content-center text-sm text-muted-foreground">
                  4:3 Ratio container
                </AspectRatio>
              </div>
            </Panel>
          </div>
        </Section>
      </div>
    </main>
  );
}
