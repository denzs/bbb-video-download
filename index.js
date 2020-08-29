const { ArgumentParser } = require('argparse')
const { version } = require('./package.json')
const { Processor } = require('./modules/Processor')

const argsParser = new ArgumentParser()
argsParser.add_argument('-v', '--version', {
    action: 'version', version
})
argsParser.add_argument('-i', '--input', {
    help: 'Path to published presentation',
    required: true
})

argsParser.add_argument('-o', '--output', {
    help: 'Outputfile .mp4|.webm',
    required: true
})

const args = argsParser.parse_args()

async function process(args) {
    const processor = new Processor(args)
    await processor.configure()
    await processor.createAssets()
    await processor.createVideo()
    await processor.cleanup()
}

process(args)
