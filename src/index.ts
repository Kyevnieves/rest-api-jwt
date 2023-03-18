import app from './app'
import './database'


function main(){
	app.listen(app.get('PORT'), ()=>{
	console.log("Servidor en puerto ", app.get('PORT'))
	})
}

main();

