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


let baseUrl: string = "http://drmusic.azurewebsites.net/api/musics"
//let baseUrl: string = "http://localhost:51068/api/Musics"

new Vue({
    // TypeScript compiler complains about Vue because the CDN link to Vue is in the html file.
    // Before the application runs this TypeScript file will be compiled into bundle.js
    // which is included at the bottom of the html file.
    el: "#app",
    data: {
        records: [],
        record: null,
        id:"",
        artist: [],


        // id: "",
        // music: null,
        // inputData: { title: "", artist: "", duration: "", yearOfPublication: 0 },
        // addMessage: "",
        // idToDelete: "",
        // deleteMessage: "",
        // idToUpdate: null,
        // updateData: { title: "", artist: "", duration: "", yearOfPublication: 0 },
        // updateMessage: ""
    },
    created(): void {
        console.log("created")
        this.getAndShowAllRecords();
    },
    methods: {
        getAndShowAllRecords(): void {
            axios.get<IMusic[]>(baseUrl)
                .then((response: AxiosResponse<IMusic[]>) => {
                    this.records = response.data
                })
                .catch((error: AxiosError) => {
                    alert(error.message)
                })
        },
        getByArtist(id: number): void {
            let uri: string = baseUrl + "/artist/" + id
            console.log("getByArtist: " + uri)
            axios.get<IMusic>(uri)
                .then((response: AxiosResponse<IMusic>) => {
                    this.artist = response.data
                })
                .catch((error: AxiosError) => {
                    alert(error.message)
                })
        },
        addRecord(): void {
            console.log("addRecord")
            axios.post<number>(baseUrl, this.inputData)
                .then((response: AxiosResponse<number>) => {
                    this.addMessage = "Record added"
                    this.getAndShowAllRecords()
                })
                .catch((error: AxiosError) => {
                    alert(error.message)
                })
        },
        deletePlanteById(id: number): void {
            let uri: string = baseUrl + "/" + id
            console.log("deletePlanteById " + uri)
            axios.delete<number>(uri)
                .then((response: AxiosResponse<number>) => {
                    console.log("deletePlanteById result " + response.data)
                    if (response.data == 1) {
                        this.deleteMessage = "Plante deleted"
                        this.getAndShowAllPlante()
                    } else {
                        this.deleteMessage = "No such plante"
                    }
                })
                .catch((error: AxiosError) => {
                    alert(error.message)
                })
        },
        updatePlante(id: number): void {
            let uri: string = baseUrl + "/" + id
            console.log("update plante " + uri)
            axios.put<number>(uri, this.updateData)
                .then((response: AxiosResponse<number>) => {
                    if (response.data == 1) {
                        this.updateMessage = "Plante updated"
                        this.getAndShowAllBooks()
                    } else {
                        this.updateMessage = "No such plante"
                    }
                })
                .catch((error: AxiosError) => {
                    alert(error.message)
                })
        }
    }
})