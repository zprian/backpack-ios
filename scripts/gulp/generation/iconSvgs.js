var fs = require('fs');

const generateSvgIcons = (template) => (done) => {
  const svgSourceFolder = size => `node_modules/@skyscanner/bpk-svgs/dist/svgs/icons/${size}`
  const contentsTemplate = fs.readFileSync(template).toString()

  const imagesetFolder = (svg) => {
    const destinationFolder = 'Backpack-Common/Icons/Assets/Media.xcassets'
    return `${destinationFolder}/${svg}.imageset`
  }

  const moveSVGFile = (from, svgName) => {
    const destination = `${imagesetFolder(svgName)}/${svgName}.svg`
    fs.copyFileSync(from, destination)
  }

  const processSmSvgFile = (svgName) => {
    const file = `${imagesetFolder(svgName)}/${svgName}.svg`
    const content = fs.readFileSync(file)
    .toString()
    // .replace('viewBox="0 0 24 24"', 'viewBox="0 0 16 16"')
    fs.writeFileSync(file, content)
  }

  const createContentsFile = (json, svgFolder) => {
    fs.writeFileSync(`${svgFolder}/Contents.json`, json)
  }

  const createFolder = (path) => fs.mkdirSync(path, { recursive: true })

  const getSizedSvgName = (svg, size) => ({
    originalName: svg,
    sizedName: size === 'lg' ? `${svg}-lg` : `${svg}-sm`
  })

  const allSvgsForSize = size => fs
    .readdirSync(svgSourceFolder(size))
    .map(file => file.replace('.svg', ''))
    .map(svgName => getSizedSvgName(svgName, size))

  const contentJsonForSVG = (svg) => contentsTemplate.replace('{{svgName}}', svg)

  const processSvg = (svg, size) => {
    createFolder(imagesetFolder(svg.sizedName))
    moveSVGFile(`${svgSourceFolder(size)}/${svg.originalName}.svg`, svg.sizedName)
    if (size === 'sm') {
      processSmSvgFile(svg.sizedName)
    }
    createContentsFile(contentJsonForSVG(svg.sizedName), imagesetFolder(svg.sizedName))
  }

  ['lg', 'sm']
    .forEach(size => {
      allSvgsForSize(size)
        .forEach(svg => { processSvg(svg, size) })
    })
  done();
}

module.exports = generateSvgIcons
