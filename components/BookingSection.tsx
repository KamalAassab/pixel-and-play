"use client";

import * as React from "react"; // Added React import
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Clock, User, Users, Phone, MessageSquare, Gamepad2, Sparkles, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronRightIcon, DotFilledIcon, ChevronLeftIcon } from "@radix-ui/react-icons";
import { getLocalTimeZone, today, parseDate, DateValue } from "@internationalized/date";
import {
  CalendarCell as CalendarCellRac,
  CalendarGridBody as CalendarGridBodyRac,
  CalendarGridHeader as CalendarGridHeaderRac,
  CalendarGrid as CalendarGridRac,
  CalendarHeaderCell as CalendarHeaderCellRac,
  Calendar as CalendarRac,
  Heading as HeadingRac,
  Button as ButtonRac,
  composeRenderProps,
} from "react-aria-components";

// --- Inline Dropdown Menu Components ---
// (Already existing, keeping them...)
const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon className="ml-auto text-muted-foreground/80" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-40 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg shadow-black/5 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(
  (
    { className, sideOffset = 4, ...props },
    ref,
  ) => {
    return (
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          ref={ref}
          sideOffset={sideOffset}
          className={cn(
            "z-50 min-w-40 overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-lg shadow-black/5 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className,
          )}
          {...props}
        />
      </DropdownMenuPrimitive.Portal>
    );
  },
);
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 hover:bg-zinc-800",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckIcon className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <DotFilledIcon className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-xs font-medium text-muted-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "-me-1 ms-auto inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70",
        className,
      )}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

// --- Inline Calendar Components (React Aria) ---

const CalendarHeader = () => (
  <header className="flex w-full items-center gap-1 pb-1">
    <ButtonRac
      slot="previous"
      className="flex size-9 items-center justify-center rounded-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:bg-zinc-800 hover:text-white focus:outline-none data-[focus-visible]:outline data-[focus-visible]:outline-2 data-[focus-visible]:outline-ring/70"
    >
      <ChevronLeftIcon className="size-4" strokeWidth={2} />
    </ButtonRac>
    <HeadingRac className="grow text-center text-sm font-medium text-white" />
    <ButtonRac
      slot="next"
      className="flex size-9 items-center justify-center rounded-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:bg-zinc-800 hover:text-white focus:outline-none data-[focus-visible]:outline data-[focus-visible]:outline-2 data-[focus-visible]:outline-ring/70"
    >
      <ChevronRightIcon className="size-4" strokeWidth={2} />
    </ButtonRac>
  </header>
)

const CalendarGridComponent = ({ isRange = false }: { isRange?: boolean }) => {
  const now = today(getLocalTimeZone())

  return (
    <CalendarGridRac>
      <CalendarGridHeaderRac>
        {(day) => (
          <CalendarHeaderCellRac className="size-9 rounded-lg p-0 text-xs font-medium text-muted-foreground/80">
            {day}
          </CalendarHeaderCellRac>
        )}
      </CalendarGridHeaderRac>
      <CalendarGridBodyRac className="[&_td]:px-0">
        {(date) => (
          <CalendarCellRac
            date={date}
            className={cn(
              "relative flex size-9 items-center justify-center whitespace-nowrap rounded-lg border border-transparent p-0 text-sm font-normal text-foreground outline-offset-2 duration-150 [transition-property:color,background-color,border-radius,box-shadow] focus:outline-none data-[disabled]:pointer-events-none data-[unavailable]:pointer-events-none data-[focus-visible]:z-10 data-[hovered]:bg-zinc-800 data-[selected]:bg-blue-600 data-[hovered]:text-white data-[selected]:text-white data-[unavailable]:line-through data-[disabled]:opacity-30 data-[unavailable]:opacity-30 data-[focus-visible]:outline data-[focus-visible]:outline-2 data-[focus-visible]:outline-ring/70 cursor-pointer text-white/80",
              // Today indicator styles
              date.compare(now) === 0 &&
              cn(
                "after:pointer-events-none after:absolute after:bottom-1 after:start-1/2 after:z-10 after:size-[3px] after:-translate-x-1/2 after:rounded-full after:bg-blue-500",
                "data-[selected]:after:bg-white",
              ),
            )}
          />
        )}
      </CalendarGridBodyRac>
    </CalendarGridRac>
  )
}

const Calendar = ({ className, ...props }: React.ComponentProps<typeof CalendarRac>) => {
  return (
    <CalendarRac
      {...props}
      className={composeRenderProps(className, (className) =>
        cn("w-fit bg-zinc-900 border border-white/10 p-3 rounded-lg shadow-xl", className),
      )}
    >
      <CalendarHeader />
      <CalendarGridComponent />
    </CalendarRac>
  )
}


