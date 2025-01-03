
import { useEffect, useState } from "react";

  

  export function FeaturesSection() {
    const movies = {
      data: {
        streamingTitles: [
          {

            "id": "tt1190634",
            "titleText": {
                "text": "The Boys"
            },
            "titleType": {
                "id": "tvSeries",
                "text": "TV Series",
                "canHaveEpisodes": true,
                "displayableProperty": {
                    "value": {
                        "plainText": "TV Series"
                    }
                }
            },
            "originalTitleText": {
                "text": "The Boys"
            },
            "primaryImage": {
                "id": "rm4040589057",
                "width": 1080,
                "height": 1350,
                "url": "https://m.media-amazon.com/images/M/MV5BYTY2ZjYyNGUtZGVkZS00MDNhLWIwMjMtZDk4MmQ5ZWI0NTY4XkEyXkFqcGdeQXVyMTY3MDE5MDY1._V1_.jpg",
                "caption": {
                    "plainText": [
                        "Laz Alonso",
                        " Jeffrey Dean Morgan",
                         "Karl Urban",
                          "Antony Starr",
                         " Erin Moriarty",
                         " Jack Quaid",
                         " Tomer Capone",
                         " Karen Fukuhara"]
                }
            },
            "releaseYear": {
                "year": 2019,
                "endYear": null
            },
            "ratingsSummary": {
                "aggregateRating": 8.7,
                "voteCount": 696034
            },
            "runtime": {
                "seconds": 3600
            },
            "certificate": {
                "rating": "TV-MA"
            },
            "canRate": {
                "isRatable": true
            },
            "titleGenres": {
                "genres": [
                    {
                        "genre": {
                            "text": "Action"
                        }
                    },
                    {
                        "genre": {
                            "text": "Comedy"
                        }
                    },
                    {
                        "genre": {
                            "text": "Crime"
                        }
                    }
                ]
            },
            "canHaveEpisodes": true,
            "latestTrailer": {
                "id": "vi53855769"
            }
        }
,{

            "id": "tt10569934",
            "titleText": {
                "text": "Those About to Die"
            },
            "titleType": {
                "id": "tvSeries",
                "text": "TV Series",
                "canHaveEpisodes": true,
                "displayableProperty": {
                    "value": {
                        "plainText": "TV Series"
                    }
                }
            },
            "originalTitleText": {
                "text": "Those About to Die"
            },
            "primaryImage": {
                "id": "rm1237872897",
                "width": 2025,
                "height": 3000,
                "url": "https://m.media-amazon.com/images/M/MV5BZGMzZjlhNGMtMDg4OC00MzFlLTljODQtNjI0NTNkMDk2NTIwXkEyXkFqcGc@._V1_.jpg",
                "caption": {
                    "plainText": ["Anthony Hopkins"," Sara Martins"," Rupert Penry-Jones","Tom Hughes "," Iwan Rheon "]
                }
            },
            "releaseYear": {
                "year": 2024,
                "endYear": null
            },
            "ratingsSummary": {
                "aggregateRating": 6.3,
                "voteCount": 3361
            },
            "runtime": null,
            "certificate": {
                "rating": "TV-MA"
            },
            "canRate": {
                "isRatable": true
            },
            "titleGenres": {
                "genres": [
                    {
                        "genre": {
                            "text": "Action"
                        }
                    },
                    {
                        "genre": {
                            "text": "Comedy"
                        }
                    },
                    {
                        "genre": {
                            "text": "Drama"
                        }
                    }
                ]
            },
            "canHaveEpisodes": true,
            "latestTrailer": {
                "id": "vi437831193"
            }
        }
,{
            "id": "tt11379456",
            "titleText": {
                "text": "My Lady Jane"
            },
            "titleType": {
                "id": "tvSeries",
                "text": "TV Series",
                "canHaveEpisodes": true,
                "displayableProperty": {
                    "value": {
                        "plainText": "TV Series"
                    }
                }
            },
            "originalTitleText": {
                "text": "My Lady Jane"
            },
            "primaryImage": {
                "id": "rm2872276481",
                "width": 2000,
                "height": 3000,
                "url": "https://m.media-amazon.com/images/M/MV5BNmEwYjQ5MWMtZDdiOC00NTk1LWEwOWEtYjQ2NDUxNjk2YWU5XkEyXkFqcGc@._V1_.jpg",
                "caption": {
                    "plainText":[ "My Lady Jane (2024)"]
                }
            },
            "releaseYear": {
                "year": 2024,
                "endYear": null
            },
            "ratingsSummary": {
                "aggregateRating": 7.4,
                "voteCount": 8776
            },
            "runtime": {
                "seconds": 3000
            },
            "certificate": null,
            "canRate": {
                "isRatable": true
            },
            "titleGenres": {
                "genres": [
                    {
                        "genre": {
                            "text": "Comedy"
                        }
                    },
                    {
                        "genre": {
                            "text": "Fantasy"
                        }
                    },
                    {
                        "genre": {
                            "text": "History"
                        }
                    }
                ]
            },
            "canHaveEpisodes": true,
            "latestTrailer": {
                "id": "vi1153484313"
            }
        }
, {
            "id": "tt0773262",
            "titleText": {
                "text": "Dexter"
            },
            "titleType": {
                "id": "tvSeries",
                "text": "TV Series",
                "canHaveEpisodes": true,
                "displayableProperty": {
                    "value": {
                        "plainText": "TV Series"
                    }
                }
            },
            "originalTitleText": {
                "text": "Dexter"
            },
            "primaryImage": {
                "id": "rm2891311105",
                "width": 2400,
                "height": 3263,
                "url": "https://m.media-amazon.com/images/M/MV5BZjkzMmU5MjMtODllZS00OTA5LTk2ZTEtNjdhYjZhMDA5ZTRhXkEyXkFqcGdeQXVyOTA3MTMyOTk@._V1_.jpg",
                "caption": {
                    "plainText": ["Michael C. Hall "]
                }
            },
            "releaseYear": {
                "year": 2006,
                "endYear": 2013
            },
            "ratingsSummary": {
                "aggregateRating": 8.6,
                "voteCount": 780598
            },
            "runtime": {
                "seconds": 3600
            },
            "certificate": {
                "rating": "TV-MA"
            },
            "canRate": {
                "isRatable": true
            },
            "titleGenres": {
                "genres": [
                    {
                        "genre": {
                            "text": "Crime"
                        }
                    },
                    {
                        "genre": {
                            "text": "Drama"
                        }
                    },
                    {
                        "genre": {
                            "text": "Mystery"
                        }
                    }
                ]
            },
            "canHaveEpisodes": true,
            "latestTrailer": {
                "id": "vi695910425"
            }
        }
, {
            "id": "tt28248897",
            "titleText": {
                "text": "Tyler Perry's Divorce in the Black"
            },
            "titleType": {
                "id": "movie",
                "text": "Movie",
                "canHaveEpisodes": false,
                "displayableProperty": {
                    "value": {
                        "plainText": ""
                    }
                }
            },
            "originalTitleText": {
                "text": "Tyler Perry's Divorce in the Black"
            },
            "primaryImage": {
                "id": "rm633696513",
                "width": 1944,
                "height": 2880,
                "url": "https://m.media-amazon.com/images/M/MV5BNmQwZjI1NTctYmMwNS00YWQ2LWIyZmUtZGRkNTNmNzRjY2ZkXkEyXkFqcGc@._V1_.jpg",
                "caption": {
                    "plainText": ["Meagan Good "]
                }
            },
            "releaseYear": {
                "year": 2024,
                "endYear": null
            },
            "ratingsSummary": {
                "aggregateRating": 4.5,
                "voteCount": 2169
            },
            "runtime": {
                "seconds": 8580
            },
            "certificate": {
                "rating": "R"
            },
            "canRate": {
                "isRatable": true
            },
            "titleGenres": {
                "genres": [
                    {
                        "genre": {
                            "text": "Drama"
                        }
                    },
                    {
                        "genre": {
                            "text": "Thriller"
                        }
                    }
                ]
            },
            "canHaveEpisodes": false,
            "latestTrailer": {
                "id": "vi1429587481"
            }
        }
, {
            "id": "tt12637874",
            "titleText": {
                "text": "Fallout"
            },
            "titleType": {
                "id": "tvSeries",
                "text": "TV Series",
                "canHaveEpisodes": true,
                "displayableProperty": {
                    "value": {
                        "plainText": "TV Series"
                    }
                }
            },
            "originalTitleText": {
                "text": "Fallout"
            },
            "primaryImage": {
                "id": "rm2121877249",
                "width": 1944,
                "height": 2880,
                "url": "https://m.media-amazon.com/images/M/MV5BZjQ0YjAyNWQtMjRjMC00NzMxLTlkNjEtYWQzNmQwNGRlMGJkXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg",
                "caption": {
                    "plainText": ["Walton Goggins","Aaron Moten","  Ella Purnell "]
                }
            },
            "releaseYear": {
                "year": 2024,
                "endYear": null
            },
            "ratingsSummary": {
                "aggregateRating": 8.4,
                "voteCount": 229838
            },
            "runtime": {
                "seconds": 3600
            },
            "certificate": {
                "rating": "TV-MA"
            },
            "canRate": {
                "isRatable": true
            },
            "titleGenres": {
                "genres": [
                    {
                        "genre": {
                            "text": "Action"
                        }
                    },
                    {
                        "genre": {
                            "text": "Adventure"
                        }
                    },
                    {
                        "genre": {
                            "text": "Drama"
                        }
                    }
                ]
            },
            "canHaveEpisodes": true,
            "latestTrailer": {
                "id": "vi788252185"
            }
        }
, {
            "id": "tt17279496",
            "titleText": {
                "text": "Civil War"
            },
            "titleType": {
                "id": "movie",
                "text": "Movie",
                "canHaveEpisodes": false,
                "displayableProperty": {
                    "value": {
                        "plainText": ""
                    }
                }
            },
            "originalTitleText": {
                "text": "Civil War"
            },
            "primaryImage": {
                "id": "rm1657225473",
                "width": 8100,
                "height": 12000,
                "url": "https://m.media-amazon.com/images/M/MV5BYTYyODhlODktYjUzNC00NjUyLWI1MzYtNmI0MTY3YTUxYjY2XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
                "caption": {
                    "plainText": ["Civil War (2024)"]
                }
            },
            "releaseYear": {
                "year": 2024,
                "endYear": null
            },
            "ratingsSummary": {
                "aggregateRating": 7.1,
                "voteCount": 135279
            },
            "runtime": {
                "seconds": 6540
            },
            "certificate": {
                "rating": "R"
            },
            "canRate": {
                "isRatable": true
            },
            "titleGenres": {
                "genres": [
                    {
                        "genre": {
                            "text": "Action"
                        }
                    },
                    {
                        "genre": {
                            "text": "Adventure"
                        }
                    },
                    {
                        "genre": {
                            "text": "Thriller"
                        }
                    }
                ]
            },
            "canHaveEpisodes": false,
            "latestTrailer": {
                "id": "vi1756939801"
            }
        }
, {
            "id": "tt0460681",
            "titleText": {
                "text": "Supernatural"
            },
            "titleType": {
                "id": "tvSeries",
                "text": "TV Series",
                "canHaveEpisodes": true,
                "displayableProperty": {
                    "value": {
                        "plainText": "TV Series"
                    }
                }
            },
            "originalTitleText": {
                "text": "Supernatural"
            },
            "primaryImage": {
                "id": "rm26375169",
                "width": 423,
                "height": 616,
                "url": "https://m.media-amazon.com/images/M/MV5BMDFmMGZmMGItNGRjNC00NjVjLWI5ODEtNzhjMTE5MmJhN2FkXkEyXkFqcGc@._V1_.jpg",
                "caption": {
                    "plainText": ["Jensen Ackles "," Jared Padalecki "]
                }
            },
            "releaseYear": {
                "year": 2005,
                "endYear": 2020
            },
            "ratingsSummary": {
                "aggregateRating": 8.4,
                "voteCount": 489157
            },
            "runtime": {
                "seconds": 2640
            },
            "certificate": {
                "rating": "TV-14"
            },
            "canRate": {
                "isRatable": true
            },
            "titleGenres": {
                "genres": [
                    {
                        "genre": {
                            "text": "Drama"
                        }
                    },
                    {
                        "genre": {
                            "text": "Fantasy"
                        }
                    },
                    {
                        "genre": {
                            "text": "Horror"
                        }
                    }
                ]
            },
            "canHaveEpisodes": true,
            "latestTrailer": {
                "id": "vi3786522905"
            }
        }
, {
            "id": "tt1632701",
            "titleText": {
                "text": "Suits"
            },
            "titleType": {
                "id": "tvSeries",
                "text": "TV Series",
                "canHaveEpisodes": true,
                "displayableProperty": {
                    "value": {
                        "plainText": "TV Series"
                    }
                }
            },
            "originalTitleText": {
                "text": "Suits"
            },
            "primaryImage": {
                "id": "rm2076613889",
                "width": 680,
                "height": 1000,
                "url": "https://m.media-amazon.com/images/M/MV5BNmVmMmM5ZmItZDg0OC00NTFiLWIxNzctZjNmYTY5OTU3ZWU3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
                "caption": {
                    "plainText": ["Katherine Heigl"," Dulé Hill"," Rick Hoffman"," Gabriel Macht"," Amanda Schull"," Sarah Rafferty "]
                }
            },
            "releaseYear": {
                "year": 2011,
                "endYear": 2019
            },
            "ratingsSummary": {
                "aggregateRating": 8.4,
                "voteCount": 488344
            },
            "runtime": {
                "seconds": 2640
            },
            "certificate": {
                "rating": "TV-14"
            },
            "canRate": {
                "isRatable": true
            },
            "titleGenres": {
                "genres": [
                    {
                        "genre": {
                            "text": "Comedy"
                        }
                    },
                    {
                        "genre": {
                            "text": "Drama"
                        }
                    }
                ]
            },
            "canHaveEpisodes": true,
            "latestTrailer": {
                "id": "vi2339027993"
            }
        }
, {
            "id": "tt12930350",
            "titleText": {
                "text": "My Spy: The Eternal City"
            },
            "titleType": {
                "id": "movie",
                "text": "Movie",
                "canHaveEpisodes": false,
                "displayableProperty": {
                    "value": {
                        "plainText": ""
                    }
                }
            },
            "originalTitleText": {
                "text": "My Spy: The Eternal City"
            },
            "primaryImage": {
                "id": "rm94007553",
                "width": 599,
                "height": 898,
                "url": "https://m.media-amazon.com/images/M/MV5BMjVhMTBlN2QtMWJmOS00OTliLWEwZTUtZjI3NWM2NjdmZjI3XkEyXkFqcGc@._V1_.jpg",
                "caption": {
                    "plainText": ["Anna Faris"," Ken Jeong","Craig Robinson"," Kristen Schaal"," Dave Bautista","Flula Borg"," Chloe Coleman "]
                }
            },
            "releaseYear": {
                "year": 2024,
                "endYear": null
            },
            "ratingsSummary": {
                "aggregateRating": 5.7,
                "voteCount": 3148
            },
            "runtime": {
                "seconds": 6720
            },
            "certificate": {
                "rating": "PG-13"
            },
            "canRate": {
                "isRatable": true
            },
            "titleGenres": {
                "genres": [
                    {
                        "genre": {
                            "text": "Action"
                        }
                    },
                    {
                        "genre": {
                            "text": "Comedy"
                        }
                    }
                ]
            },
            "canHaveEpisodes": false,
            "latestTrailer": {
                "id": "vi3107178009"
            }
        }
, {
            "id": "tt6473300",
            "titleText": {
                "text": "Mirzapur"
            },
            "titleType": {
                "id": "tvSeries",
                "text": "TV Series",
                "canHaveEpisodes": true,
                "displayableProperty": {
                    "value": {
                        "plainText": "TV Series"
                    }
                }
            },
            "originalTitleText": {
                "text": "Mirzapur"
            },
            "primaryImage": {
                "id": "rm3373062913",
                "width": 600,
                "height": 900,
                "url": "https://m.media-amazon.com/images/M/MV5BN2NlNGYwYTUtMTczMi00NGVjLTgwMzUtNjBkZjIyNDc2NjcxXkEyXkFqcGdeQXVyODQ5NDUwMDk@._V1_.jpg",
                "caption": {
                    "plainText": ["Kulbhushan Kharbanda"," Lilliput"," Pankaj Tripathi"," Anjumm Shharma"," Rasika Dugal","  Ali Fazal "]
                }
            },
            "releaseYear": {
                "year": 2018,
                "endYear": null
            },
            "ratingsSummary": {
                "aggregateRating": 8.5,
                "voteCount": 85897
            },
            "runtime": {
                "seconds": 3600
            },
            "certificate": {
                "rating": "TV-MA"
            },
            "canRate": {
                "isRatable": true
            },
            "titleGenres": {
                "genres": [
                    {
                        "genre": {
                            "text": "Action"
                        }
                    },
                    {
                        "genre": {
                            "text": "Crime"
                        }
                    },
                    {
                        "genre": {
                            "text": "Drama"
                        }
                    }
                ]
            },
            "canHaveEpisodes": true,
            "latestTrailer": {
                "id": "vi1849476633"
            }
        }
      
        ],
      },
    };
  
    const [selectedFeature, setSelectedFeature] = useState("");
  
    const handleRadioChange = (title:any) => {
      setSelectedFeature(title);
    };
  
    useEffect(() => {
      console.log(selectedFeature);
      movies.data.streamingTitles.map((element) => {
        console.log(element);
      });
    }, [selectedFeature]);
  
    return (
      <div className="flex flex-row relative z-10 py-10 mx-auto overflow-x-auto">
        {movies.data.streamingTitles.map((feature, index) => (
          <Feature
            key={feature.id}
            {...feature}
            selectedFeature={selectedFeature}
            handleRadioChange={handleRadioChange}
            index={index}
          />
        ))}
      </div>
    );
  }
  
  const Feature = ({
    id,
    canHaveEpisodes,
    canRate,
    certificate,
    latestTrailer,
    titleText,
    originalTitleText,
    primaryImage,
    ratingsSummary,
    releaseYear,
    runtime,
    titleGenres,
    titleType,
    selectedFeature,
    handleRadioChange,
    index,
  }:{
    
      id:any;
      canHaveEpisodes:any;
      canRate:any;
      certificate:any;
      latestTrailer:any;
      titleText:any;
      originalTitleText:any;
      primaryImage:any;
      ratingsSummary:any;
      releaseYear:any;
      runtime:any;
      titleGenres:any;
      titleType:any;
      selectedFeature:any;
      handleRadioChange:any;
      index:any;
    
  }) => {
    const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
    const moviePoster = primaryImage.url;
    const movieDescription = primaryImage.caption.plainText;
    const releaser = releaseYear.year;
    const genres = titleGenres.genres;
    const rating = ratingsSummary.aggregateRating;
    const voteCount = ratingsSummary.voteCount;
    const Runtime = runtime?.seconds
      ? `${Math.floor(runtime.seconds / 3600)}h ${Math.floor(
          (runtime.seconds % 3600) / 60
        )}m`
      : "N/A";
    const certificateRating = certificate?.rating ? certificate?.rating : "N/A";
  
    return (
      <div
        className="relative overflow-hidden" style={{background:`url(${moviePoster})`,padding:"2rem",minWidth:"29rem",border:"2px solid black",borderRadius:"21px",color:"white",backgroundOrigin:"cover"}}
        onClick={() => handleRadioChange(id)}
      >
        <input
          type="radio"
          className="form-radio"
          name="feature"
          value={id}
          checked={selectedFeature === id}
          onChange={() => handleRadioChange(id)}
        />
        <div className="mx-auto max-w-7xl py-16 sm:px-2 lg:px-4">
          <div className="mx-auto  max-w-2xl  items-center gap-y-16 gap-x-8 px-4 sm:px-6 lg:max-w-none  lg:px-8">
            
            <div>
              <h2
                id="features-title"
                className="text-3xl font-bold tracking-tight sm:text-4xl"
              >
                {titleText.text}
              </h2>
              <div className="mt-4 text-lg text-gray-600">{movieDescription.map((item:any)=>{<span className="bg-red-900 flex">{item}</span>})}</div>
              <ul className="mt-4 space-y-2">
                <li>
                  <strong>Release Year:</strong> {releaser}
                </li>
                <li>
                  <strong>Genres:</strong> {genres.map((item:any)=>{<span>{item}</span>})}
                </li>
                <li>
                  <strong>Rating:</strong> {rating} / 10
                </li>
                <li>
                  <strong>Votes:</strong> {voteCount}
                </li>
                <li>
                  <strong>Runtime:</strong> {Runtime}
                </li>
                <li>
                  <strong>Certificate:</strong> {certificateRating}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };
  