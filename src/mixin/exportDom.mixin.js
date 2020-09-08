import JsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export default {
  methods: {
    /**
     * require params
     * element  is  export dom refs attribute
     * fileName is export file name
     * fileType is PDF or IMAGE
     */
    exportDom (element, fileName, fileType) {
      let htmlBox = this.$refs[element]
      let canvas = document.createElement('canvas')
      const width = htmlBox.clientWidth
      const height = htmlBox.clientHeight
      const offsetLeft = htmlBox.offsetLeft
      const offsetTop = htmlBox.offsetTop
      const scaleBy = this.DPR() * 2
      const screenWidth = screen.width
      canvas.width = width * scaleBy
      canvas.height = height * scaleBy
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      html2canvas(htmlBox, {
        backgroundColor: '#FFFFFF',
        canvas,
        scale: scaleBy,
        useCORS: true,
        x: offsetLeft,
        y: offsetTop,
        dpi: screenWidth,
      }).then((canvas) => {
        if (fileType === 'IMAGE') {
          let img = document.createElement('a')
          img.href = canvas.toDataURL('image/jpeg', 1.0)
          img.download = fileName + '.jpg'
          img.click()
        }
        if (fileType === 'PDF') {
          let page = this.getPageInfo(width)
          let pageHeight = width / page.width * page.height
          let leftHeight = height
          let position = 0
          let imgWidth = page.width
          let imgHeight = page.width / width * height
          let pageData = canvas.toDataURL('image/jpeg', 1.0)
          let PDF = new JsPDF('', 'pt', page.name)
          if (leftHeight < pageHeight) {
            PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
          } else {
            while (leftHeight > 0) {
              PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
              leftHeight -= pageHeight
              position -= page.height
              if (leftHeight > 0) {
                PDF.addPage()
              }
            }
          }
          PDF.save(fileName + '.pdf')
        }
      })
    },
    getPageInfo (width) {
      let pageFormats = [
        { name: 'a0', width: 2383.94, height: 3370.39 },
        { name: 'a1', width: 1683.78, height: 2383.94 },
        { name: 'a2', width: 1190.55, height: 1683.78 },
        { name: 'a3', width: 841.89, height: 1190.55 },
        { name: 'a4', width: 595.28, height: 841.89 },
        { name: 'a5', width: 419.53, height: 595.28 },
        { name: 'a6', width: 297.64, height: 419.53 },
        { name: 'a7', width: 209.76, height: 297.64 },
        { name: 'a8', width: 147.40, height: 209.76 },
        { name: 'a9', width: 104.88, height: 147.40 },
        { name: 'a10', width: 73.70, height: 104.88 },
        { name: 'b0', width: 2834.65, height: 4008.19 },
        { name: 'b1', width: 2004.09, height: 2834.65 },
        { name: 'b2', width: 1417.32, height: 2004.09 },
        { name: 'b3', width: 1000.63, height: 1417.32 },
        { name: 'b4', width: 708.66, height: 1000.63 },
        { name: 'b5', width: 498.90, height: 708.66 },
        { name: 'b6', width: 354.33, height: 498.90 },
        { name: 'b7', width: 249.45, height: 354.33 },
        { name: 'b8', width: 175.75, height: 249.45 },
        { name: 'b9', width: 124.72, height: 175.75 },
        { name: 'b10', width: 87.87, height: 124.72 },
        { name: 'c0', width: 2599.37, height: 3676.54 },
        { name: 'c1', width: 1836.85, height: 2599.37 },
        { name: 'c2', width: 1298.27, height: 1836.85 },
        { name: 'c3', width: 918.43, height: 1298.27 },
        { name: 'c4', width: 649.13, height: 918.43 },
        { name: 'c5', width: 459.21, height: 649.13 },
        { name: 'c6', width: 323.15, height: 459.21 },
        { name: 'c7', width: 229.61, height: 323.15 },
        { name: 'c8', width: 161.57, height: 229.61 },
        { name: 'c9', width: 113.39, height: 161.57 },
        { name: 'c10', width: 79.37, height: 113.39 },
        { name: 'dl', width: 311.81, height: 623.62 },
        { name: 'letter', width: 612, height: 792 },
        { name: 'government-letter', width: 576, height: 756 },
        { name: 'legal', width: 612, height: 1008 },
        { name: 'junior-legal', width: 576, height: 360 },
        { name: 'ledger', width: 1224, height: 792 },
        { name: 'tabloid', width: 792, height: 1224 },
        { name: 'credit-card', width: 153, height: 243 },
      ]
      let pageWidthArr = []
      for (let page of pageFormats) {
        pageWidthArr.push(page.width)
      }
      pageWidthArr = pageWidthArr.sort(function (a, b) {
        return Math.abs(a - width) - Math.abs(b - width)
      })
      let page = pageFormats.find(item => item.width === pageWidthArr[0])
      return page
    },
    DPR () {
      if (window.devicePixelRatio && window.devicePixelRatio > 1) {
        return window.devicePixelRatio
      }
      return 1
    },
  }
}
