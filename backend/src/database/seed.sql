-- ============================================
-- CINELOGPLAY DATABASE SEED DATA
-- Version: 1.0.0
-- Created: 2026-05-10
-- ============================================

-- ============================================
-- INSERT DIRECTORS (DIRETORES)
-- ============================================
INSERT INTO diretores (nome, nacionalidade, data_nascimento, biografia, principais_obras, foto, ativo) VALUES
('Christopher Nolan', 'Britânico-Americano', '1970-07-30',
  'Christopher Jonathan Nolan é um renomado diretor de cinema britânico-americano, conhecido por suas narrativas complexas e uso inovador de câmeras IMAX.',
  'The Dark Knight Trilogy, Inception, Interstellar, Dunkirk, Oppenheimer',
  'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=400&fit=crop',
  true),

('Steven Spielberg', 'Americano', '1946-12-18',
  'Steven Allan Spielberg é um dos diretores mais influentes da história do cinema, pioneiro em técnicas inovadoras e storytelling épico.',
  'Jaws, E.T., Jurassic Park, Schindler''s List, War Horse',
  'https://images.unsplash.com/photo-1489599849228-ed4dc59ee56f?w=400&h=400&fit=crop',
  true),

('Martin Scorsese', 'Americano', '1942-11-17',
  'Martin Scorsese é um diretor lendário conhecido por seus filmes de crime e dramas psicológicos com cinematografia excepcional.',
  'Taxi Driver, Raging Bull, The Wolf of Wall Street, The Irishman, Killers of the Flower Moon',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  true),

('Denis Villeneuve', 'Canadense', '1967-10-03',
  'Denis Villeneuve é um diretor canadense aclamado por sua cinematografia visual deslumbrante e narrativas épicas.',
  'Arrival, Blade Runner 2049, Dune, Dune: Part Two, Sicario',
  'https://images.unsplash.com/photo-1507531173827-c2b6e4d379b6?w=400&h=400&fit=crop',
  true),

('Quentin Tarantino', 'Americano', '1963-03-27',
  'Quentin Tarantino é um diretor e roteirista americano reconhecido por seu estilo único, diálogos memoráveis e estruturas narrativas inovadoras.',
  'Pulp Fiction, Kill Bill, Inglourious Basterds, Django Unchained, Once Upon a Time in Hollywood',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop',
  true),

('Greta Gerwig', 'Americano', '1983-08-04',
  'Greta Gerwig é uma diretora e roteirista americana conhecida por seus filmes feministas e personagens complexos.',
  'Lady Bird, Little Women, Barbie, Nights and Weekends',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  true);

-- ============================================
-- INSERT FILMS (FILMES)
-- ============================================
INSERT INTO filmes (titulo, descricao_curta, sinopse, ano, genero, duracao, classificacao, imagem, trailer_youtube, diretor_id, atores, tipo, ativo) VALUES

('Oppenheimer', 'A história do criador da bomba atômica',
  'Oppenheimer segue J. Robert Oppenheimer, físico teórico que presidiu o Projeto Manhattan durante a Segunda Guerra Mundial. O filme explora sua vida, ambições, conflitos morais e o impacto duradouro da criação da primeira arma nuclear.',
  2023, 'Drama/Thriller', '180 min', '14', 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop',
  'https://www.youtube.com/embed/uYPbbksJxME', 1, ARRAY['Cillian Murphy', 'Robert Downey Jr.', 'Emily Blunt'], 'filme', true),

('Inception', 'Uma série de roubos que ocorrem dentro de sonhos compartilhados',
  'Dom Cobb é um ladrão que se especializa em roubar segredos corporativos a partir da mente das pessoas enquanto elas dormem. Oferecido a possibilidade de ter seu histórico criminoso apagado, ele é chamado para fazer o impossível: "inception" - implantar uma ideia na mente de alguém em vez de roubá-la.',
  2010, 'Ficção Científica/Thriller', '148 min', '12', 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop',
  'https://www.youtube.com/embed/YoHD_XwrzKw', 1, ARRAY['Leonardo DiCaprio', 'Marion Cotillard', 'Elliot Page'], 'filme', true),

('Interstellar', 'Uma jornada épica através do espaço para salvar a humanidade',
  'Em um futuro distante, a Terra se torna inabitável. Um grupo de astronautas viaja através de um buraco de minhoca próximo a Saturno em uma tentativa desesperada de encontrar um novo lar para a humanidade. Coop, um ex-piloto de testes, lidera a missão enquanto luta para se reunir com sua filha.',
  2014, 'Ficção Científica/Drama', '169 min', '12', 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop',
  'https://www.youtube.com/embed/zSID6AWsSLE', 1, ARRAY['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'], 'filme', true),

