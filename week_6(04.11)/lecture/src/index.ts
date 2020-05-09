const greeting = (name: string, message?: string): void =>{
    if (message){
        console.log(`Hi! ${name}, ${message}`);
    }
    else {
        console.log(`Hi! ${name}, welcome!`)
    }

