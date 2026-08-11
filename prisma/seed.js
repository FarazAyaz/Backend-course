import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const creatorId = "9c4fe0d3-bc41-4f4e-8093-d0d62af81220";

const movies = [
  {
    title: "The Matrix",
    overview:
      "A computer hacker discovers that reality is actually a simulated world controlled by intelligent machines.",
    releaseYear: 1999,
    genres: ["Action", "Sci-Fi"],
    runtime: 136,
    posterUrl: "https://example.com/matrix.jpg",
    createdBy: creatorId,
  },
  {
    title: "Inception",
    overview:
      "A skilled thief enters people's dreams to steal secrets and is given a dangerous mission involving a mysterious idea.",
    releaseYear: 2010,
    genres: ["Action", "Sci-Fi", "Thriller"],
    runtime: 148,
    posterUrl: "https://example.com/inception.jpg",
    createdBy: creatorId,
  },
  {
    title: "Interstellar",
    overview:
      "A group of astronauts travels through a mysterious wormhole in search of a new home for humanity.",
    releaseYear: 2014,
    genres: ["Adventure", "Drama", "Sci-Fi"],
    runtime: 169,
    posterUrl: "https://example.com/interstellar.jpg",
    createdBy: creatorId,
  },
  {
    title: "The Dark Knight",
    overview:
      "Batman faces a dangerous criminal mastermind who brings chaos and fear to Gotham City.",
    releaseYear: 2008,
    genres: ["Action", "Crime", "Drama"],
    runtime: 152,
    posterUrl: "https://example.com/dark-knight.jpg",
    createdBy: creatorId,
  },
  {
    title: "Avengers: Endgame",
    overview:
      "The surviving Avengers attempt to reverse the devastating events caused by Thanos and save the universe.",
    releaseYear: 2019,
    genres: ["Action", "Adventure", "Sci-Fi"],
    runtime: 181,
    posterUrl: "https://example.com/endgame.jpg",
    createdBy: creatorId,
  },
  {
    title: "Joker",
    overview:
      "A struggling comedian's life takes a dark turn as he becomes a symbol of chaos and rebellion.",
    releaseYear: 2019,
    genres: ["Crime", "Drama", "Thriller"],
    runtime: 122,
    posterUrl: "https://example.com/joker.jpg",
    createdBy: creatorId,
  },
  {
    title: "Titanic",
    overview:
      "Two young people from different social backgrounds fall in love aboard the ill-fated Titanic.",
    releaseYear: 1997,
    genres: ["Drama", "Romance"],
    runtime: 195,
    posterUrl: "https://example.com/titanic.jpg",
    createdBy: creatorId,
  },
  {
    title: "Gladiator",
    overview:
      "A betrayed Roman general fights his way through the gladiatorial arena seeking revenge against the emperor who destroyed his family.",
    releaseYear: 2000,
    genres: ["Action", "Drama", "Adventure"],
    runtime: 155,
    posterUrl: "https://example.com/gladiator.jpg",
    createdBy: creatorId,
  },
  {
    title: "The Shawshank Redemption",
    overview:
      "A banker sentenced to life in prison forms an unexpected friendship while secretly planning his escape.",
    releaseYear: 1994,
    genres: ["Drama"],
    runtime: 142,
    posterUrl: "https://example.com/shawshank.jpg",
    createdBy: creatorId,
  },
  {
    title: "Spider-Man: No Way Home",
    overview:
      "Spider-Man's secret identity is revealed, forcing him to seek help from a powerful sorcerer with unexpected consequences.",
    releaseYear: 2021,
    genres: ["Action", "Adventure", "Sci-Fi"],
    runtime: 148,
    posterUrl: "https://example.com/spiderman.jpg",
    createdBy: creatorId,
  },
  {
    title: "The Lord of the Rings",
    overview:
      "A young hobbit begins a dangerous journey to destroy a powerful ring before it falls into the hands of evil.",
    releaseYear: 2001,
    genres: ["Adventure", "Fantasy", "Drama"],
    runtime: 178,
    posterUrl: "https://example.com/lotr.jpg",
    createdBy: creatorId,
  },
  {
    title: "Parasite",
    overview:
      "A struggling family slowly becomes involved with a wealthy household, leading to unexpected and dangerous consequences.",
    releaseYear: 2019,
    genres: ["Drama", "Thriller"],
    runtime: 132,
    posterUrl: "https://example.com/parasite.jpg",
    createdBy: creatorId,
  },
  {
    title: "Dune",
    overview:
      "A young nobleman must travel to a dangerous desert planet and confront forces competing for control of its valuable resources.",
    releaseYear: 2021,
    genres: ["Adventure", "Drama", "Sci-Fi"],
    runtime: 155,
    posterUrl: "https://example.com/dune.jpg",
    createdBy: creatorId,
  },
  {
    title: "John Wick",
    overview:
      "A retired assassin returns to his violent past after a group of criminals takes away the last reminder of his beloved wife.",
    releaseYear: 2014,
    genres: ["Action", "Crime", "Thriller"],
    runtime: 101,
    posterUrl: "https://example.com/john-wick.jpg",
    createdBy: creatorId,
  },
  {
    title: "Toy Story",
    overview:
      "A group of toys comes to life when humans are not around, but their friendship is tested when a new toy arrives.",
    releaseYear: 1995,
    genres: ["Animation", "Adventure", "Comedy"],
    runtime: 81,
    posterUrl: "https://example.com/toy-story.jpg",
    createdBy: creatorId,
  },
];

const main = async () => {
  console.log("Seeding movies...");

  for (const movie of movies) {
    await prisma.movie.create({
      data: movie,
    });

    console.log(`Created movie: ${movie.title}`);
  }

  console.log("Seeding completed");
};

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });