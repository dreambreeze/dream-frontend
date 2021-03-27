const fs = require('fs')
const dotenv = require('dotenv')
const env = dotenv.parse(fs.readFileSync('.env'))

const { execSync } = require('child_process')

if (env.DEPLOY_IS_PORTAL === 'true') {
  execSync(
    `CDN_DOMAIN_NAME=https://cs-cdn2.snc-dev.com/${env.DEPLOY_OFFICE_FOLD_NAME}/general/default npm run build && aws s3 sync ./dist/ s3://snc-frontend-resource-v2/${env.DEPLOY_OFFICE_FOLD_NAME}/general/default --endpoint=http://office.snc-dev.com:9000 --profile dev-local`,
    { stdio: 'inherit' }
  )
} else {
  execSync(
    `npm run app:build && aws s3 sync ./dist/ s3://snc-frontend-resource-v2/${env.DEPLOY_OFFICE_FOLD_NAME}/default/ --endpoint=http://office.snc-dev.com:9000 --profile dev-local`,
    { stdio: 'inherit' }
  )
}
