import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"

interface IMusic {
    title: string
    artist: string
    duration: number
    yearOfPublication: number
}


let baseUrl: string = "http://musicservice.azurewebsites.net/api/Musics"
//let baseUrl: string = "http://localhost:51068/api/Musics"

new Vue({
    // TypeScript compiler complains about Vue because the CDN link to Vue is in the html file.
    // Before the application runs this TypeScript file will be compiled into bundle.js
    // which is included at the bottom of the html file.
    el: "#app",
    data: {
        records: [],
        
    },


    methods: {
        
    },
       
})