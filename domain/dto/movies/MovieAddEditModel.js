class MovieAddEditModel {
  movieId = "";
  movieName = "";
  coverImageUrl = "";
  coverImageAlter = "";
  movieVideoUrl = "";
  description = "";
  summary = "";
  time = "";
  minAge = 0;
  yearOfBuilt = 0;
  imdb = 0;
  hasSubText = false;
  categoryId = "";
  genreId = "";
  musicianId = "";
  authorId = "";
  directorId="";
  constructor({
    movieId = "",
    movieName = "",
    coverImageUrl = "",
    coverImageAlter = "",
    movieVideoUrl = "",
    description = "",
    summary = "",
    time = "",
    minAge = 0,
    yearOfBuilt = 0,
    imdb = 0,
    hasSubText = false,
    categoryId = "",
    genreId = "",
    musicianId = "",
    authorId = "",
    directorId=""
  }) {
    this.movieId = movieId;
    this.movieName = movieName;
    this.coverImageUrl = coverImageUrl;
    this.coverImageAlter = coverImageAlter;
    this.movieVideoUrl = movieVideoUrl;
    this.description = description;
    this.summary = summary;
    this.time = time;
    this.minAge = minAge;
    this.yearOfBuilt = yearOfBuilt;
    this.imdb = imdb;
    this.hasSubText = hasSubText;
    this.categoryId = categoryId;
    this.genreId = genreId;
    this.musicianId = musicianId;
    this.authorId = authorId;
    this.directorId=directorId
  }
}

export default MovieAddEditModel
