import fs from "fs";
import zlib from "zlib";
import readline from "readline";
import { Readable } from "stream";
import { finished } from "stream/promises";
import _ from "lodash";

// Function to download a file from a URL and save it locally
async function downloadFile(url, outputPath) {
  try {
    fs.unlinkSync(outputPath);
    const res = await fetch(url);
    const fileStream = fs.createWriteStream(outputPath, { flags: "wx" });
    await finished(Readable.fromWeb(res.body).pipe(fileStream));
  } catch (error) {
    console.error(`Error downloading file: ${error.message}`);
  }
}

async function parseTsvGzFile(filePath) {
  // Initialize an array to hold the results
  const results = [];

  // Create a readable stream and pipe it through gzip decompression
  const fileStream = fs.createReadStream(filePath).pipe(zlib.createGunzip());

  // Use readline to read each line
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  // Track header fields for keys
  let headers = [];

  for await (const line of rl) {
    // Split the line by tab to get each value
    const values = line.split("\t");

    if (!headers.length) {
      // Set headers from the first line
      headers = values;
    } else {
      // Create an object for each line using headers as keys
      const obj = headers.reduce((acc, header, idx) => {
        acc[header] = values[idx] || null;
        return acc;
      }, {});

      // Push the object to the results array
      results.push(obj);
    }
  }

  return results;
}

function getTopMovies(movies, maxMovies = 240) {
  let filtered = movies.filter((movie) => Number(movie.numVotes) > 500000);
  filtered.sort((a, b) => Number(b.averageRating) - Number(a.averageRating));
  return filtered.slice(0, maxMovies);
}

const numMoviesToRetrieve = 240;
const ratingsDatasetFile = "title.ratings.tsv.gz";
const ratingsDatasetUrl = `https://datasets.imdbws.com/${ratingsDatasetFile}`;

if (!fs.existsSync(ratingsDatasetFile)) {
  console.log("Downloading IMDB ratings...");
  await downloadFile(ratingsDatasetUrl, ratingsDatasetFile);
}

console.log("Ratings dataset exists, parsing dataset and sorting movies...");
let movies = await parseTsvGzFile(ratingsDatasetFile);
let topMovies = getTopMovies(movies, numMoviesToRetrieve);

console.log("Fetching movie metadata from OMDB...");
let batchedJobs = _.chunk(topMovies, 10);
let movieDetails = [];
for (let jobs of batchedJobs) {
  let pendingJobs = jobs.map((movie) => {
    return fetch(
      `http://www.omdbapi.com/?i=${movie.tconst}&apikey=${process.env.OMDB_API_KEY}`
    )
      .then((resp) => resp.json())
      .then((json) => json);
  });

  let results = await Promise.allSettled(pendingJobs);
  results.forEach((result) => {
    if (result.status === "fulfilled") {
      movieDetails.push(result.value);
    }
  });
}

console.log("Done fetching movie metadata, writing to reference file...");
const path = "./movies.json";
fs.writeFileSync(path, JSON.stringify(movieDetails, null, 2), "utf8");
console.log("Done fetching movies.");
