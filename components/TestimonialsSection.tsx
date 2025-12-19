"use client";

import Image from "next/image";


import FUITestimonialWithSlide from "@/components/ui/sliding-testimonial";

const testimonials = [
    {
        name: "Safae T",
        description: "Café génial ! On s'amuse à chaque fois ! plein de jeux de sociétés à partager entre Amis ou famille , des playstations à disposition ! Mais the Best Best sont leur cocktails , jus et crêpes . Le service est génial, on se sent comme à la maison en famille 💯",
    },
    {
        name: "Achraf K",
        description: "Expérience au top , l’ambiance est chaleureuse, le personnel est super accueillant et toujours souriant. Les jeux, le concept et la déco créent une atmosphère vraiment agréable pour se détendre entre amis.",
    },
    {
        name: "Raibi",
        description: "Un super endroit pour se détendre et s’amuser ! La salle de jeux propose un large choix, que ce soit pour les amateurs de FIFA sur PS4 ou pour ceux qui préfèrent des jeux de société comme Monopoly.",
    },
    {
        name: "David Azuelos",
        description: "Pixel and Play est bien plus qu'un simple café : c'est une oasis de divertissement et de convivialité. Leur sélection de jeux de société, incluant des classiques comme Monopoly...",
    },
    {
        name: "Insan Sa3id",
        description: "L'atmosphère détendue avec une tasse de café et la promesse d'aventures épiques font de cet endroit un incontournable. La variété des jeux, des classiques aux modernes, offre une expérience pour tous les goûts.",
    },
    {
        name: "Soumaya AZNEG",
        description: "Un excellent endroit pour jouer entre amis. Un café propre avec des prix intéressants. Espace parfait de divertissement pour se défouler .. je recommande vivement ce café",
    },
    {
        name: "Yassine Hosni",
        description: "Je recommande vivement ! L'endroit où s'allie amusement, bonne ambiance et personnel bienveillant. Et surtout, les jeux sont top ! 👏",
    },
    {
        name: "Meeha",
        description: "Un endroit magnifique avec un service exceptionnel de Yassine ….  Je recommande vivement à tout le monde de venir découvrir cet endroit ❤️",
    },
];

export default function TestimonialsSection() {

    return (
        <section id="testimonials" className="relative min-h-screen flex flex-col justify-center py-12 px-6 overflow-hidden bg-zinc-950">
            {/* Fixed Pattern Background - Works on all devices including mobile */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('/BG-pattern.png')] bg-cover bg-center opacity-20" />
            </div>
            
            {/* Gradient overlays and borders - positioned relative to section */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-blue/10 via-zinc-950/50 to-zinc-950" />
            </div>

            <div className="relative z-10">
                <FUITestimonialWithSlide
                    testimonials={testimonials}
                    title="Voices From The Chaos"
                />
            </div>
        </section>
    );
}
