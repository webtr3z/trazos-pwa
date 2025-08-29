"use client";

export function FooterSection() {
  return (
    <footer className="border-t border-white/10 bg-muted/20 backdrop-blur-sm">
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-6 text-foreground">Bazurto</h3>
            <p className="text-muted-foreground leading-relaxed">
              Conectando el mundo físico con el digital a través de blockchain y
              códigos QR inteligentes para un futuro más transparente.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-foreground">Producto</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="hover:text-foreground transition-colors cursor-pointer">
                Características
              </li>
              <li className="hover:text-foreground transition-colors cursor-pointer">
                Precios
              </li>
              <li className="hover:text-foreground transition-colors cursor-pointer">
                Documentación
              </li>
              <li className="hover:text-foreground transition-colors cursor-pointer">
                API
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-foreground">Soporte</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="hover:text-foreground transition-colors cursor-pointer">
                Centro de Ayuda
              </li>
              <li className="hover:text-foreground transition-colors cursor-pointer">
                Contacto
              </li>
              <li className="hover:text-foreground transition-colors cursor-pointer">
                Estado del Sistema
              </li>
              <li className="hover:text-foreground transition-colors cursor-pointer">
                Comunidad
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-foreground">Legal</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="hover:text-foreground transition-colors cursor-pointer">
                Privacidad
              </li>
              <li className="hover:text-foreground transition-colors cursor-pointer">
                Términos de Servicio
              </li>
              <li className="hover:text-foreground transition-colors cursor-pointer">
                Cookies
              </li>
              <li className="hover:text-foreground transition-colors cursor-pointer">
                Licencias
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 mt-12 text-center">
          <p className="text-muted-foreground">
            © 2024 Bazurto. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
