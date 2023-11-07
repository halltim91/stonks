import React from "react"
import axios from "axios";

function apiRequest() {
    let news: String = "";

    const options = {
        method: 'GET',
        url: 'https://reuters-business-and-financial-news.p.rapidapi.com/article-date/2021-04-01',
        headers: {
          'X-RapidAPI-Key': '9df1569e87mshf5d701c4842d9e7p165494jsnbd0564dcdebf',
          'X-RapidAPI-Host': 'reuters-business-and-financial-news.p.rapidapi.com'
        }
      };
      
    axios.request(options).then(data => console.log(data.data)).catch(error => console.error(error));
}

export default function NewsCompoenet() {
    apiRequest();
    return <div>Hello world</div>
}