export function classificacaoBadgeClass(classificacao) {
  const c = String(classificacao ?? "L").replace("+", "").trim().toUpperCase();
  if (c === "L" || c === "LIVRE") return "badge-livre";
  if (c === "10" || c === "12") return "badge-10";
  if (c === "14" || c === "16") return "badge-14";
  if (c === "18") return "badge-18";
  return "";
}

export function classificacaoLabel(classificacao) {
  const c = String(classificacao ?? "L").replace("+", "").trim().toUpperCase();
  if (c === "L" || c === "LIVRE") return "Livre";
  return `+${c}`;
}

export function imgFallback(e) {
  e.target.onerror = null;
  e.target.src = "/logo/cinelogplay.png";
}

export function truncate(str, max = 120) {
  if (!str || str.length <= max) return str ?? "";
  return str.slice(0, max).trimEnd() + "…";
}

export function genresFrom(filmes) {
  const set = new Set();
  filmes.forEach((f) => {
    if (f.genero) {
      f.genero.split(/[,/]/).forEach((g) => set.add(g.trim()));
    }
  });
  return [...set].sort();
}

export function avatarInitials(nome) {
  if (!nome) return "?";
  const parts = nome.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
