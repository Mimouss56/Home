export default function Bandeau({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="position-absolute top-0 end-0"
      style={{
        width: '80px', // Largeur du bandeau
        height: '80px', // Hauteur du bandeau
        backgroundColor: 'rgba(255, 0, 0, 0.7)', // Couleur de fond du bandeau
        color: 'white', // Couleur du texte
        textAlign: 'center', // Centrer horizontalement le texte
        lineHeight: '80px', // Centrer verticalement le texte
        transform: 'translate(50%, -50%) rotate(45deg)', // Déplacer et faire pivoter
        fontSize: '14px', // Taille du texte, ajustable
      }}
    >
      {children}
    </div>

  );
}
