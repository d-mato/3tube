const YoutubeMp3Downloader = require('youtube-mp3-downloader')
const config = Object.assign({
  "ffmpegPath": "/usr/bin/ffmpeg",
  "outputPath": "./audios",
  "progressTimeout": 1000,
}, require('./config.json'))
const YD = new YoutubeMp3Downloader(config)

const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

server.listen(7000, () => {
  console.log(`Application starting! port:${server.address().port}`)
})

app.use('/', express.static(`${__dirname}/public`))
app.use('/audios', express.static(`${__dirname}/audios`))

io.on('connection', (socket) => {
  console.log('a user connected : ' + socket.id)

  socket.on('convert', (data) => {
    socket.emit('message', '変換を開始しました')

    //Download video and save as MP3 file
    let video_id = data.video_page_url.match(/v=(\w+)/)[1]
    let file = `${video_id}.mp3`
    YD.download(video_id, file)

    YD.on("finished", (data) => {
      socket.emit('message', '完了しました')
      socket.emit('end', {file: `/audios/${file}`})
    })

    YD.on("error", (error) => {
      console.log(error)
    })

    YD.on("progress", (progress) => {
      socket.emit('progress', progress)
    })
  })
})
