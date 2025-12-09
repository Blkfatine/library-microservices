import { Link } from 'react-router-dom'

export default function HeroSection() {
    const scrollToCatalogue = () => {
        const element = document.getElementById('catalogue-preview');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-[20s] hover:scale-100"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?q=80&w=1170&auto=format&fit=crop')`
                }}
            />

            {/* Dark Overlay with Blur */}
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
                <h1 className="mb-6 max-w-5xl text-5xl font-extrabold leading-tight tracking-tight md:text-7xl drop-shadow-2xl animate-fade-in-up">
                    Bienvenue dans votre <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 animate-gradient-x">
                        Plateforme de Bibliothèque
                    </span>
                </h1>

                <p className="mb-10 max-w-2xl text-xl font-light text-gray-200 md:text-2xl drop-shadow-md animate-fade-in-up delay-100">
                    Explorez un univers de connaissances. Découvrez des classiques intemporels,
                    empruntez les dernières nouveautés et enrichissez votre esprit.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row animate-fade-in-up delay-200">
                    <button
                        onClick={scrollToCatalogue}
                        className="btn btn-primary btn-lg px-8 text-lg shadow-xl shadow-primary/30 hover:scale-105 transition-transform rounded-full"
                    >
                        Explorez nos livres
                    </button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/70 cursor-pointer" onClick={scrollToCatalogue}>
                <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </div>
    )
}
