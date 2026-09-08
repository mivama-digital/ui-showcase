"use client";

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  AvatarGroup,
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Progress,
  ProgressLabel,
  ProgressValue,
  Skeleton,
  Toaster,
  toast,
} from "@mivama/ui";
import { Bell, CircleCheck, Info, Inbox, X } from "lucide-react";

import { PageIntro, Panel, Section } from "../_components/showcase";

export default function FeedbackPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Components / 03"
        title="Feedback"
        count="6 component families"
        description="Alerts, progress values, loading placeholders, empty states, avatars, and transient toast feedback."
      />
      <div className="catalog">
        <Section index="03.1" title="Alert" description="All semantic variants, with icons, an action, and an icon-free structure.">
          <div className="demo-grid single">
            <Panel name="Alert / default and destructive">
              <div className="column">
                <Alert><Info /><AlertTitle>Information</AlertTitle><AlertDescription>A neutral message with additional context.</AlertDescription></Alert>
                <Alert variant="success"><CircleCheck /><AlertTitle>Ready to publish</AlertTitle><AlertDescription>The success treatment can pair status copy with an action.</AlertDescription><AlertAction><Button size="xs" variant="outline">View details</Button></AlertAction></Alert>
                <Alert variant="warning"><Bell /><AlertTitle>Review needed</AlertTitle><AlertDescription>Two items need your attention before publishing.</AlertDescription></Alert>
                <Alert variant="destructive"><X /><AlertTitle>Sync failed</AlertTitle><AlertDescription>Reconnect the integration and retry.</AlertDescription></Alert>
                <Alert><AlertTitle>No icon</AlertTitle><AlertDescription>The grid also supports an alert without a leading SVG.</AlertDescription></Alert>
              </div>
            </Panel>
          </div>
        </Section>

        <Section index="03.2" title="Progress" description="Boundary values, indeterminate state, completion, and custom ranges. Track and Indicator render internally.">
          <div className="demo-grid">
            <Panel name="Progress / standard values">
              <div className="column">
                <Progress aria-label="Preparing" value={null}><ProgressLabel>Preparing</ProgressLabel><ProgressValue /></Progress>
                <Progress aria-label="Not started" value={0}><ProgressLabel>Not started</ProgressLabel><ProgressValue /></Progress>
                <Progress aria-label="Uploading" value={37}><ProgressLabel>Uploading</ProgressLabel><ProgressValue /></Progress>
                <Progress aria-label="Almost there" value={99}><ProgressLabel>Almost there</ProgressLabel><ProgressValue /></Progress>
                <Progress aria-label="Complete" value={100}><ProgressLabel>Complete</ProgressLabel><ProgressValue /></Progress>
              </div>
            </Panel>
            <Panel name="Progress / custom range">
              <div className="column">
                <Progress aria-label="Minimum" min={20} max={80} value={20}><ProgressLabel>Minimum</ProgressLabel><ProgressValue /></Progress>
                <Progress aria-label="Midpoint" min={20} max={80} value={50}><ProgressLabel>Midpoint</ProgressLabel><ProgressValue /></Progress>
                <Progress aria-label="Maximum" min={20} max={80} value={80}><ProgressLabel>Maximum</ProgressLabel><ProgressValue /></Progress>
              </div>
            </Panel>
          </div>
        </Section>

        <Section index="03.3" title="Skeleton" description="Shape is controlled through consumer dimensions while the component supplies its loading treatment.">
          <div className="demo-grid">
            <Panel name="Skeleton / profile">
              <div className="stack"><Skeleton className="size-12 rounded-full" /><div className="column skeleton-lines"><Skeleton className="h-4 w-2/3" /><Skeleton className="h-3 w-full" /><Skeleton className="h-3 w-4/5" /></div></div>
            </Panel>
            <Panel name="Skeleton / card">
              <div className="column"><Skeleton className="h-32 w-full" /><Skeleton className="h-4 w-1/2" /><Skeleton className="h-3 w-full" /></div>
            </Panel>
          </div>
        </Section>

        <Section index="03.4" title="Empty" description="Both media variants, with single and paired calls to action.">
          <div className="demo-grid">
            <Panel name="Empty / icon">
              <Empty><EmptyHeader><EmptyMedia variant="icon"><Inbox /></EmptyMedia><EmptyTitle>Nothing waiting</EmptyTitle><EmptyDescription>New requests will appear in this queue.</EmptyDescription></EmptyHeader><EmptyContent><Button size="sm">Create request</Button></EmptyContent></Empty>
            </Panel>
            <Panel name="Empty / default media">
              <Empty><EmptyHeader><EmptyMedia><div className="empty-illustration">00</div></EmptyMedia><EmptyTitle>No results</EmptyTitle><EmptyDescription>Adjust the filters or start with a new search.</EmptyDescription></EmptyHeader><EmptyContent><Button size="sm">Reset</Button><Button size="sm" variant="outline">Learn more</Button></EmptyContent></Empty>
            </Panel>
          </div>
        </Section>

        <Section index="03.5" title="Avatar" description="Fallback initials, multiple sizes, square variants, and grouped identities without external image dependencies.">
          <div className="demo-grid">
            <Panel name="Avatar / sizes and shapes">
              <div className="stack">
                <Avatar size="sm"><AvatarFallback>AK</AvatarFallback></Avatar>
                <Avatar><AvatarFallback>MS</AvatarFallback></Avatar>
                <Avatar size="lg"><AvatarFallback>UI</AvatarFallback></Avatar>
                <Avatar size="xl" shape="square"><AvatarFallback>26</AvatarFallback></Avatar>
              </div>
            </Panel>
            <Panel name="Avatar / group">
              <AvatarGroup>
                <Avatar><AvatarFallback>AK</AvatarFallback></Avatar>
                <Avatar><AvatarFallback>MS</AvatarFallback></Avatar>
                <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
              </AvatarGroup>
            </Panel>
          </div>
        </Section>

        <Section index="03.6" title="Toast" description="The singleton toast manager exposes default semantic variants while Toaster owns the shared viewport and portal behavior.">
          <div className="demo-grid single">
            <Panel name="Toast / semantic notifications">
              <div className="stack">
                <Button onClick={() => toast.success("Changes saved", { description: "The latest configuration is now active." })}>Success toast</Button>
                <Button variant="outline" onClick={() => toast.warning("Review needed", { description: "Check the release notes before publishing." })}>Warning toast</Button>
                <Button variant="destructive" onClick={() => toast.error("Sync failed", { description: "Reconnect the integration and retry." })}>Error toast</Button>
              </div>
              <Toaster />
            </Panel>
          </div>
        </Section>
      </div>
    </main>
  );
}
