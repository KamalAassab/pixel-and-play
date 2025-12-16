"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";


type IconName = 'clock' | 'help-circle' | 'gamepad-2' | 'calendar' | 'users'

const iconMap: Record<string, IconName> = {
    '0': 'calendar',
    '1': 'gamepad-2',
    '2': 'help-circle',
    '3': 'users',
    'default': 'help-circle',
}

const iconComponentMap: Record<IconName, keyof typeof Icons> = {
    clock: 'Clock',
    'help-circle': 'HelpCircle',
    'gamepad-2': 'Gamepad2',
    calendar: 'Calendar',
    users: 'Users',
}

function getIcon(iconName: IconName) {
    const IconComponent = Icons[iconComponentMap[iconName] as keyof typeof Icons] as React.ComponentType<{
        className?: string
        size?: number
    }>
    return IconComponent || Icons.HelpCircle
}

export default function FAQSection() {

    const faqItems = [
        {
            q: "Do I need to book in advance?",
            a: "Weekends can get busy! We highly recommend booking via WhatsApp to secure your spot, especially for PS5 and Switch sessions."
        },
        {
            q: "Can I bring my own games?",
            a: "Absolutely! Feel free to bring your own Switch dockable console or board games if you wish. However, we have a large library for you to explore."
        },
        {
            q: "Is there food available?",
            a: "Yes! We serve a variety of sweet and savory crepes, along with premium coffee, shakes, and mocktails. Check our menu section!"
        },
        {
            q: "Do you host private events?",
            a: "Yes, we offer full venue privatization for birthdays and corporate team building. Contact us for custom packages."
        }
    ];

    return (
        <section id="faq" className="relative py-24 overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'url(/FAQ-bg.webp)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
                    backgroundAttachment: 'fixed'
                }}
            >
                <div className="absolute inset-0 bg-zinc-950/85" />
            </div>

            <div className="mx-auto max-w-5xl px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-10 md:flex-row md:gap-16"
                >
                    <div className="md:w-1/3">
                        <div className="sticky top-20 text-center md:text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="mb-6 md:mb-8"
                            >
                                <h2 className="w-fit block mx-auto md:mx-0 text-4xl md:text-5xl font-display font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-red-600">F.A.Q</h2>
                            </motion.div>
                            <p className="text-muted-foreground mt-4 font-display text-lg">
                                Everything you need to know about your visit.
                            </p>
                        </div>
                    </div>
                    <div className="md:w-2/3">
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full space-y-2"
                        >
                            {faqItems.map((faq, index) => {
                                const iconName = iconMap[index.toString()] || iconMap.default
                                const IconComponent = getIcon(iconName)
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <AccordionItem
                                            value={`item-${index}`}
                                            className="bg-background shadow-xs rounded-lg border px-4 last:border-b"
                                        >
                                            <AccordionTrigger className="cursor-pointer items-center py-5 hover:no-underline">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex size-6">
                                                        <IconComponent
                                                            className="m-auto size-4"
                                                        />
                                                    </div>
                                                    <span className="text-base font-display font-medium">{faq.q}</span>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="pb-5">
                                                <div className="px-9">
                                                    <p className="text-base font-display text-muted-foreground">{faq.a}</p>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </motion.div>
                                )
                            })}
                        </Accordion>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
