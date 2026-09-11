"use client";

import { useState } from "react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
  Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
  HoverCard, HoverCardContent, HoverCardTrigger,
  Input,
  Popover, PopoverContent, PopoverTrigger,
} from "@mivama/ui";
import { Info, Sparkles, Trash2 } from "lucide-react";

import { PageIntro, Panel, Section } from "../../_components/showcase";

export default function DialogPage() {
  const [controlledOpen, setControlledOpen] = useState(false);

  return (
    <main>
      <PageIntro eyebrow="Components / 06" title="Dialog" count="4 families" description="Modal dialogs, alert confirmations, popovers, and contextual hover cards with focus management." />
      <div className="px-4 md:px-12 py-4 pb-16">
        <Section index="06.1" title="Dialog composition" description="Default, footer-close, destructive, and controlled dialog examples.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Panel name="Dialog / form">
              <Dialog>
                <DialogTrigger asChild><Button><Sparkles />Invite collaborators</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Invite collaborators</DialogTitle><DialogDescription>Add people to this workspace. They will receive an email invitation.</DialogDescription></DialogHeader>
                  <label className="grid gap-1.5 text-xs font-semibold">Email address<Input type="email" placeholder="name@company.com" /></label>
                  <DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button>Send invitation</Button></DialogFooter>
                </DialogContent>
              </Dialog>
            </Panel>
            <Panel name="Dialog / footer close">
              <Dialog>
                <DialogTrigger asChild><Button variant="outline">Footer close button</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Close from the footer</DialogTitle><DialogDescription>Modal with structured header and action footer.</DialogDescription></DialogHeader>
                  <DialogFooter><DialogClose asChild><Button>Save changes</Button></DialogClose></DialogFooter>
                </DialogContent>
              </Dialog>
            </Panel>
            <Panel name="Dialog / destructive">
              <Dialog>
                <DialogTrigger asChild><Button variant="destructive"><Trash2 />Delete project</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Delete this project?</DialogTitle><DialogDescription>This action cannot be undone. All associated files will be removed.</DialogDescription></DialogHeader>
                  <DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button variant="destructive">Delete permanently</Button></DialogFooter>
                </DialogContent>
              </Dialog>
            </Panel>
            <Panel name="Dialog / controlled">
              <Dialog open={controlledOpen} onOpenChange={setControlledOpen}>
                <DialogTrigger asChild><Button variant="secondary">Open controlled dialog</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Controlled state</DialogTitle><DialogDescription>React state owns this dialog&apos;s open value.</DialogDescription></DialogHeader>
                  <DialogFooter><Button variant="outline" onClick={() => setControlledOpen(false)}>Close with state</Button></DialogFooter>
                </DialogContent>
              </Dialog>
            </Panel>
          </div>
        </Section>

        <Section index="06.2" title="Alert Dialog" description="Critical confirmation prompts requiring explicit acknowledgement.">
          <div className="grid grid-cols-1 gap-4">
            <Panel name="AlertDialog / confirmation">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Open alert confirmation</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>This action will revoke all active session tokens immediately.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Panel>
          </div>
        </Section>

        <Section index="06.3" title="Popover & Hover Card" description="Click-triggered rich popovers and pointer-hover preview cards.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Panel name="Popover / settings">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Open popover</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Dimensions</h4>
                      <p className="text-sm text-muted-foreground">Set the width and max-height for the layer.</p>
                    </div>
                    <div className="grid gap-2">
                      <label className="text-xs">Width</label>
                      <Input defaultValue="100%" className="h-8" />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </Panel>
            <Panel name="HoverCard / user preview">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="link" className="gap-1 p-0"><Info className="size-4" />@mivama-digital</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">@mivama-digital</h4>
                    <p className="text-sm text-muted-foreground">Shared design tokens, UI primitives, and full shadcn catalog parity.</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </Panel>
          </div>
        </Section>
      </div>
    </main>
  );
}
