"use client";

import {
  Choice,
  ChoiceGroup,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  Fieldset,
  Input,
  Select,
  Separator,
  Switch,
  Textarea,
} from "@mivama/ui";

import { Fixture, PageIntro, Panel, Section } from "../_components/showcase";

export default function FormsPage() {
  return (
    <main>
      <PageIntro eyebrow="Components / 04" title="Forms" count="12 exports" description="Native controls, structured fields, choices, and Base UI switch states in labeled, accessible fixtures." />
      <div className="catalog">
        <Section index="04.1" title="Input" description="Representative native types plus disabled, read-only, required, and invalid states.">
          <div className="demo-grid">
            <Panel name="Input / text states">
              <div className="field-grid">
                <Fixture label="Default"><Input defaultValue="Mivama Portal" /></Fixture>
                <Fixture label="Placeholder"><Input placeholder="Search projects..." type="search" /></Fixture>
                <Fixture label="Required"><Input required placeholder="Required value" /></Fixture>
                <Fixture label="Read only"><Input readOnly value="Locked value" /></Fixture>
                <Fixture label="Disabled"><Input disabled value="Unavailable" /></Fixture>
                <Fixture label="Invalid" error="Enter a valid project name."><Input aria-invalid defaultValue="Wrong value" /></Fixture>
              </div>
            </Panel>
            <Panel name="Input / native types">
              <div className="field-grid">
                <Fixture label="Email"><Input type="email" placeholder="name@company.com" /></Fixture>
                <Fixture label="Password"><Input type="password" defaultValue="password" /></Fixture>
                <Fixture label="Number"><Input type="number" min={0} max={10} step={1} defaultValue={4} /></Fixture>
                <Fixture label="Date"><Input type="date" /></Fixture>
                <Fixture label="File"><Input type="file" /></Fixture>
              </div>
            </Panel>
          </div>
        </Section>

        <Section index="04.2" title="Textarea" description="Content growth, native constraints, and all non-interactive states.">
          <div className="demo-grid">
            <Panel name="Textarea / content">
              <div className="column"><Fixture label="Placeholder"><Textarea placeholder="Add context for your team..." /></Fixture><Fixture label="Multiline"><Textarea defaultValue={"First line\nSecond line\nThird line"} /></Fixture></div>
            </Panel>
            <Panel name="Textarea / states">
              <div className="column"><Fixture label="Invalid" error="Add more context before continuing."><Textarea aria-invalid defaultValue="Needs correction" /></Fixture><Fixture label="Read only"><Textarea readOnly value="This content cannot be changed." /></Fixture><Fixture label="Disabled"><Textarea disabled value="Unavailable content" /></Fixture></div>
            </Panel>
          </div>
        </Section>

        <Section index="04.3" title="Switch" description="Checked, unchecked, disabled, read-only, required, and named form controls.">
          <div className="demo-grid">
            <Panel name="Switch / states">
              <div className="column">
                <label className="switch-row"><Switch aria-label="Unchecked" /> Unchecked</label><Separator />
                <label className="switch-row"><Switch aria-label="Checked" defaultChecked /> Checked</label><Separator />
                <label className="switch-row"><Switch aria-label="Disabled unchecked" disabled /> Disabled unchecked</label><Separator />
                <label className="switch-row"><Switch aria-label="Disabled checked" disabled defaultChecked /> Disabled checked</label>
              </div>
            </Panel>
            <Panel name="Switch / form behavior">
              <div className="column">
                <label className="switch-row"><Switch aria-label="Read only" readOnly defaultChecked /> Read only</label><Separator />
                <label className="switch-row"><Switch aria-label="Required named value" required name="notifications" value="enabled" /> Required named value</label>
              </div>
            </Panel>
          </div>
        </Section>

        <Section index="04.4" title="Field + Select" description="The new field primitives keep labels, descriptions, validation messages, grouped legends, and native selects consistent without hiding native semantics.">
          <div className="demo-grid">
            <Panel name="Field / complete composition">
              <Field>
                <FieldLabel htmlFor="workspace-name">Workspace name</FieldLabel>
                <Input id="workspace-name" defaultValue="Mivama Design" />
                <FieldDescription>Visible to everyone in the workspace.</FieldDescription>
              </Field>
              <Separator className="spaced-separator" />
              <Field>
                <FieldLabel htmlFor="workspace-slug">Workspace slug</FieldLabel>
                <Input id="workspace-slug" aria-invalid defaultValue="mivama design" />
                <FieldError>Use letters, numbers, and hyphens only.</FieldError>
              </Field>
            </Panel>
            <Panel name="Select + fieldset">
              <Fieldset>
                <FieldLegend>Project defaults</FieldLegend>
                <Field>
                  <FieldLabel htmlFor="project-visibility">Visibility</FieldLabel>
                  <Select id="project-visibility" defaultValue="team">
                    <option value="private">Private</option>
                    <option value="team">Team</option>
                    <option value="public">Public</option>
                  </Select>
                  <FieldDescription>Native select behavior with the shared control styling.</FieldDescription>
                </Field>
              </Fieldset>
            </Panel>
          </div>
        </Section>

        <Section index="04.5" title="Choice" description="Native checkbox and radio controls share one lightweight primitive and an optional fieldset group.">
          <div className="demo-grid">
            <Panel name="Choice / checkboxes">
              <ChoiceGroup>
                <legend className="sample-copy">Notifications</legend>
                <label className="switch-row"><Choice type="checkbox" defaultChecked name="notifications" value="email" /> Email updates</label>
                <label className="switch-row"><Choice type="checkbox" name="notifications" value="product" /> Product announcements</label>
                <label className="switch-row"><Choice type="checkbox" disabled name="notifications" value="billing" /> Billing alerts</label>
              </ChoiceGroup>
            </Panel>
            <Panel name="Choice / radios">
              <ChoiceGroup>
                <legend className="sample-copy">Default density</legend>
                <label className="switch-row"><Choice type="radio" defaultChecked name="density" value="comfortable" /> Comfortable</label>
                <label className="switch-row"><Choice type="radio" name="density" value="compact" /> Compact</label>
              </ChoiceGroup>
            </Panel>
          </div>
        </Section>
      </div>
    </main>
  );
}
