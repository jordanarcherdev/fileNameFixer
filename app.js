#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
let tvmaze = require('tvmaze-node')
var argv = require('yargs').argv;
let show = argv.show;
let cwd = process.cwd()

if(show){
  tvmaze.search(show, function(error, response) {
    if(error){
      console.log(error)
    }else{
      let found = JSON.parse(response);
      found.forEach(foundshow => {
        if (foundshow.show.name.toUpperCase() == show.toUpperCase()){
          id = foundshow.show.id;

          let folder = cwd;
          fs.readdirSync(folder).forEach(file => {
            let ext = path.extname(file);

            let re =  /(.*)\D(\d{1,2})[ex\-](\d{1,2})/i;

            searchResults = file.match(re);
            if(searchResults){
              let season = parseInt(searchResults[2]);
              let episode = parseInt(searchResults[3]);
              console.log(season)
              console.log(episode)

              tvmaze.showById(id, "episodesbynumber", [season,episode], function(error, response) {
                if (error){
                  console.log(error)
                }else{

                  let ext = path.extname(file);

                  let re =  /(.*)\D(\d{1,2})[ex\-](\d{1,2})/i;

                  searchResults = file.match(re);
                  let episode = JSON.parse(response);
                  let epsname = episode.name;
                  let fixedFilename = "S" + searchResults[2] + "E" + searchResults[3] + " - " + epsname + ext;
                  // let fixedFilename = searchResults[3] + " - " + epsname + ext;
                  console.log(fixedFilename);
                  fs.renameSync(folder + "/" + file, folder + "/" + fixedFilename);
                }
              })


            }
          })


        }
      })
    }
  })
}else{
  let folder = cwd;
  fs.readdirSync(folder).forEach(file => {
    let ext = path.extname(file);

    let re =  /(.*)\D(\d{1,2})[ex\-](\d{1,2})/i;

    searchResults = file.match(re);
    if(searchResults){
      let season = parseInt(searchResults[2]);
      let episode = parseInt(searchResults[3]);
      console.log(season)
      console.log(episode)
      let fixedFilename = "S" + searchResults[2] + "E" + searchResults[3] + ext;
      console.log(fixedFilename);
      fs.renameSync(folder + "/" + file, folder + "/" + fixedFilename);
    }
  })
}
