import { Link } from "react-router-dom";
import FilmeCard from "../ui/FilmeCard.jsx";
import SkeletonCard from "../ui/SkeletonCard.jsx";

export default function FilmeSection({
  titulo,
  filmes = [],
  loading = false,
  verTodosLink,
  onFavoritar,
  favoritosIds = [],
  cardSize = "md",
}) {
  if (!loading && filmes.length === 0) return null;

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{titulo}</h2>
          {verTodosLink && (
            <Link
              to={verTodosLink}
              style={{ fontSize: "0.85rem", color: "var(--accent)", fontWeight: 500 }}
            >
              Ver todos →
            </Link>
          )}
        </div>

        <div className="scroll-strip">
          {loading ? (
            <SkeletonCard count={6} />
          ) : (
            filmes.map((filme) => (
              <FilmeCard
                key={filme.id}
                filme={filme}
                size={cardSize}
                onFavoritar={onFavoritar}
                isFavorito={favoritosIds.includes(filme.id)}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