export default function BookingSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    type: "Gaming Session",
    duration: "2 Hours",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all required fields (notes is optional)
    if (!formData.name || !formData.phone || !formData.date || !formData.time || !formData.guests || !formData.type) {
      // Find the first missing field and show an alert
      let missingField = '';
      if (!formData.name) missingField = 'Name';
      else if (!formData.phone) missingField = 'Phone Number';
      else if (!formData.date) missingField = 'Date';
      else if (!formData.time) missingField = 'Time';
      else if (!formData.guests) missingField = 'Number of Guests';
      else if (!formData.type) missingField = 'Activity';

      alert(`Please fill in all required fields. Missing: ${missingField}`);
      return;
    }

    // Format message with exact symbols as requested
    const message = `Hello Pixel & Play Team! ⚄⚂
I would like to book a table. Here are the details:



𝄜 *Date:* ${formData.date}

◴ *Time:* ${formData.time}

𖨆 *Name:* ${formData.name}

☏ *Phone:* ${formData.phone}

𐀪𐀪 *Guests:* ${formData.guests}

♕🃜 *Activity:* ${formData.type}

✎ *Notes:* ${formData.notes || ""}



Looking forward to your confirmation! To clarify any details, feel free to ask. Thank you! ♡`;

    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/212612919613?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  return (
    <section id="book" className="relative w-full overflow-hidden bg-zinc-950 flex flex-col lg:flex-row h-auto lg:h-[85vh]">

      {/* Left Column: Image with Blur Edge (Desktop Only) */}
      <div className="relative hidden lg:block flex-1 min-w-0 h-full overflow-hidden">
        <div className="absolute inset-0 bg-brand-blue/10 z-10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-zinc-950 z-20" />

        {/* Gradient Mask for Blur Effect on Right Border */}
        <div className="absolute inset-0 z-30 pointer-events-none [mask-image:linear-gradient(to_right,black_80%,transparent)]" />

        <img
          src="/BG21.webp"
          alt="Gaming Atmosphere Left"
          className="h-full w-full object-cover"
        />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-20" />
      </div>

      {/* Middle Column: Form */}
      <div className="relative w-full lg:w-[500px] xl:w-[600px] lg:flex-none lg:h-full shrink-0 flex flex-col items-center justify-center p-4 lg:p-8 bg-zinc-950">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full flex flex-col justify-center h-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6 md:mb-8 shrink-0"
          >
            <h2 className="w-fit block mx-auto text-4xl md:text-5xl font-display font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-red-600">
              Secure Your Spot
            </h2>
          </motion.div>

          <div className="w-full bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-5 md:p-8 rounded-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] relative overflow-y-auto lg:overflow-visible scrollbar-hide">
            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">

              <div className="grid grid-cols-2 gap-4">
                {/* Name */}
                <div className="group space-y-1.5">
                  <label className="text-[10px] lg:text-xs font-bold text-zinc-500 uppercase tracking-widest group-focus-within:text-blue-500 transition-colors">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-white/5 rounded-lg pl-9 pr-3 py-2.5 text-white placeholder:text-zinc-700 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 focus:shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)] transition-all text-xs lg:text-sm"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="group space-y-1.5">
                  <label className="text-[10px] lg:text-xs font-bold text-zinc-500 uppercase tracking-widest group-focus-within:text-red-500 transition-colors">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-500 transition-colors" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="06 00 00 00 00"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-white/5 rounded-lg pl-9 pr-3 py-2.5 text-white placeholder:text-zinc-700 focus:outline-none focus:border-red-500/50 focus:bg-red-500/5 focus:shadow-[0_0_20px_-5px_rgba(239,68,68,0.3)] transition-all text-xs lg:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Type */}
                <div className="group space-y-1.5">
                  <label className="text-[10px] lg:text-xs font-bold text-zinc-500 uppercase tracking-widest group-focus-within:text-blue-500 transition-colors">
                    Choose Activity <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Gamepad2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full bg-black/50 border border-white/5 rounded-lg pl-9 pr-3 py-2.5 h-auto text-white justify-start font-normal hover:bg-black/60 hover:text-white focus:border-blue-500/50 focus:bg-blue-500/5 transition-all text-xs lg:text-sm"
                        >
                          {formData.type}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[200px] bg-zinc-900 border-white/10 text-white">
                        {["Gaming Session", "Board Games", "Birthday Party", "Private Event"].map((type) => (
                          <DropdownMenuItem
                            key={type}
                            onClick={() => setFormData({ ...formData, type })}
                            className="focus:bg-zinc-800 focus:text-white cursor-pointer"
                          >
                            {type}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Guests */}
                <div className="group space-y-1.5">
                  <label className="text-[10px] lg:text-xs font-bold text-zinc-500 uppercase tracking-widest group-focus-within:text-red-500 transition-colors">
                    How many people <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Users size={14} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-zinc-500 group-focus-within:text-red-500 transition-colors" />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full bg-black/50 border border-white/5 rounded-lg pl-9 pr-3 py-2.5 h-auto text-white justify-start font-normal hover:bg-black/60 hover:text-white focus:border-red-500/50 focus:bg-red-500/5 transition-all text-xs lg:text-sm"
                        >
                          {formData.guests} {parseInt(formData.guests) === 1 ? 'Person' : 'People'}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[200px] bg-zinc-900 border-white/10 text-white max-h-[300px] overflow-y-auto">
                        {[1, 2, 3, 4, 5, 6, 7, 8, "9+"].map(n => (
                          <DropdownMenuItem
                            key={n}
                            onClick={() => setFormData({ ...formData, guests: n.toString() })}
                            className="focus:bg-zinc-800 focus:text-white cursor-pointer"
                          >
                            {n} {n === 1 ? 'Person' : 'People'}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Date */}
                <div className="group space-y-1.5">
                  <label className="text-[10px] lg:text-xs font-bold text-zinc-500 uppercase tracking-widest group-focus-within:text-blue-500 transition-colors">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <CalendarIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full bg-black/50 border border-white/5 rounded-lg pl-9 pr-3 py-2.5 h-auto text-white justify-start font-normal hover:bg-black/60 hover:text-white focus:border-blue-500/50 focus:bg-blue-500/5 transition-all text-xs lg:text-sm"
                        >
                          {formData.date || "Select Date"}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-auto p-0 bg-transparent border-none shadow-none">
                        <Calendar
                          aria-label="Appointment date"
                          className="bg-zinc-900 border border-white/10 rounded-lg p-3 shadow-xl text-white"
                          value={formData.date ? parseDate(formData.date) : null}
                          onChange={(date: DateValue) => setFormData({ ...formData, date: date.toString() })}
                          minValue={today(getLocalTimeZone())}
                        />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Time (Restricted 2PM - 12AM) */}
                <div className="group space-y-1.5">
                  <label className="text-[10px] lg:text-xs font-bold text-zinc-500 uppercase tracking-widest group-focus-within:text-red-500 transition-colors">
                    Time (14:00 - 00:00) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-zinc-500 group-focus-within:text-red-500 transition-colors" />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full bg-black/50 border border-white/5 rounded-lg pl-9 pr-3 py-2.5 h-auto text-white justify-start font-normal hover:bg-black/60 hover:text-white focus:border-red-500/50 focus:bg-red-500/5 transition-all text-xs lg:text-sm"
                        >
                          {formData.time || "Select Time"}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[200px] bg-zinc-900 border-white/10 text-white max-h-[300px] overflow-y-auto">
                        {[...Array(21)].map((_, i) => {
                          const totalMinutes = 14 * 60 + i * 30; // Start at 14:00, add 30 mins
                          const hour = Math.floor(totalMinutes / 60) % 24;
                          const minute = totalMinutes % 60;
                          const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                          return (
                            <DropdownMenuItem
                              key={timeString}
                              onClick={() => setFormData({ ...formData, time: timeString })}
                              className="focus:bg-zinc-800 focus:text-white cursor-pointer"
                            >
                              {timeString}
                            </DropdownMenuItem>
                          );
                        })}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="group space-y-1.5">
                <label className="text-[10px] lg:text-xs font-bold text-zinc-500 uppercase tracking-widest group-focus-within:text-blue-500 transition-colors">
                  Special Requests
                </label>
                <div className="relative">
                  <MessageSquare size={14} className="absolute left-3 top-3 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
                  <textarea
                    name="notes"
                    rows={2}
                    placeholder="Specific games, allergies, birthday wishes..."
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/5 rounded-lg pl-9 pr-3 py-2.5 text-white placeholder:text-zinc-700 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 focus:shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)] transition-all resize-none text-xs lg:text-sm"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.5)] shadow-[0_0_20px_-10px_rgba(168,85,247,0.3)]"
                >
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center justify-center gap-3">
                    <span className="font-display font-bold text-white tracking-widest uppercase text-sm">Confirm Booking</span>
                    <Send size={18} className="text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </div>
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Right Column: Image with Blur Edge (Desktop Only for Layout Balance) */}
      <div className="relative hidden lg:block flex-1 min-w-0 h-full overflow-hidden">
        <div className="absolute inset-0 bg-brand-purple/10 z-10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-zinc-950 z-20" />

        {/* Gradient Mask for Blur Effect on Left Border */}
        <div className="absolute inset-0 z-30 pointer-events-none [mask-image:linear-gradient(to_left,black_80%,transparent)]" />

        <img
          src="/BG38.webp"
          alt="Gaming Atmosphere Right"
          className="h-full w-full object-cover"
        />
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-20" />
      </div>
    </section>
  );
}
