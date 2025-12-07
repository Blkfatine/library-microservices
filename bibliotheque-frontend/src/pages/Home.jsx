export default function Home() {
    return (
        <div className="hero min-h-screen bg-gradient-to-br from-primary to-secondary">
            <div className="hero-content text-center text-white">
                <div className="max-w-4xl">
                    <h1 className="text-6xl font-bold mb-8">
                        Bienvenue à la Bibliothèque Pro
                    </h1>
                    <p className="text-2xl mb-12">
                        Découvrez des milliers de livres, empruntez en un clic, suivez vos lectures.
                    </p>
                    <div className="space-x-6">
                        <a href="/catalogue" className="btn btn-lg btn-accent">
                            Voir le catalogue
                        </a>
                        <a href="/register" className="btn btn-lg btn-ghost border-white text-white hover:bg-white hover:text-primary">
                            Créer un compte gratuit
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}