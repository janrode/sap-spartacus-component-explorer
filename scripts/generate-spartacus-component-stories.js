const copy = require('recursive-copy')
const path = require('path')
const through = require('through2')

const options = {
  overwrite: true,
  expand: true,
  dot: true,
  junk: true,
  filter: ['**/!(*.module.d.ts|index.d.ts)'],
}

copy('../node_modules/@spartacus/storefront/cms-components/', '../sparta-stories', options)
  .on(copy.events.COPY_FILE_START, function (copyOperation) {
    console.info('Copying file ' + copyOperation.src + '...')
  })
  .on(copy.events.COPY_FILE_COMPLETE, function (copyOperation) {
    console.info('Copied to ' + copyOperation.dest)
  })
  .on(copy.events.ERROR, function (error, copyOperation) {
    console.error('Unable to copy ' + copyOperation.dest)
  })
  .then(function (results) {
    console.info(results.length + ' file(s) copied')
  })
  .catch(function (error) {
    return console.error('Copy failed: ' + error)
  })