('Jaws', 'Um grande tubarão branco aterroriza uma pequena cidade litorânea',
  'Após uma série de ataques mortais de tubarão em uma cidade costeira de Nova Jersey, o xerife Martin Brody se vê forçado a enfrentar seus medos e partir para o mar com um caçador de tubarões profissional e um oceanógrafo para matar a fera antes que mais pessoas sejam mortas.',
  1975, 'Thriller/Suspense', '124 min', '12', 'https://images.unsplash.com/photo-1489599849228-ed4dc59ee56f?w=400&h=600&fit=crop',
  'https://www.youtube.com/embed/gF7qAKAqEIw', 2, ARRAY['Roy Scheider', 'Richard Dreyfuss', 'Robert Shaw'], 'filme', true),

('Jurassic Park', 'Dinossauros extintos retornam em um parque temático futurista',
  'Um magnata oferece um casal de paleontólogos e um matemático uma chance de ver seu parque temático repleto de dinossauros clonados. Tudo parece maravilhoso até que os sistemas de segurança falham, liberando os predadores extintos.',
  1993, 'Ficção Científica/Ação', '127 min', '12', 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop',
  'https://www.youtube.com/embed/QWBKEmWravelA', 2, ARRAY['Sam Neill', 'Laura Dern', 'Jeff Goldblum'], 'filme', true),

('Taxi Driver', 'Um motorista de táxi em busca de redenção nas ruas de Nova York',
  'Travis Bickle, um motorista de táxi noturno solitário em Nova York, trabalha em turnos cada vez mais longas enquanto lida com insônia. Ele se torna cada vez mais desgostado com o que ele vê ao redor dele, e começa uma jornada de redenção.',
  1976, 'Drama/Thriller', '114 min', '16', 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&h=600&fit=crop',
  'https://www.youtube.com/embed/dH4MzLJoWt0', 3, ARRAY['Robert DeNiro', 'Jodie Foster', 'Albert Brooks'], 'filme', true),

('The Wolf of Wall Street', 'A história de ascensão e queda de um especulador de Wall Street',
  'Baseado na história real de Jordan Belfort, este filme conta a trajetória de um pequeno investidor que, através de fraude e manipulação, constrói um império financeiro ilegal, apenas para ter tudo desmoronar quando o FBI fecha cerco.',
  2013, 'Drama/Comédia', '180 min', '16', 'https://images.unsplash.com/photo-1477614712202-d85eb50061a1?w=400&h=600&fit=crop',
  'https://www.youtube.com/embed/iszwuX1AzGE', 3, ARRAY['Leonardo DiCaprio', 'Jonah Hill', 'Margot Robbie'], 'filme', true),

('Arrival', 'Um linguista tenta se comunicar com alienígenas para evitar uma guerra global',
  'Quando naves alienígenas pousam em 12 locais diferentes ao redor do mundo, uma linguista brilhante é recrutada pelo exército para tentar se comunicar com os extraterrestres. O que ela descobre pode mudar tudo o que sabemos sobre linguagem, tempo e humanidade.',
  2016, 'Ficção Científica/Drama', '116 min', '12', 'https://images.unsplash.com/photo-1517604931442-7e0c6ed089c0?w=400&h=600&fit=crop',
  'https://www.youtube.com/embed/tFMo3UJ4B4g', 4, ARRAY['Amy Adams', 'Jeremy Renner', 'Forest Whitaker'], 'filme', true),

('Blade Runner 2049', 'Um nova polícia em um futuro distópico em busca de um segredo perdido',
  'Trinta anos após os eventos do primeiro Blade Runner, um novo polícia descobre um segredo perdido há muito tempo que o coloca no caminho de Rick Deckard, um antigo Blade Runner desaparecido há décadas.',
  2017, 'Ficção Científica/Thriller', '164 min', '12', 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=600&fit=crop',
  'https://www.youtube.com/embed/gCcx85zbxz4', 4, ARRAY['Ryan Gosling', 'Harrison Ford', 'Ana de Armas'], 'filme', true),

('Dune', 'Uma épica adaptação do clássico romance de ficção científica',
  'Paulo Atreides, herdeiro de uma nobre família, é enviado para o planeta desértico Arrakis para assegurar o controle de um recurso raro e precioso. Quando forças sinistras o conspiram contra ele, Paulo deve aprender a controlar poderes extraordinários que desconhecia possuir.',
  2021, 'Ficção Científica/Aventura', '155 min', '12', 'https://images.unsplash.com/photo-1489599849228-ed4dc59ee56f?w=400&h=600&fit=crop',
  'https://www.youtube.com/embed/n9xhJrCXIsU', 4, ARRAY['Timothée Chalamet', 'Zendaya', 'Oscar Isaac'], 'filme', true),

