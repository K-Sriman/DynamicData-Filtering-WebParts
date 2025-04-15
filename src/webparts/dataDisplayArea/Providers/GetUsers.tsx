export class services {
    async GetUsers(){
      try {
        const response = await fetch('https://dummyjson.com/users?select=username,gender,age,email&limit=50');
        const data = await response.json();
        return data.users || [];
      } catch (e) {
        console.error(e, "error in the api call");
        return [];
      }
    }
  }
  