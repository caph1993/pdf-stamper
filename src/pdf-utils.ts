import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { writeFile, readFile } from '@tauri-apps/plugin-fs'
import { open } from '@tauri-apps/plugin-dialog'

export async function mergeAndStamp(buffers: ArrayBuffer[], logoPath: string | null = null) {
  const merged = await PDFDocument.create()
  console.log('Merging PDF files...')

  for (const buf of buffers) {
    const src = await PDFDocument.load(buf)
    const pages = await merged.copyPages(src, src.getPageIndices())
    pages.forEach(p => merged.addPage(p))
  }

  // const pngBytes = await fetch('stamp.png').then(r => r.arrayBuffer())
  // const pngImage = await merged.embedPng(pngBytes)

  const pages = merged.getPages()
  const font = await merged.embedFont(StandardFonts.Helvetica)
  let logoImage = null

  if (logoPath) {
    const logoBytes = await readFile(logoPath)  // read PNG
    logoImage = await merged.embedPng(logoBytes)
  }

  pages.forEach((page, i) => {
    const { width, height } = page.getSize()

    const text = `Page ${i + 1} of ${pages.length}`
    const fontSize = 10

    // measure text width using the font
    const textWidth = font.widthOfTextAtSize(text, fontSize)
    const textHeight = fontSize + 6 // a bit extra padding

    // --- Draw logo if selected ---
    if (logoImage) {
      page.drawImage(logoImage, {
        x: width - 100,
        y: 10 + textHeight,
        width: 80,
        height: 80
      })
    }

    // background position
    const x = width - 100
    const y = 10

    // draw background rectangle first
    page.drawRectangle({
      x,
      y: y - 2, // little offset
      width: textWidth + 8,  // some horizontal padding
      height: textHeight,
      color: rgb(1, 1, 1),   // white
      borderColor: rgb(0.5, 0.5, 0.5), // optional border
      borderWidth: 0.5,
      opacity: 0.9,               // background opacity
      borderOpacity: 0.4,         // slightly transparent border
    })

    // now draw the text on top
    page.drawText(text, {
      x: x + 4, // left padding
      y: y,
      size: fontSize,
      font,
      color: rgb(0, 0, 0)
    })
  })

  const pdfBytes = await merged.save()

  const savePath = await open({
    title: 'Save merged PDF',
    directory: false,
    multiple: false,
    filters: [{ name: 'PDF', extensions: ['pdf'] }]
  })

  if (typeof savePath === 'string') {
    await writeFile(savePath, new Uint8Array(pdfBytes));
  }
}