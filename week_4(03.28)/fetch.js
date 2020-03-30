fetch("https://api.hnpwa.com/v0/news/1.json")
  .then(response => {
    return response.json();
  })
  .then(response => {
    console.log("fetch API call");
    console.log(response);
    console.log("fetch End");
  })
  .catch(error => {
    console.log(error);
  });