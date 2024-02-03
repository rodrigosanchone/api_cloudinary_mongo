
import { connect } from './db.js'

import app from './app.js'



async function main() {
	await connect()
	app.listen(4000);
	console.log('Running port 4000')
}

main()