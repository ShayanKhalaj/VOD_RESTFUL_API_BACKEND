import TahlildadehVODDbContext from "../../../domain/context/TahlildadehVODDbContext.js";

const db = new TahlildadehVODDbContext()

const getAll=async(req,res)=>{
    const categories = await db.categories.find({})
    return res.json(categories).status(200)
}

const getCategoryMovies = async(req,res)=>{
    const movies = await db.movies.aggregate([
        {
            $match:{categoryId:req.params.categoryId}
        }
        ,{
            $lookup:{
                from:'categoreis',
                localField:'categoryId',
                foreignField:'categoryId',
                as:'movies',
            }
        }
    ])
    return res.json(movies).status(200);
}


export const CategoryController = {getAll,getCategoryMovies}