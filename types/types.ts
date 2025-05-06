// used to export commonly used types

export interface meaning {
    //const { partOfSpeech, definitions, synonyms, antonyms } : {partOfSpeech : }= meaning,
    partOfSpeech : String,
    definitions : definition[],
    synonyms : String[],
    antonyms : String[]
}

export interface noMeaning {
    err : String
}

interface definition {
    definition : String,
    synonyms : String[],
    antonyms : String[]
}