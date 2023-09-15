import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoId) =>
  new Promise((resolve, reject) => {
    const videoUrl = "https://www.youtube.com/shorts/" + videoId
    console.log(videoUrl)
    ytdl(videoUrl, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        console.log(info)
      })
      .on("end", (end) => {
        console.log("acabou")
        resolve()
      })
      .on("erros", (error) => {
        console.log(error)
        reject()
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  })
