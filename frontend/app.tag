<app>
  <form onsubmit={submit}>
    <label>YouTube url: </label><input ref="video_page_url" value="https://www.youtube.com/watch?v=2p25BxnB6ww" disabled={processing}/>
    <button type="submit" disabled={processing}>変換する</button>
  </form>
  <p if={message}>{message}</p>
  <p if={percentage}>{percentage}%</p>
  <a href={file} if={file} target="_blank">{file}</a>

  <script>
    const socket = io()
    socket.on('message', (message) => this.update({message}) )
    socket.on('progress', (data) => this.update({percentage: data.progress.percentage}) )
    socket.on('end', (data) => this.update({file: data.file, processing: false}) )

    submit(e) {
      this.processing = true
      socket.emit('convert', {video_page_url: this.refs.video_page_url.value})
      e.preventDefault()
    }
  </script>
</app>
