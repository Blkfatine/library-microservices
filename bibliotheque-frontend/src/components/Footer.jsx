export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">Bibliothèque Pro</h3>
                        <p className="text-sm opacity-70">
                            Votre portail vers la connaissance. Découvrez, empruntez et apprenez avec notre collection de milliers d'ouvrages.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Liens Rapides</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/" className="hover:text-primary transition-colors">Accueil</a></li>
                            <li><a href="/catalogue" className="hover:text-primary transition-colors">Catalogue</a></li>
                            <li><a href="/login" className="hover:text-primary transition-colors">Connexion</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Conditions d'utilisation</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Newsletter</h4>
                        <div className="form-control w-full">
                            <div className="input-group">
                                <input type="text" placeholder="Votre email" className="input input-bordered w-full bg-slate-800 border-slate-700 text-white" />
                                <button className="btn btn-primary">S'abonner</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm opacity-50">
                    &copy; {new Date().getFullYear()} Bibliothèque Pro. Tous droits réservés.
                </div>
            </div>
        </footer>
    )
}