('Pulp Fiction', 'Histórias entrelaçadas de criminosos, atores e gangsteres em Los Angeles',
  'Um colagem de histórias de vida criminosa em Los Angeles, envolvendo assassinos contratados, apostadores, gângsteres e suas esposas, todos conectados de maneira surpreendente. O filme é uma celebração de diálogos memoráveis e violência estilizada.',
  1994, 'Crime/Drama', '154 min', '16', 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop',
  'https://www.youtube.com/embed/s7EdQ4FqC7s', 5, ARRAY['John Travolta', 'Samuel L. Jackson', 'Uma Thurman'], 'filme', true),

('Kill Bill Volume One', 'Uma assassina desperta de coma e busca vingança contra seus algozes',
  'A noiva, uma assassina profissional, desperta de um coma de quatro anos para descobrir que seu bebê foi roubado e seu noivo foi morto. Ela embarca em uma jornada de vingança contra todos aqueles que a traíram, começando com o assassinato de seus companheiros assassinos.',
  2003, 'Ação/Thriller', '111 min', '16', 'https://images.unsplash.com/photo-1489599849228-ed4dc59ee56f?w=400&h=600&fit=crop',
  'https://www.youtube.com/embed/qqXQO69Nd3g', 5, ARRAY['Uma Thurman', 'Lucy Liu', 'Vivica A. Fox'], 'filme', true),

('Django Unchained', 'Um escravo liberto se torna um caçador de recompensas em busca de sua esposa',
  'Django Freeman, um escravo liberto, junta-se a um caçador de recompensas para rastrear e resgatar sua esposa de uma plantação de algodão do Mississipi no século XIX. Uma aventura sangrenta e dramática através do antigo Sul americano.',
  2012, 'Drama/Ação', '165 min', '16', 'https://images.unsplash.com/photo-1489599849228-ed4dc59ee56f?w=400&h=600&fit=crop',
  'https://www.youtube.com/embed/eUdM9AEwFqU', 5, ARRAY['Jamie Foxx', 'Christoph Waltz', 'Leonardo DiCaprio'], 'filme', true),

('Lady Bird', 'Uma mãe e filha navegam a vida, o amor e a identidade em Sacramento',
  'Christine "Lady Bird" McPherson, uma aluna do último ano em uma escola católica em Sacramento, sonha em sair da Califórnia para estudar em uma universidade da costa leste. Conforme ela cresce, sua relação volátil com sua mãe é testada enquanto ela enfrenta amizade, romance e questões de identidade.',
  2017, 'Drama/Comédia', '94 min', '14', 'https://images.unsplash.com/photo-1489599849228-ed4dc59ee56f?w=400&h=600&fit=crop',
  'https://www.youtube.com/embed/rJI5A5Uz-kE', 6, ARRAY['Saoirse Ronan', 'Laurie Metcalf', 'Tracy Letts'], 'filme', true),

('Little Women', 'A jornada de quatro irmãs enquanto crescem e perseguem seus sonhos',
  'No final da Guerra Civil Americana, Jo March vive com suas três irmãs, Meg, Beth e Amy, após seu pai se envolver na guerra. Enquanto elas navegam a adolescência e o pensionato, cada uma trilha seu próprio caminho em busca de sentido, amor e realização profissional.',
  2019, 'Drama/Romance', '135 min', '12', 'https://images.unsplash.com/photo-1489599849228-ed4dc59ee56f?w=400&h=600&fit=crop',
  'https://www.youtube.com/embed/PL-Yd-jGWYs', 6, ARRAY['Saoirse Ronan', 'Florence Pugh', 'Emma Watson'], 'filme', true),

('Barbie', 'Barbie embarca em uma aventura no mundo real para descobrir quem ela realmente é',
  'Barbie e Ken escapam de Barbie Land para explorar o mundo real de Los Angeles. Enquanto Barbie tenta descobrir seu propósito e encontra feminismo, Ken descobre o patriarcado. Uma jornada colorida e hilariante de auto-descoberta.',
  2023, 'Comédia/Fantasia', '114 min', '12', 'https://images.unsplash.com/photo-1489599849228-ed4dc59ee56f?w=400&h=600&fit=crop',
  'https://www.youtube.com/embed/FRzsKX_9B3c', 6, ARRAY['Margot Robbie', 'Ryan Gosling', 'Will Ferrell'], 'filme', true);

-- ============================================
-- Verify data insertion
-- ============================================
-- Uncomment to verify:
-- SELECT COUNT(*) as total_diretores FROM diretores;
-- SELECT COUNT(*) as total_filmes FROM filmes;
-- SELECT f.titulo, d.nome as diretor FROM filmes f LEFT JOIN diretores d ON f.diretor_id = d.id ORDER BY f.titulo;
