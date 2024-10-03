import TahlildadehVODDbContext from "../../../domain/context/TahlildadehVODDbContext.js";

const db = new TahlildadehVODDbContext();

class HomeController {
  index = async (req, res) => {
    const movies = await db.movies.aggregate([
      {
        $lookup: {
          from: "actormovies",
          localField: "movieId",
          foreignField: "movieId",
          as: "actorMovies",
          pipeline: [
            {
              $lookup: {
                from: "actors",
                localField: "actorId",
                foreignField: "actorId",
                as: "actors",
              },
            },
          ],
        },
      },
    ]);
    
    const boxes = await db.boxes.aggregate([
        {
          $lookup: {
            from: "boxmovies",
            localField: "boxId",
            foreignField: "boxId",
            as: "boxMovies",
            pipeline: [
              {
                $lookup: {
                  from: "movies",
                  localField: "movieId",
                  foreignField: "movieId",
                  as: "movies",
                },
              },
            ],
          },
        },
      ]);


    return res.json({movies,boxes}).status(200);
  };



}

export default HomeController;
