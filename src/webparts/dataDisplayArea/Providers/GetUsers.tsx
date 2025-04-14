
export class services{
    async GetUsers() {
    try{
        const response = await fetch('https://dummyjson.com/users?select=username,gender,age,email&limit=0');
        const data = await response.json();
        console.log(data);
        return data.users || []
    }
    catch(e){
        console.error(e,"error in the api call")
        return[];
    }
} 
}
  