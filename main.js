const { program } = require('commander'); 
const fs = require('fs'); 

program
  .option('-i, --input <type>') 
  .option('-o, --output <type>') 
  .option('-d, --display') 
  .option('-s, --survived') 
  .option('-a, --age'); 
  
program.parse(process.argv);
const options = program.opts();

if (!options.input) {
  console.error('Error: Please, specify input file');
  process.exit(1);
}

if (!fs.existsSync(options.input)) {
  console.error('Error: Cannot find input file');
  process.exit(1);
}

let data = fs.readFileSync(options.input, 'utf-8'); 
let lines = data.trim().split('\n')
let passengers = lines.map(line => JSON.parse(line));

if (options.survived) {
    passengers = passengers.filter(p => p.Survived === '1');
}

const print_passengers = (passengers) => {
    for(const p of passengers) {
        console.log(`${p.Name}\t${options.age?`\t${p.Age}\t` : ''}${p.Sex}\t${p.Ticket}`);
    }    
}

if(options.display) {    
    print_passengers(passengers);
}

if (options.output) {
    data = JSON.stringify(passengers, null, 2);
    fs.writeFileSync(options.output, data, 'utf-8');
}