import 'nprogress/nprogress.css'
import Progress from 'nprogress'

// Top loading progress.
Progress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3,
})

export default Progress
