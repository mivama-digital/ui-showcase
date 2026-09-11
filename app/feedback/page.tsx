"use client";

import {
  Alert, AlertDescription, AlertTitle, Button,
  Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle,
  Progress, Skeleton, Spinner, Toast, toast,
} from "@mivama/ui";
import { CircleAlert, Info, Inbox } from "lucide-react";

import { PageIntro, Panel, Section } from "../_components/showcase";

export default function FeedbackPage() {
  return (
    <main>
      <Toast />
      <PageIntro eyebrow="Components / 03" title="Feedback" count="6 families" description="Alerts, progress indicators, loading skeletons, empty states, spinners, and toast notifications." />
      <div className="px-4 md:px-12 py-4 pb-16">
        <Section index="03.1" title="Alert" description="Informational and destructive message banners with title and description slots.">
          <div className="grid grid-cols-1 gap-4">
            <Panel name="Alert / default and destructive">
              <div className="flex flex-col gap-3.5">
                <h3 className="sr-only">Alert banners</h3>
                <h4 className="sr-only">System notifications</h4>
                <Alert>
                  <Info className="size-4" />
                  <AlertTitle>Information</AlertTitle>
                  <AlertDescription>A neutral message with additional context and details.</AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <CircleAlert className="size-4" />
                  <AlertTitle>Sync failed</AlertTitle>
                  <AlertDescription>Reconnect the integration and retry the sync action.</AlertDescription>
                </Alert>
                <Alert>
                  <AlertTitle>Note without icon</AlertTitle>
                  <AlertDescription>Alerts can be structured with text-only message headings and copy.</AlertDescription>
                </Alert>
              </div>
            </Panel>
          </div>
        </Section>

        <Section index="03.2" title="Progress" description="Deterministic progress values showing operation completion percentages.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Panel name="Progress / values">
              <div className="flex flex-col gap-3.5">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground"><span>Zero</span><span>0%</span></div>
                  <Progress value={0} aria-label="Zero progress" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground"><span>Uploading</span><span>37%</span></div>
                  <Progress value={37} aria-label="Upload progress" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground"><span>Complete</span><span>100%</span></div>
                  <Progress value={100} aria-label="Complete progress" />
                </div>
              </div>
            </Panel>
            <Panel name="Spinner / inline loading">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Spinner />
                  <span>Loading workspace...</span>
                </div>
                <Button disabled size="sm">
                  <Spinner className="mr-2" />
                  Saving
                </Button>
              </div>
            </Panel>
          </div>
        </Section>

        <Section index="03.3" title="Skeleton" description="Shape-driven loading placeholders matching surface dimensions.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Panel name="Skeleton / profile">
              <div className="flex flex-wrap items-center gap-2.5"><Skeleton className="size-12 rounded-full" /><div className="flex flex-col flex-1 gap-1.5"><Skeleton className="h-4 w-2/3" /><Skeleton className="h-3 w-full" /><Skeleton className="h-3 w-4/5" /></div></div>
            </Panel>
            <Panel name="Skeleton / card">
              <div className="flex flex-col gap-3.5"><Skeleton className="h-28 w-full" /><Skeleton className="h-4 w-1/2" /><Skeleton className="h-3 w-full" /></div>
            </Panel>
          </div>
        </Section>

        <Section index="03.4" title="Empty" description="Zero-data states with icons, titles, copy, and action buttons.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Panel name="Empty / icon">
              <Empty><EmptyHeader><EmptyMedia variant="icon"><Inbox className="size-6" /></EmptyMedia><EmptyTitle>Nothing waiting</EmptyTitle><EmptyDescription>New requests will appear in this queue.</EmptyDescription></EmptyHeader><EmptyContent><Button size="sm">Create request</Button></EmptyContent></Empty>
            </Panel>
            <Panel name="Empty / media">
              <Empty><EmptyHeader><EmptyMedia><div className="grid place-items-center w-28 h-20 border border-dashed border-border text-muted-foreground text-2xl rounded-md font-mono">00</div></EmptyMedia><EmptyTitle>No results found</EmptyTitle><EmptyDescription>Adjust the filters or search query.</EmptyDescription></EmptyHeader><EmptyContent><Button size="sm">Reset search</Button></EmptyContent></Empty>
            </Panel>
          </div>
        </Section>

        <Section index="03.5" title="Toast" description="Floating notifications powered by Sonner with custom actions and messages.">
          <div className="grid grid-cols-1 gap-4">
            <Panel name="Toast / triggers">
              <div className="flex flex-wrap items-center gap-2.5">
                <Button size="sm" onClick={() => toast("Deployment completed successfully.")}>Trigger toast</Button>
                <Button size="sm" variant="outline" onClick={() => toast.success("Changes saved to cloud.")}>Success toast</Button>
                <Button size="sm" variant="destructive" onClick={() => toast.error("Unable to connect to server.")}>Error toast</Button>
              </div>
            </Panel>
          </div>
        </Section>
      </div>
    </main>
  );
}
