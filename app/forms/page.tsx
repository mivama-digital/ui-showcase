"use client";

import {
  Checkbox,
  Combobox,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
  Input,
  InputGroup,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  Label,
  NativeSelect,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Separator,
  Slider,
  Switch,
  Textarea,
} from "@mivama/ui";
import { useEffect, useRef, useState } from "react";

import { Fixture, PageIntro, Panel, Section } from "../_components/showcase";

const comboboxOptions = [
  { value: "nextjs", label: "Next.js" },
  { value: "react", label: "React 19" },
  { value: "tailwind", label: "Tailwind CSS v4" },
  { value: "shadcn", label: "shadcn/ui" },
];

export default function FormsPage() {
  const [selectedCombobox, setSelectedCombobox] = useState("nextjs");
  const [sliderValue, setSliderValue] = useState([50]);
  const [otp, setOtp] = useState("123456");
  const sliderRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const thumb = sliderRef.current?.querySelector('[role="slider"]');
    if (thumb) {
      thumb.setAttribute("aria-label", "Volume level");
    }
  }, []);

  return (
    <main>
      <PageIntro eyebrow="Components / 04" title="Forms" count="13 families" description="Native and composed form controls: inputs, OTP, textarea, switch, checkbox, radio, selects, combobox, and sliders." />
      <div className="px-4 md:px-12 py-4 pb-16">
        <Section index="04.1" title="Input" description="Native input states including search, placeholder, required, read-only, disabled, and invalid.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Panel name="Input / text states">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Fixture label="Default"><Input defaultValue="Mivama Portal" /></Fixture>
                <Fixture label="Placeholder"><Input placeholder="Search projects..." type="search" /></Fixture>
                <Fixture label="Required"><Input required placeholder="Required value" /></Fixture>
                <Fixture label="Read only"><Input readOnly value="Locked value" /></Fixture>
                <Fixture label="Disabled"><Input disabled value="Unavailable" /></Fixture>
                <Fixture label="Invalid" error="Enter a valid project name."><Input aria-invalid defaultValue="Wrong value" /></Fixture>
              </div>
            </Panel>
            <Panel name="Input / native types">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Fixture label="Email"><Input type="email" placeholder="name@company.com" /></Fixture>
                <Fixture label="Password"><Input type="password" defaultValue="password" /></Fixture>
                <Fixture label="Number"><Input type="number" min={0} max={10} step={1} defaultValue={4} /></Fixture>
                <Fixture label="Date"><Input type="date" /></Fixture>
              </div>
            </Panel>
          </div>
        </Section>

        <Section index="04.2" title="Input Group & Input OTP" description="Combined input containers and accessible one-time password pin code fields.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Panel name="InputGroup / combined">
              <InputGroup className="p-2 gap-2">
                <Input placeholder="Enter discount code..." className="border-0 shadow-none focus-visible:ring-0" />
              </InputGroup>
            </Panel>
            <Panel name="InputOTP / verification code">
              <div className="flex flex-col gap-2">
                <Label>Verification PIN</Label>
                <InputOTP maxLength={6} value={otp} onChange={setOtp} aria-label="Verification PIN">
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </Panel>
          </div>
        </Section>

        <Section index="04.3" title="Textarea" description="Multiline text inputs supporting placeholder, disabled, and invalid error states.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Panel name="Textarea / content">
              <div className="flex flex-col gap-3.5">
                <Fixture label="Placeholder"><Textarea placeholder="Add context for your team..." /></Fixture>
                <Fixture label="Multiline"><Textarea defaultValue={"First line\nSecond line\nThird line"} /></Fixture>
              </div>
            </Panel>
            <Panel name="Textarea / states">
              <div className="flex flex-col gap-3.5">
                <Fixture label="Invalid" error="Add more context before continuing."><Textarea aria-invalid defaultValue="Needs correction" /></Fixture>
                <Fixture label="Disabled"><Textarea disabled value="Unavailable content" /></Fixture>
              </div>
            </Panel>
          </div>
        </Section>

        <Section index="04.4" title="Switch" description="Accessible toggle switches supporting checked, unchecked, and disabled states.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Panel name="Switch / states">
              <div className="flex flex-col gap-3.5">
                <label className="flex items-center gap-2.5 text-xs"><Switch aria-label="Unchecked" /> Unchecked</label>
                <Separator />
                <label className="flex items-center gap-2.5 text-xs"><Switch aria-label="Checked" defaultChecked /> Checked</label>
                <Separator />
                <label className="flex items-center gap-2.5 text-xs"><Switch aria-label="Disabled unchecked" disabled /> Disabled unchecked</label>
                <Separator />
                <label className="flex items-center gap-2.5 text-xs"><Switch aria-label="Disabled checked" disabled defaultChecked /> Disabled checked</label>
              </div>
            </Panel>
          </div>
        </Section>

        <Section index="04.5" title="Checkbox & Radio Group" description="Standard selection controls for multiple and single choice options.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Panel name="Checkbox / multiple choice">
              <div className="flex flex-col gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" defaultChecked />
                  <Label htmlFor="terms">Accept terms and conditions</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="newsletter" />
                  <Label htmlFor="newsletter">Subscribe to release updates</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="disabled-cb" disabled />
                  <Label htmlFor="disabled-cb" className="text-muted-foreground">Disabled option</Label>
                </div>
              </div>
            </Panel>
            <Panel name="RadioGroup / single choice">
              <RadioGroup defaultValue="comfortable">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comfortable" id="r-comfortable" />
                  <Label htmlFor="r-comfortable">Comfortable density</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compact" id="r-compact" />
                  <Label htmlFor="r-compact">Compact density</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="disabled" id="r-disabled" disabled />
                  <Label htmlFor="r-disabled" className="text-muted-foreground">Disabled option</Label>
                </div>
              </RadioGroup>
            </Panel>
          </div>
        </Section>

        <Section index="04.6" title="Field & Native Select" description="Structured form fields with labels, descriptions, and error states.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Panel name="Field / composition">
              <Field>
                <FieldLabel htmlFor="workspace-name">Workspace name</FieldLabel>
                <Input id="workspace-name" defaultValue="Mivama Design" />
                <FieldDescription>Visible to everyone in the workspace.</FieldDescription>
              </Field>
              <Separator className="my-6" />
              <Field>
                <FieldLabel htmlFor="workspace-slug">Workspace slug</FieldLabel>
                <Input id="workspace-slug" aria-invalid defaultValue="mivama design" />
                <FieldError>Use letters, numbers, and hyphens only.</FieldError>
              </Field>
            </Panel>
            <Panel name="NativeSelect + FieldSet">
              <FieldSet>
                <FieldLegend>Environment configuration</FieldLegend>
                <Field>
                  <FieldLabel htmlFor="native-env">Deployment target</FieldLabel>
                  <NativeSelect id="native-env" defaultValue="staging">
                    <option value="development">Development</option>
                    <option value="staging">Staging</option>
                    <option value="production">Production</option>
                  </NativeSelect>
                  <FieldDescription>Native browser select element styled with theme tokens.</FieldDescription>
                </Field>
              </FieldSet>
            </Panel>
          </div>
        </Section>

        <Section index="04.7" title="Select & Combobox" description="Rich dropdown selection and searchable autocompletion.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Panel name="Select / popover dropdown">
              <div className="flex flex-col gap-2">
                <Label>Framework</Label>
                <Select defaultValue="next">
                  <SelectTrigger aria-label="Framework">
                    <SelectValue placeholder="Select framework" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>React Ecosystem</SelectLabel>
                      <SelectItem value="next">Next.js</SelectItem>
                      <SelectItem value="remix">Remix</SelectItem>
                      <SelectItem value="astro">Astro</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </Panel>
            <Panel name="Combobox / searchable select">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium leading-none">Technology stack</span>
                <Combobox
                  options={comboboxOptions}
                  value={selectedCombobox}
                  onValueChange={setSelectedCombobox}
                  placeholder="Select technology..."
                />
              </label>
            </Panel>
          </div>
        </Section>

        <Section index="04.8" title="Slider" description="Range selection input for continuous numeric values.">
          <div className="grid grid-cols-1 gap-4">
            <Panel name="Slider / value range">
              <div className="flex flex-col max-w-md gap-4">
                <div className="flex justify-between text-sm">
                  <Label>Volume level</Label>
                  <span className="font-mono text-muted-foreground">{sliderValue[0]}%</span>
                </div>
                <Slider
                  ref={sliderRef}
                  value={sliderValue}
                  onValueChange={setSliderValue}
                  max={100}
                  step={1}
                />
              </div>
            </Panel>
          </div>
        </Section>
      </div>
    </main>
  );
}
